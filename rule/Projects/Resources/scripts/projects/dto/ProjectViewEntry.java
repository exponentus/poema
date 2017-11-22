package projects.dto;

import com.exponentus.localization.constants.LanguageCode;
import com.fasterxml.jackson.annotation.JsonProperty;
import projects.init.AppConst;
import projects.model.constants.ProjectStatusType;

import java.util.Date;
import java.util.UUID;

public class ProjectViewEntry {

    public UUID id;
    public String kind = "project";

    public String name;
    public String title;
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
    public boolean hasAttachments;

    public ProjectViewEntry(UUID id, String name, ProjectStatusType status, LanguageCode primaryLanguage, String customer, long manager, long programmer, long tester, Date startDate, Date finishDate, String comment, Long attachmentCount) {
        this.id = id;
        this.name = name;
        this.title = name;
        this.status = status;
        this.primaryLanguage = primaryLanguage;
        this.customer = customer;
        this.manager = manager;
        this.programmer = programmer;
        this.tester = tester;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.comment = comment;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return AppConst.BASE_URL + "projects/" + id;
    }
}
