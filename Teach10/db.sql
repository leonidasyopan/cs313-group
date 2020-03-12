DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS children CASCADE;

CREATE TABLE person (
    person_id          SERIAL         PRIMARY KEY      NOT NULL,
    first_name 		    VARCHAR(100),
    last_name 		    VARCHAR(100),
    date_of_birth	    DATE
);

SELECT * FROM person;


CREATE TABLE children (
    relationship_id     SERIAL          PRIMARY KEY     NOT NULL,
    child_id            INTEGER                         NOT NULL,
    parent_id	        INTEGER	     		            NOT NULL,
CONSTRAINT children_fk_1    FOREIGN KEY(child_id)       REFERENCES person(person_id),
CONSTRAINT children_fk_2    FOREIGN KEY(parent_id)      REFERENCES person(person_id)
);

SELECT * FROM children;


/* POPULATING TABLES */

INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Leonidas', 
    'Yopan', 
    '1985-08-10');


INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Arthur', 
    'Yopan', 
    '2011-10-23');

INSERT INTO children (child_id, parent_id)
VALUES                (2,        1);

INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Julia', 
    'Yopan', 
    '2013-05-26');

INSERT INTO children (child_id, parent_id)
VALUES                (3,        1);
    
INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Sofia', 
    'Yopan', 
    '2018-03-17');

INSERT INTO children (child_id, parent_id)
VALUES                (4,        1);


INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Robyn', 
    'Kleinman', 
    '1966-12-12');
    

INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Heather', 
    'Costello', 
    '1996-05-08');

INSERT INTO children (child_id, parent_id)
VALUES                (6,       5);

    INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Brent', 
    'Kleinman', 
    '1993-02-04');

INSERT INTO children (child_id, parent_id)
VALUES                (7,       5);

    INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Taylor', 
    'Kleinman', 
    '1991-12-14');

INSERT INTO children (child_id, parent_id)
VALUES                (8,       5);

INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'John', 
    'Batty', 
    '1994-08-04');

    INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Kandis', 
    'Batty', 
    '1993-06-25');

    INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Samuel Levi', 
    'Batty', 
    '2019-10-29');

INSERT INTO children (child_id, parent_id)
VALUES                (11,       9);
INSERT INTO children (child_id, parent_id)
VALUES                (11,       10);


SELECT * FROM person;
SELECT * FROM children;

/* SELECT ALL CHILDREN OF PERSON BY PERSON ID */
SELECT child_id FROM person INNER JOIN children ON person_id = parent_id WHERE person_id = 1;

/* SELECT ALL PARENTS OF PERSON BY PERSON ID */
SELECT parent_id FROM person INNER JOIN children ON person_id = child_id WHERE person_id = 2;