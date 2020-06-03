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
 * 字典表
 *
 */
@Data
@TableName("ucd_dictionary")
public class Dictionary implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 系统编码 */
	private String systemCode;

	/** 库表名称 */
	private String tableName;

	/** 字段名称 */
	private String fieldName;

	/** 字典表Key */
	private String dictKey;

	/** 字典表值 */
	private String dictValue;

	/** 顺序 */
	private Integer dictOrder;

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
