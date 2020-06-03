package cn.snowpa.login;

import cn.snowpa.utils.ResultUtil;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletResponse;

public interface LoginService {

    JSONObject getLoginCode();

    ResultUtil login(JSONObject params, HttpServletResponse httpServletResponse);

}
