-- phpMyAdmin SQL Dump
-- version 5.2.1-2.fc39
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 07 nov. 2024 à 13:13
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
(2, 'http://192.168.214.89:3000/images/ventura.jpg', 7),
(3, 'http://192.168.214.89:3000/images/monterey.png', 6);

-- --------------------------------------------------------

--
-- Structure de la table `publication`
--

CREATE TABLE `publication` (
  `pub_id` int(11) NOT NULL,
  `titre` varchar(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `zone` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `publication`
--

INSERT INTO `publication` (`pub_id`, `titre`, `description`, `date`, `zone`, `user_id`) VALUES
(5, 'Viol hafa', 'Nisy nanolana t@ fomba feno abibiana', '2024-11-06 09:58:48', 'Antananarivo renivohitra', 1),
(6, 'Lasa', 'Mbol mety', '2024-11-06 13:36:57', 'Ambohidratrimo', 2),
(7, 'Hafa indray', 'Mbol mety fon ve', '2024-11-06 13:57:35', 'Ambohidratrimo', 2),
(8, 'haiifi', 'aifanooo haoho', '2024-11-06 14:39:07', 'Tamatave', 10);

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
  `date` datetime NOT NULL,
  `pub_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
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
(13, 'iantso5', '123456', NULL, NULL, NULL);

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
-- AUTO_INCREMENT pour la table `publication`
--
ALTER TABLE `publication`
  MODIFY `pub_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `reaction`
--
ALTER TABLE `reaction`
  MODIFY `react_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `temoignage`
--
ALTER TABLE `temoignage`
  MODIFY `tem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`pub_id`) REFERENCES `publication` (`pub_id`);

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
