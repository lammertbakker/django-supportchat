from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.db.models import Q


def is_live():
    mods_online = False
    usr_model = get_user_model()
    perm = Permission.objects.get(codename='can_chat')
    users = usr_model.objects.filter(Q(groups__permissions=perm) | 
                                    Q(user_permissions=perm)
                                    ).distinct()
                                    
    for user in users:
        if user.is_authenticated():
            mods_online = True
            
    return mods_online
    