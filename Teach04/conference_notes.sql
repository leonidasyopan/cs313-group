DROP TABLE IF EXISTS user_table CASCADE;
DROP TABLE IF EXISTS speaker CASCADE;
DROP TABLE IF EXISTS note CASCADE;
DROP TABLE IF EXISTS conference CASCADE;

DROP SEQUENCE IF EXISTS user_table_sequence;
DROP SEQUENCE IF EXISTS speaker_sequence;
DROP SEQUENCE IF EXISTS note_sequence;
DROP SEQUENCE IF EXISTS conference_sequence;


CREATE TABLE user_table (
    user_id     INTEGER         CONSTRAINT user_table_pk PRIMARY KEY      NOT NULL,
    username    VARCHAR(30)                                               NOT NULL UNIQUE,
    first_name  VARCHAR(30),
    last_name   VARCHAR(30)
);

CREATE SEQUENCE user_table_sequence START WITH 1001;

CREATE TABLE speaker (
    speaker_id      INTEGER         CONSTRAINT speaker_pk PRIMARY KEY   NOT NULL,
    speaker_name    VARCHAR(30)                                         NOT NULL,
    speaker_title   VARCHAR(30)            
);

CREATE SEQUENCE speaker_sequence START WITH 1001;

CREATE TABLE conference (
    conference_id       INTEGER         CONSTRAINT conference_pk PRIMARY KEY    NOT NULL,
    conference_session  VARCHAR(30)                                             NOT NULL,
    conference_year     INTEGER                                                 NOT NULL,
    conference_month    VARCHAR(10)
);

CREATE SEQUENCE conference_sequence START WITH 1001;

CREATE TABLE note (
    note_id         INTEGER     CONSTRAINT note_pk PRIMARY KEY  NOT NULL,
    user_id         INTEGER                                     NOT NULL,
    speaker_id      INTEGER                                     NOT NULL,
    conference_id   INTEGER                                     NOT NULL,
    note_text       TEXT,
    CONSTRAINT note_fk_1    FOREIGN KEY(user_id)            REFERENCES user_table(user_id),
    CONSTRAINT note_fk_2    FOREIGN KEY(speaker_id)         REFERENCES speaker(speaker_id),
    CONSTRAINT note_fk_3    FOREIGN KEY(conference_id )     REFERENCES conference(conference_id)
);

CREATE SEQUENCE note_sequence START WITH 1001;

/* SOME FICTIONAL INFO TO INSERT */ 

INSERT INTO user_table VALUES
    (NEXTVAL('user_table_sequence'), 'leonidasyopan', 'Leonidas', 'Yopan'),
    (NEXTVAL('user_table_sequence'), 'JBatty62', 'John', 'Batty'),
    (NEXTVAL('user_table_sequence'), 'heathercostello', 'Heather', 'Costello');
    

INSERT INTO speaker VALUES
    (NEXTVAL('speaker_sequence'), 'David A. Bednar', 'Elder'),
    (NEXTVAL('speaker_sequence'), 'Russell M. Nelson', 'President'),
    (NEXTVAL('speaker_sequence'), 'Dallin H. Oaks', 'President');

INSERT INTO conference VALUES
    (NEXTVAL('conference_sequence'), 'Sunday Morning', '2018', 'April'),
    (NEXTVAL('conference_sequence'), 'Sunday Afternoon', '2018', 'April'),
    (NEXTVAL('conference_sequence'), 'Saturday Morning', '2019', 'October'),
    (NEXTVAL('conference_sequence'), 'Sunday Evening', '2015', 'October');

INSERT INTO note VALUES
    (NEXTVAL('note_sequence'), '1001', '1001', '1001', 'Elder Bednar said something cool about something nice'),
    (NEXTVAL('note_sequence'), '1001', '1002', '1002', 'President Nelson said something cool about something nice'),
    (NEXTVAL('note_sequence'), '1002', '1003', '1003', 'Elder Oaks said something cool about something nice'),
    (NEXTVAL('note_sequence'), '1002', '1001', '1003', 'President Nelson said something cool about something nice'),
    (NEXTVAL('note_sequence'), '1003', '1002', '1001', 'Elder Oaks said something cool about something nice'),
    (NEXTVAL('note_sequence'), '1003', '1003', '1002', 'Elder Bednar said something cool about something nice');

/* JOIN TABLES */

SELECT
    u.username,
    s.speaker_name,
    c.conference_session,
    n.note_text
FROM
    note n
INNER JOIN user_table u ON u.user_id = n.user_id
INNER JOIN speaker s ON s.speaker_id = n.speaker_id
INNER JOIN conference c ON c.conference_id = n.conference_id
;