package audit.dto;

import audit.model.constants.ObservationStatusType;

public class StatInspectorDTO {
    public String inspector;
    public ObservationStatusType status;
    public Long value;

    public StatInspectorDTO(String inspector, ObservationStatusType status, Long value) {
        this.inspector = inspector;
        this.status = status;
        this.value = value;
    }
}
