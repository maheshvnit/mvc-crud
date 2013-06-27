// Controller	
var MyController = {};

// add new button event handler
MyController.addNewButton = function(event){	
	MyLogger.log('MyController-addNewButton - start');
	event = getEvent(event);
	// show the add form box and hide add new button
	MyView.hideAddNewButton();		
	
	MyLogger.log('MyController-addNewButton - end');		
		
	preventEvent(event);
};	

// add new Submit event handler
MyController.addNewSubmitButton = function(event){
	MyLogger.log('MyController-addNewSubmitButton - start');		
	event = getEvent(event);
	// get the form data 
	var data = [];
	data['firstname'] = document.getElementById('firstname').value;
	data['lastname'] = document.getElementById('lastname').value;
	data['email'] = document.getElementById('email').value;
	data['other'] = document.getElementById('other').checked;
	data['other-txt'] = document.getElementById('other-txt').value;	
	
	MyLogger.traceObject(data);
	
	// validate form data
	var validFlag = true;
	var invalidFields = MyModel.validate(data);
	MyLogger.log('MyController-addNewSubmitButton - 1');	
	MyLogger.traceObject(invalidFields);	
	MyLogger.log('MyController-addNewSubmitButton - 2');	
	if (invalidFields.length) 
	{
	   // generate the view and show the message
	   var message = new MyView.Message(invalidFields, 'error');
	   message.show();
	   validFlag = false;
	}
	else
	{
		// Hide messge 
		var message = new MyView.Message({}, '');
		message.hide();		
	}	
	
	if(validFlag)
	{
		// if add mode
		if(document.getElementById('action').value=='add')
		{
			// add form data to model and return unique id of the record
			var id = MyModel.add(data);
			// add form data to display list to view
			MyView.addNewDatatoDisplayList(id,data);
			
			// hide the add form box and show add new button
			MyView.showAddNewButton();
		}
		else
		{
			var id = document.getElementById('uid').value;
			MyModel.update(id,data);
			// add form data to display list to view
			MyView.updateDatatoDisplayList(id,data);	
			
			MyView.resetSRNumber();

			// hide the add form box and show add new button or detail box 
			MyView.hideEditBox();			
		}
	}

	MyLogger.log('MyController-addNewSubmitButton - end');		
		
	preventEvent(event);
};

// add new Cancel event handler
MyController.addNewCancelButton = function(event){	
	MyLogger.log('MyController-addNewCancelButton - start');
	event = getEvent(event);
	// hide the add form box and show add new button
	MyView.showAddNewButton();	
	
	MyLogger.log('MyController-addNewCancelButton - end');
		
	preventEvent(event);
};

// detail, edit and delete event handler
MyController.detailEditDeleteButtons = function(event){	
	MyLogger.log('MyController-detailEditDeleteButtons - start');
	event = getEvent(event);
	MyLogger.log('MyController-detailEditDeleteButtons - event.target-'+event.target);
	var target = (event.target) ? event.target : event.srcElement;
	MyLogger.log('MyController-detailEditDeleteButtons - target.type-'+target.type);

	if(target.type != undefined && target.type=='button')
	{		
		MyLogger.log('MyController-detailEditDeleteButtons - target.value-'+target.value);
		
		if(target.value!='')
		{
			// get the id of selected target
			var id = target.parentNode.parentNode.parentNode.id;
			MyLogger.log('MyController-detailEditDeleteButtons - id-'+id);
			
			switch(target.value)
			{
				case 'Detail':					
					var data = MyModel.read(id);
					MyLogger.traceObject(data);	
					// show detail box
					MyView.showDetailBox(id,data);
					break;
				case 'Edit':
					var data = MyModel.read(id);
					MyLogger.traceObject(data);
					// open form box in edit mode
					MyView.showEditBox(id,data);
					break;
				case 'Delete':
					var dflag = MyModel.remove(id);
					MyLogger.log('MyController-detailEditDeleteButtons - dflag-'+dflag);
					if(dflag)
					{
						// remove this form display list						
						MyView.removeFromDisplayList(event);

						// reset the sr number
						MyView.resetSRNumber(event);	

						MyView.showAddNewButton();	
					}
					break;
				default:					
					MyLogger.log('MyController-detailEditDeleteButtons - default');
			}
		}
		
	}	

	MyLogger.log('MyController-detailEditDeleteButtons - end');
	
	preventEvent(event);
};

// hide detail event handler
MyController.backDetailButton = function(event){	
	
	MyLogger.log('MyController-backDetailButton - start');
	event = getEvent(event);
	// hide detail box
	MyView.hideDetailBox();	
	
	MyLogger.log('MyController-backDetailButton - end');
	
	preventEvent(event);
};