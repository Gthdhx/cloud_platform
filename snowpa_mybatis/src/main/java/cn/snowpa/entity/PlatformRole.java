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
 * 平台角色表
 *
 */
@Data
@TableName("ucd_platform_role")
public class PlatformRole implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 角色编码 */
	private String roleCode;

	/** 角色名称 */
	private String roleName;

	/** 角色等级 */
	private String rolelevel;

	/** 角色类型 */
	private String roleType;

	/** 角色描述 */
	private String Description;

	/** 角色组编码 */
	private String roleGradeCode;

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
