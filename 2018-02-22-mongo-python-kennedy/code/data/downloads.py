import datetime

import mongoengine


class Download(mongoengine.Document):
    created = mongoengine.DateTimeField(default=datetime.datetime.now)
    package_id = mongoengine.ObjectIdField()
    release_id = mongoengine.ObjectIdField()
    client_ip = mongoengine.StringField()
    client_app = mongoengine.StringField()
    python_version = mongoengine.StringField()

    meta = {
        'db_alias': 'core',
        'collection': 'downloads',
        'indexes': [
            'created',
            'package_id',
            'release_id',
            'python_version',
        ],
        'ordering': ['-created']
    }