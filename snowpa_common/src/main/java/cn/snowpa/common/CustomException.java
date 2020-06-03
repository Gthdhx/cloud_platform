package cn.snowpa.common;

/**
 * 自定义异常(CustomException)
 *
 * @author lwx
 */
public class CustomException extends RuntimeException {

    private static final long serialVersionUID = -6736944294947154413L;

    public CustomException(String msg,int code) {
        super(msg);
    }

    public CustomException(String msg) {
        super(msg);
    }

    public CustomException() {
        super();
    }
}

