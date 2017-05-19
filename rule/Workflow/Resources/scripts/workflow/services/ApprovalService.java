package workflow.services;

import java.util.UUID;

import com.exponentus.common.domain.IDTOService;
import com.exponentus.common.domain.IValidation;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.runtimeobj.IAppEntity;

public abstract class ApprovalService<T extends IAppEntity<UUID>, D extends IDTOService<T>> extends RestProvider {

	protected abstract T save(T dto, IValidation<T> validation) throws SecureException, DAOException, DTOException;

}
