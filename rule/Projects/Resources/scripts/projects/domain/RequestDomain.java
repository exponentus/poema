package projects.domain;

import com.exponentus.user.IUser;
import projects.model.Request;
import projects.model.constants.ResolutionType;

import static projects.model.constants.ResolutionType.ACCEPTED;
import static projects.model.constants.ResolutionType.DECLINED;

public class RequestDomain {

    private Request request;

    public RequestDomain(Request request) {
        this.request = request;
    }

    public void fillFromDto(Request dto, IUser<Long> user) {
        request.setAuthor(user);
        request.setLastModifier(user.getId());
        request.setRequestType(dto.getRequestType());
        request.setComment(dto.getComment());
        request.setAttachments(dto.getAttachments());

        if (request.isNew()) {
            request.setTask(dto.getTask());
            request.setEditors(dto.getTask().getEditors());
            request.addReaderEditor(request.getAuthor());
        }



        /*
        request.setAuthor(session.getUser());
            request.setLastModifier(session.getUser().getId());
            request.setTask(task);
            request.setRequestType(requestType);
            request.setComment(requestForm.getComment());
            request.setAttachments(getActualAttachments(request.getAttachments(), requestForm.getAttachments()));

            request.setEditors(task.getEditors());
            request.addReaderEditor(session.getUser());

            task.setStatus(TaskStatusType.PENDING);
         */
    }

    boolean userCanDoResolution(IUser<Long> user) {
        if (request.isNew()) {
            return false;
        }

        ResolutionType rt = request.getResolution();
        long taskAuthorId = request.getTask().getAuthor().getId();

        return (rt != ACCEPTED && rt != DECLINED) && taskAuthorId == user.getId();
    }
}
