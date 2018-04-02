export type ApprovalType = 'UNKNOWN' | 'SERIAL' | 'PARALLEL' | 'SIGNING';

export type ApprovalStatusType = 'UNKNOWN' | 'DRAFT' | 'PENDING' | 'FINISHED' | 'AWAITING' | 'REJECTED' | 'REGISTERED';

export type ApprovalSchemaType = 'UNKNOWN' | 'REJECT_IF_NO' | 'IN_ANY_CASE_DECIDE_SIGNER';

export type ApprovalResultType = 'UNKNOWN' | 'ACCEPTED' | 'REJECTED' | 'PROJECT';

export type ApproverDecisionType = 'UNKNOWN' | 'YES' | 'NO' | 'SKIPPED';

export type ControlStatusType = 'UNKNOWN' | 'DRAFT' | 'OPEN' | 'PROCESSING' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
