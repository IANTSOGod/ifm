-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: ifm
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `pub_id` int NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `pub_id` (`pub_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (2,'http://192.168.43.41:3000/images/ventura.jpg',7),(3,'http://192.168.43.41:3000/images/monterey.png',6);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecture`
--

DROP TABLE IF EXISTS `lecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecture` (
  `lect_id` int NOT NULL AUTO_INCREMENT,
  `notif_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`lect_id`),
  KEY `notif_id` (`notif_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`notif_id`) REFERENCES `notification` (`notif_id`),
  CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecture`
--

LOCK TABLES `lecture` WRITE;
/*!40000 ALTER TABLE `lecture` DISABLE KEYS */;
/*!40000 ALTER TABLE `lecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `notif_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `pub_id` int DEFAULT NULL,
  PRIMARY KEY (`notif_id`),
  KEY `user_id` (`user_id`),
  KEY `pub_id` (`pub_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (13,15,21);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `pub_id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `zone` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  `entreprise` varchar(50) DEFAULT 'Aucun',
  PRIMARY KEY (`pub_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` VALUES (6,'Lasa','Mbol mety','2024-11-06 13:36:57','Ambohidratrimo',2,'Aucun'),(7,'Hafa indray','Mbol mety fon ve','2024-11-06 13:57:35','Ambohidratrimo',2,'Aucun'),(8,'haiifi','aifanooo haoho','2024-11-06 14:39:07','Tamatave',10,'Aucun'),(21,'Mianatra ','Mianatra izahay','2024-11-09 15:49:58','Fianarana ',15,'MIT');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reaction`
--

DROP TABLE IF EXISTS `reaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reaction` (
  `react_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `user_id` int NOT NULL,
  `pub_id` int NOT NULL,
  PRIMARY KEY (`react_id`),
  KEY `user_id` (`user_id`),
  KEY `pub_id` (`pub_id`),
  CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reaction`
--

LOCK TABLES `reaction` WRITE;
/*!40000 ALTER TABLE `reaction` DISABLE KEYS */;
INSERT INTO `reaction` VALUES (59,NULL,15,6),(64,NULL,15,21);
/*!40000 ALTER TABLE `reaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temoignage`
--

DROP TABLE IF EXISTS `temoignage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temoignage` (
  `tem_id` int NOT NULL AUTO_INCREMENT,
  `corps` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pub_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`tem_id`),
  KEY `pub_id` (`pub_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `temoignage_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`),
  CONSTRAINT `temoignage_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temoignage`
--

LOCK TABLES `temoignage` WRITE;
/*!40000 ALTER TABLE `temoignage` DISABLE KEYS */;
INSERT INTO `temoignage` VALUES (12,'Lasa ndray Brice sy le Google','2024-11-08 10:25:24',7,1),(13,'aaaaa','2024-11-08 10:25:40',7,1),(14,'Daika Iantso','2024-11-08 10:25:55',7,15),(15,'Aiza ela le','2024-11-08 10:29:21',7,15),(16,'Test Be','2024-11-08 10:44:42',7,1),(19,'Vetivety ','2024-11-08 10:51:10',6,15),(23,'Violet ilay sary','2024-11-09 15:07:34',6,15);
/*!40000 ALTER TABLE `temoignage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `mdp` varchar(30) NOT NULL,
  `num_phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `CIN` varchar(30) DEFAULT NULL,
  `verif` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'iantso','IANTSOGod','0344134111','iantsochristianrazafindrazaka@gmail.com',NULL,1),(2,'Test','mety',NULL,NULL,NULL,1),(9,'iantso1','123456',NULL,NULL,NULL,1),(10,'iantso2','123456',NULL,NULL,NULL,1),(11,'iantso3','123456',NULL,NULL,NULL,1),(12,'iantso4','123456',NULL,NULL,NULL,1),(13,'iantso5','123456',NULL,NULL,NULL,1),(15,'Brice Privat','FtcLoE!j',NULL,'briceprivat292@gmail.com',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 21:23:39
