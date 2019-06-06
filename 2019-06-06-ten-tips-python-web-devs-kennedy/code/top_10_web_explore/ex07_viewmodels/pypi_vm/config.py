class Config:
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'sqlite://:memory:'
    ENV = 'development'


class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'
    ENV = 'production'


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
