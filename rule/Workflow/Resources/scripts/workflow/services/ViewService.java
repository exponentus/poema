package workflow.services;

import com.exponentus.common.ui.ViewPage;
import com.exponentus.common.ui.actions.ActionBar;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.ActionableDocumentDAO;
import workflow.ui.ActionFactory;
import workflow.ui.ViewOptions;

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
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            ActionableDocumentDAO dao = new ActionableDocumentDAO(session);
            Employee employee = employeeDAO.findByUser(session.getUser());
            ViewPage vp = dao.findApprovalPendingByCurrentEmployeeViewPage(employee, sortParams, getWebFormData().getPage(), pageSize);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getActionableDocumentViewOptions());

            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
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
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            ActionableDocumentDAO dao = new ActionableDocumentDAO(session);
            Employee employee = employeeDAO.findByUser(session.getUser());
            ViewPage vp = dao.findProjectsByAuthorViewPage(employee, sortParams, getWebFormData().getPage(), pageSize);
            ViewOptions viewOptions = new ViewOptions();
            vp.setViewPageOptions(viewOptions.getActionableDocumentViewOptions());

            ActionBar actionBar = new ActionBar(session);
            actionBar.addAction(action.newOutgoing);
            actionBar.addAction(action.newOfficeMemo);
            actionBar.addAction(action.refreshVew);

            Outcome outcome = new Outcome();
            outcome.setTitle("projects_my");
            outcome.addPayload(actionBar);
            outcome.addPayload(vp);
            return Response.ok(outcome).build();
        } catch (DAOException e) {
            return responseException(e);
        }
    }
}
