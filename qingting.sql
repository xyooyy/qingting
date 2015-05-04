/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : qingting

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2015-03-15 22:22:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `games`
-- ----------------------------
DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int(11) NOT NULL auto_increment COMMENT '自增id',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `info` text NOT NULL COMMENT '简介',
  `href` varchar(100) NOT NULL COMMENT '链接',
  `type` varchar(50) NOT NULL,
  `icon` varchar(255) NOT NULL COMMENT '图片',
  `keyname` varchar(20) NOT NULL,
  `moregame` varchar(50) NOT NULL,
  `moregameh` varchar(255) NOT NULL,
  `fenxiang` varchar(20) NOT NULL,
  `fenxiangi` varchar(255) NOT NULL,
  `fenxiangc` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12014 DEFAULT CHARSET=utf8 COMMENT='浏览器内嵌app';

-- ----------------------------
-- Records of games
-- ----------------------------
INSERT INTO `games` VALUES ('1', '全民寻找房祖名', '全民寻找房祖名！虽然柯少向龙叔保证不会带坏房祖名,但龙叔强烈要求你找回祖名.', '', '1', '/upload/games/fang_logo.png', 'qmxzfzm', '更多游戏', 'http://yx.huosu.com/list.html', '', '', '');
INSERT INTO `games` VALUES ('3', '捡钱大作战', '天降横财，看看你有没有财运？！', '', '2', '/upload/games/money_logo.png', 'money', '更多游戏', 'http://yx.huosu.com/list.html', '分享到朋友圈', '', '');
INSERT INTO `games` VALUES ('2', '美女拼图', '美女拼图', '', '3', '/upload/games/mei_logo.png', 'mspt', '更多游戏', 'http://yx.huosu.com/list.html', '炫耀一下', '', '');

