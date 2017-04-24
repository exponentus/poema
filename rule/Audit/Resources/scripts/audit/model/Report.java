package audit.model;

import audit.init.AppConst;
import com.exponentus.common.model.ReportTemplate;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.*;

@JsonRootName("report")
@Entity
@Table(name = "audit__constr__reports")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@NamedQuery(name = "Report.findAll", query = "SELECT m FROM Report AS m ORDER BY m.regDate")
public class Report extends ReportTemplate {

    @Override
    public String getURL() {
        return AppConst.BASE_URL + "reports/" + getIdentifier();
    }
}
