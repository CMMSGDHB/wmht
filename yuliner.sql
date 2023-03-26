/*
 Navicat Premium Data Transfer

 Source Server         : coderwhy
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : yuliner

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 04/11/2022 09:42:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (26, '夏至', '123123', '中国安徽省', '小夏');
INSERT INTO `address` VALUES (25, '夏至', '132123131', '宜秀区筑梦新区', '小夏');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES (24, 'admin', '40bd001563085fc35165329ea1ff5c5ecbdbbeef');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `comments_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `shoplist_id` int NOT NULL,
  `comments_time` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `userpic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, '刘艳', '好吃', 9, '2022-03-16 09:02:45', 'https://img0.baidu.com/it/u=987633844,965499485&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400');
INSERT INTO `comments` VALUES (2, '蓉蓉', 'goods', 9, '2022-03-16 09:03:24', 'https://img0.baidu.com/it/u=597033770,2511631035&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400');
INSERT INTO `comments` VALUES (3, '小敏', '不错', 9, '2022-03-16 09:03:47', 'https://img0.baidu.com/it/u=2649068796,4261859344&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400');
INSERT INTO `comments` VALUES (4, '超超', 'not bad', 9, '2022-03-16 09:04:19', 'https://img1.baidu.com/it/u=1168019721,766952759&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500');
INSERT INTO `comments` VALUES (5, '鑫伟', '666', 13, '2022-03-16 09:04:59', 'https://img0.baidu.com/it/u=3457694045,161926376&fm=253&fmt=auto&app=138&f=JPEG?w=350&h=350');
INSERT INTO `comments` VALUES (6, '宇航', 'nice', 13, '2022-03-16 09:05:29', 'https://img2.baidu.com/it/u=2533838028,1508299820&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400');
INSERT INTO `comments` VALUES (7, '诚诚', 'very good', 9, '2022-03-16 09:16:13', 'https://img0.baidu.com/it/u=3041701001,1968583786&fm=26&fmt=auto');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `foodname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `descr` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `shoplist_id` int NOT NULL,
  `foodpic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '春饼卷鸭肉', '好吃不贵', '55', 9, 'aab1438ac96b9c63de34be801.webp');
INSERT INTO `goods` VALUES (2, '番茄火锅', '汤鲜味美', '88', 7, 'aab1438ac96b9c63de34be802.cdn.sohucs.com_images_20200323_64640f422ac8452fa2802a026ac32d9c.jpeg&refer=http___5b0988e595225.cdn.sohucs.webp');
INSERT INTO `goods` VALUES (5, '全家桶套餐', '量大样式全', '155', 17, 'c269468baf906ee86fea92001.webp');
INSERT INTO `goods` VALUES (6, '麻辣火锅', '够麻够辣', '55', 7, '2da9bab690fdc034134215600.cdn.sohucs.com_images_20200323_64640f422ac8452fa2802a026ac32d9c.jpeg&refer=http___5b0988e595225.cdn.sohucs.webp');
INSERT INTO `goods` VALUES (8, '粉丝包子', '皮薄', '1.5', 14, '0df06bd46d9d0de556c8c4e02.webp');
INSERT INTO `goods` VALUES (9, '23', '123', '123', 19, 'd5ae69d6c1d685f194be14900.jpg');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_num` int NOT NULL,
  `address_id` int NOT NULL,
  `food_totalprice` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 9527, 25, '125.00', '小夏');
INSERT INTO `orders` VALUES (2, 9536, 26, '300.00', '小夏');
INSERT INTO `orders` VALUES (3, 9589, 25, '500.00', '小夏');

-- ----------------------------
-- Table structure for orders_goods
-- ----------------------------
DROP TABLE IF EXISTS `orders_goods`;
CREATE TABLE `orders_goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `foodname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `count` int NOT NULL,
  `orders_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders_goods
-- ----------------------------
INSERT INTO `orders_goods` VALUES (1, '火锅', '1.pic', 2, 1);
INSERT INTO `orders_goods` VALUES (2, '汉堡', '2.pic', 1, 1);
INSERT INTO `orders_goods` VALUES (3, '烤鸭2', 'upload_e08859e524c46e0833ff27d29c9257f6.jpg', 3, 2);
INSERT INTO `orders_goods` VALUES (4, '烤鸭2', 'upload_e08859e524c46e0833ff27d29c9257f6.jpg', 1, 2);
INSERT INTO `orders_goods` VALUES (5, '烤鸭1', 'upload_bf9dbef548e0c8fa157dfd92e5233b28.jpg', 1, 2);
INSERT INTO `orders_goods` VALUES (6, '烤鸭1', 'upload_bf9dbef548e0c8fa157dfd92e5233b28.jpg', 2, 8);
INSERT INTO `orders_goods` VALUES (7, '火锅1', 'upload_acc7e74986c13b31f5502a9bb50ff711.jpg', 1, 9);
INSERT INTO `orders_goods` VALUES (8, '火锅1', 'upload_acc7e74986c13b31f5502a9bb50ff711.jpg', 1, 10);
INSERT INTO `orders_goods` VALUES (9, '烤鸭2', 'upload_e08859e524c46e0833ff27d29c9257f6.jpg', 1, 11);
INSERT INTO `orders_goods` VALUES (10, '烤鸭1', 'upload_bf9dbef548e0c8fa157dfd92e5233b28.jpg', 1, 11);
INSERT INTO `orders_goods` VALUES (11, '火锅1', 'upload_acc7e74986c13b31f5502a9bb50ff711.jpg', 1, 12);

-- ----------------------------
-- Table structure for shoplists
-- ----------------------------
DROP TABLE IF EXISTS `shoplists`;
CREATE TABLE `shoplists`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `shopname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `fee` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shoplists
-- ----------------------------
INSERT INTO `shoplists` VALUES (19, '华莱士中国', '807c8a15f192c4aef646e2d01.webp', '超快的配送体验', '10.00');
INSERT INTO `shoplists` VALUES (16, '李记臭豆腐', '5de4ceedf85af7d25c2ab5e01.webp', '巷子再深也阻止不了脚步', '15');
INSERT INTO `shoplists` VALUES (7, '杨国福麻辣烫', 'cc3d292bd5dd918cfb7fe7d09.cdn.sohucs.com_images_20200323_64640f422ac8452fa2802a026ac32d9c.jpeg&refer=http___5b0988e595225.cdn.sohucs.webp', '独家秘方制作', '15');
INSERT INTO `shoplists` VALUES (9, '北京烤鸭', 'cc3d292bd5dd918cfb7fe7d0a.webp', '一炉百炼正宗北京烤鸭', '10');
INSERT INTO `shoplists` VALUES (17, '华莱士', 'c269468baf906ee86fea92000.webp', '超快的配送体验', '20.00');
INSERT INTO `shoplists` VALUES (18, '华莱士中国', '807c8a15f192c4aef646e2d00.webp', '快准狠', '20.00');
INSERT INTO `shoplists` VALUES (14, '红花树包子铺', 'cc3d292bd5dd918cfb7fe7d08.webp', '皮薄肉多个头大', '3');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `realname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `u_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, '夏至', 'https://img2.baidu.com/it/u=4136987256,283353262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=520', '00000000000', '12321@qq.com', 1);
INSERT INTO `user_info` VALUES (2, '段玉', 'https://img2.baidu.com/it/u=4136987256,283353262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=520', '11111111111', '12312@163.com', 28);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '小夏', '123');
INSERT INTO `users` VALUES (2, '新宇', '123456');
INSERT INTO `users` VALUES (3, '小雪', '123');
INSERT INTO `users` VALUES (5, '易', '123');
INSERT INTO `users` VALUES (6, '金', '123');
INSERT INTO `users` VALUES (7, '娜娜', '123');
INSERT INTO `users` VALUES (8, '圆圆', '123');
INSERT INTO `users` VALUES (9, '月月', '123');

SET FOREIGN_KEY_CHECKS = 1;
