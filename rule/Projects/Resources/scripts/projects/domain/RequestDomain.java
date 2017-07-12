package projects.domain;

import administrator.model.User;
import com.exponentus.common.domain.CommonDomain;
import com.exponentus.common.domain.IValidation;
import com.exponentus.common.dto.ACL;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.Environment;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.rest.validation.exception.DTOException;
import com.exponentus.scripting._Session;
import com.exponentus.util.StringUtil;
import projects.exception.RequestException;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;

import java.util.Date;

import static projects.model.constants.ResolutionType.ACCEPTED;
import static projects.model.constants.ResolutionType.DECLINED;

public class RequestDomain extends CommonDomain<Request> {

    public RequestDomain(_Session ses) {
        super(ses);
    }

    public Request composeNew(User author, Task task) {
        Request request = new Request();

        request.setAuthor(author);
        request.setTask(task);

        return request;
    }

    @Override
    public Request fillFromDto(Request dto, IValidation<Request> validation, String formSesId) throws DTOException, DAOException {
        return null;
    }

    public void fillFromDto(Request request, Request dto) {
        request.setAuthor(dto.getAuthor());
        request.setLastModifier(dto.getAuthor().getId());
        request.setRequestType(dto.getRequestType());
        request.setComment(dto.getComment());
        request.setAttachments(dto.getAttachments());

        if (request.isNew()) {
            request.setTask(dto.getTask());
            request.resetReadersEditors();
            request.addReaderEditor(request.getAuthor());
            request.addEditors(dto.getTask().getEditors());
        }
    }

    public boolean userCanDoResolution(Request request, User user) {
        if (request.isNew()) {
            return false;
        }

        ResolutionType rt = request.getResolution();
        long taskAuthorId = request.getTask().getAuthor().getId();

        return (rt != ACCEPTED && rt != DECLINED) && taskAuthorId == user.getId();
    }

    public void doResolution(Request request, User user, ResolutionType resolutionType, String decisionComment) throws RequestException {
        if (!userCanDoResolution(request, user)) {
            throw new RequestException(
                    "User " + user.getLogin() + " can not do resolution or request already resolved. "
                            + "Current resolution: " + request.getResolution());
        }

        request.setResolution(resolutionType);
        request.setResolutionTime(new Date());
        request.setDecisionComment(decisionComment);
    }

    public Outcome getOutcome(Request request) {
        Outcome outcome = new Outcome();

        if (StringUtil.isEmpty(request.getTitle())) {
            outcome.setTitle(Environment.vocabulary.getWord("task_request", ses.getLang()) + " " + request.getTitle());
        } else {
            outcome.setTitle(request.getTitle());
        }
        outcome.addPayload(request);
        outcome.addPayload(request.getTask());
        outcome.addPayload("contentTitle", "task_request");

        if (!request.isNew()) {
            outcome.addPayload(new ACL(request));
        }

        return outcome;
    }
}
