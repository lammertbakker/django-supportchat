var unassignedInterval = window.setInterval(function() {getChatList('unassignedURL', 'unassignedList');}, 2500);
var userInterval = window.setInterval(function() {getChatList('userURL', 'userList');}, 2500);
var closedInterval = window.setInterval(function() {getChatList('closedURL', 'closedList');}, 2500);

function getChatList(targetURL, targetTable){
	var xmlHttp = new XMLHttpRequest();
	var url = document.getElementById(targetURL).innerHTML;
	xmlHttp.onreadystatechange = function()
	{
		var response = JSON.parse(xmlHttp.responseText || "null");
		
		if(response){
			var table = document.getElementById(targetTable);
			table.innerHTML = '';
			for (key in response){
				if (response.hasOwnProperty(key)){
					var row = table.insertRow(-1);
					var cell1 = row.insertCell(0);
					cell1.className = 'token';
					var cell2 = row.insertCell(1);
					cell1.innerHTML = response[key].id;
					var button = document.createElement("BUTTON");
					var text = document.createTextNode('Open');
					button.appendChild(text);
					button.className = 'btn btn-default btn-sm';
					button.text = 'Open';
					cell2.appendChild(button);
					button.addEventListener('click', openChat, false);
				}
			}
			//console.log(JSON.stringify(response));
		}	
	}
	
    xmlHttp.open("GET", url);
    xmlHttp.send();
}

var modal = document.getElementById('liveChatBox');

function openChat(event){
	var targetElement = event.target || event.srcElement;
	var cell = targetElement.parentNode.previousSibling;
	var token = cell.innerHTML;
	addToken(token);
    console.log(token);
    var tableId = getParentId(cell, 'table');
    console.log(tableId);
    
    if (tableId == 'unassignedList'){
    	addAssignCheckbox();
    } else if (tableId == 'userList'){
    	addCloseCheckbox();
    } else if (tableId == 'closedList'){
    	removeCheckboxes();
    }
    
	modal.style.display = "block";
	win.innerHTML = '';
	intervalID = window.setInterval(function() {getChatLog(token);}, 2500);
}

function addToken(token){
	var oldToken = document.getElementById('chatToken');
	if (oldToken){
		form.removeChild(oldToken);
	}
	
	var tokenInput = document.createElement('input')
	tokenInput.type = 'hidden';
	tokenInput.name = 'livechat_token';
	tokenInput.value = token;
	tokenInput.id = 'chatToken';
	tokenInput.className = 'livechat-input';
	
	form.appendChild(tokenInput);
}

function addAssignCheckbox(){
	removeCheckboxes();
	
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "livechat_admin_assign";
	checkbox.value = "value";
	checkbox.id = "assignChatId";
	checkbox.addEventListener('click', assignChatSession);

	var label = document.createElement('label')
	label.htmlFor = "assignChatId";
	label.appendChild(document.createTextNode('Assign to me'));

	form.appendChild(checkbox);
	form.appendChild(label);
}

function addCloseCheckbox(){
	removeCheckboxes();
	
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.name = "livechat_admin_close";
	checkbox.value = "value";
	checkbox.id = "closeChatId";
	checkbox.addEventListener('click', closeChatSession);
	
	var label = document.createElement('label')
	label.htmlFor = "closeChatId";
	label.appendChild(document.createTextNode('Close session'));

	form.appendChild(checkbox);
	form.appendChild(label);
}

function closeChatSession(){
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var url = document.getElementById('closeSessionURL').innerHTML;
    var token = document.getElementById('chatToken').value;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                console.log(xmlHttp.responseText);
            }
        }
        
        xmlHttp.open("POST", url, true); 
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("X-CSRFToken", csrf)
        xmlHttp.send('token=' + token);
}

function assignChatSession(){
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    var url = document.getElementById('assignSessionURL').innerHTML;
    var token = document.getElementById('chatToken').value;
    var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function()
        {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                console.log(xmlHttp.responseText);
            }
        }
        
        xmlHttp.open("POST", url, true); 
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("X-CSRFToken", csrf)
        xmlHttp.send('token=' + token);
}

function removeCheckboxes(){
	var elements = form.getElementsByTagName('input');
	for (var i=0; i<elements.length; i++){
		if (elements[i].type == 'checkbox'){
			form.removeChild(elements[i]);
		}
	}
	
	var labels = form.getElementsByTagName('label');
	for (var i=0; i<labels.length; i++){
		form.removeChild(labels[i]);
	}
}

function getParentId(node, tag)
{
  var parent = node.parentNode;
  var tagName = tag;

  while (parent) { //Loop through until you find the desired parent tag name
  if (parent.tagName && parent .tagName.toLowerCase() == tagName) {
      //alert(parent .id);
      return parent.id;
    }
      else
      {
          parent = parent .parentNode;
      }

  }

}