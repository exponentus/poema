package projects.dto;

import com.exponentus.common.model.Attachment;
import com.exponentus.localization.constants.LanguageCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import projects.init.AppConst;
import projects.model.constants.ProjectStatusType;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@JsonRootName("project")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectShortDTO {

    public UUID id;

    public String kind = "project";

    public String name;

    public ProjectStatusType status = ProjectStatusType.UNKNOWN;

    public LanguageCode primaryLanguage;

    public String customer;

    @JsonProperty("managerUserId")
    public long manager;

    @JsonProperty("programmerUserId")
    public long programmer;

    @JsonProperty("testerUserId")
    public long tester;

    public Date startDate;

    public Date finishDate;

    public String comment;

    public boolean hasAttachment;

    public List<Attachment> attachments = new ArrayList<>();

    public ProjectShortDTO(UUID id, String name, ProjectStatusType status, LanguageCode primaryLanguage, String customer, long manager, long programmer, long tester, Date startDate, Date finishDate, String comment, Long attachmentCount) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.primaryLanguage = primaryLanguage;
        this.customer = customer;
        this.manager = manager;
        this.programmer = programmer;
        this.tester = tester;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.comment = comment;
        this.hasAttachment = attachmentCount > 0;

        if (hasAttachment) {
            this.attachments = new ArrayList<>();
            this.attachments.add(new Attachment());
        }
    }

    public String getURL() {
        return AppConst.BASE_URL + "projects/" + id;
    }
}
