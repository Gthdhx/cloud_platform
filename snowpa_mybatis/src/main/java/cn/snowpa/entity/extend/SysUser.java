package cn.snowpa.entity.extend;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;

@Data
public class SysUser implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 资源服务器 */
    @TableField(exist = false)
    private String showImg;

    private String account;


}
