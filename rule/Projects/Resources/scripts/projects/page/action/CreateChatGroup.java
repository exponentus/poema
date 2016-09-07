package projects.page.action;

import com.exponentus.messaging.slack.SlackAgent;
import com.exponentus.scripting._Session;
import com.exponentus.scripting._WebFormData;
import com.exponentus.scripting.event._DoPage;

public class CreateChatGroup extends _DoPage {
	@Override
	public void doGET(_Session session, _WebFormData formData) {
		SlackAgent sa = new SlackAgent();
		sa.createChannel("bla-bla");
	}

}
