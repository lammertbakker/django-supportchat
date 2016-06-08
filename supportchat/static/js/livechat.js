// Get the modal
var modal = document.getElementById('liveChatBox');

// Get the button that opens the modal
var btn = document.getElementById("openLiveChat");

// Get the chat window that shows the log
var win = document.getElementById("chatBox");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("livechat-close")[0];

// Get the form that posts a chat message
var form = document.getElementById("chatForm");

// Initiate a variable to set the interval id
var intervalID;

// When the user clicks on the button, open the modal 
if (btn != undefined){
	btn.onclick = function() {
		setSessionToken();
		intervalID = window.setInterval(getChatLog, 2500);
	    modal.style.display = "block";
	}
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	clearInterval(intervalID);
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    	clearInterval(intervalID);
        modal.style.display = "none";
    }
}

// When the user submits the chat form, post the form
form.onsubmit = function() {
	postChatMessage();
	document.getElementById('chatMessage').value = '';
	return false;
}

function postChatMessage()
{
	var form = document.getElementById("chatForm");
    var elements = form.getElementsByClassName("livechat-input");
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var formData = new FormData(); 
    for(var i=0; i<elements.length; i++)
    {
        formData[elements[i].name] = elements[i].value;
    }
    console.log(formData);
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                console.log(xmlHttp.responseText);
            }
        }
        
        xmlHttp.open("POST", formData.livechat_url, true); 
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("X-CSRFToken", csrf)
        if (formData.livechat_token){
        	xmlHttp.send(
        			'livechat_message=' + 
        			formData.livechat_message +
        			'&token=' +
        			formData.livechat_token);
        } else {
        	xmlHttp.send('livechat_message=' + formData.livechat_message);
        }   
}

function getChatLog(token)
{
	var xmlHttp = new XMLHttpRequest();
	var url;
	
	if (token != undefined){
		url = document.getElementById('chatLogURL').value + '?token=' + token;
	} else {
		url = document.getElementById('chatLogURL').value;
	}
	
	xmlHttp.onreadystatechange = function()
	{
		var response = JSON.parse(xmlHttp.responseText || "null");
		
		if(response){
			win.innerHTML = '';
			for (key in response){
				var span = document.createElement('span');
				
				if (response[key].user != 'None'){
					var text = document.createTextNode(response[key].user + ': ' + response[key].message);
				} else {
					var text = document.createTextNode(response[key].message);
				}
				
				span.setAttribute('class', 'chat-message');
				span.appendChild(text);
				win.appendChild(span);
				win.scrollTop = win.scrollHeight;
			}
			//win.innerHTML = response.content;
			
		}
		
	}
	
	
	xmlHttp.open("GET", url);
    xmlHttp.setRequestHeader("Content-type", "text/plain");
    xmlHttp.send();
}

function setSessionToken()
{
	var xmlHttp = new XMLHttpRequest();
		var url = document.getElementById('chatSessionURL').value;
		var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
		xmlHttp.onreadystatechange = function()
		{
			console.log(xmlHttp.responseText);
		}
		
        xmlHttp.open("POST", url); 
        xmlHttp.setRequestHeader("X-CSRFToken", csrf)
        xmlHttp.send();
	
}