package workflow.domain;

import java.util.List;

import com.exponentus.common.domain.DTOService;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;

import staff.dao.EmployeeDAO;
import workflow.domain.exception.ApprovalException;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;

public abstract class ApprovalDomain<T extends IApproval> extends DTOService<T> {

	protected ApprovalDomain(_Session ses) {
		super(ses);
	}

	public void startApproving(T e) throws ApprovalException, DTOException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
		lifecycle.start();
	}

	public void acceptApprovalBlock(T e, IUser<Long> user) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
		lifecycle.accept(user);
	}

	public void declineApprovalBlock(T e, IUser<Long> user, String decisionComment) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
		lifecycle.decline(user, decisionComment);
	}

	public void skipApprovalBlock(T e) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
		lifecycle.skip();
	}

	@SuppressWarnings("unchecked")
	public T backToRevise(T entity) throws ApprovalException {
		ApprovalLifecycle lifecycle = new ApprovalLifecycle(entity);
		return (T) lifecycle.backToRevise();

	}

	protected List<Block> normalizeBlocks(EmployeeDAO eDao, List<Block> blocks) {
		int count = 1;
		for (Block entry : blocks) {
			entry.setSort(count);
			count++;
			int nestedCount = 1;
			for (Approver nestedEntry : entry.getApprovers()) {
				nestedEntry.setSort(nestedCount);
				nestedEntry.setEmployee(eDao.findById(nestedEntry.getEmployee().getId()));
				nestedCount++;
			}
		}
		return blocks;
	}

}
