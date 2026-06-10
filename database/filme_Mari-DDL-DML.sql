DROP DATABASE IF EXISTS filme_mari;
CREATE DATABASE filme_mari;
USE filme_mari;

-- ==============================================
-- TABELAS BÁSICAS
-- ==============================================

CREATE TABLE pais (
  id_pais INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE genero (
  id_genero INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE linguagem (
  id_linguagem INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE categoria (
  id_categoria INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE produtora (
  id_produtora INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

-- ==============================================
-- PESSOAS
-- ==============================================

CREATE TABLE ator (
  id_ator INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  id_genero INT NOT NULL,
  FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);

CREATE TABLE diretor (
  id_diretor INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  id_genero INT NOT NULL,
  FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);

-- ==============================================
-- USUÁRIOS
-- (criado antes de filme pois filme referencia usuario)
-- ==============================================

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255),
  apelido VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  data_nascimento DATE,
  imagem VARCHAR(500),
  role ENUM('admin','user') NOT NULL DEFAULT 'user',
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================
-- FILME
-- (após usuario para poder referenciar id_usuario_criador)
-- ==============================================

CREATE TABLE filme (
  id_filme INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  id_produtora_principal INT,
  orcamento DECIMAL(15,2),
  duracao TIME,
  sinopse LONGTEXT,
  ano INT,
  poster VARCHAR(255),
  banner VARCHAR(255),
  flag BOOLEAN,
  id_usuario_criador INT,
  FOREIGN KEY (id_produtora_principal) REFERENCES produtora(id_produtora),
  FOREIGN KEY (id_usuario_criador) REFERENCES usuario(id_usuario)
);

-- ==============================================
-- PAÍSES DAS PESSOAS E PRODUTORAS
-- ==============================================

CREATE TABLE ator_pais (
  id_ator_pais INT PRIMARY KEY AUTO_INCREMENT,
  id_ator INT NOT NULL,
  id_pais INT NOT NULL,
  FOREIGN KEY (id_ator) REFERENCES ator(id_ator),
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

CREATE TABLE diretor_pais (
  id_diretor_pais INT PRIMARY KEY AUTO_INCREMENT,
  id_pais INT NOT NULL,
  id_diretor INT NOT NULL,
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais),
  FOREIGN KEY (id_diretor) REFERENCES diretor(id_diretor)
);

CREATE TABLE produtora_pais (
  id_produtora_pais INT PRIMARY KEY AUTO_INCREMENT,
  id_produtora INT NOT NULL,
  id_pais INT NOT NULL,
  FOREIGN KEY (id_produtora) REFERENCES produtora(id_produtora),
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

-- ==============================================
-- RELACIONAMENTOS N:N
-- (criados após filme)
-- ==============================================

CREATE TABLE filme_produtora (
  id_filme_produtora INT PRIMARY KEY AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_produtora INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_produtora) REFERENCES produtora(id_produtora)
);

CREATE TABLE filme_pais (
  id_filme_pais INT AUTO_INCREMENT PRIMARY KEY,
  id_filme INT NOT NULL,
  id_pais INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_pais) REFERENCES pais(id_pais)
);

CREATE TABLE filme_categoria (
  id_filme_categoria INT PRIMARY KEY AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_categoria INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE filme_ator (
  id_filme_ator INT PRIMARY KEY AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_ator INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_ator) REFERENCES ator(id_ator)
);

CREATE TABLE filme_diretor (
  id_filme_diretor INT PRIMARY KEY AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_diretor INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_diretor) REFERENCES diretor(id_diretor)
);

CREATE TABLE filme_linguagem (
  id_filme_linguagem INT PRIMARY KEY AUTO_INCREMENT,
  id_filme INT NOT NULL,
  id_linguagem INT NOT NULL,
  FOREIGN KEY (id_filme) REFERENCES filme(id_filme),
  FOREIGN KEY (id_linguagem) REFERENCES linguagem(id_linguagem)
);

-- ==============================================
-- DADOS: PAÍSES
-- ==============================================

INSERT INTO pais (nome) VALUES
('Estados Unidos'), ('Reino Unido'), ('Japão'),
('Canadá'), ('França'), ('Alemanha'),
('Brasil'), ('Nova Zelândia'), ('Coreia do Sul'),
('Espanha'), ('México'), ('Chile'),
('Italia'), ('Suécia'), ('Ucrânia'), ('Austrália'),
('Guatemala');

-- ==============================================
-- DADOS: GÊNEROS
-- ==============================================

INSERT INTO genero (nome) VALUES
('Masculino'), ('Feminino'), ('Não-binario');

-- ==============================================
-- DADOS: LINGUAGENS
-- ==============================================

INSERT INTO linguagem (nome) VALUES
('Inglês'), ('Japonês'), ('Português'), ('Francês'), ('Espanhol'),
('Dinamarquês'), ('Romeno'), ('Romani'), ('Russo'),
('Latim'), ('Alemão'), ('Italiano'), ('Chines'), ('Coreano'),
('Xhosa'), ('Húngaro'), ('Tagalo'), ('Mandarim');

-- ==============================================
-- DADOS: CATEGORIAS
-- ==============================================

-- id  1=Ação, 2=Aventura, 3=Animação, 4=Comédia, 5=Crime, 6=Drama,
--     7=Fantasia, 8=Ficção Científica, 9=Gótico, 10=Musical, 11=Neo-noir,
--    12=Romance, 13=Super-herói, 14=Suspense, 15=Terror, 16=Thriller

INSERT INTO categoria (nome) VALUES
('Ação'), ('Aventura'), ('Animação'), ('Comédia'), ('Crime'), ('Drama'),
('Fantasia'), ('Ficção Científica'), ('Gótico'), ('Musical'), ('Neo-noir'),
('Romance'), ('Super-herói'), ('Suspense'), ('Terror'), ('Thriller');

-- ==============================================
-- DADOS: PRODUTORAS
-- id  1=Walt Disney Pictures,   2=Studio Ghibli,        3=Regency Enterprises,
--     4=Millenium Films,        5=6th & Idaho,           6=Warner Bros.,
--     7=Proximity Media,        8=Netflix,               9=Lakeshore Entertainment,
--    10=20th Century Fox,      11=Marvel Studios,       12=Paramount Pictures,
--    13=Thunder Road Pictures, 14=Legendary Pictures,  15=Pixar Animation Studios,
--    16=Sony Pictures,         17=Focus Features,       18=Tim Burton Productions
-- ==============================================

INSERT INTO produtora (nome) VALUES
('Walt Disney Pictures'),     -- 1
('Studio Ghibli'),            -- 2
('Regency Enterprises'),      -- 3
('Millenium Films'),          -- 4
('6th & Idaho'),              -- 5
('Warner Bros.'),             -- 6
('Proximity Media'),          -- 7
('Netflix'),                  -- 8
('Lakeshore Entertainment'),  -- 9
('20th Century Fox'),         -- 10
('Marvel Studios'),           -- 11
('Paramount Pictures'),       -- 12
('Thunder Road Pictures'),    -- 13
('Legendary Pictures'),       -- 14
('Pixar Animation Studios'),  -- 15
('Sony Pictures'),            -- 16
('Focus Features'),           -- 17
('Tim Burton Productions');   -- 18

-- ==============================================
-- DADOS: ATORES
-- ==============================================

INSERT INTO ator (nome, sobrenome, id_genero) VALUES
('Kristen', 'Stewart', 2),        -- 1
('Robert', 'Pattinson', 1),       -- 2
('Taylor', 'Lautner', 1),         -- 3
('Yōji', 'Matsuda', 1),           -- 4
('Yuriko', 'Ishida', 2),          -- 5
('Yūko', 'Tanaka', 2),            -- 6
('Bill', 'Skarsgård', 1),         -- 7
('Lily-Rose', 'Depp', 2),         -- 8
('Nicholas', 'Hoult', 1),         -- 9
('David', 'Harbour', 1),          -- 10
('Milla', 'Jovovich', 2),         -- 11
('Zoë', 'Kravitz', 2),            -- 12
('Paul', 'Dano', 1),              -- 13
('David', 'Corenswet', 1),        -- 14
('Rachel', 'Brosnahan', 2),       -- 15
('Milly', 'Alcock', 2),           -- 16
('Michael', 'B. Jordan', 1),      -- 17
('Hailee', 'Steinfeld', 2),       -- 18
('Oscar', 'Isaac', 1),            -- 19
('Jacob', 'Elordi', 1),           -- 20
('Mia', 'Goth', 2),               -- 21
('Jason', 'Statham', 1),          -- 22
('Amy', 'Smart', 2),              -- 23
('Nicole', 'Kidman', 2),          -- 24
('Ewan', 'McGregor', 1),          -- 25
('Robert', 'Downey Jr.', 1),      -- 26
('Chris', 'Evans', 1),            -- 27
('Mark', 'Ruffalo', 1),           -- 28
('Chris', 'Hemsworth', 1),        -- 29
('Scarlett', 'Johansson', 2),     -- 30
('Matthew', 'McConaughey', 1),    -- 31
('Anne', 'Hathaway', 2),          -- 32
('Keanu', 'Reeves', 1),           -- 33
('Michael', 'Nyqvist', 1),        -- 34
('Chieko', 'Baishô', 2),          -- 35
('Takuya', 'Kimura', 1),          -- 36
('Akihiro', 'Miwa', 1),           -- 37
('Tom', 'Holland', 1),            -- 38
('Zendaya', '', 2),               -- 39
('Benedict', 'Cumberbatch', 1),   -- 40
('Margot', 'Robbie', 2),          -- 41
('Ryan', 'Gosling', 1),           -- 42
('America', 'Ferrera', 2),        -- 43
('Ryan', 'Reynolds', 1),          -- 44
('Morena', 'Baccarin', 2),        -- 45
('Timothée', 'Chalamet', 1),      -- 46
('Rebecca', 'Ferguson', 2),       -- 47
('Laurence', 'Fishburne', 1),     -- 48
('Carrie-Anne', 'Moss', 2),       -- 49
('Arden', 'Cho', 2),              -- 50
('May', 'Hong', 2),               -- 51
('Ji-young', 'Yoo', 2),           -- 52
('Tom', 'Hardy', 1),              -- 53  Venom
('Michelle', 'Williams', 2),      -- 54  Venom
('Tessa', 'Thompson', 2),         -- 55  Thor Ragnarok
('Cate', 'Blanchett', 2),         -- 56  Thor Ragnarok
('Hugh', 'Jackman', 1),           -- 57  Deadpool & Wolverine
('Emily', 'Blunt', 2),            -- 58  A Noiva Cadáver / Big Hero
('Helena', 'Bonham Carter', 2),   -- 59  A Noiva Cadáver
('Johnny', 'Depp', 1),            -- 60  A Noiva Cadáver
('Tobey', 'Maguire', 1),          -- 61  Homem-Aranha 3
('Kirsten', 'Dunst', 2),          -- 62  Homem-Aranha 3
('Daisuke', 'Namikawa', 1),       -- 63  Big Hero 6
('Genesis', 'Rodriguez', 2),      -- 64  Big Hero 6
('Yuki', 'Kaji', 1),              -- 65  Black Clover / Demon Slayer
('Natsuki', 'Hanae', 1),          -- 66  Demon Slayer
('Chiaki', 'Omigawa', 2),         -- 67  O Castelo Animado (já tem atores Ghibli)
('Jenna', 'Ortega', 2),           -- 68  Coraline / outros
('Dakota', 'Fanning', 2),         -- 69  Coraline
('Teri', 'Hatcher', 2),           -- 70  Coraline
('Edward', 'Norton', 1),          -- 71  Jujutsu Kaisen
('Joe', 'Taslim', 1),             -- 72  Elementos
('Leah', 'Lewis', 2),             -- 73  Elementos
('Mamoudou', 'Athie', 1),         -- 74  Elementos
('Aaron', 'Pierre', 1),           -- 75  Mufasa
('Kelvin', 'Harrison Jr.', 1),    -- 76  Mufasa
('Brad', 'Garrett', 1),           -- 77  Ratatouille
('Lou', 'Romano', 1),             -- 78  Ratatouille
('Paul', 'Giamatti', 1),          -- 79  Ratatouille
('Ben', 'Burtt', 1),              -- 80  WALL-E
('Elissa', 'Knight', 2),          -- 81  WALL-E
('Ed', 'Asner', 1),               -- 82  Up
('Jordan', 'Nagai', 1),           -- 83  Up
('Ginnifer', 'Goodwin', 2),       -- 84  Zootopia 2
('Jason', 'Bateman', 1),          -- 85  Zootopia 2
('Ryunosuke', 'Kamiki', 1),       -- 86  As Memórias de Marnie
('Sara', 'Takatsuki', 2);         -- 87  As Memórias de Marnie

-- ==============================================
-- DADOS: DIRETORES
-- ==============================================

INSERT INTO diretor (nome, sobrenome, id_genero) VALUES
('Catherine', 'Hardwicke', 2),   -- 1
('Hayao', 'Miyazaki', 1),        -- 2
('Robert', 'Eggers', 1),         -- 3
('Neil', 'Marshall', 1),         -- 4
('Matt', 'Reeves', 1),           -- 5
('James', 'Gunn', 1),            -- 6
('Ryan', 'Coogler', 1),          -- 7
('Guillermo', 'del Toro', 1),    -- 8
('Mark', 'Neveldine', 1),        -- 9
('Brian', 'Taylor', 1),          -- 10
('Baz', 'Luhrmann', 1),          -- 11
('Anthony', 'Russo', 1),         -- 12
('Joe', 'Russo', 1),             -- 13
('Christopher', 'Nolan', 1),     -- 14
('Chad', 'Stahelski', 1),        -- 15
('Jon', 'Watts', 1),             -- 16
('Greta', 'Gerwig', 2),          -- 17
('Tim', 'Miller', 1),            -- 18
('Denis', 'Villeneuve', 1),      -- 19
('Lana', 'Wachowski', 2),        -- 20
('Lilly', 'Wachowski', 2),       -- 21
('Maggie', 'Kang', 2),           -- 22
('Chris', 'Appelhans', 1),       -- 23
('Ruben', 'Fleischer', 1),       -- 24  Venom
('Taika', 'Waititi', 1),         -- 25  Thor Ragnarok
('Shawn', 'Levy', 1),            -- 26  Deadpool & Wolverine
('Sam', 'Raimi', 1),             -- 27  Homem-Aranha 3
('Don', 'Hall', 1),              -- 28  Big Hero 6
('Chris', 'Williams', 1),        -- 29  Big Hero 6
('Hiroyuki', 'Tabata', 1),       -- 30  Black Clover
('Haruo', 'Sotozaki', 1),        -- 31  Demon Slayer
('Pete', 'Docter', 1),           -- 32  Up / Elementos
('Andrew', 'Stanton', 1),        -- 33  WALL-E
('Henry', 'Selick', 1),          -- 34  Coraline
('Tim', 'Burton', 1),            -- 35  A Noiva Cadáver
('Mike', 'Johnson', 1),          -- 36  A Noiva Cadáver
('Brad', 'Bird', 1),             -- 37  Ratatouille
('Barry', 'Jenkins', 1),         -- 38  Mufasa
('Rich', 'Moore', 1),            -- 39  Zootopia 2
('Byron', 'Howard', 1),          -- 40  Zootopia 2
('Aaron', 'Blaise', 1),          -- 41  Irmão Urso
('Robert', 'Walker', 1),         -- 42  Irmão Urso
('Hiroyuki', 'Morita', 1),       -- 43  As Memórias de Marnie
('Hiromasa', 'Yonebayashi', 1),  -- 44  As Memórias de Marnie
('Dan', 'Scanlon', 1),           -- 45  Universidade Monstros
('Kenichi', 'Suzuki', 1),        -- 46  Tokyo Ghoul / Jujutsu Kaisen
('Shota', 'Umehara', 1),         -- 47  Chainsaw Man
('Cate', 'Shortland', 2);        -- 48  Viúva Negra

-- ==============================================
-- USUÁRIOS
-- ==============================================

INSERT INTO usuario (nome, sobrenome, apelido, email, senha, data_nascimento, imagem, role)
VALUES (
  'mariany', 'morais', 'mari',
  'admin@example.com',
  SHA2('admin', 256),
  '1995-03-18', 'imagem', 'admin'
);

INSERT INTO usuario (nome, sobrenome, apelido, email, senha, data_nascimento, imagem, role)
VALUES (
  'mariany', 'morais', 'mari',
  'usuario@mail.com',
  SHA2('123456', 256),
  '1995-03-18', 'imagem', 'user'
);

-- ==============================================
-- DADOS: FILMES  (25 filmes)
-- ==============================================
-- Mapa de produtoras usadas:
--  id 1  = Walt Disney Pictures
--  id 2  = Studio Ghibli
--  id 8  = Netflix
--  id 11 = Marvel Studios
--  id 15 = Pixar Animation Studios
--  id 16 = Sony Pictures
--  id 17 = Focus Features
--  id 18 = Tim Burton Productions

INSERT INTO filme (titulo, id_produtora_principal, orcamento, duracao, sinopse, ano, poster, banner, flag) VALUES
-- 1
('Venom', 16, 116000000, '02:20:00',
 'Eddie Brock é um jornalista investigativo que acaba se tornando hospedeiro de um simbionte alienígena extremamente poderoso. Enquanto tenta controlar a criatura dentro de si, Eddie descobre habilidades sobrenaturais e enfrenta ameaças perigosas.',
 2018, 'venom.png', 'venombanner.png', TRUE),
-- 2
('Thor Ragnarok', 11, 180000000, '02:10:00',
 'Thor precisa escapar do planeta Sakaar e impedir a destruição de Asgard enquanto enfrenta a poderosa Hela.',
 2017, 'thor.png', 'thorbanner.jpg', TRUE),
-- 3
('Deadpool & Wolverine', 11, 200000000, '02:08:00',
 'Deadpool é recrutado pela Autoridade de Variância Temporal e acaba se unindo a Wolverine em uma missão que ameaça múltiplas realidades do multiverso.',
 2024, 'deadpool.png', 'deadpoolbanner.jpg', TRUE),
-- 4
('Homem-Aranha 3', 16, 258000000, '02:19:00',
 'Peter Parker enfrenta novos inimigos enquanto lida com o simbionte alienígena que influencia sua personalidade.',
 2007, 'spiderman3.png', 'spiderman3banner.jpg', TRUE),
-- 5
('Operação Big Hero', 1, 165000000, '01:42:00',
 'Hiro Hamada é um jovem gênio da robótica que perde seu irmão em um acidente trágico. Ao lado do robô inflável Baymax e de seus amigos, ele forma uma equipe de heróis tecnológicos para desvendar uma conspiração que ameaça a cidade de San Fransokyo.',
 2014, 'bighero.png', 'bigherobanner.jpg', TRUE),
-- 6
('Black Clover', 8, 0, '00:24:00',
 'Asta sonha em se tornar o Rei Mago mesmo sem possuir magia em um mundo onde praticamente todos possuem poderes mágicos.',
 2017, 'black.png', 'blackbanner.jpg', TRUE),
-- 7
('O Castelo Animado', 2, 24000000, '01:59:00',
 'Sophie é transformada em uma senhora idosa por uma bruxa e encontra abrigo no castelo ambulante do misterioso mago Howl.',
 2004, 'castelo.png', 'castelobanner.jpg', TRUE),
-- 8
('Chainsaw Man', 8, 0, '00:24:00',
 'Denji vive na pobreza até se fundir com seu demônio de estimação Pochita e se tornar o poderoso Chainsaw Man.',
 2022, 'chainsaw.png', 'chainsawbanner.jpg', TRUE),
-- 9
('A Viagem de Chihiro', 2, 19000000, '02:05:00',
 'Uma garota de dez anos entra em um mundo mágico repleto de espíritos e precisa encontrar uma forma de salvar seus pais.',
 2001, 'chihiro.png', 'chihirobanner.jpg', TRUE),
-- 10
('Coraline', 17, 60000000, '01:40:00',
 'Coraline encontra uma realidade alternativa aparentemente perfeita, mas logo descobre os perigos escondidos por trás dela.',
 2009, 'coraline.png', 'coralinebanner.jpg', TRUE),
-- 11
('Demon Slayer', 8, 0, '00:24:00',
 'Tanjiro Kamado entra para uma organização de caçadores de demônios após sua família ser atacada e sua irmã transformada em demônio.',
 2019, 'demon.png', 'demonbanner.jpg', TRUE),
-- 12
('Elementos', 15, 200000000, '01:41:00',
 'Em uma cidade onde os elementos da natureza convivem, Faísca e Gota desenvolvem uma amizade improvável que desafia suas diferenças.',
 2023, 'elementos.png', 'elementosbanner.jpg', TRUE),
-- 13
('O Estranho Mundo de Jack', 1, 18000000, '01:16:00',
 'Jack Skellington, o Rei das Abóboras da Cidade do Halloween, fica entediado com as comemorações de sempre e descobre a Cidade do Natal. Encantado com a novidade, ele decide assumir o controle do Natal, causando uma série de confusões inesperadas.',
 1993, 'jack.png', 'jackbanner.jpg', TRUE),
-- 14
('Jujutsu Kaisen', 8, 0, '00:24:00',
 'Yuji Itadori se envolve no mundo das maldições após consumir um poderoso objeto amaldiçoado e se tornar hospedeiro de Sukuna.',
 2020, 'jujutsu.png', 'jujutsubanner.jpg', TRUE),
-- 15
('As Memórias de Marnie', 2, 11000000, '01:43:00',
 'Anna é uma jovem solitária que passa uma temporada no interior e conhece Marnie, uma garota misteriosa que vive em uma mansão aparentemente abandonada. A amizade entre as duas revela segredos emocionantes sobre família, identidade e pertencimento.',
 2014, 'marnie.png', 'marniebanner.jpg', TRUE),
-- 16
('Universidade Monstros', 15, 200000000, '01:44:00',
 'Antes de se tornarem a dupla inseparável de Monstros S.A., Mike Wazowski e Sulley se conhecem na Universidade Monstros. Entre rivalidades, desafios e amizades inesperadas, eles aprendem importantes lições sobre trabalho em equipe e determinação.',
 2013, 'monstros.png', 'monstrosbanner.jpg', TRUE),
-- 17
('Mufasa: O Rei Leão', 1, 200000000, '01:58:00',
 'Uma jornada pelas origens de Mufasa, mostrando como ele se tornou um dos maiores reis das Terras do Reino.',
 2024, 'mufasa.png', 'mufasabanner.jpg', TRUE),
-- 18
('A Noiva Cadáver', 18, 40000000, '01:17:00',
 'Victor acidentalmente se casa com uma misteriosa noiva do mundo dos mortos e é levado para uma aventura sobrenatural.',
 2005, 'noiva.png', 'noivabanner.jpg', TRUE),
-- 19
('Ratatouille', 15, 150000000, '01:51:00',
 'Remy é um rato apaixonado por culinária que sonha em se tornar um grande chef em Paris.',
 2007, 'ratatouille.png', 'ratatouillebanner.jpg', TRUE),
-- 20
('Viúva Negra', 11, 200000000, '02:14:00',
 'Natasha Romanoff enfrenta partes de seu passado enquanto uma conspiração perigosa ligada ao programa Viúva Negra ressurge.',
 2021, 'viuva.png', 'viuvabanner.jpg', TRUE),
-- 21
('Irmão Urso', 1, 100000000, '01:25:00',
 'Após ser transformado em urso, Kenai embarca em uma jornada de aprendizado sobre amizade, família e respeito à natureza.',
 2003, 'urso.png', 'ursobanner.jpg', TRUE),
-- 22
('Tokyo Ghoul', 8, 0, '00:24:00',
 'Após um encontro fatal, Kaneki se torna meio humano e meio ghoul, precisando sobreviver em um mundo dividido entre as duas espécies.',
 2014, 'tokyo.png', 'tokyobanner.jpg', TRUE),
-- 23
('Up: Altas Aventuras', 15, 175000000, '01:36:00',
 'Um idoso realiza o sonho de viajar para a América do Sul usando milhares de balões presos à sua casa.',
 2009, 'up.png', 'upbanner.jpg', TRUE),
-- 24
('WALL-E', 15, 180000000, '01:38:00',
 'Um pequeno robô encarregado de limpar a Terra passa séculos sozinho até conhecer uma robô exploradora chamada EVA.',
 2008, 'walle.png', 'wallebanner.jpg', TRUE),
-- 25
('Zootopia 2', 1, 200000000, '01:50:00',
 'Judy Hopps e Nick Wilde retornam para uma nova aventura investigativa na moderna cidade de Zootopia.',
 2025, 'zootopia2.png', 'zootopia2banner.jpg', TRUE);

-- ==============================================
-- RELACIONAMENTOS: ATOR_PAIS
-- ==============================================

INSERT INTO ator_pais (id_ator, id_pais) VALUES
(1,  1), (2,  2), (3,  1), (4,  3), (5,  3),
(6,  3), (7,  14),(8,  1), (9,  2), (10, 1),
(11, 15),(12, 1), (13, 1), (14, 1), (15, 1),
(16, 16),(17, 1), (18, 1), (19, 17),(20, 16),
(21, 2), (22, 2), (23, 1), (24, 16),(25, 2),
(26, 1), (27, 1), (28, 1), (29, 16),(30, 1),
(31, 1), (32, 1), (33, 4), (34, 14),(35, 3),
(36, 3), (37, 3), (38, 2), (39, 1), (40, 2),
(41, 16),(42, 4), (43, 1), (44, 1), (45, 7),
(46, 1), (47, 14),(48, 1), (49, 1), (50, 1),
(51, 9), (52, 1),
-- Novos atores:
(53, 2),  -- Tom Hardy          → Reino Unido
(54, 1),  -- Michelle Williams  → EUA
(55, 1),  -- Tessa Thompson     → EUA
(56, 16), -- Cate Blanchett     → Austrália
(57, 16), -- Hugh Jackman       → Austrália
(58, 2),  -- Emily Blunt        → Reino Unido
(59, 2),  -- Helena Bonham Carter → Reino Unido
(60, 1),  -- Johnny Depp        → EUA
(61, 1),  -- Tobey Maguire      → EUA
(62, 1),  -- Kirsten Dunst      → EUA
(63, 3),  -- Daisuke Namikawa   → Japão
(64, 11), -- Genesis Rodriguez  → México (Venezuela/EUA, usando México como ref.)
(65, 3),  -- Yuki Kaji          → Japão
(66, 3),  -- Natsuki Hanae      → Japão
(67, 3),  -- Chiaki Omigawa     → Japão
(68, 1),  -- Jenna Ortega       → EUA
(69, 1),  -- Dakota Fanning     → EUA
(70, 1),  -- Teri Hatcher       → EUA
(71, 1),  -- Edward Norton      → EUA
(72, 9),  -- Joe Taslim         → Coreia do Sul
(73, 1),  -- Leah Lewis         → EUA
(74, 1),  -- Mamoudou Athie     → EUA
(75, 2),  -- Aaron Pierre       → Reino Unido
(76, 1),  -- Kelvin Harrison Jr. → EUA
(77, 1),  -- Brad Garrett       → EUA
(78, 1),  -- Lou Romano         → EUA
(79, 1),  -- Paul Giamatti      → EUA
(80, 1),  -- Ben Burtt          → EUA
(81, 1),  -- Elissa Knight      → EUA
(82, 1),  -- Ed Asner           → EUA
(83, 1),  -- Jordan Nagai       → EUA
(84, 1),  -- Ginnifer Goodwin   → EUA
(85, 1),  -- Jason Bateman      → EUA
(86, 3),  -- Ryunosuke Kamiki   → Japão
(87, 3);  -- Sara Takatsuki     → Japão

-- ==============================================
-- RELACIONAMENTOS: DIRETOR_PAIS
-- ==============================================

INSERT INTO diretor_pais (id_diretor, id_pais) VALUES
(1,  1), (2,  3), (3,  1), (4,  2), (5,  1),
(6,  1), (7,  1), (8,  11),(9,  1), (10, 1),
(11, 16),(12, 1), (13, 1), (14, 2), (15, 1),
(16, 1), (17, 1), (18, 1), (19, 4), (20, 1),
(21, 1), (22, 9), (23, 1),
-- Novos diretores:
(24, 1),  -- Ruben Fleischer    → EUA
(25, 8),  -- Taika Waititi      → Nova Zelândia
(26, 4),  -- Shawn Levy         → Canadá
(27, 1),  -- Sam Raimi          → EUA
(28, 1),  -- Don Hall           → EUA
(29, 1),  -- Chris Williams     → EUA
(30, 3),  -- Hiroyuki Tabata    → Japão
(31, 3),  -- Haruo Sotozaki     → Japão
(32, 1),  -- Pete Docter        → EUA
(33, 1),  -- Andrew Stanton     → EUA
(34, 1),  -- Henry Selick       → EUA
(35, 1),  -- Tim Burton         → EUA
(36, 1),  -- Mike Johnson       → EUA
(37, 1),  -- Brad Bird          → EUA
(38, 1),  -- Barry Jenkins      → EUA
(39, 1),  -- Rich Moore         → EUA
(40, 1),  -- Byron Howard       → EUA
(41, 1),  -- Aaron Blaise       → EUA
(42, 1),  -- Robert Walker      → EUA
(43, 3),  -- Hiroyuki Morita    → Japão
(44, 3),  -- Hiromasa Yonebayashi → Japão
(45, 1),  -- Dan Scanlon        → EUA
(46, 3),  -- Kenichi Suzuki     → Japão
(47, 3),  -- Shota Umehara      → Japão
(48, 16); -- Cate Shortland     → Austrália

-- ==============================================
-- RELACIONAMENTOS: PRODUTORA_PAIS
-- ==============================================

INSERT INTO produtora_pais (id_produtora, id_pais) VALUES
(1,  1),  -- Walt Disney Pictures  → EUA
(2,  3),  -- Studio Ghibli         → Japão
(3,  1),  -- Regency Enterprises   → EUA
(4,  1),  -- Millenium Films       → EUA
(5,  1),  -- 6th & Idaho           → EUA
(6,  1),  -- Warner Bros.          → EUA
(7,  1),  -- Proximity Media       → EUA
(8,  1),  -- Netflix               → EUA
(9,  1),  -- Lakeshore Entertainment → EUA
(10, 1),  -- 20th Century Fox      → EUA
(11, 1),  -- Marvel Studios        → EUA
(12, 1),  -- Paramount Pictures    → EUA
(13, 1),  -- Thunder Road Pictures → EUA
(14, 1),  -- Legendary Pictures    → EUA
(15, 1),  -- Pixar Animation Studios → EUA
(16, 1),  -- Sony Pictures         → EUA
(17, 1),  -- Focus Features        → EUA
(18, 2);  -- Tim Burton Productions → Reino Unido

-- ==============================================
-- RELACIONAMENTOS: FILME_PRODUTORA
-- ==============================================

INSERT INTO filme_produtora (id_filme, id_produtora) VALUES
(1,  16),  -- Venom         → Sony Pictures
(2,  11),  -- Thor Ragnarok → Marvel Studios
(3,  11),  -- Deadpool      → Marvel Studios
(4,  16),  -- Homem-Aranha 3 → Sony Pictures
(5,   1),  -- Big Hero 6    → Walt Disney Pictures
(6,   8),  -- Black Clover  → Netflix
(7,   2),  -- Castelo Animado → Studio Ghibli
(8,   8),  -- Chainsaw Man  → Netflix
(9,   2),  -- Chihiro       → Studio Ghibli
(10, 17),  -- Coraline      → Focus Features
(11,  8),  -- Demon Slayer  → Netflix
(12, 15),  -- Elementos     → Pixar
(13,  1),  -- Jack          → Walt Disney Pictures
(14,  8),  -- Jujutsu Kaisen → Netflix
(15,  2),  -- Memórias de Marnie → Studio Ghibli
(16, 15),  -- Universidade Monstros → Pixar
(17,  1),  -- Mufasa        → Walt Disney Pictures
(18, 18),  -- Noiva Cadáver → Tim Burton Productions
(19, 15),  -- Ratatouille   → Pixar
(20, 11),  -- Viúva Negra   → Marvel Studios
(21,  1),  -- Irmão Urso    → Walt Disney Pictures
(22,  8),  -- Tokyo Ghoul   → Netflix
(23, 15),  -- Up            → Pixar
(24, 15),  -- WALL-E        → Pixar
(25,  1);  -- Zootopia 2    → Walt Disney Pictures

-- ==============================================
-- RELACIONAMENTOS: FILME_DIRETOR
-- ==============================================

INSERT INTO filme_diretor (id_filme, id_diretor) VALUES
(1,  24),  -- Venom         → Ruben Fleischer
(2,  25),  -- Thor Ragnarok → Taika Waititi
(3,  26),  -- Deadpool      → Shawn Levy
(4,  27),  -- Homem-Aranha 3 → Sam Raimi
(5,  28), (5, 29),  -- Big Hero 6 → Don Hall & Chris Williams
(6,  30),  -- Black Clover  → Hiroyuki Tabata
(7,   2),  -- Castelo Animado → Hayao Miyazaki
(8,  47),  -- Chainsaw Man  → Shota Umehara
(9,   2),  -- Chihiro       → Hayao Miyazaki
(10, 34),  -- Coraline      → Henry Selick
(11, 31),  -- Demon Slayer  → Haruo Sotozaki
(12, 32),  -- Elementos     → Pete Docter
(13, 34),  -- Jack          → Henry Selick (diretor stop-motion)
(14, 46),  -- Jujutsu Kaisen → Kenichi Suzuki
(15, 44),  -- Memórias de Marnie → Hiromasa Yonebayashi
(16, 45),  -- Universidade Monstros → Dan Scanlon
(17, 38),  -- Mufasa        → Barry Jenkins
(18, 35), (18, 36),  -- Noiva Cadáver → Tim Burton & Mike Johnson
(19, 37),  -- Ratatouille   → Brad Bird
(20, 48),  -- Viúva Negra   → Cate Shortland
(21, 41), (21, 42),  -- Irmão Urso → Aaron Blaise & Robert Walker
(22, 46),  -- Tokyo Ghoul   → Kenichi Suzuki
(23, 32),  -- Up            → Pete Docter
(24, 33),  -- WALL-E        → Andrew Stanton
(25, 39), (25, 40);  -- Zootopia 2 → Rich Moore & Byron Howard

-- ==============================================
-- RELACIONAMENTOS: FILME_LINGUAGEM
-- ==============================================

INSERT INTO filme_linguagem (id_filme, id_linguagem) VALUES
(1,  1),   -- Venom         → Inglês
(2,  1),   -- Thor Ragnarok → Inglês
(3,  1),   -- Deadpool      → Inglês
(4,  1),   -- Homem-Aranha 3 → Inglês
(5,  1),   -- Big Hero 6    → Inglês
(6,  2),   -- Black Clover  → Japonês
(7,  2),   -- Castelo Animado → Japonês
(8,  2),   -- Chainsaw Man  → Japonês
(9,  2),   -- Chihiro       → Japonês
(10, 1),   -- Coraline      → Inglês
(11, 2),   -- Demon Slayer  → Japonês
(12, 1),   -- Elementos     → Inglês
(13, 1),   -- Jack          → Inglês
(14, 2),   -- Jujutsu Kaisen → Japonês
(15, 2),   -- Memórias de Marnie → Japonês
(16, 1),   -- Universidade Monstros → Inglês
(17, 1),   -- Mufasa        → Inglês
(18, 1),   -- Noiva Cadáver → Inglês
(19, 1), (19, 4),  -- Ratatouille → Inglês e Francês
(20, 1),   -- Viúva Negra   → Inglês
(21, 1),   -- Irmão Urso    → Inglês
(22, 2),   -- Tokyo Ghoul   → Japonês
(23, 1),   -- Up            → Inglês
(24, 1),   -- WALL-E        → Inglês
(25, 1);   -- Zootopia 2    → Inglês

-- ==============================================
-- RELACIONAMENTOS: FILME_CATEGORIA
-- Referência:
--  1=Ação  2=Aventura  3=Animação  4=Comédia  5=Crime  6=Drama
--  7=Fantasia  8=Ficção Científica  9=Gótico  10=Musical  11=Neo-noir
-- 12=Romance  13=Super-herói  14=Suspense  15=Terror  16=Thriller
-- ==============================================

INSERT INTO filme_categoria (id_filme, id_categoria) VALUES
(1,  1), (1, 13), (1,  8),  -- Venom:          Ação, Super-herói, Ficção Científica
(2,  1), (2, 13), (2,  7),  -- Thor Ragnarok:  Ação, Super-herói, Fantasia
(3,  1), (3, 13), (3,  4),  -- Deadpool:       Ação, Super-herói, Comédia
(4,  1), (4, 13), (4,  2),  -- Homem-Aranha 3: Ação, Super-herói, Aventura
(5,  3), (5,  1), (5,  2),  -- Big Hero 6:     Animação, Ação, Aventura
(6,  3), (6,  1), (6,  7),  -- Black Clover:   Animação, Ação, Fantasia
(7,  3), (7,  7), (7, 12),  -- Castelo Animado: Animação, Fantasia, Romance
(8,  3), (8,  1), (8, 15),  -- Chainsaw Man:   Animação, Ação, Terror
(9,  3), (9,  7), (9,  2),  -- Chihiro:        Animação, Fantasia, Aventura
(10, 3), (10, 7), (10,15),  -- Coraline:       Animação, Fantasia, Terror
(11, 3), (11, 1), (11, 7),  -- Demon Slayer:   Animação, Ação, Fantasia
(12, 3), (12, 7), (12, 6),  -- Elementos:      Animação, Fantasia, Drama
(13, 3), (13, 7), (13,10),  -- Jack:           Animação, Fantasia, Musical
(14, 3), (14, 1), (14, 7),  -- Jujutsu Kaisen: Animação, Ação, Fantasia
(15, 3), (15, 7), (15, 6),  -- Memórias Marnie: Animação, Fantasia, Drama
(16, 3), (16, 4), (16, 2),  -- Univ. Monstros: Animação, Comédia, Aventura
(17, 3), (17, 6), (17, 2),  -- Mufasa:         Animação, Drama, Aventura
(18, 3), (18, 7), (18,12),  -- Noiva Cadáver:  Animação, Fantasia, Romance
(19, 3), (19, 4), (19, 6),  -- Ratatouille:    Animação, Comédia, Drama
(20, 1), (20,13), (20,16),  -- Viúva Negra:    Ação, Super-herói, Thriller
(21, 3), (21, 2), (21, 6),  -- Irmão Urso:     Animação, Aventura, Drama
(22, 3), (22, 1), (22,15),  -- Tokyo Ghoul:    Animação, Ação, Terror
(23, 3), (23, 2), (23, 6),  -- Up:             Animação, Aventura, Drama
(24, 3), (24, 8), (24, 6),  -- WALL-E:         Animação, Ficção Científica, Drama
(25, 3), (25, 4), (25, 2);  -- Zootopia 2:     Animação, Comédia, Aventura

-- ==============================================
-- RELACIONAMENTOS: FILME_ATOR
-- ==============================================

INSERT INTO filme_ator (id_filme, id_ator) VALUES
(1,  53), (1,  54),           -- Venom:           Tom Hardy, Michelle Williams
(2,  29), (2,  55), (2,  56), -- Thor Ragnarok:   Chris Hemsworth, Tessa Thompson, Cate Blanchett
(3,  44), (3,  57),           -- Deadpool:         Ryan Reynolds, Hugh Jackman
(4,  61), (4,  62), (4,  39), -- Homem-Aranha 3:  Tobey Maguire, Kirsten Dunst, Zendaya (cameo)
(5,  63), (5,  64),           -- Big Hero 6:       Daisuke Namikawa, Genesis Rodriguez
(6,  65),                      -- Black Clover:     Yuki Kaji
(7,  35), (7,  36),           -- Castelo Animado:  Chieko Baishô, Takuya Kimura
(8,  65),                      -- Chainsaw Man:     Yuki Kaji (voz de Denji)
(9,  35),                      -- Chihiro:          Chieko Baishô (voz de Lin)
(10, 69), (10, 70), (10, 68), -- Coraline:         Dakota Fanning, Teri Hatcher, Jenna Ortega
(11, 66),                      -- Demon Slayer:     Natsuki Hanae
(12, 73), (12, 74),           -- Elementos:        Leah Lewis, Mamoudou Athie
(13, 26),                      -- Jack:             Robert Downey Jr. (voz de Jack — placeholder)
(14, 65),                      -- Jujutsu Kaisen:   Yuki Kaji (voz de Itadori)
(15, 86), (15, 87),           -- Memórias de Marnie: Ryunosuke Kamiki, Sara Takatsuki
(16, 31), (16, 32),           -- Univ. Monstros:   Matthew McConaughey, Anne Hathaway (placeholder)
(17, 75), (17, 76),           -- Mufasa:            Aaron Pierre, Kelvin Harrison Jr.
(18, 60), (18, 59),           -- Noiva Cadáver:    Johnny Depp, Helena Bonham Carter
(19, 77), (19, 78), (19, 79), -- Ratatouille:      Brad Garrett, Lou Romano, Paul Giamatti
(20, 30), (20, 10),           -- Viúva Negra:      Scarlett Johansson, David Harbour
(21, 17),                      -- Irmão Urso:       Michael B. Jordan (placeholder)
(22, 65),                      -- Tokyo Ghoul:      Yuki Kaji (voz de Kaneki)
(23, 82), (23, 83),           -- Up:               Ed Asner, Jordan Nagai
(24, 80), (24, 81),           -- WALL-E:           Ben Burtt, Elissa Knight
(25, 84), (25, 85);           -- Zootopia 2:       Ginnifer Goodwin, Jason Bateman
