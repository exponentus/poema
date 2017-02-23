package workflow.domain;

public interface IOfficeMemoDomain {
    void startApproving();

    void acceptApprovalBlock();

    void declineApprovalBlock();
}
