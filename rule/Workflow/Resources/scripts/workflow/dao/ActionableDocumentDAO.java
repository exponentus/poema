package workflow.dao;

import java.util.List;
import java.util.UUID;

import com.exponentus.common.dao.ViewEntryDAO;
import com.exponentus.common.model.IHierarchicalEntity;
import com.exponentus.common.model.ViewEntry;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.runtimeobj.IAppEntity;
import com.exponentus.scripting.SortParams;
import com.exponentus.scripting._Session;

import workflow.model.ActionableDocument;

public class ActionableDocumentDAO<T extends IAppEntity<UUID> & IHierarchicalEntity, K> extends DAO<T, K> {

	public ActionableDocumentDAO(Class<T> entityClass, _Session session) throws DAOException {
		super(entityClass, session);
	}

	public ViewPage<T> findAllWithDescendants(SortParams sortParams, int pageNum, int pageSize,
			List<UUID> expandedIds) {
		ViewPage<T> vp = findViewPage(sortParams, pageNum, pageSize);

		if (vp.getResult().isEmpty()) {
			return vp;
		}

		ViewEntryDAO<ActionableDocument, UUID> veDao = new ViewEntryDAO<ActionableDocument, UUID>(getSession());
		for (T parent : vp.getResult()) {
			List<ViewEntry> responses = veDao.findAllDescendants(parent.getId(), expandedIds);
			if (responses != null && responses.size() > 0) {
				parent.setResponsesCount((long) responses.size());
				parent.setResponsesAsViewEntry(responses);
			}
		}

		return vp;
	}

}
