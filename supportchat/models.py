import uuid
from django.conf import settings
from django.db import models


class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True)
    is_closed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'supportchat_session'
           
    def as_dict(self):
        return {
            'id': self.id,
            'user': str(self.user),
            'is_closed': self.is_closed
        }
        
    def __unicode__(self):
        return '{0}: {1}'.format(self.id, self.user)
    
    
class ChatMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(ChatSession, related_name='message')
    message = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'supportchat_message'
        
    def as_dict(self):
        return {
            'id': self.id,
            'user': str(self.user),
            'message': self.message
        }

    
    