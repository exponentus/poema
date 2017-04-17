package workflow.dao;

import com.exponentus.dataengine.jpa.SimpleDAO;

import workflow.model.embedded.AssigneeEntry;

public class AssigneeEntryDAO extends SimpleDAO<AssigneeEntry> {

	public AssigneeEntryDAO() {
		super(AssigneeEntry.class);
	}

}
