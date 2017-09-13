package workflow.model.embedded;

import com.exponentus.dataengine.jpa.IAppEntity;
import com.exponentus.user.IUser;
import reference.model.constants.ApprovalSchemaType;
import staff.model.Employee;
import workflow.model.constants.ApprovalResultType;
import com.exponentus.common.model.constants.ApprovalStatusType;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface IApproval extends IAppEntity<UUID> {

	String getURL();

	void addReader(IUser user);

	void addReaders(List<Long> readers);

	ApprovalResultType getApprovalResult();

	void setApprovalSchema(ApprovalSchemaType schema);

	ApprovalSchemaType getApprovalSchema();

	void setApprovalStatus(ApprovalStatusType processing);

	ApprovalStatusType getApprovalStatus();

	List<Employee> getRecipientsAfterApproval();

	boolean isVersionsSupport();

	void setVersionsSupport(boolean vs);

	void setVersion(int version);

	int getVersion();

	void setBlocks(List<Block> blocks);

	List<Block> getBlocks();

	void setEditors(Set<Long> set);

	void setResult(ApprovalResultType accepted);



	void backupContent();

	@Deprecated
	boolean userCanDoDecision(Employee emp);

}
