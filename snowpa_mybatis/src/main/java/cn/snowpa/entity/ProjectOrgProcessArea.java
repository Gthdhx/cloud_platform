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
 * 项目组织处理区域
 *
 */
@Data
@TableName("ucd_project_org_process_area")
public class ProjectOrgProcessArea implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 项目组织编码 */
	private String orgCode;

	/** 地区编码 */
	private String areaCode;

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
