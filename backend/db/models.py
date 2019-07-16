

class Models:
    # users = '''
    #             CREATE TABLE IF NOT EXISTS users(
    #             id              SERIAL          NOT NULL PRIMARY KEY,
    #             email           VARCHAR(30)     NOT NULL,
    #             login           VARCHAR(30)     NOT NULL,
    #             pass            VARCHAR(30)     NOT NULL,
    #             name            VARCHAR(30)     NOT NULL,
    #             surname         VARCHAR(30)     NOT NULL,
    #             age             SMALLINT,
    #             sex             VARCHAR(5),
    #             preferences     VARCHAR(18)     DEFAULT 'bisexual',
    #             avatar          VARCHAR(1024),
    #             location        VARCHAR(30),
    #             tags            VARCHAR(30)     REFERENCES tags(id),
    #             token           VARCHAR(1024)   NOT NULL,
    #             status          BOOLEAN         NOT NULL DEFAULT '0',
    #             notification    BOOLEAN         NOT NULL DEFAULT '1',
    #             rating          VARCHAR(5)      REFERENCES,
    #             history         VARCHAR(5)      REFERENCES
    #             );'''

    users = '''
                CREATE TABLE IF NOT EXISTS users(
                user_id              SERIAL          NOT NULL PRIMARY KEY,
                login           VARCHAR (30)     NOT NULL
                );'''

    tags = '''
                CREATE TABLE IF NOT EXISTS tags(
                tag_id         SERIAL          NOT NULL PRIMARY KEY,
                tag_name       VARCHAR (30)     NOT NULL
                );'''

    users_tags = '''
                CREATE TABLE IF NOT EXISTS users_tags(
                user_id     INT REFERENCES users (user_id),
                tag_id      INT REFERENCES tags (tag_id)
                );'''

    insert_user1 = '''
                INSERT INTO users (login)
                VALUES (%s)
                ;'''
    record_insert_user1 = ("olega")

    insert_user2 = '''
                INSERT INTO users (login)
                VALUES ("kolyan")
                ;'''

    insert_tag1 = '''
                INSERT INTO tags (tag_name)
                VALUES ("sport")
                ;'''
    insert_tag2 = '''
                  INSERT INTO tags (tag_name)
                  VALUES ("yoga")
                  ;'''
    insert_tag3 = '''
                  INSERT INTO tags (tag_name)
                  VALUES ("books")
                  ;'''
    insert_common = '''
                  INSERT INTO users_tags (user_id, tag_id)
                  VALUES (1, 2)
                  ;'''
    insert_common2 = '''
                  INSERT INTO users_tags (user_id, tag_id)
                  VALUES (1, 3)
                  ;'''

    # history = '''
    #             CREATE TABLE IF NOT EXISTS history(
    #             `id`    SERIAL          NOT NULL PRIMARY KEY,
    #             `from`  VARCHAR(30)     NOT NULL REFERENCES,
    #             `to`    VARCHAR(30)     NOT NULL REFERENCES,
    #             );'''
    #
    # likes = '''
    #             CREATE TABLE IF NOT EXISTS likes(
    #             `id`    SERIAL          NOT NULL PRIMARY KEY,
    #             `from`  VARCHAR(30)     NOT NULL REFERENCES,
    #             `to`    VARCHAR(30)     NOT NULL REFERENCES,
    #             );'''
    #
    # rating = '''
    #             CREATE TABLE IF NOT EXISTS rating(
    #             `id`        SERIAL          NOT NULL PRIMARY KEY,
    #             `user`      VARCHAR(60)     NOT NULL REFERENCES users(id),
    #             `sumLikes`  SMALLINT        NOT NULL,
    #             );'''
    #
    # chat = '''
    #             CREATE TABLE IF NOT EXISTS chat(
    #             `id`        SERIAL          NOT NULL PRIMARY KEY,
    #             `name`      VARCHAR(30)     NOT NULL,
    #             `users`     VARCHAR(30)[]     NOT NULL REFERENCES,
    #             `messages`  VARCHAR(30)[]     NOT NULL REFERENCES,
    #             );'''
    #
    # message = '''
    #              CREATE TABLE IF NOT EXISTS message(
    #              `id`           SERIAL          NOT NULL PRIMARY KEY,
    #              `creationDate` TIMESTAMP       NOT NULL,
    #              `text`         VARCHAR(100)    NOT NULL,
    #              `author`       VARCHAR(30)     NOT NULL REFERENCES users(id),
    #              );'''
    #
    #
