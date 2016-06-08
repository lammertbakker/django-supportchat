from django.conf.urls import patterns, url
from .views import (StartChatSession,
                    SendChatMessage,
                    GetChatLog,
                    LiveChatAdmin,
                    GetUnassignedChats,
                    GetUserChats,
                    GetClosedChats,
                    AssignSession,
                    CloseSession)

urlpatterns = patterns('',
    url(r'^startsession',
        StartChatSession.as_view(),
        name='livechat_init'),
                       
    url(r'^chat/$',
        SendChatMessage.as_view(),
        name='livechat_post'),
                       
    url(r'^get_log/$',
        GetChatLog.as_view(),
        name='livechat_get'),
                       
    url(r'^admin/$',
        LiveChatAdmin.as_view(),
        name='livechat_admin'),
                       
    url(r'^admin/get_unassigned/$',
        GetUnassignedChats.as_view(),
        name='livechat_admin_unassigned'),
                       
    url(r'^admin/get_user/$',
        GetUserChats.as_view(),
        name='livechat_admin_user'),
                       
    url(r'^admin/get_closed/$',
        GetClosedChats.as_view(),
        name='livechat_admin_closed'),
                       
    url(r'^admin/close_session/$',
        CloseSession.as_view(),
        name='livechat_admin_close_session'),
                       
    url(r'^admin/assign_session/$',
        AssignSession.as_view(),
        name='livechat_admin_assign_session'),
)
