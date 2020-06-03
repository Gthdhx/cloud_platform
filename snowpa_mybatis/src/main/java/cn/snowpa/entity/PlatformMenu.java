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
 * 平台菜单表
 *
 */
@Data
@TableName("ucd_platform_menu")
public class PlatformMenu implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 子系统编码 */
	private String systemCode;

	/** 菜单编码 */
	private String menuCode;

	/** 菜单名称 */
	private String menuName;

	/** 菜单等级 */
	private String menuLevel;

	/** 菜单路径 */
	private String menuPath;

	/** 上级菜单 */
	private String parentCode;

	/** 菜单图标 */
	private String menuIcon;

	/** 菜单排序 */
	private Integer menuOrder;

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
