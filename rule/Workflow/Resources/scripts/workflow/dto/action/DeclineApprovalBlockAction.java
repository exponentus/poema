package workflow.dto.action;

import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("action")
public class DeclineApprovalBlockAction<T> {

    private T model;
    private String comment;

    public T getModel() {
        return model;
    }

    public void setModel(T dto) {
        this.model = dto;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
