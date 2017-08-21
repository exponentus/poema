package workflow.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.ui.ViewPage;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IDAO;
import com.exponentus.exception.SecureException;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Command(name = "approver_tracking", trigger = Trigger.EVERY_5_MIN)
public class ApproverTracking extends Do {
	private Date current = new Date();

	@Override
	public void doTask(AppEnv appEnv, _Session session) {
		List<Class<?>> entities = getApprovedEntities();
		for (Class clazz : entities) {
			IDAO<IApproval, UUID> dao = DAOFactory.get(session, clazz.getCanonicalName());
			ViewPage<IApproval> vp = dao.findAll();
			//	PeriodicalServices.logger("approver_tracking is going to proccess " + vp.getCount() + " documents");
			for (IApproval approval : vp.getResult()) {
				if (approval.getApprovalStatus() == ApprovalStatusType.PENDING) {
					try {
						ApprovalLifecycle al = new ApprovalLifecycle(approval);
						Block currentBlock = al.getCurrentBlock();
						if (currentBlock.getTimeLimit() > 0) {
							List<Approver> approvers = ApprovalLifecycle.getCurrentApprovers(currentBlock);
							for (Approver currentApprover : approvers) {
								Date startTime = currentApprover.getStartTime();
								long diff = current.getTime() - startTime.getTime();
								if (TimeUnit.MILLISECONDS.toMinutes(diff) >= currentBlock.getTimeLimit()) {
									al.skip();
									try {
										dao.update(approval);
									} catch (SecureException | DAOException e) {
										Server.logger.exception(e);
									}
								}
								if (approval.getApprovalStatus() == ApprovalStatusType.FINISHED) {
									break;
								}
							}
						}
					} catch (ApprovalException e) {
						Server.logger.exception(e);
					} catch (Exception e) {
						Server.logger.error(approval.getURL());
						Server.logger.exception(e);
					}
				}
			}
		}

	}

	// TODO it should be got by Reflections
	private List<Class<?>> getApprovedEntities() {
		List<Class<?>> classes = new ArrayList<Class<?>>();
		classes.add(workflow.model.OfficeMemo.class);
		classes.add(workflow.model.Outgoing.class);
		return classes;
	}

}
