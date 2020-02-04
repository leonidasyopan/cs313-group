/* 
heroku addons:create heroku-postgresql:hobby-dev
*/

DROP TABLE  IF EXISTS sciptures;

CREATE TABLE scriptures (

id      SERIAL      PRIMARY KEY  NOT NULL,
book    VARCHAR(30)              NOT NULL,
chapter INTEGER                  NOT NULL,
verse   INTEGER                  NOT NULL,
content TEXT                     NOT NULL
);

INSERT INTO scriptures (book, chapter, verse, content) VALUES ('John', 1, 5, 'John bare awitness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.' );
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('D&C', 88 , 49, 'The alight shineth in darkness, and the darkness comprehendeth it not; nevertheless, the day shall come when you shall bcomprehend even God, being quickened in him and by him.');
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('D&C', 93 , 28, 'He that akeepeth his commandments receiveth btruth and clight, until he is glorified in truth and dknoweth all things.');
INSERT INTO scriptures (book, chapter, verse, content) VALUES ('Mosiah', 16 , 9, 'He is the light and the life of the world; yea, a light that is endless, that can never be darkened; yea, and also a life which is endless, that there can be no more death.');
