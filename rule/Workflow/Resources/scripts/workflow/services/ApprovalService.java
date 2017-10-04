package workflow.services;

import com.exponentus.common.domain.IDTODomain;
import com.exponentus.common.service.EntityService;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IAppEntity;
import com.exponentus.scripting.actions.Action;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;
import com.exponentus.common.model.constants.ApprovalStatusType;
import com.exponentus.common.model.embedded.IApproval;
import workflow.ui.ActionFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public abstract class ApprovalService<T extends IAppEntity<UUID>, D extends IDTODomain<T>>
		extends EntityService<T, D> {

	protected List<Action> getApprovalButtonSet(IUser user, T e) throws DAOException {
		ActionFactory actionFactory = new ActionFactory();
		List<Action> keySet = new ArrayList<Action>();

		IApproval entity = (IApproval) e;

		if (entity.getApprovalStatus() == ApprovalStatusType.DRAFT && user.equals(entity.getAuthor())) {
			keySet.add(actionFactory.startApproving);
		}

		EmployeeDAO employeeDAO = new EmployeeDAO(getSession());

	/*	if (entity.userCanDoDecision(employeeDAO.findByUser(user))) {
			if (ApprovalLifecycle.getProcessingBlock(entity).getType() == ApprovalType.SIGNING) {
				keySet.add(actionFactory.signApprovalBlock);
			} else {
				keySet.add(actionFactory.acceptApprovalBlock);
			}
			keySet.add(actionFactory.declineApprovalBlock);
		}*/
		return keySet;
	}

}
