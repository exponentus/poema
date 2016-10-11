package projects.dao;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.RuntimeObjUtil;
import com.exponentus.dataengine.jpa.DAO;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.exponentus.dataengine.jpa.ViewPage;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._SortParams;
import projects.model.Project;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//import com.exponentus.dataengine.jpa.SecureAppEntity;

// -javaagent:/home/IdeaProjects/nb/libs/jpa/eclipselink.jar

public class ProjectDAO extends DAO<Project, UUID> {

    public ProjectDAO(_Session session) {
        super(Project.class, session);
    }

    public ViewPage<Project> findProjects(String keyWord, _SortParams sortParams, int pageNum, int pageSize) {
        EntityManager em = getEntityManagerFactory().createEntityManager();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        try {
            CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
            CriteriaQuery<Project> cq = cb.createQuery(Project.class);
            Root<Project> projectRoot = cq.from(Project.class);
            cq.select(projectRoot);
            countCq.select(cb.count(projectRoot));

            Predicate condition = null;
            if (!user.isSuperUser() && SecureAppEntity.class.isAssignableFrom(getEntityClass())) {
                condition = cb.and(projectRoot.get("readers").in(user.getId()));
            }
            if (keyWord != null && !keyWord.isEmpty()) {
                // if (condition != null) {
                // condition = cb.and(cb.like(cb.lower(c.<String> get("name")),
                // "%" + keyWord + "%"), condition);
                // } else {
                condition = cb.and(cb.like(cb.lower(projectRoot.<String>get("name")), "%" + keyWord + "%"));
                // }
            }
            if (condition != null) {
                cq.where(condition);
                countCq.where(condition);
            }

            if (sortParams != null && !sortParams.isEmpty()) {
                List<Order> orderBy = new ArrayList<>();
                sortParams.values().forEach((fieldName, direction) -> {
                    if (direction.isAscending()) {
                        orderBy.add(cb.asc(projectRoot.get(fieldName)));
                    } else {
                        orderBy.add(cb.desc(projectRoot.get(fieldName)));
                    }
                });
                cq.orderBy(orderBy);
            }

            Query query = em.createQuery(countCq);
            long count = (long) query.getSingleResult();
            int maxPage = RuntimeObjUtil.countMaxPage(count, pageSize);
            if (pageNum == 0) {
                pageNum = 1; // maxPage;
            }
            int firstRec = RuntimeObjUtil.calcStartEntry(pageNum, pageSize);

            // EntityGraph<?> graph = em.getEntityGraph(Project.ATTACHMENT_SHORT);

            // EntityGraph<?> graph = em.createEntityGraph(Project.class);
            // graph.addSubgraph(Project.ORGANIZATION_SHORT);
            // graph.addSubgraph(Project.ATTACHMENT_SHORT);

            TypedQuery<Project> typedQuery = em.createQuery(cq);
            // typedQuery.setHint("javax.persistence.fetchgraph", em.getEntityGraph(Project.ORGANIZATION_SHORT));
            // typedQuery.setHint("javax.persistence.fetchgraph", graph);
            // typedQuery.setHint("javax.persistence.fetchgraph", graph);
            typedQuery.setFirstResult(firstRec);
            typedQuery.setMaxResults(pageSize);

            List<Project> result = typedQuery.getResultList();

            return new ViewPage<>(result, count, maxPage, pageNum);
        } finally {
            em.close();
        }
    }
}
