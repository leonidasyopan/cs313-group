DROP TABLE IF EXISTS user_accounts CASCADE;

CREATE TABLE user_accounts (
    user_id             SERIAL     CONSTRAINT user_account_pk  PRIMARY KEY      NOT NULL,
    username            VARCHAR(100)                    NOT NULL    UNIQUE,
    password            VARCHAR(255)                    NOT NULL,
    user_create_date    DATE
);

INSERT INTO user_accounts (
    username, 
    password, 
    user_create_date)
VALUES (
    'admin', 
    'admin1234', 
    current_timestamp);


SELECT * FROM user_accounts;