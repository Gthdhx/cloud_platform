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
 * 项目组织表
 *
 */
@Data
@TableName("ucd_project_org")
public class ProjectOrg implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 组织编码 */
	private String orgCode;

	/** 组织类型 */
	private String orgType;

	/** 上级组织编码 */
	private String pOrgCode;

	/** 组织等级 */
	private String orgLevel;

	/** 组织简称 */
	private String orgNickName;

	/** 组织全称 */
	private String orgName;

	/** 组织描述 */
	private String orgDescribe;

	/** 组织号码 */
	private String orgPhone;

	/** 组织联系人 */
	private String orgContacts;

	/** 组织地址 */
	private String orgAddress;

	/** 组织状态 */
	private String orgStatus;

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
