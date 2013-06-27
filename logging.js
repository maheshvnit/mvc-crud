// logging technique

//set debug = false to disable alert
var debug = true; // true / false		

/*****************************************************************************
*
*	Function Name	:	trace	
*	Description		:	for any debug related information, error logging etc.
*	Parameters		:	String
*	Return 			:	None
*
*******************************************************************************/
function trace(msg) 
{	
	if(debug) 
	{
		if (typeof console == 'undefined') 
		{	
			alert(msg);
		}
		else
		{
			console.log(msg);
		}
	}
}

/*****************************************************************************
*
*	Function Name	:	traceObject	
*	Description		:	for any debug related information, error logging etc.
*	Parameters		:	Object / Array
*	Return 			:	None
*
*******************************************************************************/
function traceObject(obj) 
{	
	for (var x in obj)
	{
		if(typeof obj[x]=="object")
		{
			trace("--- -  " + x + ' - ' + obj[x]); 
			traceObject(obj[x]);
		}
		else
		{
			trace(x + ' - ' + obj[x]); 
		}
	}
}
		
if (typeof console == 'undefined') 
{
	var console = {};
	console.log = function(msg) {
		trace(msg);				
	};
	console.debug = function(msg) {
		trace(msg);				
	};
	console.error = function(msg) {
		trace(msg);				
	};
	console.info = function(msg) {
		trace(msg);				
	};
	console.warn = function(msg) {
		trace(msg);				
	};
}	

// My Logger	
var MyLogger = {};		

	
//*
MyLogger.log = function(msg,type)
{
	if (typeof type == 'undefined')
	{
		if(debug) console.log(msg);
	}
	else
	{
		switch(type)
		{
			case 'debug':					
				if(debug) console.debug(msg);
				break;
			case 'error':
				if(debug) console.error(msg);
				break;
			case 'info':					
				if(debug) console.info(msg);
				break;					
			case 'warn':
				if(debug) console.warn(msg);
				break;
			default:					
				if(debug) console.log(msg);
		}	
	}
};
//*/
/*
MyLogger.log = function(msg) {
	console.log(msg);				
};	
//*/	
MyLogger.warn = function(msg) {
	if(debug) console.warn(msg);				
};		

MyLogger.info = function(msg) 
{
	if(debug) console.info(msg);				
};		

MyLogger.error = function(msg) 
{
	if(debug) console.error(msg);				
};		

MyLogger.debug = function(msg) 
{
	if(debug) console.debug(msg);				
};		

MyLogger.warn = function(msg) 
{
	if(debug) console.warn(msg);				
};
MyLogger.trace = function(msg) 
{
	trace(msg);				
};
MyLogger.traceObject = function(obj) 
{
	traceObject(obj);				
};
 