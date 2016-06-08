from django.contrib.auth import get_user
from django.contrib.auth.decorators import login_required, permission_required
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView, View

from .models import ChatSession, ChatMessage
from .settings import LOG_FOLDER


class StartChatSession(View):
    def post(self, request, *args, **kwargs):
        if not 'livechat_session' in request.session:
            new_session = ChatSession.objects.create()
            request.session['livechat_session'] = '{0}'.format(new_session.id)
            
        data = {
            'success': True,
        }
        return JsonResponse(data)
    

class SendChatMessage(View):
    def post(self, request, *args, **kwargs):
        session_id = request.session.get('livechat_session', None)
        user = None
        
        if not session_id and not self.request.user.is_authenticated():
            return HttpResponse(403)
        elif request.user.is_authenticated() and 'token' in request.POST:
            session_id = request.POST.get('token', None)
            user = get_user(request)
        
        if session_id:
            self.log_message(request, session_id, user)
            data = {
                'success': True,
            }
            return JsonResponse(data)
        else:
            return HttpResponse(404)
        
    def log_message(self, request, session_id, user):
        session = ChatSession.objects.get(pk=session_id)
        message = ChatMessage.objects.create(
            message=request.POST.get('livechat_message'),
            session=session,
            user=user
        )
        return message
    
    
class GetChatLog(View):
    def get(self, request, *args, **kwargs):
        session_id = request.session.get('livechat_session', None)
        
        if not session_id and not request.user.is_authenticated():
            return HttpResponse(403)
        elif request.user.is_authenticated() and 'token' in request.GET:
            session_id = request.GET['token']
            
        content = self.get_log(request, session_id)
        
        return JsonResponse(content, safe=False)
    
    def get_log(self, request, session_id):
        try:
            session = ChatSession.objects.get(pk=session_id)
            messages = ChatMessage.objects.filter(session=session)
            return [obj.as_dict() for obj in messages]
        except:
            return None
    

@method_decorator(login_required, name='dispatch')    
class LiveChatAdmin(TemplateView):
    template_name = 'livechat_admin/livechat_admin_index.html'
        
        
@method_decorator(login_required, name='dispatch')
class GetUnassignedChats(View):
    def get(self, *args, **kwargs):
        queryset = ChatSession.objects.filter(user=None, is_closed=False)
        data = [obj.as_dict() for obj in queryset]
        return JsonResponse(data, safe=False)
 
    
@method_decorator(login_required, name='dispatch')
class GetUserChats(View):
    def get(self, *args, **kwargs):
        queryset = ChatSession.objects.filter(user=self.request.user, is_closed=False)
        data = [obj.as_dict() for obj in queryset]
        return JsonResponse(data, safe=False)


@method_decorator(login_required, name='dispatch')
class GetClosedChats(View):
    def get(self, *args, **kwargs):
        queryset = ChatSession.objects.filter(user=self.request.user, is_closed=True)
        data = [obj.as_dict() for obj in queryset]
        return JsonResponse(data, safe=False)


@method_decorator(login_required, name='dispatch')
class AssignSession(View):
    def post(self, *args, **kwargs):
        user = get_user(self.request)
        token = self.request.POST.get('token', None)
        session = ChatSession.objects.get(pk=token)
        session.user = user
        session.save()
        return JsonResponse({'success': True}, safe=False)


@method_decorator(login_required, name='dispatch')
class CloseSession(View):
    def post(self, *args, **kwargs):
        user = get_user(self.request)
        token = self.request.POST.get('token', None)
        session = ChatSession.objects.get(pk=token, user=user)
        session.is_closed = True
        session.save()
        return JsonResponse({'success': True}, safe=False)