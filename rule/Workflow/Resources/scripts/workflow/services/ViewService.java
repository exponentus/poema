package workflow.services;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.actions._ActionBar;
import workflow.dao.ActionableDocumentDAO;
import workflow.ui.ActionFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
public class ViewService extends RestProvider {

    private ActionFactory action = new ActionFactory();

    @GET
    @Path("approvals/pending")
    public Response getApprovalsPendingMeView() {
        _Session session = getSession();
        int pageSize = session.getPageSize();
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));

        try {
            ActionableDocumentDAO dao = new ActionableDocumentDAO(session);
            ViewPage vp = dao.findViewPage(sortParams, getWebFormData().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newIncoming);
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("approvals_pending");
            outcome.setTitle("approvals_pending");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }

    @GET
    @Path("projects/my")
    public Response getMyProjectsView() {
        _Session session = getSession();
        int pageSize = session.getPageSize();
        SortParams sortParams = getWebFormData().getSortParams(SortParams.desc("regDate"));

        try {
            ActionableDocumentDAO dao = new ActionableDocumentDAO(session);
            ViewPage vp = dao.findViewPage(sortParams, getWebFormData().getPage(), pageSize);

            _ActionBar actionBar = new _ActionBar(session);
            actionBar.addAction(action.newIncoming);
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setId("projects_my");
            outcome.setTitle("projects_my");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
