package projects.dto.converter;

import com.exponentus.common.converter.GenericConverter;
import projects.model.Project;
import projects.model.Task;

public class TaskDtoConverter implements GenericConverter<Task, Task> {

    @Override
    public Task apply(Task task) {

        Task result = new Task();

        result.setId(task.getId());
        result.setTitle(task.getTitle());
        result.setRegNumber(task.getRegNumber());
        result.setResult(task.getApprovalResult());
        result.setApprovalStatus(task.getApprovalStatus());
        result.setStatus(task.getStatus());
        result.setPriority(task.getPriority());
        result.setAssignee(task.getAssignee());
        result.setStartDate(task.getStartDate());
        result.setDueDate(task.getDueDate());

        Project project = new Project();
        project.setName(task.getProject().getName());
        result.setProject(project);

        result.setTags(task.getTags());
        result.setAttachments(task.getAttachments());

        return result;
    }
}
