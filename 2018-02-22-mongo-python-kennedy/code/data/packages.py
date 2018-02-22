import datetime

import mongoengine


class Package(mongoengine.Document):
    created = mongoengine.DateTimeField(default=datetime.datetime.now)
    name = mongoengine.StringField(required=True)
    maintainers = mongoengine.ListField(mongoengine.ObjectIdField())
    total_downloads = mongoengine.LongField(default=0)

    meta = {
        'db_alias': 'core',
        'collection': 'packages',
        'indexes': [
            'created',
            'name',
            'maintainers',
            'total_downloads',
        ],
        'ordering': ['name']
    }
