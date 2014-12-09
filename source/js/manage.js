/**
 * Script mngected to page with settings.
 * Has test themes methods.
 * 
 * 
 * @author LestaD
 * @package net.lestad.okchanger
 * @version 2.0
 */

var mng = {
    storage: {},
    debug: true
};


/**
 * Prints any typed message to console
 * 
 * @param {mixed} message
 */
mng.log = function( message, object ) {
    if ( !mng.debug ) return;
    if (typeof object === "undefined")
	console.log.apply(console, ['OKChm:', message]);
    else
	console.log.apply(console, ['OKChm:', message, object]);
};


/**
 * Prints any typed error message in console in red
 * 
 * @param {mixed} message
 */
mng.error = function( message, object ) {
    if ( !mng.debug ) return;
    if (typeof object === "undefined")
	console.error.apply(console, ['OKChm:', message]);
    else
	console.error.apply(console, ['OKChm:', message, object]);
};

/**
 * Call method from mng by his name
 * 
 * @param {string} method name
 * @param {object} request
 * @param {type} sender
 */
mng.call = function( method, request, sender ) {
    // Has method
    if ( typeof mng[method] === "function" ) {
	    // Call him and return his return value
	    return mng[method]( request, sender );
    }
    else {
	// Print warning to console
	if (mng.debug) {
	    console.warn.apply(console, ['OKChm:', 'Function does not exists', 'mng.'+method+'()']);
	}
    }
    return null;
};

/**
 * Saving settings to storage
 * 
 * @param {Event} event
 */
mng.saving = function(event) {
    // Push settings to Chrome sync storage
    chrome.storage.sync.set(mng.storage, function() {});

    mng.log( mng.storage );

    // Send message about update to background
    var sdata = {
	method: "updateAll",
	data: mng.storage
    };
    chrome.runtime.sendMessage({method: "sendDataToInjected", data: sdata }, function(response){});

    if ( event ) event.preventDefault();
};

/**
 * Update local storage settings
 * 
 * @param {object} data
 * @param {Sender} sender
 */
mng.updateAll = function( data, sender ) {
	mng.log("mng.updateAll()");
	
	for ( var i in data ) {
		if ( data[i] != mng.storage[i] ) {
			if ( typeof mng.upd[i] === "function" ) {
				mng.log( i + ": " + data[i] );
				mng.upd[i]( data[i] );
			}
			else {
				mng.error( "Function \"mng.upd."+ i + "\" doesn't exists!" );
			}
		}
	}
};

mng.onMessage = function( request, sender, callback ) {
    mng.log('message', request);
    
    if (typeof request.method !== "undefined") {
	callback(mng.call(request.method, request.data, sender));
    }
};



/**
 * Create styles and links
 * 
 */
mng.ready = function() {
	mng.log("mng.ready()");
	mng.log( mng.storage );
	
	chrome.runtime.sendMessage({method: "checkBadExtensions", data: {} });
	
	// Message listener 
	chrome.runtime.onMessage.addListener( mng.onMessage );
	
	// Add this to tab to listen
	chrome.runtime.sendMessage({method: "addTab", target: "manage"}, function(data) {
	    mng.log(data);
	    mng.updateAll(data.storage, {});
	});
	
	// PAge styles
	$('<style id="okch_basestyles" />').html( "\
			\
	").appendTo("body");
    
    mng.call('ex', {}, this);
};


document.addEventListener("DOMContentLoaded", mng.ready);