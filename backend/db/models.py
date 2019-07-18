

class Models:
    users = '''
                CREATE TABLE IF NOT EXISTS users(
                user_id         SERIAL          NOT NULL PRIMARY KEY,
                email           VARCHAR(64)     NOT NULL,
                login           VARCHAR (64)     NOT NULL,
                pass            VARCHAR(1024)     NOT NULL,
                name            VARCHAR(64)     NOT NULL,
                surname         VARCHAR(64)     NOT NULL,
                age             SMALLINT,
                sex             VARCHAR(8),
                preferences     VARCHAR(32)     DEFAULT 'bisexual',
                bio               TEXT,
                avatar          VARCHAR(1024)[],
                latitude        REAL,
                longitude       REAL,
                token           VARCHAR(1024)   NOT NULL,
                status          BOOLEAN         NOT NULL DEFAULT '0',
                notification    BOOLEAN         NOT NULL DEFAULT '1'
                );'''

    tags = '''
                CREATE TABLE IF NOT EXISTS tags(
                tag_id         SERIAL          NOT NULL PRIMARY KEY,
                tag_name       VARCHAR (64)     NOT NULL
                );'''

    users_tags = '''
                CREATE TABLE IF NOT EXISTS users_tags(
                user_id_fk     INT REFERENCES users (user_id),
                tag_id_fk      INT REFERENCES tags (tag_id)
                );'''

    history = '''
                CREATE TABLE IF NOT EXISTS history(
                history_id    SERIAL          NOT NULL PRIMARY KEY,
                from_history_fk  INT     NOT NULL REFERENCES users (user_id),
                to_history_fk   INT     NOT NULL REFERENCES users (user_id)
                );'''

    likes = '''
                CREATE TABLE IF NOT EXISTS likes(
                like_id    SERIAL          NOT NULL PRIMARY KEY,
                from_like_fk  INT     NOT NULL REFERENCES users (user_id),
                to_like_fk   INT     NOT NULL REFERENCES users (user_id)
                );'''

    rating = '''
                CREATE TABLE IF NOT EXISTS rating(
                rating_id        SERIAL          NOT NULL PRIMARY KEY,
                user_fk      INT     NOT NULL REFERENCES users(user_id),
                sumLikes  SMALLINT        DEFAULT 0
                );'''

    messages = '''
                 CREATE TABLE IF NOT EXISTS messages(
                 message_id            SERIAL          NOT NULL PRIMARY KEY,
                 creation_date  VARCHAR (64)       DEFAULT TO_CHAR(CURRENT_TIMESTAMP,'YYYY-MM-DD HH24:MI:SS'),
                 text         TEXT    NOT NULL,
                 author       INT     NOT NULL REFERENCES users(user_id)
                 );'''


    chats = '''
                CREATE TABLE IF NOT EXISTS chats(
                chat_id        SERIAL          NOT NULL PRIMARY KEY,
                chat_name      VARCHAR(64)     NOT NULL
                );'''


    chat_users = '''
                CREATE TABLE IF NOT EXISTS chat_users(
                 chat_id_fk     INT REFERENCES chats (chat_id),
                 user_id_fk     INT REFERENCES users (user_id)
                );'''


    chat_messages = '''
                CREATE TABLE IF NOT EXISTS chat_messages(
                 chat_id_fk     INT REFERENCES chats (chat_id),
                 message_id_fk  INT REFERENCES messages (message_id)
                );'''


    # location = '''
    #                 CREATE TABLE IF NOT EXISTS location(
    #                 location_id    SERIAL          NOT NULL PRIMARY KEY,
    #                 location_name  VARCHAR(1014)     NOT NULL
    #                 );'''

    # SELECT u.user_id, u.login
    # FROM users u
    # JOIN users_tags ut on (i.user_id = ut.user_id);

    #select to_char(creationdate, 'YYYY-MM-DD HH24:MI:SS') as time from messages;
    # INSERT INTO users (login) VALUES ('Oleg');
    # INSERT INTO messages (text, author) values ('asd', 1);
    # insert_user1 = '''
    #             INSERT INTO users (login)
    #             VALUES (%s)
    #             ;'''
    # record_insert_user1 = ("olega",)
    #
    # insert_user2 = '''
    #             INSERT INTO users (login)
    #             VALUES (%s)
    #             ;'''
    # record_insert_user2 = ("kolyan",)
    #
    # insert_tag1 = '''
    #             INSERT INTO tags (tag_name)
    #             VALUES (%s)
    #             ;'''
    # record_insert_tags1 = ("sport",)
    #
    # insert_tag2 = '''
    #               INSERT INTO tags (tag_name)
    #               VALUES (%s)
    #               ;'''
    # record_insert_tags2 = ("yoga",)
    #
    # insert_tag3 = '''
    #               INSERT INTO tags (tag_name)
    #               VALUES (%s)
    #               ;'''
    # record_insert_tags3 = ("books",)
    #
    # insert_common = '''
    #               INSERT INTO users_tags (user_id, tag_id)
    #               VALUES (%s,%s)
    #               ;'''
    # record_insert_common1 = (1,2,)
    # insert_common2 = '''
    #               INSERT INTO users_tags (user_id, tag_id)
    #               VALUES (%s, %s)
    #               ;'''
    # record_insert_common2 = (1,3,)
