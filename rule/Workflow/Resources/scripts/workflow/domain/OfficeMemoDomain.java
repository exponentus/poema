package workflow.domain;

import workflow.model.OfficeMemo;

public class OfficeMemoDomain {

    private OfficeMemo officeMemo;

    public OfficeMemoDomain(OfficeMemo officeMemo) {
        this.officeMemo = officeMemo;
    }

    public void startApproving() {

        /*
        UserDAO userDAO = new UserDAO(getSession());
            OfficeMemoDAO officeMemoDAO = new OfficeMemoDAO(getSession());
            OfficeMemo om = officeMemoDAO.findById(id);

            if (om.getApproval().getStatus() != ApprovalStatusType.DRAFT) {
                throw new IllegalStateException("status error: " + om.getApproval().getStatus());
            }

            Block block = om.getApproval().getNextBlock();

            if (block.getType() == ApprovalType.SERIAL) {
                Approver approver = block.getNextApprover();
                approver.setCurrent(true);
                om.addReader(userDAO.findById(approver.getApproverUser()));
            } else if (block.getType() == ApprovalType.PARALLEL) {
                om.addReaders(block.getApprovers().stream().map(Approver::getApproverUser).collect(Collectors.toList()));
            } else if (block.getType() == ApprovalType.SIGNING) {
                Approver approver = block.getNextApprover();
                approver.setCurrent(true);
                om.addReader(userDAO.findById(approver.getApproverUser()));
            } else {
                throw new IllegalStateException("Block type error: " + block.getType());
            }

            om.getApproval().setStatus(ApprovalStatusType.PROCESSING);
            block.setStatus(ApprovalStatusType.PROCESSING);

            om.getApproval().getBlocks().forEach(b -> {
                if (!block.getId().equals(b.getId())) {
                    b.setStatus(ApprovalStatusType.AWAITING);
                }
            });

            officeMemoDAO.update(om);

            outcome.setTitle("start_approving_ok");
            outcome.setMessage("start_approving_ok");
            outcome.addPayload(om);
         */
    }

    public void acceptApprovalBlock() {

    }

    public void declineApprovalBlock() {

    }
}
