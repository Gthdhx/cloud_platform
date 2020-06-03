package cn.snowpa.controller.user;

import cn.snowpa.shiro.common.ResponseBean;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.subject.Subject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {


    @GetMapping("/article")
    public ResponseBean article() {
        Subject subject = SecurityUtils.getSubject();
        // 登录了返回true
        if (subject.isAuthenticated()) {
            return new ResponseBean(HttpStatus.OK.value(), "您已经登录了(You are already logged in)", null);
        } else {
            return new ResponseBean(HttpStatus.OK.value(), "你是游客(You are guest)", null);
        }
    }

    /**
     * 测试登录注解(@RequiresAuthentication和subject.isAuthenticated()返回true一个性质)
     * @param
     * @return com.wang.model.common.ResponseBean
     * @author dolyw.com
     * @date 2018/8/30 16:18
     */
    @GetMapping("/article2")
    @RequiresAuthentication
    public ResponseBean requireAuth() {
        return new ResponseBean(HttpStatus.OK.value(), "您已经登录了(You are already logged in)", null);
    }


//    /**
//     * 剔除在线用户
//     * @param id
//     * @return com.wang.model.common.ResponseBean
//     * @author dolyw.com
//     * @date 2018/9/6 10:20
//     */
//    @DeleteMapping("/online/{id}")
//    @RequiresPermissions(logical = Logical.AND, value = {"user:edit"})
//    public ResponseBean deleteOnline(@PathVariable("id") Integer id) {
//        UserDto userDto = userService.selectByPrimaryKey(id);
//        if (JedisUtil.exists(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userDto.getAccount())) {
//            if (JedisUtil.delKey(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userDto.getAccount()) > 0) {
//                return new ResponseBean(HttpStatus.OK.value(), "剔除成功(Delete Success)", null);
//            }
//        }
//        throw new CustomException("剔除失败，Account不存在(Deletion Failed. Account does not exist.)");
//    }
}