-- ----------------------------
-- Table structure for `games_info`
-- ----------------------------
DROP TABLE IF EXISTS `games_info`;
CREATE TABLE `games_info` (
  `gid` int(10) default NULL COMMENT '游戏id',
  `key` varchar(10) default NULL COMMENT '字段名',
  `val` varchar(255) default NULL COMMENT '内容',
  `tp` varchar(10) default 'text' COMMENT '类型'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of games_info
-- ----------------------------
INSERT INTO `games_info` VALUES ('1', 'text1', '全民寻找房祖名', 'text');
INSERT INTO `games_info` VALUES ('1', 'text2', '龙叔说希望帮忙把房祖名找回来~', 'text');
INSERT INTO `games_info` VALUES ('1', 'img1', '/upload/games/fantrue.png', 'img');
INSERT INTO `games_info` VALUES ('1', 'img2', '/upload/games/fanfalse.png', 'img');
INSERT INTO `games_info` VALUES ('2', 'img1', '/games/mspt/images/1.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img2', '/games/mspt/images/2.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img3', '/games/mspt/images/3.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img4', '/games/mspt/images/4.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img5', '/games/mspt/images/5.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img6', '/games/mspt/images/6.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img7', '/games/mspt/images/7.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img8', '/games/mspt/images/8.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img9', '/games/mspt/images/9.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'img10', '/games/mspt/images/10.gif', 'img');
INSERT INTO `games_info` VALUES ('2', 'text1', '美女拼图', 'text');
INSERT INTO `games_info` VALUES ('3', 'text1', '捡钱大作战', 'text');
INSERT INTO `games_info` VALUES ('3', 'text2', '全民动员来捡钱', 'text');
INSERT INTO `games_info` VALUES ('3', 'img1', '/upload/games/money_img1.png', 'img');
INSERT INTO `games_info` VALUES ('3', 'img2', '/upload/games/money_img2.gif', 'img');

-- ----------------------------
-- Table structure for `games_my`
-- ----------------------------
DROP TABLE IF EXISTS `games_my`;
CREATE TABLE `games_my` (
  `mid` int(10) NOT NULL auto_increment,
  `id` int(11) NOT NULL COMMENT '自增id',
  `userid` int(10) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT '标题',
  `info` text NOT NULL COMMENT '简介',
  `href` varchar(100) NOT NULL COMMENT '链接',
  `type` varchar(50) NOT NULL,
  `icon` varchar(255) NOT NULL COMMENT '图片',
  `keyname` varchar(20) NOT NULL,
  `moregame` varchar(50) NOT NULL,
  `moregameh` varchar(255) NOT NULL,
  `fenxiang` varchar(20) NOT NULL,
  `fenxiangi` varchar(255) NOT NULL,
  `fenxiangc` varchar(255) NOT NULL,
  PRIMARY KEY  (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of games_my
-- ----------------------------
INSERT INTO `games_my` VALUES ('2', '1', '1', '第一个', '第一个描述', '', '', '/upload/user/2015031572.jpg', 'qmxzfzm', '还有游戏', 'http://www.baidu.com', '0', '0', '0');
INSERT INTO `games_my` VALUES ('13', '2', '1', '拼图', '拼图', '', '', '/upload/user/20150315957.jpg', 'mspt', '', 'http://', '0', '0', '0');
INSERT INTO `games_my` VALUES ('14', '3', '1', '钱', '123', '', '', '/upload/user/20150315895.jpg', 'money', '更多的', 'http://', '0', '0', '0');

-- ----------------------------
-- Table structure for `games_my_info`
-- ----------------------------
DROP TABLE IF EXISTS `games_my_info`;
CREATE TABLE `games_my_info` (
  `gid` int(10) default NULL COMMENT '游戏id',
  `key` varchar(10) default NULL COMMENT '字段名',
  `val` varchar(255) default NULL COMMENT '内容',
  `tp` varchar(10) default 'text' COMMENT '类型'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of games_my_info
-- ----------------------------
INSERT INTO `games_my_info` VALUES ('13', 'text1', '123', 'text');
INSERT INTO `games_my_info` VALUES ('13', 'img1', '/upload/user/20150315722.jpg', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img2', '/upload/user/20150315378.jpg', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img3', '/upload/user/2015031572.png', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img4', '/upload/user/20150315358.png', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img5', '/upload/user/20150315717.jpg', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img6', '/games/mspt/images/6.gif', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img7', '/games/mspt/images/7.gif', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img8', '/games/mspt/images/8.gif', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img9', '/games/mspt/images/9.gif', 'img');
INSERT INTO `games_my_info` VALUES ('13', 'img10', '/games/mspt/images/10.gif', 'img');
INSERT INTO `games_my_info` VALUES ('14', 'text1', '剪刀', 'text');
INSERT INTO `games_my_info` VALUES ('14', 'text2', '给我', 'text');
INSERT INTO `games_my_info` VALUES ('14', 'img1', '/upload/user/20150315233.jpg', 'img');
INSERT INTO `games_my_info` VALUES ('14', 'img2', '/upload/user/20150315577.png', 'img');

-- ----------------------------
-- Table structure for `tab`
-- ----------------------------
DROP TABLE IF EXISTS `tab`;
CREATE TABLE `tab` (
  `name` varchar(55) NOT NULL,
  `tm` int(100) NOT NULL,
  `userid` int(10) NOT NULL,
  `id` int(10) NOT NULL auto_increment,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tab
-- ----------------------------
INSERT INTO `tab` VALUES ('村长来了', '1421374635', '1', '7');
INSERT INTO `tab` VALUES ('testnew', '1421721326', '1', '16');
INSERT INTO `tab` VALUES ('扳子', '1421720792', '1', '14');
INSERT INTO `tab` VALUES ('校花走了', '1421374663', '1', '8');
INSERT INTO `tab` VALUES ('test', '1421744661', '5', '17');
INSERT INTO `tab` VALUES ('彭成', '1421661675', '1', '12');
INSERT INTO `tab` VALUES ('test', '1421771889', '3', '18');
INSERT INTO `tab` VALUES ('搜索', '1425362726', '3', '19');
INSERT INTO `tab` VALUES ('啥啥啥', '1425364251', '3', '24');
INSERT INTO `tab` VALUES ('理想', '1425362836', '3', '23');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(50) default NULL,
  `password` varchar(255) default NULL,
  `admin` int(1) default NULL,
  `id` int(10) NOT NULL auto_increment,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin_qingyingyong', '1233211232321', '1', '1');
INSERT INTO `user` VALUES ('weichen', 'weichen123', '0', '3');
INSERT INTO `user` VALUES ('zongheng', 'zongheng123', '0', '4');
INSERT INTO `user` VALUES ('baidumobile', 'baidumobile123', '0', '5');
