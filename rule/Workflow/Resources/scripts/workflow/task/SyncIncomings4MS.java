package workflow.task;

import java.io.File;
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

import org.apache.commons.lang3.StringUtils;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.DatabaseUtil;
import com.exponentus.dataengine.IDBConnectionPool;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.TempFile;
import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.forms.Import4MS;
import com.exponentus.localization.constants.LanguageCode;
import com.exponentus.scheduler.tasks.TempFileCleaner;
import com.exponentus.scripting._FormAttachments;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import reference.model.DocumentLanguage;
import reference.model.DocumentSubject;
import reference.model.DocumentType;
import staff.dao.EmployeeDAO;
import staff.dao.OrganizationDAO;
import staff.model.Employee;
import staff.model.Organization;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

@Command(name = "import_in_4ms")
public class SyncIncomings4MS extends Import4MS {
	private static final String TMP_FIELD_NAME = "incoming_tmp_file";
	
	@Override
	public void doTask(AppEnv appEnv, _Session ses) {
		Map<String, Incoming> entities = new HashMap<>();
		IDBConnectionPool dbPool = getConnectionPool();
		Connection conn = dbPool.getConnection();
		try {
			OrganizationDAO oDao = new OrganizationDAO(ses);
			IncomingDAO iDao = new IncomingDAO(ses);
			DocumentTypeDAO dtDao = new DocumentTypeDAO(ses);
			DocumentLanguageDAO dlDao = new DocumentLanguageDAO(ses);
			DocumentSubjectDAO dsDao = new DocumentSubjectDAO(ses);
			EmployeeDAO eDao = new EmployeeDAO(ses);
			UserDAO uDao = new UserDAO(ses);
			Map<Integer, String> vidCollation = vidCollationMapInit();
			Map<Integer, LanguageCode> docLangCollation = langCollationMapInit();
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
			if (dummyUser != null) {
				conn.setAutoCommit(false);
				Statement s = conn.createStatement();
				String sql = "SELECT * FROM maindocs as m WHERE form='IN';";
				ResultSet rs = s.executeQuery(sql);
				while (rs.next()) {
					int docId = rs.getInt("docid");
					String extKey = docId + "maindocs";
					Incoming inc = iDao.findByExtKey(extKey);
					if (inc == null) {
						inc = new Incoming();
					}
					inc.setRegNumber(getStringValue(conn, docId, "vn"));
					inc.setAppliedRegDate(getDateValue(conn, docId, "dvn"));
					IUser<Long> author = uDao.findByLogin(getStringValue(conn, docId, "author"));
					if (author != null) {
						inc.setAuthor(author);
					} else {
						inc.setAuthor(dummyUser);
					}
					int code = getGloassaryValue(conn, docId, "vid");
					String vidName = vidCollation.get(code);
					DocumentType docType = dtDao.findByName(vidName);
					if (docType != null) {
						inc.setDocType(docType);
					} else {
						logger.errorLogEntry("reference ext value has not been found \"" + vidName + "\" (vid)");
					}
					
					String har = ConvertorEnvConst.GAG_KEY;
					DocumentSubject docSubj = dsDao.findByName(har);
					if (docSubj != null) {
						inc.setDocSubject(docSubj);
					} else {
						logger.errorLogEntry("reference ext value has not been found \"" + har + "\" (har)");
					}
					
					int docLangVal = getIntValue(conn, docId, "lang");
					LanguageCode intRefKey = docLangCollation.get(docLangVal);
					if (intRefKey == null) {
						logger.errorLogEntry("wrong reference ext value \"" + docLangVal + "\" (lang)");
						intRefKey = LanguageCode.UNKNOWN;
					}
					DocumentLanguage docLang = dlDao.findByCode(intRefKey);
					if (docLang != null) {
						inc.setDocLanguage(docLang);
					}
					inc.setSenderAppliedRegDate(getDateValue(conn, docId, "din"));
					inc.setSenderRegNumber(getStringValue(conn, docId, "in"));
					int corrId = getGloassaryValue(conn, docId, "corr");
					if (corrId != 0) {
						Organization org = oDao.findByExtKey(Integer.toString(corrId));
						if (org != null) {
							inc.setSender(org);
						}
					}
					
					String recipient = getStringValue(conn, docId, "recipients");
					IUser<Long> r = uDao.findByLogin(recipient);
					if (r != null) {
						Employee e = eDao.findByUserId(r.getId());
						if (e != null) {
							inc.setAddressee(e);
						} else {
							logger.errorLogEntry("wrong ext value \"" + r + "\" (user id)");
						}
					} else {
						logger.errorLogEntry("wrong ext value \"" + recipient + "\" (login)");
					}

					inc.setTitle(StringUtils.abbreviate(getStringValue(conn, docId, "briefcontent"), 140));
					inc.setBody("#" + getStringValue(conn, docId, "corrstring") + "#"
							+ getStringValue(conn, docId, "briefcontent"));
					
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
					inc.setAttachments(attachments);
					
					normalizeACL(uDao, docId, inc, conn);
					entities.put(extKey, inc);
					logger.infoLogEntry(inc + " has been added");
				}
				s.close();
				conn.commit();
				logger.infoLogEntry("has been found " + entities.size() + " records");
				for (Entry<String, Incoming> ee : entities.entrySet()) {
					save(iDao, ee.getValue(), ee.getKey());
				}
			} else {
				logger.errorLogEntry("dummy user did not defined");
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
		logger.infoLogEntry("done...");
	}

	private String getStringValue(Connection conn, int docId, String fieldName) {
		try {
			Statement s = conn.createStatement();
			String sql = "SELECT value FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '"
					+ fieldName + "';";
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
		String sql = "SELECT valueasnumber FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '"
				+ fieldName + "';";
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
			String sql = "SELECT valueasdate FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '"
					+ fieldName + "';";
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
		//LargeObjectManager lobj = ((org.postgresql.PGConnection) ((DelegatingConnection) conn).getInnermostDelegate())
		//		.getLargeObjectAPI();
		
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
		String sql = "SELECT valueasglossary FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '"
				+ fieldName + "';";
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

	private Map<Integer, LanguageCode> langCollationMapInit() {
		Map<Integer, LanguageCode> depTypeCollation = new HashMap<>();
		depTypeCollation.put(1, LanguageCode.RUS);
		depTypeCollation.put(2, LanguageCode.ENG);
		depTypeCollation.put(3, LanguageCode.KAZ);
		depTypeCollation.put(null, LanguageCode.UNKNOWN);
		depTypeCollation.put(0, LanguageCode.RUS);
		return depTypeCollation;
		
	}
}
