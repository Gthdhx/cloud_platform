package cn.snowpa.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

/**
 *
 * APP用户角色表
 *
 */
@Data
@TableName("ucd_app_user_role")
public class AppUserRole implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 用户编码 */
	private String userCode;

	/** 角色编码 */
	private String roleCode;

	/** 数据状态 */
	private String status;

	/** 创建人 */
	private String createCode;

	/** 创建时间 */
	private Date createTime;

	/** 更新人 */
	private String updateCode;

	/** 更新时间 */
	private Date updateTime;

}
