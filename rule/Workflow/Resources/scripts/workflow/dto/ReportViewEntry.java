package workflow.dto;

import workflow.init.AppConst;

import java.util.Date;
import java.util.UUID;

public class ReportViewEntry implements IDTO {

    public UUID id;
    public String kind = "assignment";

    private String appliedAuthor;
    public String title;
    private Date appliedRegDate;
    private String body;
    public boolean hasAttachments;

    public ReportViewEntry(UUID id, String appliedAuthor, String title, Date appliedRegDate, String body, Long attachmentCount) {
        this.id = id;
        this.appliedAuthor = appliedAuthor;
        this.title = title;
        this.appliedRegDate = appliedRegDate;
        this.body = body;
        this.hasAttachments = attachmentCount > 0;
    }

    public String getURL() {
        return AppConst.BASE_URL + "reports/" + id;
    }
}
