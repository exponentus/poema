package helpdesk.dao.filter;

import helpdesk.model.constants.DemandStatusType;
import reference.model.DemandType;

public class DemandFilter {

    private DemandStatusType status = DemandStatusType.UNKNOWN;
    private DemandType demandType;

    public DemandStatusType getStatus() {
        return status;
    }

    public void setStatus(DemandStatusType status) {
        this.status = status;
    }

    public DemandType getDemandType() {
        return demandType;
    }

    public void setDemandType(DemandType demandType) {
        this.demandType = demandType;
    }
}
