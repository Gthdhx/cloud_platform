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
 * 用户表
 *
 */
@Data
@TableName("ucd_user")
public class User implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 用户编码 */
	private String userCode;

	/** 用户账号 */
	private String nickName;

	/** 用户手机 */
	private String userPhone;

	/** 用户名称 */
	private String userName;

	/** 用户密码 */
	private String password;

	/** 用户类型 */
	private String userType;

	/** 用户头像 */
	private String userImg;

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
