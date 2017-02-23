package projects.domain;

import administrator.model.User;
import com.exponentus.rest.outgoingpojo.Outcome;
import projects.model.Request;
import projects.model.Task;
import projects.model.constants.ResolutionType;

import java.util.Date;

import static projects.model.constants.ResolutionType.ACCEPTED;
import static projects.model.constants.ResolutionType.DECLINED;

public class RequestDomain implements IRequestDomain {

    private Request request;

    public RequestDomain(Request request) {
        if (request == null) {
            throw new IllegalArgumentException("Error: request null");
        }

        this.request = request;
    }

    @Override
    public void composeRequest(User author, Task task) {
        request.setAuthor(author);
        request.setTask(task);
    }

    @Override
    public void fillFromDto(Request dto) {
        request.setAuthor(dto.getAuthor());
        request.setLastModifier(dto.getAuthor().getId());
        request.setRequestType(dto.getRequestType());
        request.setComment(dto.getComment());
        request.setAttachments(dto.getAttachments());

        if (request.isNew()) {
            request.setTask(dto.getTask());
            request.setEditors(dto.getTask().getEditors());
            request.addReaderEditor(request.getAuthor());
        }
    }

    @Override
    public boolean userCanDoResolution(User user) {
        if (request.isNew()) {
            return false;
        }

        ResolutionType rt = request.getResolution();
        long taskAuthorId = request.getTask().getAuthor().getId();

        return (rt != ACCEPTED && rt != DECLINED) && taskAuthorId == user.getId();
    }

    @Override
    public void doResolution(User user, ResolutionType resolutionType, String decisionComment) {
        if (!userCanDoResolution(user)) {
            throw new IllegalStateException("User " + user.getLogin() + " can not do resolution or request already resolved. " +
                    "Current resolution: " + request.getResolution());
        }

        request.setResolution(resolutionType);
        request.setResolutionTime(new Date());
        request.setDecisionComment(decisionComment);
    }

    @Override
    public Outcome getOutcome() {
        Outcome outcome = new Outcome();

        outcome.addPayload(request);
        outcome.addPayload(request.getTask());

        if (!request.isNew()) {
            // outcome.addPayload(new ACL(request));
        }

        return outcome;
    }
}
