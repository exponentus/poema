package projects.task;

import com.exponentus.appenv.AppEnv;
import com.exponentus.dataengine.exception.DAOException;
import com.exponentus.log.Lg;
import com.exponentus.scripting._Session;
import com.exponentus.scripting.event.Do;
import com.exponentus.scriptprocessor.tasks.Command;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpHost;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import projects.dao.TaskDAO;
import projects.init.ModuleConst;
import projects.model.Task;

import java.io.IOException;

//run task prj_fill_es
@Command(name = ModuleConst.CODE + "_fill_es")
public class FillOutES extends Do {
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void doTask(AppEnv appEnv, _Session ses) {

		try {
			TaskDAO taskDAO = new TaskDAO(ses);
			RestHighLevelClient client = new RestHighLevelClient(
					RestClient.builder(new HttpHost("localhost", 9200, "http")));

			for(Task task: taskDAO.findAll()) {
				String data = objectMapper.writeValueAsString(task);
				XContentBuilder document = XContentFactory.jsonBuilder();
				String id = task.getId().toString();
				document.startObject();
				document.field("Location", id);
				document.field("body", task.getBody());
				document.endObject();
				IndexRequest indexRequest = new IndexRequest("project", "task", id)
						.source(document);
				UpdateRequest updateRequest = new UpdateRequest("project", "task", id);
				updateRequest.doc(document);
				updateRequest.upsert(indexRequest);
				client.update(updateRequest, RequestOptions.DEFAULT);
				Lg.info(id);
			}
		} catch (ElasticsearchException | IOException e) {
			Lg.error(e);
		} catch (DAOException e) {
			Lg.error(e);
		}
	}

}
