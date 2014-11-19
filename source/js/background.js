/**
 * Background extension script
 * 
 * Connects popup window and main page
 * Manage tabs with OK pages.
 * 
 * 
 * @author LestaD
 * @package net.lestad.okchanger
 * @version 2.0
 */


/**
 * Check if needle has in haystack
 * 
 * @param {type} needle
 * @param {type} haystack
 * @returns {Boolean} in array
 */
function in_array(needle, haystack) 
{
    for(var i = 0; i < haystack.length; i++) 
    {
        if(haystack[i] == needle) return true;
    }
    return false;
}

clones = function( cur ) {
    var newObj = ( cur instanceof Array ) ? [] : {};
    for ( i in cur ) {
	    if ( i == 'clone' ) continue;
	    newObj[i] = cur[i];
    } return newObj;
};
window.clones = clones;

bg = {
    tabs: [],
    storage: {},
    cmenu: {},
    debug: true,
    badexts: {
	'jicldjademmddamblmdllfneeaeeclik': 'OkTools'
    }
};


/**
 * Prints any type to console
 * Check debug mode
 * 
 * @param {mixed} message
 */
bg.log = function( message ) {
    if ( !bg.debug ) return;
    console.log.apply(console, ['OKChm:', message]);
};


/**
 * Prints any type to console in red 
 * Checks debug mode
 * 
 * @param {mixed} message
 */
bg.error = function( message ) {
    if ( !bg.debug ) return;
    console.error.apply(console, ['OKChm:', message]);
};


/**
 * Show icon in address bar for listen tabs
 * 
 * @param {number} tabid
 */
bg.listenToTab = function( tabid )
{
    if ( "tab_"+tabid in bg.tabs )
    {
	chrome.pageAction.show( tabid );
    }
};

chrome.tabs.onSelectionChanged.addListener(bg.listenToTab);

/**
 * Add OK tab in stack for listen
 * 
 * @param {object} data
 * @param {object} sender
 * @returns {sdata} storage data for update
 */
bg.addTab = function( data, sender ) {
    var tabid = parseInt(sender.tab.id);
    bg.tabs["tab_"+tabid] = sender.tab;
    bg.log("...adding tab: "+tabid);
    //bg.log(bg.tabs);
    var sdata = {
	'storage': bg.storage
    };
    bg.log(sdata);
    chrome.pageAction.show( tabid );

    return sdata;
};

/**
 * Remove tab from stack.
 * Ex.: If changed address to another web-site
 * 
 * @param {number} tabid
 * @param {object} info
 */
bg.removeTab = function( tabid, info ) {
    if ( "tab_"+parseInt(tabid) in bg.tabs ) {
	delete bg.tabs["tab_"+parseInt(tabid)];
	bg.log("remove tab: "+tabid);
	chrome.pageAction.hide( tabid );
    }
};

/**
 * Check tab for 
 * 
 * @param {number} tabid
 * @param {object} changeinfo
 * @param {Tab} tab
 */
bg.checkTab = function( tabid, changeinfo, tab) {
    if ( "tab_" + parseInt(tabid) in bg.tabs ) {
	if ( typeof changeinfo.url !== "undefined" ) {
	    if ( changeinfo.url.match(/^(http[s]?:\/\/)?(www\.)?(odnoklassniki|ok).ru\/?/) !== null ||
		    changeinfo.url.match(/^(http[s]?:\/\/)?(ok)?changer\.lestad\.(net|local)\/?/) !== null) {
		chrome.pageAction.show( tabid ); // Show icon
	    } else {
		// If tab not with OK
		// Remove it
		bg.removeTab(tabid);
	    }
	}
    }
};

/**
 * Update theme in main page
 * 
 * @param {object} data
 * @param {Sender} sender
 */
bg.updateTheme = function ( data, sender )
{
    bg.storage = data.data.storage;
    chrome.storage.sync.set( bg.storage, function(){});
};



/**
 * Call method from bg object and pass data to it
 * 
 * @param {string} method Name of method in bg object
 * @param {object} request Data for passing to method
 * @param {Sender} sender 
 * @returns {Boolean|mixed} returns value of calling method if method not exists return FALSE
 */
bg.thinkMethod = function( method, request, sender ) {
    // Наличие метода
    if ( typeof bg[method] === "function" ) {
	// Вызов метода и возврат его значения
	var ret = bg[method]( request, sender );
	return ret;
    } else {
	bg.error( "Method not exists!" );
	return false;
    }
};

/**
 * 
 * 
 * @param {type} request
 * @param {type} sender
 * @param {type} sendResponse
 */
bg.message = function(request, sender, sendResponse) {
    bg.log("bg.message");

    if ( sender.tab ) {
	// From injected or method
	if ( typeof request.method !== "undefined" ) {
	    // Вызов метода с передачей всех данных
	    var ret = bg.thinkMethod(request.method, request, sender);
	    sendResponse( ret );
	}
    } else {
	// From popup
	if ( typeof request.method !== "undefined" ) {
	    // Вызов метода без передачи имени метода
	    sendResponse( bg.thinkMethod(request.method, request.data, sender) );
	}
    }
};

