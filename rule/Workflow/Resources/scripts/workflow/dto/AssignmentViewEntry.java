package workflow.dto;

import java.util.List;
import java.util.UUID;

import com.exponentus.runtimeobj.IAppEntity;

import workflow.init.AppConst;

public class AssignmentViewEntry {

	public UUID id;
	public String kind = "assignment";

	public String appliedAuthor;
	public String body;
	// public ControlShort control;

	public List<IAppEntity<UUID>> responses;

	public AssignmentViewEntry(UUID id, String appliedAuthor, String body) {
		this.id = id;
		this.appliedAuthor = appliedAuthor;
		this.body = body;
		//this.control = new ControlShort(control);
	}

	public void setResponses(List<IAppEntity<UUID>> responses) {
		this.responses = responses;
	}

	public String getURL() {
		return AppConst.BASE_URL + "assignments/" + id;
	}
}
