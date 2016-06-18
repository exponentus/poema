package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.AppEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    @JoinColumn(updatable = false)
    private Task task;

    @Column(nullable = false, length = 512)
    private String comment;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "comment_attachments", joinColumns = {@JoinColumn(name = "parent_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "attachment_id", referencedColumnName = "id")},
            indexes = {@Index(columnList = "parent_id")},
            uniqueConstraints = @UniqueConstraint(columnNames = {"parent_id", "attachment_id"}))
    private List<Attachment> attachments;

    public void setTask(Task task) {
        this.task = task;
    }

    public Task getTask() {
        return task;
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
