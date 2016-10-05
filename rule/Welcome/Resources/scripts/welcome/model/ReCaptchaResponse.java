package welcome.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ReCaptchaResponse {

	boolean success;
	Date challenge_ts;
	String hostname;

	@JsonProperty("error-codes")
	String[] errorCodes;

	public ReCaptchaResponse() {

	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String[] getErrorCodes() {
		return errorCodes;
	}

	public void setErrorCodes(String[] errorCodes) {
		this.errorCodes = errorCodes;
	}

	public Date getChallenge_ts() {
		return challenge_ts;
	}

	public void setChallenge_ts(Date challenge_ts) {
		this.challenge_ts = challenge_ts;
	}

	public String getHostname() {
		return hostname;
	}

	public void setHostname(String hostname) {
		this.hostname = hostname;
	}
}
