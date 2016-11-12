package workflow.model.embedded;

/**
 *
 * @author Kayra created 07-04-2016
 */

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.persistence.OneToMany;

import workflow.model.constants.ApprovalStatusType;
import workflow.model.util.ApprovalStatusTypeConverter;

@Embeddable
public class Approval {
	
	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Block> blocks;
	
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
	
}
