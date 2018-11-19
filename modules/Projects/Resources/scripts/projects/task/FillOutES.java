package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.common.dao.DAOFactory;
import com.exponentus.common.dto.ESPayload;
import com.exponentus.dataengine.jpa.IAppEntity;
import com.exponentus.dataengine.jpa.IDAO;
import com.exponentus.dataengine.jpa.IESSHandled;
import com.exponentus.env.Environment;
import com.exponentus.log.Lg;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import org.apache.http.HttpHost;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import projects.init.ModuleConst;
import projects.other.Mapping;

import java.io.IOException;
import java.util.UUID;

//run task prj_fill_es
@Command(name = ModuleConst.CODE + "_fill_es")
public class FillOutES extends Do {
    private String[] entities = {"project","task"};
    private RestHighLevelClient client;

    @Override
    public void doTask(AppEnv appEnv, _Session ses) {
        try {
            client = new RestHighLevelClient(
                    RestClient.builder(new HttpHost(Environment.elasticSearchHost, Environment.elasticSearchPort, "http")));

            for(String entityType: entities) {
                createIndex(entityType);

                IDAO<IAppEntity, UUID> dao = DAOFactory.get(ses, entityType);
                for (IAppEntity entity : dao.findAll()) {
                    ESPayload esPayload = ((IESSHandled)entity).getESSDocument();
                    for (String route : esPayload.getRoute()) {
                        UpdateRequest updateRequest = new UpdateRequest(esPayload.getType(), esPayload.getType(), esPayload.getId());
                        updateRequest.routing(route);
                        updateRequest.doc(esPayload.getDocument());
                        updateRequest.upsert(esPayload.getDocument());
                        client.update(updateRequest, RequestOptions.DEFAULT);
                    }
                    Lg.info(esPayload.getType() + " " + esPayload.getId());
                }
            }
        } catch (ElasticsearchException | IOException e) {
            Lg.error(e);
        }

    }

    private void createIndex(String indexName) throws IOException {
        if (!client.indices().exists(new GetIndexRequest().indices(indexName), RequestOptions.DEFAULT)) {
            CreateIndexRequest request = new CreateIndexRequest(indexName);
            request.mapping(indexName, new Mapping().get());
            CreateIndexResponse createIndexResponse = client.indices().create(request, RequestOptions.DEFAULT);
            System.out.println("Index created " + createIndexResponse.toString());
        }
    }

}
