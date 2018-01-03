package projects.model;

import com.exponentus.common.model.AppEntity;
import com.exponentus.common.model.Attachment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "prj__comments")
public class Comment extends AppEntity<UUID> {

    @JsonIgnore
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(updatable = false, nullable = false)
    private Task task;

    @Column(nullable = false, length = 512)
    private String comment;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "prj__comment_attachments", joinColumns = {
            @JoinColumn(name = "comment_id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id")}, indexes = {
            @Index(columnList = "comment_id, attachment_id")}, uniqueConstraints = @UniqueConstraint(columnNames = {
            "comment_id", "attachment_id"}))
    @CascadeOnDelete
    private List<Attachment> attachments = new ArrayList<>();

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
