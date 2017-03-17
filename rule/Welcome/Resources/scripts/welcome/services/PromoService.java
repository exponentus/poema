package welcome.services;

import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.exponentus.appenv.AppEnv;
import com.exponentus.exception.MsgException;
import com.exponentus.localization.LanguageCode;
import com.exponentus.messaging.MessageType;
import com.exponentus.messaging.email.MailAgent;
import com.exponentus.messaging.email.Memo;
import com.exponentus.rest.RestProvider;
import com.exponentus.rest.ServiceDescriptor;
import com.exponentus.rest.ServiceMethod;
import com.exponentus.rest.outgoingdto.Outcome;
import com.exponentus.scripting._Session;
import com.exponentus.util.Validator;

import welcome.init.AppConst;
import welcome.model.ReCaptchaResponse;

@Path("service")
public class PromoService extends RestProvider {

	@POST
	@Path("/sendmail")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public Response create(@FormParam("email") String email, @FormParam("subject") String subj,
			@FormParam("message") String msg, @FormParam("g-recaptcha-response") String grecaptcha) {

		return processSimpleMessage(getAppEnv(), getSession(), AppConst.RECEPIENT_EMAIL, email, subj, msg, grecaptcha);
	}

	public static Response processSimpleMessage(AppEnv appEnv, _Session session, String recipient, String email,
			String subj, String msg, String captcha) {
		Outcome res = new Outcome("");
		LanguageCode lang = session.getLang();
		ArrayList<String> e = validateSimpleMailForm(email, subj, msg, captcha);

		if (e.size() > 0) {
			res.setMessage("FORMDATA_INCORRECT", lang);
			return Response.status(HttpServletResponse.SC_BAD_REQUEST).entity(res.setMessages(e, lang)).build();
		}

		//
		ArrayList<String> recipients = new ArrayList<>();
		recipients.add(recipient);
		MailAgent ma = new MailAgent();
		Memo memo = new Memo();
		memo.addVar("subj", subj);
		memo.addVar("msg", msg);
		try {
			if (ma.sendMessage(recipients, appEnv.vocabulary.getWord("notify_about_new_message", lang),
					memo.getBody(appEnv.templates.getTemplate(MessageType.EMAIL, "contact_us", lang)))) {
				res.addMessage("message_has_sent_succesfully", lang);
				return Response.status(HttpServletResponse.SC_OK).entity(res).build();
			} else {
				res.setMessage("MESSAGE_HAS_NOT_SENT", lang);
				return Response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).entity(res.setMessages(e, lang))
						.build();
			}
		} catch (MsgException e1) {
			res.setMessage("MESSAGE_HAS_NOT_SENT", lang);
			return Response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR).entity(res.setMessages(e, lang))
					.build();
		}

	}

	private static ArrayList<String> validateSimpleMailForm(String email, String subj, String msg, String captcha) {
		ArrayList<String> errors = new ArrayList<>();
		boolean isValid = true;

		if (!Validator.checkEmail(email)) {
			isValid = false;
			errors.add("EMAIL_IS_INCORRECT");
		}
		/*
		 * if (subj.isEmpty() || subj.length() > 256) { isValid = false;
		 * errors.add("subject_incorrect"); }
		 */
		if (msg.length() > 3000) {
			errors.add("message_too_long");
		}

		if (msg.length() < 10) {
			errors.add("message_too_short");
		}

		// if (isValid && !validateReCaptcha(captcha)) {
		// errors.add("captcha_incorrect");
		// }
		return errors;
	}

	private static boolean validateReCaptcha(String captcha) {
		String secret = AppConst.CAPTCHA_CODE;
		return validate(secret, captcha).isSuccess();
	}

	public static ReCaptchaResponse validate(String secret, String captcha) {
		String verUri = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + captcha;

		Client client = ClientBuilder.newClient();
		WebTarget target = client.target(verUri);
		Response response = target.request().post(Entity.entity("", MediaType.APPLICATION_JSON));
		ReCaptchaResponse pojo = response.readEntity(ReCaptchaResponse.class);
		return pojo;
	}

	@Override
	public ServiceDescriptor updateDescription(ServiceDescriptor sd) {
		sd.setName(getClass().getName());
		ServiceMethod m = new ServiceMethod();
		m.setMethod(HttpMethod.POST);
		m.setURL("/" + sd.getAppName() + sd.getUrlMapping() + "/service/sendmail");
		m.setAnonymous(true);
		sd.addMethod(m);
		return sd;
	}
}
