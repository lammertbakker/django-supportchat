from django import template
from ..contrib.chat import is_live
from ..settings import SUPPORTCHAT_BUTTON_TEXT, SUPPORTCHAT_OFFLINE_TEXT


register = template.Library()

@register.inclusion_tag('chatbox.html', takes_context=True)
def chatbox(context):
    context.update({'btn_text': SUPPORTCHAT_BUTTON_TEXT,
                    'offline_text': SUPPORTCHAT_OFFLINE_TEXT,
                    'is_live': is_live()})
    return context