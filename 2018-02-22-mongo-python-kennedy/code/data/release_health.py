import mongoengine


class ReleaseHealth(mongoengine.EmbeddedDocument):
    ci = mongoengine.BooleanField()
    coverage = mongoengine.FloatField()
    health_index = mongoengine.FloatField()
