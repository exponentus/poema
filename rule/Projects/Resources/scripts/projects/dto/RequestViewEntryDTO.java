package projects.dto;

import org.apache.commons.lang3.StringUtils;
import projects.init.AppConst;
import projects.model.Task;
import projects.model.constants.ResolutionType;
import reference.model.RequestType;

import java.util.Date;
import java.util.UUID;

public class RequestViewEntryDTO {

    public UUID id;
    public String kind = "request";

    public Task task;
    public RequestType requestType;
    public ResolutionType resolution = ResolutionType.UNKNOWN;
    public Date resolutionTime;
    public String decisionComment;
    public String comment;

    public RequestViewEntryDTO(UUID id, Task task, RequestType requestType, ResolutionType resolution, Date resolutionTime, String decisionComment, String comment) {
        this.id = id;
        this.task = task;
        this.requestType = requestType;
        this.resolution = resolution;
        this.resolutionTime = resolutionTime;
        this.decisionComment = decisionComment;
        this.comment = comment;
    }

    public String getURL() {
        return AppConst.BASE_URL + "requests/" + id;
    }

    public String getTitle() {
        return StringUtils.abbreviate(comment, 140);
    }
}
