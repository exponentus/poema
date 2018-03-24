import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { cloneObject } from '@nb/core';
import { Approver, Block, Employee } from '../models';

@Injectable()
export class ApprovalService {

    approverCanBeRemoved(block: Block, approver: Approver): boolean {
        if (this.approverHasDecision(approver)) {
            return false;
        }

        if (block.type === 'SIGNING' && block.approvers && block.approvers.length <= 1) {
            return false;
        }

        return true;
    }

    approverHasDecision(approver: Approver): boolean {
        return approver.decisionType === 'YES' || approver.decisionType === 'NO' || approver.decisionType === 'SKIPPED';
    }

    approverIsCurrent(block: Block, approver: Approver) {
        return !this.approverHasDecision(approver) && (approver.current || (block.status === 'PENDING' && block.type === 'PARALLEL'));
    }

    addApprover(block: Block, emp: Employee) {
        if (!emp) {
            return;
        }

        if (block.type === 'SIGNING') {
            let m = new Approver();
            m.employee = emp;
            block.approvers = [m];
        } else {
            if (!block.approvers.find(it => it.employee.id === emp.id)) {
                let m = new Approver();
                m.employee = emp;
                block.approvers.push(m);
            }
        }
    }

    removeApprover(block: Block, approver: Approver) {
        block.approvers = block.approvers.filter(it => {
            if (it.isNew) {
                return it.tid !== approver.tid;
            } else {
                return it.id !== approver.id;
            }
        });
    }

    //
    cloneBlock(block: Block) {
        return block ? cloneObject(block) : null;
    }

    isValidBlock(block: Block) {
        if (block.type === 'SIGNING') {
            if (block.approvers && block.approvers.length > 1) {
                return false;
            }
        }

        return block.approvers && block.approvers.length;
    }

    saveBlock(blocks: Block[], block: Block): Block[] {
        if (block.id || block.tid) {
            blocks = blocks.map(itblock => {
                if (itblock.isNew) {
                    return block.tid === itblock.tid ? block : itblock;
                } else {
                    return block.id === itblock.id ? block : itblock;
                }
            });
        } else {
            block.tid = Date.now().toString();
            block.sort = blocks.length + 1;
            blocks.push(block);
        }

        return blocks;
    }

    deleteBlock(blocks: Block[], block: Block): Block[] {
        if (block.isNew) {
            blocks = blocks.filter(itblock => {
                if (itblock.isNew) {
                    return itblock.tid !== block.tid;
                } else {
                    return itblock.id !== block.id;
                }
            });
        } else {
            blocks = blocks.filter(itblock => {
                if (itblock.isNew) {
                    if (itblock.tid !== block.tid) {
                        //itblock.deleted = true;
                        return true;
                    }
                } else {
                    if (itblock.id !== block.id) {
                        // itblock.deleted = true;
                        return true;
                    }
                }
            });
        }

        blocks.map((it, index) => {
            it.sort = index + 1;
        });

        return blocks;
    }

    deleteBlocksByIds(blocks: Block[], blockIds: string[]): Block[] {
        let idKey;
        let _blocks = blocks.filter(it => {
            idKey = (it.isNew ? 'tid' : 'id');
            return blockIds.indexOf(it[idKey]) == -1;
        });

        _blocks.map((it, index) => {
            it.sort = index + 1;
        });

        return _blocks;
    }
}
