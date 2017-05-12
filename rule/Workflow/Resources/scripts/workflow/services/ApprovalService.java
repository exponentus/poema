package workflow.services;

import java.lang.reflect.InvocationTargetException;
import java.util.UUID;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.domain.IDomain;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.IDAO;
import com.exponentus.exception.SecureException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.rest.validation.exception.DTOExceptionType;
import com.exponentus.runtimeobj.IAppEntity;

import workflow.dao.OfficeMemoDAO;
import workflow.domain.ApprovalLifecycle;
import workflow.domain.OfficeMemoDomain;
import workflow.domain.exception.ApprovalException;
import workflow.model.OfficeMemo;
import workflow.model.embedded.IApproval;
import workflow.other.Messages;

public abstract class ApprovalService<T extends IAppEntity<UUID>, D extends IDomain> extends RestProvider {
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

	@POST
	@Path("action/acceptApprovalBlock")
	public Response acceptApprovalBlock(OfficeMemo dto) {
		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain();

			omd.acceptApprovalBlock(om, getSession().getUser());

			officeMemoDAO.update(om, false);

			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("acceptApprovalBlock");
			outcome.setMessage("acceptApprovalBlock");

			return Response.ok(outcome).build();
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	@POST
	@Path("action/declineApprovalBlock")
	public Response declineApprovalBlock(OfficeMemo dto) {
		try {
			OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
			OfficeMemo om = officeMemoDAO.findById(dto.getId());
			OfficeMemoDomain omd = new OfficeMemoDomain();

			String decisionComment = getWebFormData().getValueSilently("comment");
			if (!decisionComment.isEmpty()) {
				omd.declineApprovalBlock(om, getSession().getUser(), decisionComment);
			} else {
				return responseValidationError(new DTOException().addError("comment", "required", "field_is_empty"));

			}
			officeMemoDAO.update(om, false);
			new Messages(getAppEnv()).notifyApprovers(om, om.getTitle());
			Outcome outcome = omd.getOutcome(om);
			outcome.setTitle("declineApprovalBlock");
			outcome.setMessage("declineApprovalBlock");

			return Response.ok(outcome).build();
		} catch (DAOException | SecureException | ApprovalException e) {
			return responseException(e);
		}
	}

	protected abstract IAppEntity<UUID> save(IAppEntity<UUID> dto) throws SecureException, DAOException, DTOException;

}
