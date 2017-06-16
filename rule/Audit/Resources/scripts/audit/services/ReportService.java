package audit.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.env.Environment;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scheduler.tasks.TempFileCleaner;
import com.exponentus.scripting._Session;
import com.exponentus.server.Server;
import com.exponentus.util.StringUtil;
import com.exponentus.util.TimeUtil;

import audit.dao.ObservationDAO;
import audit.dao.ReportDAO;
import audit.model.Observation;
import audit.model.Report;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JRStyle;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JRDesignStyle;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.fill.JRFileVirtualizer;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@Path("report")
public class ReportService extends RestProvider {
	private static final String JASPER_REPORT_TEMPLATE_EXTENSION = "jrxml";

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReports() {
		try {
			ReportDAO reportDAO = new ReportDAO(getSession());
			ViewPage<Report> vp = reportDAO.findViewPage();

			Outcome outcome = new Outcome();
			outcome.addPayload(vp);

			return Response.ok(outcome).build();
		} catch (DAOException | IllegalArgumentException e) {
			return responseException(e);
		}
	}

	@GET
	@Path("{reportId}/{reportName}.{reportType}")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response getReport(@PathParam("reportId") String reportId, @PathParam("reportName") String name,
			@PathParam("reportType") String type) {
		long start_time = System.currentTimeMillis();
		name = "simple";

		try {
			if (!"xlsx".equals(type) && !"pdf".equals(type)) {
				throw new IllegalArgumentException("Unsupported format: " + type + "; Supported format: pdf, xlsx");
			}

			HashMap<String, Object> parameters = new HashMap<>();

			String repPath = new File("").getAbsolutePath() + File.separator + "rule" + File.separator + getAppEnv().appName
					+ File.separator + "Resources" + File.separator + "report";

			JRFileVirtualizer virtualizer = new JRFileVirtualizer(10, Environment.trash);
			parameters.put(JRParameter.REPORT_VIRTUALIZER, virtualizer);
			_Session session = getSession();
			ObservationDAO dao = new ObservationDAO(session);
			List<Observation> result = dao.findAll().getResult();

			JRBeanCollectionDataSource dSource = new JRBeanCollectionDataSource(result);
			JasperPrint print = JasperFillManager.fillReport(
					JasperCompileManager.compileReportToFile(
							repPath + File.separator + "templates" + File.separator + name + "." + JASPER_REPORT_TEMPLATE_EXTENSION),
					parameters, dSource);

			String filePath = Environment.tmpDir + File.separator + StringUtil.generateRndAsText("qwertyuiopasdfghjklzxcvbnm", 10) + "."
					+ type;
			if (type.equals("pdf")) {
				JRStyle style = new JRDesignStyle();
				style.setPdfFontName(repPath + File.separator + "templates" + File.separator + "fonts" + File.separator + "tahoma.ttf");
				style.setPdfEncoding("Cp1251");
				style.setPdfEmbedded(true);
				print.setDefaultStyle(style);
				JRPdfExporter exporter = new JRPdfExporter();
				exporter.setExporterInput(new SimpleExporterInput(print));
				exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(filePath));
				exporter.exportReport();
			} else if (type.equals("xlsx")) {
				JRXlsxExporter exporter = new JRXlsxExporter();
				exporter.setExporterInput(new SimpleExporterInput(print));
				exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(filePath));
				exporter.exportReport();
			}
			Server.logger.info("Report \"" + name + "\" is ready, estimated time is " + TimeUtil.getTimeDiffInMilSec(start_time));
			TempFileCleaner.addFileToDelete(filePath);
			return getAttachment(filePath, reportId + type);
		} catch (JRException e) {
			logError(e);
			if (e.getCause() instanceof FileNotFoundException) {
				logError(e);
				return responseException(new FileNotFoundException(JASPER_REPORT_TEMPLATE_EXTENSION + " file has not been found"));
			}
			return responseException(e);
		} catch (DAOException | IllegalArgumentException e) {
			return responseException(e);
		}
	}
}
