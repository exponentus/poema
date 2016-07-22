package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.AppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@JsonRootName("comment")
@Entity
@Table(name = "comments")
@NamedQuery(name = "Comment.findAll", query = "SELECT m FROM Comment AS m ORDER BY m.regDate ASC")
public class Comment extends AppEntity<UUID> {

    @JsonIgnore
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false, nullable = false)
    private Task task;

    @Column(nullable = false, length = 512)
    private String comment;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "comment_attachments",
            joinColumns = {@JoinColumn(name = "comment_id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id")},
            indexes = {@Index(columnList = "comment_id, attachment_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"comment_id", "attachment_id"}))
    private List<Attachment> attachments = new ArrayList<>();

    public long getAuthorId() {
        return author;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }
}
