package workflow.model;

import com.exponentus.common.model.EmbeddedSecureHierarchicalEntity;
import com.exponentus.common.model.converter.ListOfTextConverter;
import com.exponentus.dataengine.jpadatabase.ftengine.FTSearchable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import reference.model.constants.ApprovalSchemaType;
import reference.model.constants.ApprovalType;
import reference.model.constants.converter.ApprovalSchemaTypeConverter;
import staff.model.Employee;
import workflow.domain.ApprovalLifecycle;
import workflow.model.constants.ApprovalResultType;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.constants.DecisionType;
import workflow.model.constants.converter.ApprovalResultTypeConverter;
import workflow.model.constants.converter.ApprovalStatusTypeConverter;
import workflow.model.embedded.Approver;
import workflow.model.embedded.Block;
import workflow.model.embedded.IApproval;
import workflow.model.embedded.IControlled;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@JsonRootName("actionableDocument")
@Entity
@Table(name = "wf__actionable_documents")
public class ActionableDocument extends EmbeddedSecureHierarchicalEntity implements IApproval, IControlled {

	@Convert(converter = ApprovalStatusTypeConverter.class)
	private ApprovalStatusType status = ApprovalStatusType.DRAFT;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "status_time")
	private Date statusTime;

	@Convert(converter = ApprovalSchemaTypeConverter.class)
	private ApprovalSchemaType schema = ApprovalSchemaType.REJECT_IF_NO;

	@Convert(converter = ApprovalResultTypeConverter.class)
	private ApprovalResultType result = ApprovalResultType.PROJECT;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@OrderBy("sort")
	private List<Block> blocks = new ArrayList<>();

	private int version = 1;

	@Column(name = "ver_support")
	private boolean versionsSupport;

	@Column(name = "is_invariable")
	private boolean routeIsInvariable;

	//@JsonManagedReference(value = "primary-assignment")
	@JsonIgnore
	@OneToMany(mappedBy="primary")
	private List<Assignment> assignments;

	@FTSearchable
	@Column(columnDefinition = "TEXT")
	private String body;

	@Convert(converter = ListOfTextConverter.class)
	@Column(name = "obsolete_body", columnDefinition = "jsonb")
	private List<String> obsoleteBody = new ArrayList<String>();

	@Override
	public List<Assignment> getAssignments() {
		return assignments;
	}

	@Override
	public void setAssignments(List<Assignment> assignments) {
		this.assignments = assignments;
	}

	@Override
	public List<Block> getBlocks() {
		return blocks;
	}

	@Override
	public ApprovalResultType getApprovalResult() {
		return result;
	}

	@Override
	public ApprovalSchemaType getApprovalSchema() {
		return schema;
	}

	@Override
	public ApprovalStatusType getApprovalStatus() {
		return status;
	}

	@Override
	public int getVersion() {
		return version;
	}

	@Override
	public void setBlocks(List<Block> blocks) {
		this.blocks = blocks;
	}

	@Override
	public void setResult(ApprovalResultType result) {
		this.result = result;
	}

	@Override
	public void setApprovalSchema(ApprovalSchemaType schema) {
		this.schema = schema;
	}

	@Override
	public void setApprovalStatus(ApprovalStatusType status) {
		this.status = status;
		statusTime = new Date();
	}

	@Override
	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	@Deprecated
	public boolean userCanDoDecision(Employee emp) {
		if (getApprovalStatus() == ApprovalStatusType.PENDING) {
			Block block = ApprovalLifecycle.getProcessingBlock(this);
			if (block != null) {
				if (block.getType() == ApprovalType.SERIAL || block.getType() == ApprovalType.SIGNING) {
					Approver approver = block.getCurrentApprover();
					if (approver != null) {
						return block.getCurrentApprover().getEmployee().getId().equals(emp.getId());
					}
				} else if (block.getType() == ApprovalType.PARALLEL) {
					return block.getApprovers().stream()
							.filter(it -> it.getEmployee().getId().equals(emp.getId()) && it.getDecisionType() == DecisionType.UNKNOWN)
							.count() > 0;
				}
			}
		}

		return false;
	}

	@Override
	public boolean isVersionsSupport() {
		return versionsSupport;
	}

	@Override
	public void setVersionsSupport(boolean versionsSupport) {
		this.versionsSupport = versionsSupport;
	}

	public boolean isRouteIsInvariable() {
		return routeIsInvariable;
	}

	public void setRouteIsInvariable(boolean routeIsInvariable) {
		this.routeIsInvariable = routeIsInvariable;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public List<String> getObsoleteBody() {
		return obsoleteBody;
	}

	public void setObsoleteBody(List<String> obsoleteBody) {
		this.obsoleteBody = obsoleteBody;
	}

	@Override
	public void backupContent() {
		obsoleteBody.add(body);
		body = "";
	}

	@Override
	public List<Employee> getRecipientsAfterApproval() {
		return null;

	}
}
