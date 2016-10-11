package projects.form;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.joda.time.LocalDate;

import com.exponentus.common.model.ACL;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.rest.incomingpojo.form.FormRequest;
import com.exponentus.rest.outgoingpojo.IPayload;
import com.exponentus.rest.runtime.AbstractRequestHandler;
import com.exponentus.rest.runtime.RequestHandler;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import com.exponentus.user.IUser;
import com.exponentus.webserver.servlet.UploadedFile;

import projects.dao.ProjectDAO;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.model.Project;
import projects.model.Task;
import projects.model.constants.TaskStatusType;
import reference.dao.TaskTypeDAO;

@RequestHandler("task-form")
public class TaskForm extends AbstractRequestHandler<FormRequest> {

	@Override
	public void doRequest(_Session ses, FormRequest fr) {
		IUser<Long> user = ses.getUser();
		Task task = fr.getEntity(Task.class);

		if (!task.isNew()) {
			TaskDAO taskDAO = new TaskDAO(ses);
			task = taskDAO.findById(task.getId());

			/*
			 * if (formData.containsField("attachment")) {
			 * doGetAttachment(session, formData, task); return; }
			 */

			if (task.getParent() != null) {
				payloadMap.put("parentTask", task.getParent());
			}
			// addContent(task.getAttachments());
			addContent(new ACL(task));

			TaskFilter taskFilter = new TaskFilter();
			taskFilter.setParentTask(task);

			ViewPage<Task> vp = taskDAO.findAllWithChildren(taskFilter, _SortParams.asc("regDate"), 0, 0, null);
			task.setChildren(new LinkedList<>(vp.getResult()));
		} else {
			task = new Task();
			task.setAuthor(user);
			TaskTypeDAO tDao = new TaskTypeDAO(ses);
			task.setTaskType(tDao.findByName("Programming"));
			task.setStatus(TaskStatusType.OPEN);

			String projectId = task.getProjectId();
			if (!projectId.isEmpty()) {
				ProjectDAO projectDAO = new ProjectDAO(ses);
				Project project = projectDAO.findById(projectId);
				task.setProject(project);
				task.setObservers(project.getObservers());
			}

			String parentTaskId = task.getParentTaskId();
			if (!parentTaskId.isEmpty()) {
				TaskDAO taskDAO = new TaskDAO(ses);
				Task parentTask = taskDAO.findById(parentTaskId);
				task.setParent(parentTask);
				task.setTitle(parentTask.getTitle());
				task.setPriority(parentTask.getPriority());
				task.setStartDate(parentTask.getStartDate());
				task.setDueDate(parentTask.getDueDate());
				task.setTags(parentTask.getTags());
				task.setObservers(parentTask.getObservers());
				addContent("parentTask", parentTask);
			} else {
				task.setStartDate(new Date());
				task.setDueDate(new LocalDate(task.getStartDate()).plusDays(10).toDate());
			}

			String fsId = fr.getFsid();

			List<String> formFiles;
			Object obj = ses.getAttribute(fsId);
			if (obj == null) {
				formFiles = new ArrayList<>();
			} else {
				_FormAttachments fAtts = (_FormAttachments) obj;
				formFiles = fAtts.getFiles().stream().map(TempFile::getRealFileName).collect(Collectors.toList());
			}

			List<IPayload> filesToPublish = new ArrayList<>();

			for (String fn : formFiles) {
				UploadedFile uf = (UploadedFile) ses.getAttribute(fsId + "_file" + fn);
				if (uf == null) {
					uf = new UploadedFile();
					uf.setName(fn);
					ses.setAttribute(fsId + "_file" + fn, uf);
				}
				filesToPublish.add(uf);
			}
			addContent(filesToPublish);
		}

		addContent(task);
		// addContent(getActionBar(ses, task));

	}

}
