package workflow.dto;

import reference.model.ControlType;
import workflow.model.constants.ControlStatusType;
import workflow.model.embedded.Control;

import java.util.Date;
import java.util.List;

public class ControlShortDTO {

    public ControlType controlType;
    public Date startDate;
    public Date dueDate;
    public ControlStatusType status = ControlStatusType.UNKNOWN;
    public List<AssigneeEntryShortDTO> assigneeEntries;

    public ControlShortDTO(Control control) {
        controlType = control.getControlType();
        startDate = control.getStartDate();
        dueDate = control.getDueDate();
        status = control.getStatus();

//        if (!control.getAssigneeEntries().isEmpty()) {
//            this.control.assigneeEntries = new LinkedList<>();
//            for (AssigneeEntry ae : control.getAssigneeEntries()) {
//                AssigneeEntryDTO assigneeEntryDTO = new AssigneeEntryDTO(ae);
//                this.control.assigneeEntries.add(assigneeEntryDTO);
//            }
//        }
    }
}
