package workflow.model.embedded;

import java.util.List;
import java.util.Set;

import com.exponentus.user.IUser;

import reference.model.constants.ApprovalSchemaType;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;

public interface IApproval {

	void setEditors(Set<Long> set);

	void addReader(IUser<Long> user);

	void addReaders(List<Long> readers);

	ApprovalStatusType getStatus();

	Block getNextBlock();

	void setStatus(ApprovalStatusType processing);

	Iterable<Block> getBlocks();

	void setResult(ApprovalResultType accepted);

	ApprovalSchemaType getSchema();

	Block getProcessingBlock();

}
