package projects.task;

import administrator.dao.UserDAO;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.scripting._Session;
import com.exponentus.user.IUser;
import projects.model.Project;
import projects.model.Task;
import staff.dao.EmployeeDAO;
import staff.model.Employee;


public class TaskString {
    private String title;
    private String url;
    private String author;
    private String regNumber;
    private Project project;
    private String assignee;
    private String status;

    public TaskString(Task task, _Session session) throws DAOException {
        UserDAO userDAO = new UserDAO(session);
        IUser assigneeUser = userDAO.findById(task.getAssignee());
        this.title = task.getTitle();
        status = Environment.vocabulary.getWord(task.getStatus().name().toLowerCase(), EnvConst.getDefaultLang());
        this.regNumber = task.getRegNumber();
        this.url = task.getURL();
        IUser user = task.getAuthor();
        if (user != null) {
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            Employee emp = employeeDAO.findByUser(user);
            if (emp != null) {
                this.author = emp.getName();
            }else {
                this.author = user.getLogin();
            }
        }
        this.assignee = assigneeUser.getUserName();
        this.project = task.getProject();
    }

    public String getTitle() {
        return title;
    }

    public String getUrl() {
        return url;
    }

    public String getAuthor() {
        return author;
    }

    public String getRegNumber() {
        return regNumber;
    }

    public String getAssignee() {
        return assignee;
    }

    public Project getProject() {
        return project;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
