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
 * 系统公告
 *
 */
@Data
@TableName("ucd_system_bulletin")
public class SystemBulletin implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 主键 */
	@TableId(type = IdType.AUTO)
	private Integer id;

	/** 公共类型 */
	private String bulletinType;

	/** 公告编码 */
	private String bulletinCode;

	/** 公共标题 */
	private String bulletinTitle;

	/** 公共内容 */
	private String bulletinContent;

	/** 公共文件 */
	private String bulletinFile;

	/** 公共是否首页展示 */
	private String ifShow;

	/** 公告顺序 */
	private String bulletinOrder;

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
