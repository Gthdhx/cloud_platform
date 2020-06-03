package cn.snowpa.login;

import cn.snowpa.common.SystemConstant;
import cn.snowpa.config.DataSource;
import cn.snowpa.config.DataSourceEnum;
import cn.snowpa.entity.User;
import cn.snowpa.mapper.UserMapper;
import cn.snowpa.redis.JedisUtil;
import cn.snowpa.shiro.common.Constant;
import cn.snowpa.shiro.util.JwtUtil;
import cn.snowpa.utils.*;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("loginService")
public class LoginServiceImpl implements LoginService {

    @Autowired
    private JedisUtil jedisUtil;

    @Autowired
    private UserMapper userMapper;

    @Value("${resource.showImg}")
    private String showImg;

    @Value("${spring.redis.timeout}")
    private int timeout;

    @Value("${RSA.cipherKey}")
    private String cipherKey;

    @Value("${RSA.plainKey}")
    private String plainKey;

    @Override
    @DataSource(DataSourceEnum.GET)
    public JSONObject getLoginCode() {
        JSONObject captcha = new JSONObject();
        try {
            String code_base64 = null;
            String code_redis = null;
            ValidateCodeUtil.Validate v = ValidateCodeUtil.getRandomCode();     //直接调用静态方法，返回验证码对象
            if(v!=null){
                code_redis = v.getValue();
                code_base64 = v.getBase64Str();
            }
            //生成一个唯一值
            String cacheKey = SystemConstant.LOGIN_PIC_RANDOM + "_" + RandomNbr.getOlNbrByRandom();
            //唯一值作为key 图形验证码作为value 存入redis 并设置有效时间
            jedisUtil.setObject(cacheKey, code_redis, 240);

            captcha.put("key",cacheKey);
            captcha.put("code","data:image/png;base64,"+code_base64);
            return captcha;
        }catch (Exception e){
            e.printStackTrace();
            return captcha;
        }
    }

    @Override
    @DataSource(DataSourceEnum.GET)
    public ResultUtil login(JSONObject params, HttpServletResponse httpServletResponse) {
        try {
            String key = params.getString("key");
            if(StringUtil.isEmpty(key)){
                return ResultUtil.error("获取验证码异常");
            }
            String code = params.getString("code");
            if(StringUtil.isEmpty(code)){
                return ResultUtil.error("获取验证码异常");
            }
            String code_redis = (String) jedisUtil.getObject(key);
            if(!code.equals(code_redis)){
                return ResultUtil.error("获取验证码错误");
            }
            String userName = params.getString("userName");
            if(StringUtil.isEmpty(userName)){
                return ResultUtil.error("获取用户名失败");
            }
            String password = params.getString("password");
            if(StringUtil.isEmpty(password)){
                return ResultUtil.error("获取密码失败");
            }
            // 因为密码加密是以帐号+密码的形式进行加密的，所以解密后的对比是帐号+密码

            Map<String,Object> contain = new HashMap<>();
            contain.put("userName",userName);
            List<User> userList = userMapper.selectByMap(contain);

            if(userList == null || userList.isEmpty()){
                return ResultUtil.error("账号不要存在");
            }
            User user = userList.get(0);

            String decrypt = "";
            try {
                //后端私钥解密的到AES的key
                byte[] plaintext = RSAUtil.decryptByPrivateKey(Base64.decodeBase64(user.getPassword()),cipherKey);
                decrypt = new String(plaintext);
            }catch (Exception e){
                e.printStackTrace();
                return ResultUtil.error("密码错误！");
            }
            if(!decrypt.equals(password)){
                return ResultUtil.error("密码错误");
            }
            // 清除可能存在的Shiro权限信息缓存
            if (JedisUtil.exists(Constant.PREFIX_SHIRO_CACHE + userName) ) {
                JedisUtil.delKey( Constant.PREFIX_SHIRO_CACHE + userName );
            }
            // 设置RefreshToken，时间戳为当前时间戳，直接设置即可(不用先删后设，会覆盖已有的RefreshToken)
            String currentTimeMillis = String.valueOf(System.currentTimeMillis());
            JedisUtil.setObject(Constant.PREFIX_SHIRO_REFRESH_TOKEN + userName, currentTimeMillis, timeout);
            // 从Header中Authorization返回AccessToken，时间戳为当前时间戳
            String token = JwtUtil.sign(userName, currentTimeMillis);
            httpServletResponse.setHeader("token", token);
            httpServletResponse.setHeader("Access-Control-Expose-Headers", "token");
            return ResultUtil.success("登陆成功",token);
        }catch (Exception e){
            e.printStackTrace();
            return ResultUtil.error();
        }
    }
}
