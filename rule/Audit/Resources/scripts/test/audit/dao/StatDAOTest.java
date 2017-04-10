package test.audit.dao;

import audit.dto.StatInspectorDTO;
import audit.dto.StatObsStatusDTO;
import audit.model.Observation;
import com.exponentus.env.EnvConst;
import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.eclipse.persistence.config.TargetDatabase;
import org.eclipse.persistence.jpa.PersistenceProvider;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StatDAOTest {

    EntityManagerFactory emf;
    EntityManager em;

    public StatDAOTest() {
        PersistenceProvider pp = new PersistenceProvider();
        emf = pp.createEntityManagerFactory("Audit", getProp());
        em = emf.createEntityManager();

        findStatInspector();
    }

    public static void main(String[] args) {
        StatDAOTest daoTest = new StatDAOTest();
        System.out.println(daoTest);
    }

    private static Map<String, String> getProp() {
        Map<String, String> properties = new HashMap<>();
        properties.put(PersistenceUnitProperties.JDBC_DRIVER, EnvConst.JDBC_DRIVER);
        properties.put(PersistenceUnitProperties.JDBC_USER, EnvConst.DB_USER);
        properties.put(PersistenceUnitProperties.JDBC_PASSWORD, "");
        properties.put(PersistenceUnitProperties.JDBC_URL, "jdbc:postgresql://localhost:5432/constructionaudit");
        properties.put(PersistenceUnitProperties.TARGET_DATABASE, TargetDatabase.PostgreSQL);
        properties.put(PersistenceUnitProperties.LOGGING_LEVEL, "ALL");

        return properties;
    }

    public void findStatDataByObsStatus() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatObsStatusDTO> cq = cb.createQuery(StatObsStatusDTO.class);
        Root<Observation> root = cq.from(Observation.class);

        cq.select(cb.construct(StatObsStatusDTO.class, root.get("status"), cb.count(root)))
                .groupBy(root.get("status"));

        TypedQuery<StatObsStatusDTO> typedQueryR = em.createQuery(cq);
        List<StatObsStatusDTO> list = typedQueryR.getResultList();

        System.out.println(list.size());

        em.close();
    }

    public void findStatInspector() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatInspectorDTO> cq = cb.createQuery(StatInspectorDTO.class);
        Root<Observation> root = cq.from(Observation.class);

        List<Order> orderBy = new ArrayList<>();
        orderBy.add(cb.asc(root.get("author").get("login")));
        orderBy.add(cb.asc(root.get("status")));

        cq.select(
                cb.construct(
                        StatInspectorDTO.class,
                        root.get("author").get("login"),
                        root.get("status"),
                        cb.count(root))
        )
                .groupBy(root.get("author").get("login"), root.get("status"))
                .orderBy(orderBy);

        TypedQuery<StatInspectorDTO> typedQueryR = em.createQuery(cq);
        List<StatInspectorDTO> list = typedQueryR.getResultList();

        System.out.println(list.size());

        list.forEach(it -> {
            System.out.println(it.inspector + ", " + it.status + ", " + it.value);
        });

        em.close();
    }
}
