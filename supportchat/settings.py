import os
from django.conf import settings

CURRENT_PATH = os.path.abspath(os.path.dirname(__file__).decode('utf-8')).replace('\\', '/')
SUPPORTCHAT_BUTTON_TEXT = getattr(settings, 'SUPPORTCHAT_BUTTON_TEXT', 'Live chat')
SUPPORTCHAT_OFFLINE_TEXT = getattr(settings, 'SUPPORTCHAT_OFFLINE_TEXT', 'Our live chat is currently offline')
