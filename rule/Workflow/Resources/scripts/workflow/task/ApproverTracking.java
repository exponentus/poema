package workflow.task;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.dao.DAOFactory;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IDAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event._Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;

import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;
import workflow.exception.ApprovalException;
import workflow.domain.ApprovalLifecycle;

@Command(name = "approver_tracking", trigger = Trigger.EVERY_5_MIN)
public class ApproverTracking extends _Do {
	private Date current = new Date();

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		List<Class<?>> entities = getApprovedEntities();
		for (Class clazz : entities) {
			IDAO<IApproval, UUID> dao = DAOFactory.get(session, clazz.getCanonicalName());
			ViewPage<IApproval> vp = dao.findAll();
			for (IApproval approval : vp.getResult()) {
				if (approval.getStatus() == ApprovalStatusType.PENDING) {
					try {
						Block currentBlock = ApprovalLifecycle.getCurrentBlock(approval);
						if (currentBlock.getTimeLimit() > 0) {
							List<Approver> approvers = ApprovalLifecycle.getCurrentApprovers(currentBlock);
							for (Approver currentApprover : approvers) {
								long diff = current.getTime() - currentApprover.getStartTime().getTime();
								if (TimeUnit.MILLISECONDS.toMinutes(diff) > currentBlock.getTimeLimit()) {
									currentApprover.setDecisionType(DecisionType.SKIPPED);
									currentApprover.setDecisionTime(current);
									currentApprover.setCurrent(false);
									try {
										dao.update(approval);
									} catch (SecureException | DAOException e) {
										Server.logger.errorLogEntry(e);
									}
								}
							}
						}
					} catch (ApprovalException e) {
						Server.logger.errorLogEntry(e);
					}
				}
			}
		}

	}

	// TODO it should be got by Refletions
	private List<Class<?>> getApprovedEntities() {
		List<Class<?>> classes = new ArrayList<Class<?>>();
		classes.add(workflow.model.OfficeMemo.class);
		// classes.add(resourcereservations.model.ApplicationForVehicle.class);
		return classes;
	}

}
