package projects.task;

import administrator.dao.UserDAO;
import administrator.model.User;
import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.constants.StatusType;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.env.EnvConst;
import com.exponentus.env.Environment;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.messaging.MessagingType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.constants.Trigger;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.server.Server;
import com.exponentus.util.TimeUtil;
import projects.dao.TaskDAO;
import projects.dao.filter.TaskFilter;
import projects.init.ModuleConst;
import projects.model.Task;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

//run task prj_all_active_tasks_reminder
@Command(name = ModuleConst.CODE + "_all_active_tasks_reminder", trigger = Trigger.EVERY_NIGHT)
public class AllActiveTasksReminder extends Do {
    private TaskDAO tDao;
    private int processing, open;


    @Override
    public void doTask(AppEnv appEnv, _Session session) {
        try {
            tDao = new TaskDAO(session);
            List<Task> tasks = tDao.findAllByTaskFilter(new TaskFilter().setStatus(StatusType.PROCESSING));
            processing = tasks.size();
            List<Task> openTasks = tDao.findAllByTaskFilter(new TaskFilter().setStatus(StatusType.OPEN));
            open = openTasks.size();
            tasks.addAll(openTasks);
            if (tasks.size() > 0) {
                processRemind(tasks, session);
            }
            logger.info("done...");
        } catch (DAOException e) {
            Server.logger.exception(e);
        }
    }

    private void processRemind(List<Task> taskList, _Session session) {
        sendNotify(session, taskList);
    }

    private void sendNotify(_Session session, List<Task> tasks) {
        try {
            EmployeeDAO employeeDAO = new EmployeeDAO(session);
            List<Employee> emps =  employeeDAO.findByRole(ModuleConst.CODE + "_task_moderator").getResult();
            List<String> recipients = emps.stream().map((s) -> s.getUser().getEmail()).collect(Collectors.toList());
            if (tasks.size() > 0) {
                UserDAO userDAO = new UserDAO(session);
                List<User> allUsers = userDAO.findAll();
                int tasksCount = 0;
                List<TaskString> tasksFtu = new ArrayList<>();
                Memo memo = new Memo();
                for (User user : allUsers) {
                    for (Task task : tasks) {
                        if (user.getId().equals(task.getAssignee())) {
                            tasksFtu.add(new TaskString(task, session));
                            tasksCount++;
                        }
                    }
                }
                if (tasksCount > 0) {
                    memo.addVar("currentDate", TimeUtil.dateToStringSilently(new Date()));
                    memo.addVar("open", open);
                    memo.addVar("processing", processing);
                    memo.addVar("tasks", tasksFtu);
                    memo.addVar("url", Environment.getFullHostName() + "/" + EnvConst.WORKSPACE_MODULE_NAME + "/#");
                    LanguageCode userLang = EnvConst.getDefaultLang();
                    memo.addVar("lang", "&lang=" + userLang);
                    String body = getCurrentAppEnv().templates.getTemplate(MessagingType.EMAIL, "all_active_tasks", userLang);
                    MailAgent ma = new MailAgent("all_active_tasks");
                  //  recipients.clear();
                  //  recipients.add("dev@semantyca.com");
                    ma.sendMessage(recipients, getCurrentAppEnv().getVocabulary().getWord("notify_about_tasks", userLang),
                            memo.getBody(body));
                }
            }
        } catch (Exception e) {
            logger.exception(e);
        }
    }
}
