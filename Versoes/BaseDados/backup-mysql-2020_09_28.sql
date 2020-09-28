-- MySQL dump 10.16  Distrib 10.1.19-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `db_condominio`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `db_condominio` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_condominio`;

--
-- Table structure for table `caixa`
--

DROP TABLE IF EXISTS `caixa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caixa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(250) NOT NULL,
  `entrada` int(11) NOT NULL,
  `saida` int(11) NOT NULL,
  `saldo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `datainsercao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caixa`
--

LOCK TABLES `caixa` WRITE;
/*!40000 ALTER TABLE `caixa` DISABLE KEYS */;
/*!40000 ALTER TABLE `caixa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquete`
--

DROP TABLE IF EXISTS `enquete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquete` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_ini` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `assunto` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL,
  `data_criacao` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquete`
--

LOCK TABLES `enquete` WRITE;
/*!40000 ALTER TABLE `enquete` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquete_votos`
--

DROP TABLE IF EXISTS `enquete_votos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enquete_votos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_enquete` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `tipo_voto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id_enquete` (`id_enquete`),
  KEY `idx_id_usuarios` (`id_usuario`),
  CONSTRAINT `fk_id_enquete` FOREIGN KEY (`id_enquete`) REFERENCES `enquete` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquete_votos`
--

LOCK TABLES `enquete_votos` WRITE;
/*!40000 ALTER TABLE `enquete_votos` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquete_votos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moradores`
--

DROP TABLE IF EXISTS `moradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `moradores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `apto` varchar(250) NOT NULL,
  `bloco` varchar(250) NOT NULL,
  `tipo` varchar(250) NOT NULL,
  `contato` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moradores`
--

LOCK TABLES `moradores` WRITE;
/*!40000 ALTER TABLE `moradores` DISABLE KEYS */;
INSERT INTO `moradores` VALUES (1,'Jose Caetano Faganello','103','A','','41988000910','jose.caetano.f@gmail.com');
/*!40000 ALTER TABLE `moradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ocorrencias`
--

DROP TABLE IF EXISTS `ocorrencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ocorrencias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_ini` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL,
  `responsavel` varchar(250) NOT NULL,
  `notificacao` varchar(10000) NOT NULL,
  `tratamento` varchar(10000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocorrencias`
--

LOCK TABLES `ocorrencias` WRITE;
/*!40000 ALTER TABLE `ocorrencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `ocorrencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamentos`
--

DROP TABLE IF EXISTS `pagamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `status` varchar(250) NOT NULL,
  `periodo_referencia` date NOT NULL,
  `valor` float NOT NULL,
  `data_atualizacao` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_id_usuario` (`id_usuario`),
  CONSTRAINT `fk_id_usuarios_` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamentos`
--

LOCK TABLES `pagamentos` WRITE;
/*!40000 ALTER TABLE `pagamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarefas`
--

DROP TABLE IF EXISTS `tarefas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarefas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(250) NOT NULL,
  `data_ini` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `data_atualizacao` datetime NOT NULL,
  `status` varchar(250) NOT NULL,
  `responsavel` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarefas`
--

LOCK TABLES `tarefas` WRITE;
/*!40000 ALTER TABLE `tarefas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarefas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidade`
--

DROP TABLE IF EXISTS `unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identificacao` varchar(250) NOT NULL,
  `bloco` varchar(250) NOT NULL,
  `garagem` varchar(250) NOT NULL,
  `veiculo` varchar(250) NOT NULL,
  `proprietario` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidade`
--

LOCK TABLES `unidade` WRITE;
/*!40000 ALTER TABLE `unidade` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `tipo` varchar(250) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(250) NOT NULL,
  `cpf` int(11) NOT NULL,
  `rg` int(11) NOT NULL,
  `apto` varchar(250) NOT NULL,
  `bloco` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Jose Caetano Faganello','Morador','Polska51','jose.caetano.f@gmail.com','4188000910',1385988002,1099946137,'103','A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vagas`
--

DROP TABLE IF EXISTS `vagas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vagas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_ini` datetime NOT NULL,
  `data_fim` datetime NOT NULL,
  `motivo` varchar(10000) NOT NULL,
  `responsavel` varchar(250) NOT NULL,
  `status` varchar(250) NOT NULL,
  `notificacao` varchar(10000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vagas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_condominio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-28 19:23:32
