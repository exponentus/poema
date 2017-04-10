package audit.dto;

import audit.model.constants.ObservationStatusType;

public class StatObsStatusDTO {
    public ObservationStatusType label;
    public String color;
    public Long value;

    public StatObsStatusDTO(ObservationStatusType statusType, Long value) {
        this.label = statusType;
        this.value = value;

        switch (statusType) {
            case DRAFT:
                this.color = "#f5f5f5";
                break;
            case OPEN:
                this.color = "#ecedff";
                break;
            case WAITING:
                this.color = "#c5c9ff";
                break;
            case PENDING:
                this.color = "#FF9800";
                break;
            case PROCESSING:
                this.color = "#FFEB3B";
                break;
            case CANCELLED:
                this.color = "#fd918a";
                break;
            case COMPLETED:
                this.color = "#8BC34A";
                break;
            case UNKNOWN:
                this.color = "#FFF";
                break;
        }
    }
}
