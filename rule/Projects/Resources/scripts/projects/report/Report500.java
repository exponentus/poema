package projects.report;

import com.exponentus.scripting._Session;
import dataexport.other.ICustomReport;

import java.util.Date;
import java.util.List;

/**
 * Created by kaira on 9/9/17.
 */
public class Report500 implements ICustomReport {
    private _Session session;

    @Override
    public void setSession(_Session session){
        this.session = session;
    }

    @Override
    public String getTemplateName() {
        return null;
    }

    @Override
    public String getAppCode() {
        return null;
    }

    public String getReportFileName(){
       return "";
    }

    @Override
    public List getReportData(Date from, Date until, String customParameter) {
        return null;
    }
}
