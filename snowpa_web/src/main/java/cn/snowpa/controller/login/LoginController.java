package cn.snowpa.controller.login;

import cn.snowpa.login.LoginService;
import cn.snowpa.utils.ResultUtil;
import com.alibaba.fastjson.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * 登陆页面
     * @param model
     * @return
     */
    @GetMapping(value = "/loginPage")
    public ModelAndView gotoLoginPage(ModelAndView model) {
        model.setViewName("login/login");
        JSONObject captcha = loginService.getLoginCode();
        model.addObject("captcha",captcha);
        return model;
    }

    /**
     * 登录授权
     */
    @PostMapping("/login")
    public ResultUtil login(@RequestBody JSONObject params, HttpServletResponse httpServletResponse) {
        // 查询数据库中的帐号信息
        try{
            return loginService.login(params,httpServletResponse);
        }catch (Exception e){
            e.printStackTrace();
            return ResultUtil.error();
        }
    }

}