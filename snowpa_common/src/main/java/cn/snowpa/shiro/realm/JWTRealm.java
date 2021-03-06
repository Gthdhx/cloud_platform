package cn.snowpa.shiro.realm;

import cn.snowpa.entity.extend.SysUser;
import cn.snowpa.redis.JedisUtil;
import cn.snowpa.shiro.common.Constant;
import cn.snowpa.shiro.common.JWTToken;
import cn.snowpa.shiro.util.JwtUtil;
import cn.snowpa.utils.StringUtil;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 自定义Realm
 * @author dolyw.com
 * @date 2018/8/30 14:10
 */
@Service
public class JWTRealm extends AuthorizingRealm {

    /**
     * 大坑，必须重写此方法，不然Shiro会报错
     */
    @Override
    public boolean supports(AuthenticationToken authenticationToken) {
        return authenticationToken instanceof JWTToken;
    }

    /**
     * 默认使用此方法进行用户名正确与否验证，错误抛出异常即可。
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        String token = (String) authenticationToken.getCredentials();
        // 解密获得account，用于和数据库进行对比
        String account = JwtUtil.getClaim(token, Constant.ACCOUNT);
        // 帐号为空
        if (StringUtil.isEmpty(account)) {
            throw new AuthenticationException("请重新登陆");
        }
        // 查询用户是否存在
        SysUser user = new SysUser();
        user.setAccount(account);
        if (user == null) {
            throw new AuthenticationException("该帐号不存在");
        }
        // 开始认证，要AccessToken认证通过，且Redis中存在RefreshToken，且两个Token时间戳一致
        if (JwtUtil.verify(token) && JedisUtil.exists(Constant.PREFIX_SHIRO_REFRESH_TOKEN + account)) {
            // 获取RefreshToken的时间戳
            String currentTimeMillisRedis = JedisUtil.getObject(Constant.PREFIX_SHIRO_REFRESH_TOKEN + account).toString();
            // 获取AccessToken时间戳，与RefreshToken的时间戳对比
            if (JwtUtil.getClaim(token, Constant.CURRENT_TIME_MILLIS).equals(currentTimeMillisRedis)) {
                return new SimpleAuthenticationInfo(token, token, "userRealm");
            }
        }
        throw new AuthenticationException("登陆已过期");
    }

    /**
     * 只有当需要检测用户权限的时候才会调用此方法，例如checkRole,checkPermission之类的
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        String account = JwtUtil.getClaim(principalCollection.toString(), Constant.ACCOUNT);
        SysUser userDto = new SysUser();
        userDto.setAccount(account);
        // 查询用户角色
        List<String> roles = new ArrayList<>();
        simpleAuthorizationInfo.addRoles(roles);
        // 查询用户角色
        List<String> permissions = new ArrayList<>();
        simpleAuthorizationInfo.addRoles(permissions);
        return simpleAuthorizationInfo;
    }

}
