package workflow.model.embedded;

import java.util.List;
import java.util.Set;

import com.exponentus.user.IUser;

public interface IApproval {
	Approval getApproval();

	void setEditors(Set<Long> set);

	void addReader(IUser<Long> user);

	void addReaders(List<Long> readers);

}
