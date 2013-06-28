// attach event 
function addEvent(obj,ent,callb)
{
	MyLogger.log('util-addEvent - start');
	if (obj.addEventListener) { 		
		MyLogger.log('util-addEvent - addEventListener');
		obj.addEventListener(ent, callb, false);   
	} else if (obj.attachEvent)  { 
		MyLogger.log('util-addEvent - attachEvent');
		obj.attachEvent('on'+ent.toString(), callb);  
	} 
	MyLogger.log('util-addEvent - end');	
}

// prevent event
function preventEvent(event)
{
	MyLogger.log('util-preventEvent - start');
	event = getEvent(event);
	MyLogger.log('util-preventEvent - event-'+event);
	MyLogger.log('util-preventEvent - event.preventDefault-'+event.preventDefault);
	MyLogger.log('util-preventEvent - event.returnValue-'+event.returnValue);
	if (typeof event.preventDefault != 'undefined') 
	{
		MyLogger.log('util-preventEvent - preventDefault');
		event.preventDefault();
	}
	else if (typeof event.returnValue != 'undefined') 
	{
		MyLogger.log('util-preventEvent - returnValue');
		event.returnValue = false;
	}
	MyLogger.log('util-preventEvent - end');
}

// get event
function getEvent(event)
{
	if(!event) var event = window.event;
	return event;
}

if (typeof document.getElementsByClassName == 'undefined' && typeof document.prototype != 'undefined') 
{
	MyLogger.log('util-getElementsByClassName -1 ');
	document.prototype.getElementsByClassName = function (classname,node) {
		var a = [];
		var re = new RegExp('(^| )'+classname+'( |$)');
		node = node ? node : document.body;
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}
	MyLogger.log(document.getElementsByClassName);
}
else if (typeof document.getElementsByClassName == 'undefined')
{
	MyLogger.log('util-getElementsByClassName -2 ');
	document.getElementsByClassName = function (classname,node) {
		var a = [];
		var re = new RegExp('(^| )'+classname+'( |$)');
		node = node ? node : document.body;
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
	}
	MyLogger.log(document.getElementsByClassName);
}
