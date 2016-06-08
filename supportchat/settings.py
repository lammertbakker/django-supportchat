import os
from django.conf import settings

CURRENT_PATH = os.path.abspath(os.path.dirname(__file__).decode('utf-8')).replace('\\', '/')
LOG_FOLDER = os.path.join(CURRENT_PATH, 'log')
LIVECHAT_BUTTON_TEXT = getattr(settings, 'LIVECHAT_BUTTON_TEXT', 'Live chat')