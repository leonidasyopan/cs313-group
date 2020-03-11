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
    child_id            SERIAL         PRIMARY KEY      NOT NULL,
    parent_id	        INTEGER	     		            NOT NULL,
CONSTRAINT children_fk_1    FOREIGN KEY(parent_id)      REFERENCES person(person_id)
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

SELECT * FROM person;

INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    1,
    'Arthur', 
    'Yopan', 
    '2011-10-23');

INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    1,
    'Julia', 
    'Yopan', 
    '2013-05-26');
    
INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    1,
    'Sofia', 
    'Yopan', 
    '2018-03-17');

SELECT * FROM children;


/* IF WE NEED TO DELE */
DELETE FROM children
WHERE child_id = 3;


INSERT INTO person (
    first_name,
    last_name,
    date_of_birth)
VALUES (
    'Robyn', 
    'Kleinman', 
    '1966-12-12');
    
    SELECT * FROM person;

INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    2,
    'Heather', 
    'Costello', 
    '1996-05-08');

    INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    2,
    'Brent', 
    'Kleinman', 
    '1993-02-04');

    INSERT INTO children (
    parent_id,
    first_name,
    last_name,
    date_of_birth)
VALUES (
    2,
    'Taylor', 
    'Kleinman', 
    '1991-12-14');


SELECT * FROM children;
