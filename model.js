// Model
var MyModel = {
	data : [],		
	metadata: {			
		'firstname': {required:true},
		'email': {required:true,validate:'email'}
		//'other': {required:true}
	},
	custommetadata: {
		'other': {required:true,id:'other-txt'}
	},
	validate: function(data) {
		MyLogger.log('MyModel-validate - start');
		MyLogger.log('MyModel-validate - data-'+data);
		MyLogger.log('MyModel-validate - data.length-'+data.length);
		var invalidFields = [];
		for (var key in data) {
			MyLogger.log('MyModel-validate - key-'+key);
			MyLogger.log('MyModel-validate - data[key]-'+data[key]);
			MyLogger.log('MyModel-validate - this.metadata[key]-'+this.metadata[key]);
			// for required
			if (this.metadata[key]!=undefined && this.metadata[key].required ) { // && data[key]
				var value = data[key];
				MyLogger.log('MyModel-validate - value-'+value);
				if(!value)
				{
					invalidFields[invalidFields.length] = {
						field: key, 
						message: key + ' is required.'
					};
				}
			}
			// for email validation
			if (this.metadata[key]!=undefined && this.metadata[key].required && data[key] && this.metadata[key].validate=='email') {
				var value = data[key];
				MyLogger.log('MyModel-validate - value-'+value);				
				// check for valid email
				var validEmail = this.validateEmail(value);
				if(!validEmail)
				{
					invalidFields[invalidFields.length] = {
						field: key, 
						message: key + ' must be valid email.'
					};
				}
			}
		}
		// other custom validation
		var customKey = 'other';
		MyLogger.log('MyModel-validate - customKey-'+customKey);
		MyLogger.log('MyModel-validate - this.custommetadata[customKey].required-'+this.custommetadata[customKey].required);
		MyLogger.log('MyModel-validate - data[customKey]-'+data[customKey]);
		if (this.custommetadata[customKey]!=undefined && this.custommetadata[customKey].required && data[customKey]) {
			MyLogger.log('MyModel-validate - customKey-1');
			var value = document.getElementById(this.custommetadata[customKey].id).value;
			MyLogger.log('MyModel-validate - value-'+value);
			if(!value)
			{
				invalidFields[invalidFields.length] = {
					field: customKey, 
					message: customKey + ' is required.'
				};
			}
			MyLogger.log('MyModel-validate - customKey-2');
		}			
		
		MyLogger.log('MyModel-validate - 1');
		MyLogger.traceObject(invalidFields);	
		MyLogger.log('MyModel-validate - 2');
		MyLogger.log('MyModel-validate - end');
		return invalidFields;
	},
	validateEmail: function(email) {
		MyLogger.log('MyModel-validateEmail - start');
		var veflag = true;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(email)) {
			//Please provide a valid email address
			veflag = false;
		}
		MyLogger.log('MyModel-validateEmail - end');
		return veflag;
	},
	uniqid:function(){
		var newDate = new Date;
		return newDate.getTime();
	},	
	add: function(data) {
		MyLogger.log('MyModel-add - start');
		var id = this.uniqid();
		MyLogger.log('MyModel-add - id-'+id);
		this.data[id] = data;		
		MyLogger.log('MyModel-add - end');
		return id;
	},
	read: function(id) {
		MyLogger.log('MyModel-read - start');
		MyLogger.log('MyModel-id - '+id);		
		MyLogger.log('MyModel-read - end');
		return this.data[id];
	},
	update: function(id,data) {
		MyLogger.log('MyModel-update - start');		
		MyLogger.log('MyModel-update - id-'+id);
		this.data[id] = data;		
		MyLogger.log('MyModel-update - end');		
	},	
	remove: function(id) {
		MyLogger.log('MyModel-remove - start');
		MyLogger.log('MyModel-id - '+id);
		MyLogger.log('MyModel-remove - 1');
		MyLogger.traceObject(this.data);
		MyLogger.log('MyModel-remove - 2');		
		var dflag = delete this.data[id];
		MyLogger.log('MyModel-remove - 3');
		MyLogger.traceObject(this.data);	
		MyLogger.log('MyModel-remove - 4');		
		MyLogger.log('MyModel-remove - end');
		return dflag;
	}	
}	