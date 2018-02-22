import datetime

import mongoengine


class User(mongoengine.Document):
    created = mongoengine.DateTimeField(default=datetime.datetime.now)
    name = mongoengine.StringField(required=True)
    email = mongoengine.StringField(required=True)

    meta = {
        'db_alias': 'core',
        'collection': 'users',
        'indexes': [
            'created',
            'name',
            'email',
        ],
        'ordering': ['name']
    }
