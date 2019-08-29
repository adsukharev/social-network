class Models:
    users = '''
                CREATE TABLE IF NOT EXISTS users(
                user_id         SERIAL          NOT NULL PRIMARY KEY,
                email           VARCHAR(64)     UNIQUE,
                login           VARCHAR (64)    NOT NULL UNIQUE,
                password        VARCHAR(1024),
                social_id       VARCHAR (64),
                user_name       VARCHAR(64)     NOT NULL,
                age             SMALLINT,
                sex             VARCHAR(8),
                preferences     VARCHAR(32)     DEFAULT 'bisexual',
                bio             TEXT,
                avatar          TEXT[],
                city            VARCHAR (64),
                latitude        REAL,
                longitude       REAL,
                token           VARCHAR(1024),
                status          BOOLEAN         NOT NULL DEFAULT '0',
                notification    BOOLEAN         NOT NULL DEFAULT '1',
                fake            BOOLEAN         NOT NULL DEFAULT '0',
                online          VARCHAR(32)     NOT NULL DEFAULT 'online',
                room            VARCHAR(1024)
                );'''

    tags = '''
                CREATE TABLE IF NOT EXISTS tags(
                tag_id         SERIAL          NOT NULL PRIMARY KEY,
                tag_name       VARCHAR (64)    NOT NULL UNIQUE
                );'''

    users_tags = '''
                CREATE TABLE IF NOT EXISTS users_tags(
                user_id     INT REFERENCES users (user_id) ON DELETE CASCADE,
                tag_id      INT REFERENCES tags (tag_id) ON DELETE CASCADE
                );'''

    history = '''
                CREATE TABLE IF NOT EXISTS history(
                history_id          SERIAL  NOT NULL PRIMARY KEY,
                from_history_fk     INT     NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
                to_history_fk       INT     NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
                );'''

    likes = '''
                CREATE TABLE IF NOT EXISTS likes(
                like_id         SERIAL  NOT NULL PRIMARY KEY,
                from_like_fk    INT     NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
                to_like_fk      INT     NOT NULL REFERENCES users (user_id) ON DELETE CASCADE
                );'''

    rating = '''
                CREATE TABLE IF NOT EXISTS rating(
                rating_id       SERIAL      NOT NULL PRIMARY KEY,
                user_fk         INT         NOT NULL UNIQUE  REFERENCES users(user_id) ON DELETE CASCADE,
                sumLikes        SMALLINT    DEFAULT 0
                );'''

    chats = '''
                CREATE TABLE IF NOT EXISTS chats(
                chat_id        SERIAL          NOT NULL PRIMARY KEY,
                chat_name      VARCHAR(64)     NOT NULL
                );'''

    chat_users = '''
                CREATE TABLE IF NOT EXISTS chat_users(
                 chat_id     INT REFERENCES chats (chat_id) ON DELETE CASCADE,
                 user_id     INT REFERENCES users (user_id) ON DELETE CASCADE
                );'''

    chat_messages = '''
                CREATE TABLE IF NOT EXISTS chat_messages(
                 chat_id     INT REFERENCES chats (chat_id) ON DELETE CASCADE,
                 message_id  INT REFERENCES messages (message_id) ON DELETE CASCADE
                );'''
    messages = '''
                 CREATE TABLE IF NOT EXISTS messages(
                 message_id     SERIAL          NOT NULL PRIMARY KEY,
                 creation_date  VARCHAR(64)     NOT NULL,
                 text           TEXT            NOT NULL,
                 author         INT             NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
                 );'''
    token_revokes = '''
                CREATE TABLE IF NOT EXISTS token_revokes(
                 token_id    SERIAL             NOT NULL PRIMARY KEY,
                 token      VARCHAR(1024)       NOT NULL
                );'''
