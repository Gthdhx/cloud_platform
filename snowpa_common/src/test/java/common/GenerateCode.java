//package common;
//
//import com.baomidou.mybatisplus.annotations.IdType;
//import com.baomidou.mybatisplus.generator.AutoGenerator;
//import com.baomidou.mybatisplus.generator.ConfigGenerator;
//
///**
// * mybatisplus 代码生成器配置
// */
//public class GenerateCode {
//
//    /* 生成代码包名 */
//    private static final String PACKAGE_NAME = "cn.snowpa";
//
//    public static void main(String[] args) {
//
//        /* 配置 Mybatis-Plus 代码生成器 */
//        ConfigGenerator cg = new ConfigGenerator();
//
//        /* Mysql 数据库相关配置 */
//        cg.setDbDriverName("com.mysql.jdbc.Driver");
//        cg.setDbUrl("jdbc:mysql://rm-bp12h8iyzorsuwemw1o.mysql.rds.aliyuncs.com/snowpa_user_center");
//        cg.setDbUser("leon2400");
//        cg.setDbPassword("Leon2400");
//        /* 设置数据库前缀（例如`mp_user`生成实体类，false 为 MpUser.java , true 为 User.java）*/
//        cg.setDbPrefix(true);
//
//         /*
//         * true 表示数据库设置全局下划线命名规则，默认 false
//         * ------------------------------------------------------------------------------------
//         * 【 开启该设置实体可无 @TableId(value = "test_id") 字段映射，启动配置对应也要开启 true 设置 】
//         */
//        cg.setDbColumnUnderline(true);
//        /*
//         * 表主键 ID 生成类型, 自增该设置无效。
//         * <p>
//         * IdType.AUTO             数据库ID自增
//         * IdType.INPUT            用户输入ID
//         * IdType.ID_WORKER        全局唯一ID，内容为空自动填充（默认配置）
//         * IdType.UUID            全局唯一ID，内容为空自动填充
//         * </p>
//         */
//        cg.setIdType(IdType.AUTO);
//
//        /* 生成文件保存位置 */
//        cg.setSaveDir("/Users/leon/Desktop/snowpa/user");
//
//        /* 生成代码包路径 */
////        cg.setControllerPackage(PACKAGE_NAME + ".controller");
//        cg.setEntityPackage(PACKAGE_NAME + ".model"); //entity 实体包路径
//        cg.setMapperPackage(PACKAGE_NAME + ".mapper"); //mapper 映射文件路径
////        cg.setServicePackage(PACKAGE_NAME + ".service"); //service 层路径
//        cg.setXmlPackage("sqlMapperXml"); //xml层路径
//
//        /* 生成代码 */
//        AutoGenerator.run(cg);
//    }
//
//}