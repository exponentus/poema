package workflow.model.embedded;

/**
 * @author Kayra created 07-04-2016
 */

import com.fasterxml.jackson.annotation.JsonIgnore;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.util.ApprovalStatusTypeConverter;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.List;

@Embeddable
public class Approval {

    @Convert(converter = ApprovalStatusTypeConverter.class)
    private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Block> blocks;

    private int version;

    public ApprovalStatusType getStatus() {
        return status;
    }

    public void setStatus(ApprovalStatusType status) {
        this.status = status;
    }

    public List<Block> getBlocks() {
        return blocks;
    }

    public void setBlocks(List<Block> blocks) {
        this.blocks = blocks;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @JsonIgnore
    public Block getProcessingBlock() {
        if (getStatus() == ApprovalStatusType.FINISHED) {
            return null;
        }

        if (blocks == null || blocks.isEmpty()) {
            return null;
        }

        return blocks.stream()
                .filter(block -> block.getStatus() == ApprovalStatusType.PROCESSING)
                .findFirst().orElse(null);
    }

    @JsonIgnore
    public Block getNextBlock() {
        if (getStatus() == ApprovalStatusType.FINISHED) {
            return null;
        }

        if (blocks == null || blocks.isEmpty()) {
            return null;
        }

        return blocks.stream()
                .sorted((b1, b2) -> (b1.getPosition() > b2.getPosition() ? 1 : -1))
                .filter(block -> {
                    if (getStatus() == ApprovalStatusType.DRAFT) {
                        return block.getStatus() == ApprovalStatusType.DRAFT;
                    } else {
                        return block.getStatus() == ApprovalStatusType.AWAITING;
                    }
                })
                .findFirst().orElse(null);
    }
}
