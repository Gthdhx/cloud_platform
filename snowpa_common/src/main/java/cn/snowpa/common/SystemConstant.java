package cn.snowpa.common;

/**
 * 系统常量
 *
 */
public class SystemConstant {

	public static final String STATUS_OK = "Y"; //全系统 状态 Y 有效 N 无效

	/**
	 * 登录 totale_key;
	 */
	public static final String LOGIN_KEY = "a3_login";
	/**
	 * 用户登录失效时长  (秒);
	 */
	public static final int LOGIN_MAXTIME = 60*10;
	/**
	 * 缓存登陆图片验证码;
	 */
	public static final String LOGIN_PIC_RANDOM = "a3_login_pic";

	/**
	 * 订单常量
	 */

	public static final String ORDER_ORDER_STATUS_DFH = "DFH"; //订单状态 待发货
	public static final String ORDER_ORDER_STATUS_DSH = "DSH"; //订单状态 待收货
	public static final String ORDER_ORDER_STATUS_YQS = "YQS"; //订单状态 已签收
	public static final String ORDER_ORDER_STATUS_YWC = "YWC"; //订单状态 完成
	public static final String ORDER_ORDER_STATUS_SH = "SH"; //订单状态 售后
	public static final String ORDER_ORDER_STATUS_GB = "GB"; //订单状态 关闭取消

	public static final String ORDER_COMMENT_STATUS_DPJ = "DPJ"; //订单状态 待评价
	public static final String ORDER_COMMENT_STATUS_YPJ = "YPJ"; //订单状态 待评价

	public static final String ORDER_PAY_STATUS_DFK = "DFK"; //订单支付状态 待付款
	public static final String ORDER_PAY_STATUS_YFK = "YFK"; //订单支付状态 已付款

	public static final String ORDER_PAY_TYPE_WX = "WX"; //订单支付状态 待付款
	
}
