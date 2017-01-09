package workflow.task;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.DatabaseUtil;
import com.exponentus.dataengine.IDBConnectionPool;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.legacy.ConvertorEnvConst;
import com.exponentus.legacy.forms.Import4MS;
import com.exponentus.scripting._Session;
import com.exponentus.scriptprocessor.tasks.Command;
import com.exponentus.user.IUser;

import administrator.dao.UserDAO;
import administrator.model.User;
import reference.dao.DocumentLanguageDAO;
import reference.dao.DocumentSubjectDAO;
import reference.dao.DocumentTypeDAO;
import staff.dao.OrganizationDAO;
import workflow.dao.IncomingDAO;
import workflow.model.Incoming;

@Command(name = "import_in_4ms")
public class SyncIncomings4MS extends Import4MS {
	
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
			UserDAO uDao = new UserDAO(ses);
			User dummyUser = (User) uDao.findByLogin(ConvertorEnvConst.DUMMY_USER);
			
			conn.setAutoCommit(false);
			Statement s = conn.createStatement();
			String sql = "SELECT * FROM maindocs as m, custom_fields as cf WHERE form='IN' and m.docid = cf.docid;";
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				int docId = rs.getInt("docid");
				String extKey = docId + "maindocs";
				Incoming inc = iDao.findByExtKey(extKey);
				if (inc == null) {
					inc = new Incoming();
				}
				inc.setRegNumber(getStringValue(conn, docId, "form"));
				inc.setAppliedRegDate(getDateValue(conn, docId, "dvn"));
				IUser<Long> author = uDao.findByLogin(getStringValue(conn, docId, "author"));
				if (author != null) {
					inc.setAuthor(author);
				} else {
					inc.setAuthor(dummyUser);
				}
				entities.put(extKey, inc);
			}
			s.close();
			conn.commit();

		} catch (SQLException e) {
			DatabaseUtil.errorPrint(e);
		} catch (DAOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			dbPool.returnConnection(conn);
		}
		logger.infoLogEntry("done...");
	}

	private String getStringValue(Connection conn, int docId, String fieldName) throws SQLException {
		Statement s = conn.createStatement();
		String sql = "SELECT value FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '" + fieldName
				+ "';";
		ResultSet rs = s.executeQuery(sql);
		if (rs.next()) {
			return rs.getString(fieldName);
		} else {
			return "";
		}
	}

	private Date getDateValue(Connection conn, int docId, String fieldName) throws SQLException {
		Statement s = conn.createStatement();
		String sql = "SELECT valueasdate FROM custom_fields as cf WHERE cf.docid = " + docId + " AND cf.name = '"
				+ fieldName + "';";
		ResultSet rs = s.executeQuery(sql);
		if (rs.next()) {
			return rs.getDate(fieldName);
		} else {
			return null;
		}
	}
}
