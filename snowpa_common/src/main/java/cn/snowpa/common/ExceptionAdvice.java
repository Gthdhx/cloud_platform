package cn.snowpa.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import cn.snowpa.utils.ResultUtil;
import org.apache.shiro.ShiroException;
import org.apache.shiro.authz.UnauthenticatedException;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;


/**
 * 异常控制处理器
 *
 * @author lwx
 */
@RestControllerAdvice
public class ExceptionAdvice {

    /**
     * 捕捉所有Shiro异常
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ShiroException.class)
    public ResultUtil handle401(ShiroException e) {
        return ResultUtil.error("无权访问" + e.getMessage());
    }

    /**
     * 单独捕捉Shiro(UnauthorizedException)异常 该异常为访问有权限管控的请求而该用户没有所需权限所抛出的异常
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthorizedException.class)
    public ResultUtil handle401(UnauthorizedException e) {
        return ResultUtil.error("无权访问权限" + e.getMessage());
    }

    /**
     * 单独捕捉Shiro(UnauthenticatedException)异常
     * 该异常为以游客身份访问有权限管控的请求无法对匿名主体进行授权，而授权失败所抛出的异常
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UnauthenticatedException.class)
    public ResultUtil handle401(UnauthenticatedException e) {
        return ResultUtil.error("无权访问权限" + e.getMessage());
    }

    /**
     * 捕捉校验异常(BindException)
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    public ResultUtil validException(BindException e) {
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        Map<String, Object> result = this.getValidError(fieldErrors);
        return ResultUtil.error(400,result.get("errorMsg").toString(),result.get("errorList"));
    }

    /**
     * 捕捉校验异常(MethodArgumentNotValidException)
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResultUtil validException(MethodArgumentNotValidException e) {
        List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        Map<String, Object> result = this.getValidError(fieldErrors);
        return ResultUtil.error(400,result.get("errorMsg").toString(),result.get("errorList"));
    }

    /**
     * 捕捉404异常
     */
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResultUtil handle(NoHandlerFoundException e) {
        return ResultUtil.error(404,e.getMessage());
    }

    /**
     * 捕捉其他所有异常
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResultUtil globalException(HttpServletRequest request, Throwable ex) {
        return ResultUtil.error(500,ex.toString() + ": " + ex.getMessage());
    }

    /**
     * 捕捉其他所有自定义异常
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CustomException.class)
    public ResultUtil handle(CustomException e) {
        return ResultUtil.error(500,e.getMessage());
    }

    /**
     * 获取状态码
     */
    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }

    /**
     * 获取校验错误信息
     */
    private Map<String, Object> getValidError(List<FieldError> fieldErrors) {
        Map<String, Object> result = new HashMap<String, Object>(16);
        List<String> errorList = new ArrayList<String>();
        StringBuffer errorMsg = new StringBuffer("校验异常(ValidException):");
        for (FieldError error : fieldErrors) {
            errorList.add(error.getField() + "-" + error.getDefaultMessage());
            errorMsg.append(error.getField() + "-" + error.getDefaultMessage() + ".");
        }
        result.put("errorList", errorList);
        result.put("errorMsg", errorMsg);
        return result;
    }
}

