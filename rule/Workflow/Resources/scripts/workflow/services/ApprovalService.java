package workflow.services;

import com.exponentus.common.domain.IDTODomain;
import com.exponentus.rest.RestProvider;

import workflow.model.embedded.IApproval;

public abstract class ApprovalService<T extends IApproval, D extends IDTODomain<T>> extends RestProvider {

}
