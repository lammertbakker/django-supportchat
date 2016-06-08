from django import template
from ..settings import LIVECHAT_BUTTON_TEXT

register = template.Library()

@register.inclusion_tag('chatbox.html', takes_context=True)
def chatbox(context):
    context.update({'btn_text': LIVECHAT_BUTTON_TEXT})
    return context