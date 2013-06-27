// View 
var MyView = {};

// show add new button and hide add new form box
MyView.showAddNewButton = function(){	
	MyLogger.log('MyView-showAddNewButton - start');		
	
	document.getElementById('add_new').style.display = 'block';
	document.getElementById('add_new_form_box').style.display = 'none';
	document.getElementById('details').style.display = 'none';
	
	new MyView.Message({},'').hide();

	MyLogger.log('MyView-showAddNewButton - end');	
};
// hide add new button and show add new form box
MyView.hideAddNewButton = function(){	
	MyLogger.log('MyView-hideAddNewButton - start');		
	
	document.getElementById('add_new').style.display = 'none';
	document.getElementById('details').style.display = 'none';
	document.getElementById('add_new_form_box').style.display = 'block';
	
	document.getElementById('uid').value = '';
	document.getElementById('action').value = 'add';	
	document.getElementById('action-from').value = '';	
	
	document.getElementById('firstname').value = '';
	document.getElementById('lastname').value = '';
	document.getElementById('email').value = '';
	document.getElementById('other-txt').value = '';

	new MyView.Message({},'').hide();

	MyLogger.log('MyView-hideAddNewButton - end');	
};

// add form data to display list to view
MyView.addNewDatatoDisplayList = function(id,data){	
	MyLogger.log('MyView-addNewDatatoDisplayList - start');		

	var ul = document.getElementById("list-data");
	var childCount = ul.getElementsByTagName('li').length;
	var li = document.createElement('li');
	li.id = id;
	MyLogger.log('MyView-addNewDatatoDisplayList - ul.childNodes.length-'+childCount);	
	
	li.innerHTML = ''
					+'<div>'
						+'<div class="sr">'+childCount+'&nbsp;</div>'
						+'<div>'+data['firstname']+'&nbsp;</div>'
						+'<div>'+data['lastname']+'&nbsp;</div>'
						+'<div>'+data['email']+'&nbsp;</div>'
						+'<div>'
							+'<input value="Detail" type="button" >'
							+'<input value="Edit" type="button" >'
							+'<input value="Delete" type="button" >'						
						+'</div>'
					+'</div>'
				+'';	
	ul.appendChild(li);	
	document.getElementById('list_data_div').style.display = 'block';

	MyLogger.log('MyView-addNewDatatoDisplayList - end');	
};

// remove this form display list
MyView.removeFromDisplayList = function(event){
	MyLogger.log('MyView-removeFromDisplayList - start');
	var target = (event.target) ? event.target : event.srcElement;
	var ul = target.parentNode.parentNode.parentNode.parentNode;
	var li = target.parentNode.parentNode.parentNode;
	ul.removeChild(li);		
	MyLogger.log('MyView-removeFromDisplayList - start');
}

// add form data to display list to view
MyView.updateDatatoDisplayList = function(id,data){	
	MyLogger.log('MyView-updateDatatoDisplayList - start');	

	// remove the selected one which one edited
	var sli = document.getElementById(id);
	var ul = sli.parentNode;	

	var childCount = ul.getElementsByTagName('li').length;
	var li = document.createElement('li');
	li.id = id;
	MyLogger.log('MyView-updateDatatoDisplayList - ul.childNodes.length-'+childCount);	
	
	li.innerHTML = ''
					+'<div>'
						+'<div class="sr">'+childCount+'&nbsp;</div>'
						+'<div>'+data['firstname']+'&nbsp;</div>'
						+'<div>'+data['lastname']+'&nbsp;</div>'
						+'<div>'+data['email']+'&nbsp;</div>'
						+'<div>'
							+'<input value="Detail" type="button" >'
							+'<input value="Edit" type="button" >'
							+'<input value="Delete" type="button" >'						
						+'</div>'
					+'</div>'
				+'';
	
	ul.insertBefore(li, sli);
	
	ul.removeChild(sli);		

	MyLogger.log('MyView-updateDatatoDisplayList - end');	
};


