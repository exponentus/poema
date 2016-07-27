package projects.page;

import com.exponentus.scripting._POJOListWrapper;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;
import staff.dao.EmployeeDAO;
import staff.model.Employee;

import java.util.List;

public class Users extends _DoPage {

    @Override
    public void doGET(_Session session, _WebFormData formData) {
        EmployeeDAO empDao = new EmployeeDAO(session);
        List<Employee> list = empDao.findAll(0, 0);
        addContent(new _POJOListWrapper(list, session));
    }
}
