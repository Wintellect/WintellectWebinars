import datetime

import mongoengine

from data.release_health import ReleaseHealth


class ReleaseHistory(mongoengine.Document):
    created = mongoengine.DateTimeField(default=datetime.datetime.now)
    package_id = mongoengine.ObjectIdField(required=True)
    version_number = mongoengine.StringField(required=True)
    description = mongoengine.StringField()

    topics = mongoengine.ListField(mongoengine.StringField())
    programming_languages = mongoengine.ListField(mongoengine.StringField())
    dependencies = mongoengine.ListField(mongoengine.StringField())

    health = mongoengine.EmbeddedDocumentField(ReleaseHealth)

    meta = {
        'db_alias': 'core',
        'collection': 'releases',
        'indexes': [
            'package_id',
            'version_number',
            'topics',
            'programming_languages',
            'health.ci',
        ],
        'ordering': ['-version_number']
    }
