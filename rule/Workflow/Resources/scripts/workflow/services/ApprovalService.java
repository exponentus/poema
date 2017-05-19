package workflow.services;

import java.lang.reflect.InvocationTargetException;
import java.util.UUID;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.domain.IDTOService;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IDAO;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.runtimeobj.IAppEntity;

import workflow.domain.ApprovalLifecycle;
import workflow.domain.exception.ApprovalException;
import workflow.model.embedded.IApproval;
import workflow.other.Messages;

public abstract class ApprovalService<T extends IAppEntity<UUID>, D extends IDTOService<T>> extends RestProvider {
	private Class<T> entityClass;
	private Class<D> domainClass;

	@POST
	@Path("action/startApproving")
	public Response startApproving(IApproval dto) {
		try {
			if (save((IAppEntity) dto) != null) {
				@SuppressWarnings("unchecked")
				IDAO<T, UUID> dao = DAOFactory.get(getSession(), entityClass);
				T entity = dao.findById(dto.getId());
				IApproval approval = (IApproval) entity;

				ApprovalLifecycle lifecycle = new ApprovalLifecycle(approval);
				lifecycle.start();

				dao.update(entity, false);

				new Messages(getAppEnv()).notifyApprovers(approval, entity.getTitle());
				Outcome outcome = domainClass.getConstructor().newInstance().getOutcome(entity);
				outcome.setTitle("approving_started");
				outcome.setMessage("approving_started");
				outcome.addPayload("result", "approving_started");

				return Response.ok(outcome).build();
			} else {
				return responseValidationError(new DTOException(DTOExceptionType.NO_ENTITY));
			}
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | InvocationTargetException
				| NoSuchMethodException | SecurityException e) {
			return responseException(e);
		} catch (DTOException e) {
			return responseValidationError(e);
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	protected abstract IAppEntity<UUID> save(IAppEntity<UUID> dto) throws SecureException, DAOException, DTOException;

}
