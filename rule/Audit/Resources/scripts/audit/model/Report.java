package audit.model;

import audit.init.AppConst;
import com.exponentus.common.model.ReportTemplate;
import com.fasterxml.jackson.annotation.JsonRootName;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

@JsonRootName("report")
@Entity
@Table(name = "audit__constr__reports")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Report extends ReportTemplate {

    @Override
    public String getURL() {
        return AppConst.BASE_URL + "reports/" + getIdentifier();
    }
}
