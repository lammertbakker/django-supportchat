===========
SupportChat
===========

SupportChat is a Django app which adds live chat functionality to your website. Chat sessions can be assigned to specific Django users, which can manage multiple sessions at the same time.

Quick start
-----------

1. Add "supportchat" to your INSTALLED_APPS settings like this:

    INSTALLED_APPS = [
        ...
        'supportchat',
    ]
    
2. Include the supportchat URLconf in your project urls.py like this:

    url(r'^supportchat/', include('supportchat.urls')),
    
3. Run 'python manage.py migrate' to create the supportchat models.

4. Run 'python manage.py collectstatic' to collect the static files

5. Add the following tag to your <head> in order to load the neccessary css:

    <link rel="stylesheet" type="text/css" href="{% static 'supportchat/css/livechat.css' %}" />
    
5. Add the following tag before your </body> in order to load the neccessary javascript:

    <script type="text/javascript" src="{% static 'supportchat/js/livechat.js' %}"></script>

7. Add the following tag on top of your base template:

    {% load supportchat %}
    
8. Add the following templatetag to your base template to load the chat button:

    {% chatbox %}
    
9. Start the development server and visit http://127.0.0.1:8000/ to start a chat session

10. Visit http://127.0.0.1:8000/supportchat/admin to manage your chat sessions


