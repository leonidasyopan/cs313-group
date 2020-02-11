DROP TABLE IF EXISTS scriptures;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS lookup;

CREATE TABLE scriptures (
scriptures_id       SERIAL      PRIMARY KEY  NOT NULL,
book                VARCHAR(30)              NOT NULL,
chapter             INTEGER                  NOT NULL,
verse               INTEGER                  NOT NULL,
content             TEXT                     NOT NULL
);

INSERT INTO scriptures (book, chapter, verse, content) VALUES ('John', 1, 5, 'John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.' );
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('D&C', 88 , 49, 'The light shineth in darkness, and the darkness comprehendeth it not; nevertheless, the day shall come when you shall comprehend even God, being quickened in him and by him.');
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('D&C', 93 , 28, 'He that keepeth his commandments receiveth truth and light, until he is glorified in truth and knoweth all things.');
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('Mosiah', 16 , 9, 'He is the light and the life of the world; yea, a light that is endless, that can never be darkened; yea, and also a life which is endless, that there can be no more death.');
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('Alma', 32 , 21, 'And now as I said concerning faith — faith is not to have a perfect knowledge of things; therefore if ye have faith ye hope for things which are not seen, which are true.');



CREATE TABLE topics (
    topics_id      SERIAL          PRIMARY KEY    NOT NULL,
    name          VARCHAR(30)                     NOT NULL
);

INSERT INTO topics (name) VALUES ('Faith');
INSERT INTO topics (name) VALUES ('Sacrifice');
INSERT INTO topics (name) VALUES ('Charity');
INSERT INTO topics (name) VALUES ('The Savior, Mission Of');




CREATE TABLE lookup (
    lookup_id           SERIAL      PRIMARY KEY                                     NOT NULL,
    scriptures_id       INTEGER     CONSTRAINT lookup_fk_1 REFERENCES scriptures(scriptures_id) NOT NULL,
    topics_id           INTEGER     CONSTRAINT lookup_fk_2 REFERENCES topics(topics_id)        NOT NULL
);


INSERT INTO lookup (scriptures_id, topics_id) 
VALUES (1,4), (2,4), (3,4), (4,4);


INSERT INTO lookup (scriptures_id, topics_id) 
VALUES (4,1);

SELECT l.lookup_id
,       s.book
,       s.chapter
,       s.verse
,       s.content
,       t.name
FROM scriptures s
INNER JOIN lookup l ON l.scriptures_id = s.scriptures_id
INNER JOIN topics t ON t.topics_id = l.topics_id
WHERE t.name = 'Jesus Christ, The Savior';