// reset the sr number
MyView.resetSRNumber = function(event){
	MyLogger.log('MyView-resetSRNumber - start');	

	var rls = document.getElementsByClassName('sr');

	MyLogger.log('MyView-resetSRNumber - rls-'+rls);
	MyLogger.log('MyView-resetSRNumber - rls.length-'+rls.length);
	
	for(var i=0;i<rls.length;i++)
	{
		MyLogger.log('MyView-resetSRNumber - rls[i].innerHTML-'+rls[i].innerHTML);
		rls[i].innerHTML = i+1;
		MyLogger.log('MyView-resetSRNumber - rls[i].innerHTML-'+rls[i].innerHTML);
	}
	MyLogger.log('MyView-resetSRNumber - end');	
};

// show detail box 
MyView.showDetailBox = function(id,data){	
	MyLogger.log('MyView-showDetailBox - start');		
	MyLogger.log('MyView-showDetailBox - id-'+id);
	
	document.getElementById('add_new').style.display = 'none';
	document.getElementById('add_new_form_box').style.display = 'none';	
	
	document.getElementById('detail-firstname').innerHTML = data['firstname'];
	document.getElementById('detail-lastname').innerHTML = data['lastname'];
	document.getElementById('detail-email').innerHTML = data['email'];
	document.getElementById('detail-other-txt').innerHTML = data['other-txt'];	
	
	document.getElementById('details').style.display = 'block';
	
	new MyView.Message({},'').hide();

	MyLogger.log('MyView-showDetailBox - end');	
};

// hide detail box 
MyView.hideDetailBox = function(){	
	MyLogger.log('MyView-hideDetailBox - start');
	
	document.getElementById('add_new').style.display = 'block';
	document.getElementById('details').style.display = 'none';	

	MyLogger.log('MyView-hideDetailBox - end');	
};

// show edit box 
MyView.showEditBox = function(id,data){	
	MyLogger.log('MyView-showEditBox - start');		
	MyLogger.log('MyView-showEditBox - id-'+id);
	
	document.getElementById('add_new').style.display = 'none';
	document.getElementById('details').style.display = 'none';
	
	document.getElementById('uid').value = id;
	document.getElementById('action').value = 'edit';	
	document.getElementById('action-from').value = 'edit';	
	
	document.getElementById('firstname').value = data['firstname'];
	document.getElementById('lastname').value = data['lastname'];
	document.getElementById('email').value = data['email'];
	document.getElementById('other-txt').value = data['other-txt'];	
	
	document.getElementById('add_new_form_box').style.display = 'block';
		
	new MyView.Message({},'').hide();
	
	MyLogger.log('MyView-showEditBox - end');	
};

// hide edit box 
MyView.hideEditBox = function(){	
	MyLogger.log('MyView-hideEditBox - start');

	document.getElementById('add_new_form_box').style.display = 'none';	
	
	if(document.getElementById('action-from').value=='edit')
	{
		document.getElementById('add_new').style.display = 'block';
	}
	else
	{
		document.getElementById('details').style.display = 'block';
	}

	MyLogger.log('MyView-hideEditBox - end');	
};

MyView.Message = function(messageData, type){
	MyLogger.log('MyView-Message - start');
	var el = document.getElementById('message');
	el.className = type;
	var message = '<h2>We have something to bring to your attention</h2>';
	message += '<ul>';
	for (var i=0; i < messageData.length; i++) {
		console.log('Message - messageData-field-'+messageData[i].field);
		console.log('Message - messageData-message-'+messageData[i].message);
		message += '<li>' +messageData[i].field + ' : ' + messageData[i].message + '</li>';
	}
	message += '</ul>';
	el.innerHTML = message;
	MyLogger.log('MyView-Message - end');
};
MyView.Message.prototype.show = function() {
	MyLogger.log('MyView-Message-show - start');
	document.getElementById('message').style.display="block";
	MyLogger.log('MyView-Message-show - end');
};	
MyView.Message.prototype.hide = function() {
	MyLogger.log('MyView-Message-hide - start');
	var msg = document.getElementById('message');
	msg.style.display = "none";
	msg.innerHTML = "";
	MyLogger.log('MyView-Message-hide - end');
};	