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
 * 意见反馈记录
 *
 */
@Data
@TableName("ucd_opinion_record")
public class OpinionRecord implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 意见编码 */
	private String opinionCode;

	/** 意见类型 */
	private String opinionType;

	/** 意见标题 */
	private String opinionTitle;

	/** 意见内容 */
	private String opinionContent;

	/** 意见图片 */
	private String opinionImage;

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
