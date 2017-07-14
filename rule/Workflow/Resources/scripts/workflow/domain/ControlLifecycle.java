package workflow.domain;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.exponentus.env.EnvConst;

import reference.model.constants.ControlSchemaType;
import staff.model.Employee;
import workflow.model.Assignment;
import workflow.model.Report;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.AssigneeEntry;

public class ControlLifecycle {
    private Assignment entity;
    private Date current = new Date();

    public ControlLifecycle(Assignment approval) {
        this.entity = approval;
    }

    public void start() {
        if (entity.getStatus() == ControlStatusType.DRAFT) {
            List<AssigneeEntry> assigneeEntries = entity.getAssigneeEntries();
            for (AssigneeEntry assignee : assigneeEntries) {
                assignee.setResetTime(null);
                assignee.setStatus(ControlStatusType.PROCESSING);
                assignee.setStatusTime(current);
                assignee.setResetInfo("");
                assignee.setResetBy(null);
                entity.addReader(assignee.getAssignee().getUser());

            }
            entity.setStatusTime(current);
            entity.setStatus(ControlStatusType.PROCESSING);
            entity.resetEditors();
        }
    }

    public boolean check() {
        boolean isChanged = false;
        if (entity.getControlType().getSchema() == ControlSchemaType.ALLOW_RESET_ON_BASIS_REPORT) {
            List<Report> reports = entity.getReports();
            List<AssigneeEntry> assigneeEntries = entity.getAssigneeEntries();
            for (AssigneeEntry assignee : assigneeEntries) {
                for (Report report : reports) {
                    if (assignee.getAssignee().equals(report.getAppliedAuthor()) && assignee.getStatus() != ControlStatusType.COMPLETED) {
                        assignee.setResetTime(current);
                        assignee.setStatus(ControlStatusType.COMPLETED);
                        assignee.setStatusTime(current);
                        assignee.setResetInfo(EnvConst.APP_ID);
                    }
                }
            }
            if (assignmentIsDone(assigneeEntries, ControlStatusType.COMPLETED)){
                isChanged = true;
            }
        } else if (entity.getControlType().getSchema() == ControlSchemaType.ALLOW_RESET_ON_BASIS_COORDINATOR_REPORT) {
            List<Report> reports = entity.getReports();
            AssigneeEntry coordinator = null;
            List<AssigneeEntry> assigneeEntries = entity.getAssigneeEntries();
            for (AssigneeEntry assignee : assigneeEntries) {
                if (assignee.isCoordinator()) {
                    coordinator = assignee;
                }
            }
            if (coordinator != null) {
                for (Report report : reports) {
                    if (coordinator.equals(report.getAppliedAuthor())) {
                        assigneeEntries.stream().peek((element) -> {
                            element.setResetTime(current);
                            element.setStatus(ControlStatusType.COMPLETED);
                            element.setStatusTime(current);
                            element.setResetInfo(EnvConst.APP_ID);
                        });
                        entity.setStatusTime(current);
                        entity.setStatus(ControlStatusType.COMPLETED);
                        isChanged = true;
                        break;
                    }
                }
            }
        } else if (entity.getControlType().getSchema() == ControlSchemaType.RESET_ALL_MANUALLY) {
            List<Report> reports = entity.getReports();
            List<AssigneeEntry> assigneeEntries = entity.getAssigneeEntries();
            for (AssigneeEntry assignee : assigneeEntries) {
                for (Report report : reports) {
                    if (assignee.getAssignee().equals(report.getAppliedAuthor()) && assignee.getStatus() != ControlStatusType.COMPLETED) {
                        assignee.setStatus(ControlStatusType.PENDING);
                        assignee.setStatusTime(current);
                    }
                }
            }
            if (assignmentIsDone(assigneeEntries, ControlStatusType.PENDING)){
                isChanged = true;
            }

        }
        return isChanged;
    }

    public boolean completeAssignee(UUID reportUser, Employee assigneeAuthor) {
        boolean isChanged = false;
        List<AssigneeEntry> assigneeEntities = entity.getAssigneeEntries();
        for (AssigneeEntry assignee : assigneeEntities) {
            if (assignee.getAssignee().getId().equals(reportUser) && assignee.getStatus() != ControlStatusType.COMPLETED) {
                assignee.setResetBy(assigneeAuthor);
                assignee.setStatus(ControlStatusType.COMPLETED);
                assignee.setResetTime(new Date());
                isChanged = true;
            }
        }

        if (assignmentIsDone(assigneeEntities, ControlStatusType.COMPLETED)){
            isChanged = true;
        }

        return isChanged;
    }

    public boolean unCompleteAssignee(UUID reportUser) {
        boolean isChanged = false;
        boolean isUnDone = false;
        List<AssigneeEntry> assigneeEntries = entity.getAssigneeEntries();
        if (entity.getControlType().getSchema() == ControlSchemaType.RESET_ALL_MANUALLY) {
            for (AssigneeEntry assignee : assigneeEntries) {
                if (assignee.getAssignee().getId().equals(reportUser)) {
                    returnToProcessing(assignee);
                    isChanged = true;
                    isUnDone = true;
                }
            }
        } else {
            for (AssigneeEntry assignee : assigneeEntries) {
                if (assignee.getAssignee().getId().equals(reportUser)) {
                    returnToProcessing(assignee);
                    isUnDone = true;
                    isChanged = true;
                }
            }
        }
        if (isUnDone) {
            entity.setStatusTime(current);
            entity.setStatus(ControlStatusType.PENDING);
            isChanged = true;
        }
        return isChanged;
    }

    private void returnToProcessing(AssigneeEntry assignee) {
        assignee.setStatus(ControlStatusType.PROCESSING);
        assignee.setStatusTime(current);
        assignee.setResetTime(null);
        assignee.setResetInfo("");
    }


    private boolean assignmentIsDone(List<AssigneeEntry> assigneeEntries, ControlStatusType finalStatus) {
        boolean isDone = true;
        for (AssigneeEntry assignee : assigneeEntries) {
            if (assignee.getResetTime() == null) {
                isDone = false;
                break;
            }
        }
        if (isDone) {
            entity.setStatusTime(current);
            entity.setStatus(finalStatus);
            return true;
        }
        return false;
    }


}


