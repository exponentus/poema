package projects.exception;

@Deprecated
public class RequestException extends Exception {
    public RequestException() {
        super();
    }

    public RequestException(String msg) {
        super(msg);
    }
}
