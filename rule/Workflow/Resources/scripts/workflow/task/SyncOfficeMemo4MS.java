package workflow.task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.IDBConnectionPool;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jdbc.DatabaseUtil;
import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.forms.Import4MS;
import com.exponentus.rest.stream.TempFile;
import com.exponentus.scheduler.tasks.TempFileCleaner;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;
import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import administrator.dao.UserDAO;
import administrator.model.User;
import staff.dao.EmployeeDAO;
import staff.model.Employee;
import workflow.dao.OfficeMemoDAO;
import workflow.model.OfficeMemo;
import workflow.model.constants.ApprovalStatusType;
import workflow.model.embedded.Block;

@Command(name = "import_sz_4ms")
public class SyncOfficeMemo4MS extends Import4MS {
	private static final String TMP_FIELD_NAME = "incoming_tmp_file";

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, OfficeMemo> entities = new HashMap<>();
		IDBConnectionPool dbPool = getConnectionPool();
		Connection conn = dbPool.getConnection();
		try {
			OfficeMemoDAO iDao = new OfficeMemoDAO(ses);
			EmployeeDAO eDao = new EmployeeDAO(ses);
			UserDAO uDao = new UserDAO(ses);
			Map<Integer, String> vidCollation = vidCollationMapInit();
			Map<Integer, ApprovalStatusType> coordStatusCollation = coordStatusCollationMapInit();
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
			if (dummyUser != null) {
				conn.setAutoCommit(false);
				Statement s = conn.createStatement();
				String sql = "SELECT * FROM maindocs as m WHERE form='officememoprj';";
				ResultSet rs = s.executeQuery(sql);
				while (rs.next()) {
					int docId = rs.getInt("docid");
					String extKey = docId + "maindocs";
					OfficeMemo sz = iDao.findByExtKey(extKey);
					if (sz == null) {
						sz = new OfficeMemo();
					}
					sz.setRegNumber(getStringValue(conn, docId, "vn"));
					sz.setAppliedRegDate(getDateValue(conn, docId, "dvn"));
					IUser<Long> author = uDao.findByLogin(getStringValue(conn, docId, "author"));
					if (author != null) {
						sz.setAuthor(author);
					} else {
						sz.setAuthor(dummyUser);
					}

					String coordStatus = getStringValue(conn, docId, "coordination");
					ApprovalStatusType status = coordStatusCollation.get(Integer.parseInt(coordStatus));
					if (status == null) {
						logger.error("wrong reference ext value \"" + coordStatus + "\" (coordination)");
						status = ApprovalStatusType.UNKNOWN;
					}
					sz.setStatus(status);

					String recipient = getStringValue(conn, docId, "recipient");
					IUser<Long> r = uDao.findByLogin(recipient);
					if (r != null) {
						Employee e = eDao.findByUserId(r.getId());
						if (e != null) {
							sz.setRecipient(e);
						} else {
							logger.error("wrong ext value \"" + r + "\" (user id)");
						}
					} else {
						logger.error("wrong ext value \"" + recipient + "\" (login)");
					}

					sz.setTitle(StringUtils.abbreviate(getStringValue(conn, docId, "briefcontent"), 140));
					sz.setBody("#" + getStringValue(conn, docId, "corrstring") + "#" + getStringValue(conn, docId, "briefcontent"));

					_FormAttachments files = new _FormAttachments(ses);
					Map<String, String> blobs = getBlobValue(ses, conn, docId);
					for (Entry<String, String> entry : blobs.entrySet()) {
						String filePath = entry.getValue();
						files.addFile(new File(entry.getValue()), filePath, TMP_FIELD_NAME);
						TempFileCleaner.addFileToDelete(filePath);
					}

					List<Attachment> attachments = new ArrayList<>();
					for (TempFile tmpFile : files.getFiles(TMP_FIELD_NAME)) {
						Attachment a = (Attachment) tmpFile.convertTo(new Attachment());
						attachments.add(a);
					}
					sz.setAttachments(attachments);

					normalizeACL(uDao, docId, sz, conn);
					entities.put(extKey, sz);
					logger.info(sz + " has been added");
				}
				s.close();
				conn.commit();
				logger.info("has been found " + entities.size() + " records");
				for (Entry<String, OfficeMemo> ee : entities.entrySet()) {
					save(iDao, ee.getValue(), ee.getKey());
				}
			} else {
				logger.error("dummy user did not defined");
			}
		} catch (SQLException e) {
			DatabaseUtil.errorPrint(e);
		} catch (DAOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			dbPool.returnConnection(conn);
		}
		logger.info("done...");
	}

	private String getStringValue(Connection conn, int docId, String fieldName) {
		try {
			Statement s = conn.createStatement();
			String sql = "SELECT value FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '" + fieldName + "';";
			ResultSet rs = s.executeQuery(sql);
			if (rs.next()) {
				return rs.getString(1);
			} else {
				return "";
			}
		} catch (SQLException e) {
			DatabaseUtil.errorPrint(e);
			return "";
		}
	}

	private int getIntValue(Connection conn, int docId, String fieldName) throws SQLException {
		Statement s = conn.createStatement();
		String sql = "SELECT valueasnumber FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '" + fieldName + "';";
		ResultSet rs = s.executeQuery(sql);
		if (rs.next()) {
			return rs.getInt(1);
		} else {
			return 0;
		}
	}

	private Date getDateValue(Connection conn, int docId, String fieldName) throws SQLException {
		Statement s = conn.createStatement();
		try {
			String sql = "SELECT valueasdate FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '" + fieldName + "';";
			ResultSet rs = s.executeQuery(sql);
			if (rs.next()) {
				return rs.getDate(1);
			} else {
				return null;
			}
		} catch (SQLException e) {
			DatabaseUtil.errorPrint(e);
			return null;
		}
	}

	private Map<String, String> getBlobValue(_Session ses, Connection conn, int docId) throws SQLException {
		Map<String, String> paths = new HashMap<String, String>();
		Statement s = conn.createStatement();
		String sql = "SELECT * FROM custom_blobs_maindocs as cf WHERE cf.docid = " + docId + ";";
		// LargeObjectManager lobj = ((org.postgresql.PGConnection)
		// ((DelegatingConnection) conn).getInnermostDelegate())
		// .getLargeObjectAPI();

		ResultSet rs = s.executeQuery(sql);
		while (rs.next()) {
			String originalName = rs.getString("originalname");
			String path = ses.getTmpDir().getAbsolutePath() + File.separator + originalName;
			File file = new File(path);

			try {
				FileOutputStream out = new FileOutputStream(file);
				byte[] fileBytes = rs.getBytes("value");
				if (fileBytes != null) {
					out.write(fileBytes);
					paths.put(originalName, path);
				}
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return paths;

	}

	private int getGloassaryValue(Connection conn, int docId, String fieldName) throws SQLException {
		Statement s = conn.createStatement();
		String sql = "SELECT valueasglossary FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '" + fieldName + "';";
		ResultSet rs = s.executeQuery(sql);
		if (rs.next()) {
			return rs.getInt(1);
		} else {
			return 0;
		}
	}

	private Map<Integer, String> vidCollationMapInit() {
		Map<Integer, String> collation = new HashMap<>();
		collation.put(110, "Letter");
		collation.put(111, "Task");
		return collation;

	}

	// int STATUS_DRAFT = 351;
	// int STATUS_COORDINTING = 352;
	// int STATUS_REJECTED = 354;
	// int STATUS_SIGNING = 355;
	// int STATUS_SIGNED = 356;
	// int STATUS_NEWVERSION = 360;

	private Map<Integer, ApprovalStatusType> coordStatusCollationMapInit() {
		Map<Integer, ApprovalStatusType> depTypeCollation = new HashMap<>();
		depTypeCollation.put(350, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(351, ApprovalStatusType.DRAFT);
		depTypeCollation.put(352, ApprovalStatusType.PENDING);
		depTypeCollation.put(353, ApprovalStatusType.FINISHED);
		depTypeCollation.put(354, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(355, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(356, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(358, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(359, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(360, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(361, ApprovalStatusType.UNKNOWN);
		depTypeCollation.put(362, ApprovalStatusType.UNKNOWN);

		return depTypeCollation;

	}

	private List<Block> parse() {
		List<Block> blocks = new ArrayList<Block>();
		String file = "rule/Workflow/Resources/scripts/workflow/task/coord_example.xml";
		FileInputStream fisTargetFile;
		try {
			fisTargetFile = new FileInputStream(new File(file));
			String xml = IOUtils.toString(fisTargetFile, "UTF-8");
			JacksonXmlModule module = new JacksonXmlModule();
			module.setDefaultUseWrapper(false);
			XmlMapper mapper = new XmlMapper(module);
			FormsBlocks openCredentials = mapper.readValue(xml, FormsBlocks.class);
			System.out.println(openCredentials);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return blocks;
	}

	@JacksonXmlRootElement(localName = "class")
	class FormsBlocks {

		@JacksonXmlProperty(localName = "block")
		@JacksonXmlElementWrapper(useWrapping = false)
		private FormsBlock[] blocks;

		// getters, setters, toString
	}

	class FormsBlock {

		@JacksonXmlProperty(isAttribute = true)
		private String id;

		@JacksonXmlProperty(isAttribute = true)
		private String type;

		private String status;

		// @JacksonXmlProperty(localName = "client_token")
		// private String clientToken;

		// @JacksonXmlProperty(localName = "client_secret")
		// private String clientSecret;

		// getters, setters, toString
	}

	public static void main(String[] args) {
		new SyncOfficeMemo4MS().parse();
	}
}
