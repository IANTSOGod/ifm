-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS image CASCADE;
DROP TABLE IF EXISTS lecture CASCADE;
DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS publication CASCADE;
DROP TABLE IF EXISTS reaction CASCADE;
DROP TABLE IF EXISTS temoignage CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Création de la table user
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    mdp VARCHAR(30) NOT NULL,
    num_phone VARCHAR(10),
    email VARCHAR(50),
    CIN VARCHAR(30),
    verif BOOLEAN DEFAULT TRUE
);

-- Création de la table publication
CREATE TABLE publication (
    pub_id SERIAL PRIMARY KEY,
    titre VARCHAR(30) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    zone VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    entreprise VARCHAR(50) DEFAULT 'Aucun',
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

-- Création de la table notification
CREATE TABLE notification (
    notif_id SERIAL PRIMARY KEY,
    user_id INT,
    pub_id INT,
    FOREIGN KEY (user_id) REFERENCES "user" (user_id),
    FOREIGN KEY (pub_id) REFERENCES publication (pub_id)
);

-- Création de la table image
CREATE TABLE image (
    image_id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    pub_id INT NOT NULL,
    FOREIGN KEY (pub_id) REFERENCES publication (pub_id)
);

-- Création de la table lecture
CREATE TABLE lecture (
    lect_id SERIAL PRIMARY KEY,
    notif_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (notif_id) REFERENCES notification (notif_id),
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);

-- Création de la table reaction
CREATE TABLE reaction (
    react_id SERIAL PRIMARY KEY,
    type VARCHAR(20),
    user_id INT NOT NULL,
    pub_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user" (user_id),
    FOREIGN KEY (pub_id) REFERENCES publication (pub_id)
);

-- Création de la table temoignage
CREATE TABLE temoignage (
    tem_id SERIAL PRIMARY KEY,
    corps VARCHAR(255),
    date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pub_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (pub_id) REFERENCES publication (pub_id),
    FOREIGN KEY (user_id) REFERENCES "user" (user_id)
);
