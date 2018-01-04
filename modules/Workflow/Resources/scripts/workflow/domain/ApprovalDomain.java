package workflow.domain;

import com.exponentus.common.domain.ApprovalLifecycle;
import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.exception.ApprovalException;
import com.exponentus.common.model.embedded.Approver;
import com.exponentus.common.model.embedded.Block;
import com.exponentus.common.model.embedded.IApproval;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import staff.dao.EmployeeDAO;

import java.util.List;

public abstract class ApprovalDomain<T extends IApproval> extends CommonDomain<T> {

    protected ApprovalDomain(_Session ses) {
        super(ses);
    }

    public void startApproving(T e) throws ApprovalException, DTOException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
        lifecycle.start();
    }

    public void acceptApprovalBlock(T e, IUser user) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
        lifecycle.accept(user);
    }

    public void declineApprovalBlock(T e, IUser user, String decisionComment) throws ApprovalException {
        ApprovalLifecycle lifecycle = new ApprovalLifecycle(e);
        lifecycle.decline(user, decisionComment);
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
