package cn.snowpa.mapper.system;

import cn.snowpa.entity.extend.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper
public interface SysPermissionMapper {
    

    List<SysUser> getSysUserList(Map<String, Object> contain);

    Set<String> findRoleNameByUserCode(Map<String, Object> contain);

    Set<String> findPermissionsByUserCode(Map<String, Object> contain);

    List<SysUser> getByPhone(String phone);

}