/**
 * Send data to injected script
 * 
 * @param {object} data
 * @param {Send} sender
 */
bg.sendDataToInjected = function( data, sender ) {
    bg.log("...sendDataToInjected");
    bg.updateTabs( data );
};

/**
 * Send data to all listen tabs
 * data receive injected.js script
 * 
 * @param {object} data
 */
bg.updateTabs = function( data ) {
    bg.log("bg.updateTabs");

    // Обновление базовых данных
    bg.storage = clones(data.data);

    // Перебор отслеживаемых вкладок
    for ( tabis in bg.tabs ) {
	// Точный ID вкладки
	var tabid = parseInt( tabis.replace("tab_","") );

	// Отправка сообщения во вкладку
	chrome.tabs.sendMessage(tabid, data, function(response){
	    // console.log('Response from message!');
	    // console.log(response);
	});
    }
    var ret = {};
    return ret;
};


/**
 * Trigger when user wants to share link to OK
 * 
 * @param {type} info
 * @param {type} tab
 */
bg.cmenu.linkHandler = function( info, tab )
{
    bg.log( info );
    bg.log( tab );

    if ( info.linkUrl )
	var link = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1000&st._surl=" + info.linkUrl;
    else
	var link = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1000&st._surl=" + tab.url;

    bg.log( link );
    chrome.windows.create({
	url: link,
	width: 600,
	height: 400,
	type: "popup"
    });
};


/**
 * Trigger on extension start
 * Show to user warning message about bad extensions
 * 
 * @param {type} bads
 */
bg.batthertExts = function(bads)
{
    var list = '';
    for (var i = 0; i < bads.length; i++)
    {
	list = list + bg.badexts[bads[i]];
	if (i != bads.length - 1) {
	    list = list + ', ';
	}
    }
    var msg = 'У вас установлены нежелательные расширения: ' + list + '\r\nВыключить их?';
    var res = false; // confirm(msg);
    if (res) {
	for (i in bads) {
	    chrome.management.setEnabled(bads[i], false);
	}
	//alert('Нежелательные расширения были выключены:\r\n' + list + '\r\nВы можете включить их вручную позже');
	for ( tabis in bg.tabs ) {
	    // Точный ID вкладки
	    var tabid = parseInt( tabis.replace("tab_","") );
	    // Перезагружаем странички с ok.ru
	    chrome.tabs.reload(tabid);
	}
    } else {
	bg.log('don\'t do anything');
    }
};


/**
 * Check installed extensions on bad
 */
bg.checkBadExtensions = function()
{
    bg.log('bg.checkBadExtensions');
    var bads = [];
    chrome.management.getAll(function(all){
	for (i in all) {
	    var ext = all[i];
	    bg.log(ext.name + ': ' + (ext.enabled ? 'enabled' : 'disabled')
			+' - '+ (typeof bg.badexts[ext.id] !== "undefined" ? 'exists': 'hasnt'));
	    if (typeof bg.badexts[ext.id] !== "undefined") {
		if (ext.enabled) {
		    bads.push(ext.id);
		}
	    }
	}
	
	bg.log(bads);
	if (bads.length > 0) {
	    //if (typeof(bg.storage['batthert']) == "undefined" || bg.storage['batthert'] == false) {
		bg.batthertExts(bads);
	    //}
	}
    });
};

/*
 * maybe remove this?
// Установка статуса
bg.cmenu.selectionHandler = function( info, tab )
{
    bg.log( info );
    bg.log( tab );

    $.ajax({
	type: "POST",
	url: "http://m.odnoklassniki.ru/dk?st.cmd=userMain&_prevCmd=userMain&bk=UserStatus&tkn=1111",
	data: ({'fr.posted': "owibdfzdekcsrbsumv0osrcgkyhiveljckoypc", 'fr.status': info.selectionText}),
	success: function(data){}
    });
}
*/

/**
 * Load data from syncronized storage
 * 
 */
bg.ready = function() {
    bg.log("bg.ready");

    chrome.storage.sync.get( null, function(st) {
	bg.storage = st;
	bg.checkBadExtensions();
    });
};

// On receive message from tab or popup
chrome.extension.onMessage.addListener( bg.message );

// On tab close. Remove tab from listen
chrome.tabs.onRemoved.addListener( bg.removeTab );

// On tab update
chrome.tabs.onUpdated.addListener( bg.checkTab );

// Create context menu items
chrome.contextMenus.create({
    title: chrome.i18n.getMessage('ShareLink'),
    contexts: ["link"], // ["page", "selection", "image", "link"],
    onclick: bg.cmenu.linkHandler
});


chrome.contextMenus.create({
    title: chrome.i18n.getMessage('SharePage'),
    contexts: ["page"],
    onclick: bg.cmenu.linkHandler
});

// Run
bg.ready();
