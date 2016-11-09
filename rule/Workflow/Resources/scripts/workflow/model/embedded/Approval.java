package workflow.model.embedded;

/**
 *
 * @author Kayra created 07-04-2016
 */

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.exponentus.dataengine.jpa.SimpleAppEntity;

import workflow.model.constants.ApprovalStatusType;

@Entity
@Table(name = "approvals")
public class Approval extends SimpleAppEntity {
	
	private ApprovalStatusType status = ApprovalStatusType.UNKNOWN;
	
	@OneToMany()
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
