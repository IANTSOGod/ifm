-- phpMyAdmin SQL Dump
-- version 5.2.1-2.fc39
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 08 nov. 2024 à 12:25
-- Version du serveur : 10.5.25-MariaDB
-- Version de PHP : 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ifm`
--

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `image_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `pub_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`image_id`, `image`, `pub_id`) VALUES
(2, 'http://192.168.1.152:3000/images/ventura.jpg', 7),
(3, 'http://192.168.1.152:3000/images/monterey.png', 6);

-- --------------------------------------------------------

--
-- Structure de la table `lecture`
--

CREATE TABLE `lecture` (
  `lect_id` int(11) NOT NULL,
  `notif_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `notif_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pub_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`notif_id`, `user_id`, `pub_id`) VALUES
(1, 1, 9),
(2, 1, 10),
(3, 1, 11),
(4, 1, 12),
(5, 1, 13),
(6, 1, 14);

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `pub_id` int(11) NOT NULL,
  `titre` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `zone` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entreprise` varchar(50) DEFAULT 'Aucun'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`pub_id`, `titre`, `description`, `date`, `zone`, `user_id`, `entreprise`) VALUES
(5, 'Viol hafa', 'Nisy nanolana t@ fomba feno abibiana', '2024-11-06 09:58:48', 'Antananarivo renivohitra', 1, 'Aucun'),
(6, 'Lasa', 'Mbol mety', '2024-11-06 13:36:57', 'Ambohidratrimo', 2, 'Aucun'),
(7, 'Hafa indray', 'Mbol mety fon ve', '2024-11-06 13:57:35', 'Ambohidratrimo', 2, 'Aucun'),
(8, 'haiifi', 'aifanooo haoho', '2024-11-06 14:39:07', 'Tamatave', 10, 'Aucun'),
(9, 'Ceci est un test', 'aonfonanofnaonfonoafno gugu', '2024-11-08 10:29:52', 'Antananarivo alanlamanga', 1, 'Aucun'),
(10, 'yguyy', 'gyxfiioogg hjvjcjcj', '2024-11-08 12:14:09', 'gcyfuju', 1, 'hhxiiig'),
(11, 'yguyy', 'gyxfiioogg hjvjcjcj', '2024-11-08 12:14:51', 'gcyfuju', 1, 'hhxiiig'),
(12, 'yffg', 'jxiobiuuj', '2024-11-08 12:17:00', 'hxj', 1, 'yhdd'),
(13, 'gghj', 'tdjkycyc vhhhg', '2024-11-08 12:19:12', 'ydtsyt', 1, 'hhhgg'),
(14, '', 'hsgskzv. sknsbsnsnsnsns', '2024-11-08 12:23:11', '', 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `reaction`
--

CREATE TABLE `reaction` (
  `react_id` int(11) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `pub_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `reaction`
--

INSERT INTO `reaction` (`react_id`, `type`, `user_id`, `pub_id`) VALUES
(3, '1', 1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `temoignage`
--

CREATE TABLE `temoignage` (
  `tem_id` int(11) NOT NULL,
  `corps` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `pub_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `temoignage`
--

INSERT INTO `temoignage` (`tem_id`, `corps`, `date`, `pub_id`, `user_id`) VALUES
(12, 'Lasa ndray Brice sy le Google', '2024-11-08 10:25:24', 7, 1),
(13, 'aaaaa', '2024-11-08 10:25:40', 7, 1),
(14, 'Daika Iantso', '2024-11-08 10:25:55', 7, 15),
(15, 'Aiza ela le', '2024-11-08 10:29:21', 7, 15),
(16, 'Test Be', '2024-11-08 10:44:42', 7, 1),
(17, 'Vody', '2024-11-08 10:48:46', 9, 15),
(18, 'Andrana ', '2024-11-08 10:49:26', 9, 15),
(19, 'Vetivety ', '2024-11-08 10:51:10', 6, 15),
(20, 'Analakely ', '2024-11-08 11:14:00', 5, 15);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `mdp` varchar(30) NOT NULL,
  `num_phone` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `CIN` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `username`, `mdp`, `num_phone`, `email`, `CIN`) VALUES
(1, 'iantso', 'IANTSOGod', '0344134111', 'iantsochristianrazafindrazaka@gmail.com', NULL),
(2, 'Test', 'mety', NULL, NULL, NULL),
(9, 'iantso1', '123456', NULL, NULL, NULL),
(10, 'iantso2', '123456', NULL, NULL, NULL),
(11, 'iantso3', '123456', NULL, NULL, NULL),
(12, 'iantso4', '123456', NULL, NULL, NULL),
(13, 'iantso5', '123456', NULL, NULL, NULL),
(15, 'Brice Privat', 'FtcLoE!j', NULL, 'briceprivat292@gmail.com', NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `pub_id` (`pub_id`);

--
-- Index pour la table `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`lect_id`),
  ADD KEY `notif_id` (`notif_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pub_id` (`pub_id`);

--
-- Index pour la table `publication`
--
ALTER TABLE `publication`
  ADD PRIMARY KEY (`pub_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `reaction`
--
ALTER TABLE `reaction`
  ADD PRIMARY KEY (`react_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pub_id` (`pub_id`);

--
-- Index pour la table `temoignage`
--
ALTER TABLE `temoignage`
  ADD PRIMARY KEY (`tem_id`),
  ADD KEY `pub_id` (`pub_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `lecture`
--
ALTER TABLE `lecture`
  MODIFY `lect_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `publication`
--
ALTER TABLE `publication`
  MODIFY `pub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `reaction`
--
ALTER TABLE `reaction`
  MODIFY `react_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `temoignage`
--
ALTER TABLE `temoignage`
  MODIFY `tem_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`);

--
-- Contraintes pour la table `lecture`
--
ALTER TABLE `lecture`
  ADD CONSTRAINT `lecture_ibfk_1` FOREIGN KEY (`notif_id`) REFERENCES `notification` (`notif_id`),
  ADD CONSTRAINT `lecture_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`);

--
-- Contraintes pour la table `publication`
--
ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `reaction`
--
ALTER TABLE `reaction`
  ADD CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`);

--
-- Contraintes pour la table `temoignage`
--
ALTER TABLE `temoignage`
  ADD CONSTRAINT `temoignage_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`),
  ADD CONSTRAINT `temoignage_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
