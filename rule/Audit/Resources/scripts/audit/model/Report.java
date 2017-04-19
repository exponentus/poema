package audit.model;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.exponentus.common.model.ReportTemplate;
import com.fasterxml.jackson.annotation.JsonRootName;

@JsonRootName("report")
@Entity
@Table(name = "audit_construction__reports")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@NamedQuery(name = "Report.findAll", query = "SELECT m FROM Report AS m ORDER BY m.regDate")
public class Report extends ReportTemplate {

}
