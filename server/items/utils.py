import json
from django.core import serializers

def getJsonFromObject(obj):
    data = serializers.serialize('json', [obj,])
    struct = json.loads(data)
    return json.dumps(struct[0])
