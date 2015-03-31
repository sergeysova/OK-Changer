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

function fix_array(list) {
    if (typeof list !== "object")
	   throw new Error("Undefined variable type: fix_array("+typeof list+")");
    
    var newlist = [];
    for (var i = 0; i < list.length; i++) {
    	if ( typeof list[i] !== "undefined" ) {
    	    newlist.push(list[i]);
    	}
    }
    return newlist;
}

bg = {
    tabs: [],
    tabsManage: [],
    storage: {},
    cmenu: {},
    debug: true,
    regex_ok: '^http(s)?\:\/\/(www.)?(ok|odnoklassniki).ru/?(.*)$',
    regex_tool: '^http(s)?\:\/\/(beta.)?okchanger.net/?(.*)$',
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
bg.log = function( message, object ) {
    if ( !bg.debug ) return;
    if (typeof object === "undefined")
	console.log.apply(console, ['OKChm:', message]);
    else
	console.log.apply(console, ['OKChm:', message, object]);
};


/**
 * Prints any type to console in red 
 * Checks debug mode
 * 
 * @param {mixed} message
 */
bg.error = function( message, object ) {
    if ( !bg.debug ) return;
    if (typeof object === "undefined")
	console.error.apply(console, ['OKChm:', message]);
    else
	console.error.apply(console, ['OKChm:', message, object]);
};

bg.saving = function() {
    // Push settings to Chrome sync storage
    chrome.storage.sync.set(bg.storage, function() {});

    bg.log( bg.storage );

    // Send message about update to background
    var sdata = {
        method: "updateAll",
        data: bg.storage
    };
    chrome.runtime.sendMessage({method: "sendDataToInjected", data: sdata }, function(response){});
};


/**
 * Show icon in address bar for listen tabs
 * 
 * @param {number} tabid
 */
bg.listenToTab = function( tabid )
{
    if ( ("tab_"+tabid in bg.tabs) || ("tab_"+tabid in bg.tabsManage) )
    {
	   chrome.pageAction.show( tabid );
    }
};


/**
 * 
 * @return {bool}
 */
bg.hasTab = function(tabid) {
    if (bg.findTabIndex(tabid) !== false) {
        return true;
    }

    return false;
}

/**
 * Find tab by his ID
 * @return {Tab} object
 */
bg.findTab = function(tabid) {
    bg.log('findTab', tabid);

    return bg.tabs[bg.findTabIndex(tabid)];
};


/**
 * Find tab index by his id
 * @return {int}
 */
bg.findTabIndex = function(tabid) {
    if (bg.tabs.length > 0) {
        for (var i = 0; i < bg.tabs.length; i++) {
            var tab = bg.tabs[i];
            if (tab.id === tabid) {
                return i;
            }
        }
    }
    return false;
};

/**
 * Add OK tab in stack for listen
 * 
 * @param {Tab} tab
 * @param {string} where
 */
bg.addTab = function( tab, where ) {
    var i = bg.tabs.push(tab);
    bg.log('AddTab('+tab.id+') under bg.tabs['+i+']');
    chrome.pageAction.show(tab.id);
};


/**
 * 
 * 
 */
bg.onAddTab = function(data, sender) {
    var tab = data[2];
    if (data[1] !== "complete") return {'storage': bg.storage};
    
    if (tab.url.match(bg.regex_ok) !== null) {
        tab.place = "base";
        bg.addTab(tab);
    }
    else if (tab.url.match(bg.regex_tool) !== null) {
        tab.place = "place";
        bg.addTab(tab);
    }

    return {'storage': bg.storage};
};



/**
 * Remove tab from stack.
 * Ex.: If changed address to another web-site
 * 
 * @param {number} tabid
 * @param {object} info
 */
bg.removeTab = function(tabid, info) {
    var tab = bg.findTabIndex(tabid);
    if (tab !== false) {
        bg.tabs.splice(tab, 1);
        bg.log('Tab('+tabid+') removed - bg.tabs['+tab+']');
    }
    chrome.pageAction.hide(tabid);
    return;
};


/**
 * Check tab for rights URI
 * 
 * @param {number} tabid
 * @param {object} changeinfo
 * @param {Tab} t
 */
bg.onTabUpdate = function( tabid, changeinfo, tab ) {
    if ( changeinfo.status === "loading") {
        // wait for load
        return;
    }
    var tix = bg.findTabIndex(tab.id);
    
    // If tab already in list (bg.tabs)
    if (tix !== false) {
        if (tab.url.match(bg.regex_ok) !== null) { // ok.ru
            tab.place = 'base';
            bg.tabs[tix] = tab;
        }
        else if (tab.url.match(bg.regex_tool) !== null) { // okchanger.net
            tab.place = 'manage';
            bg.tabs[tix] = tab;
        }
        else { // left
            bg.removeTab(tabid);
        }
    }
    else { // If new tab
        if (tab.url.match(bg.regex_ok) !== null) { // ok.ru
            tab.place = 'base';
            bg.addTab(tab);
        }
        else if (tab.url.match(bg.regex_tool) !== null) { // okchanger.net
            tab.place = 'manage';
            bg.addTab(tab);
        }
    }
};

/**
 * 
 * 
 * 
 */
bg.findNeedTabs = function() {
    chrome.tabs.query({url: [
            '*://ok.ru/*',
            '*://www.ok.ru/*',
            '*://okchanger.net/*',
            '*://beta.okchanger.net/*']}, function(tabs){
                console.log(arguments);
        for (var i = 0, tab = tabs[i]; i < tabs.length; tab = tabs[++i]) {
            /**
            var where = "base";
            if( tab.url.match(bg.regex_ok) !== null ) {
                where = 'base';
            }
            else if( tab.url.match(bg.regex_tool) !== null ) {
                where = 'manage';
            }
            bg.addTab(tab, where);
            //*/
            chrome.tabs.reload(tab.id);
        }
    });
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
bg.call = function( method, request, sender ) {
    // Has method
    if ( typeof bg[method] === "function" ) {
    	// Call method
    	return bg[method]( request, sender );
    } else {
    	bg.error( "Method not exists: ", "bg."+method+"()");
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
bg.onMessage = function(request, sender, sendResponse) {
    bg.log("bg.onMessage() -> ", request);

    if ( sender.tab ) {
    	// From injected or method
    	if ( typeof request.method !== "undefined" ) {
    	    // Call method
    	    sendResponse( bg.call(request.method, request, sender) );
    	}
    } else {
    	// From popup
    	if ( typeof request.method !== "undefined" ) {
    	    // Call method without method name
    	    sendResponse( bg.call(request.method, request.data, sender) );
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
    bg.log("bg.sendDataToInjected()", data);
    bg.updateTabs( data );
};

/**
 * Send data to all listen tabs
 * data receive injected.js script
 * 
 * @param {object} data
 */
bg.updateTabs = function( data ) {
    bg.log("bg.updateTabs()", data);

    // Обновление базовых данных
    bg.storage = clones(data.data);
	console.log('bg.tabs',bg.tabs);
    // Перебор отслеживаемых вкладок
    for ( var i = 0; i < bg.tabs.length; i++ ) {
	// Точный ID вкладки
	var tabid = bg.tabs[i].id;

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
    bg.log('bg.checkBadExtensions()');
    var bads = [];
    chrome.management.getAll(function(all){
	for (i in all) {
	    var ext = all[i];
	    // bg.log(ext.name + ': ' + (ext.enabled ? 'enabled' : 'disabled')
		//	+' - '+ (typeof bg.badexts[ext.id] !== "undefined" ? 'exists': 'hasnt'));
	    if (typeof bg.badexts[ext.id] !== "undefined") {
    		if (ext.enabled) {
    		    bads.push(ext.id);
    		}
	    }
	}
	
	bg.log('bad extensions:',bads);
	if (bads.length > 0) {
	    //if (typeof(bg.storage['batthert']) == "undefined" || bg.storage['batthert'] == false) {
		bg.batthertExts(bads);
	    //}
	}
    });
};


// FIXME: Returns tab is undefined
bg.onCommand = function(command) {
    console.log('Pressed special key');
    chrome.tabs.getCurrent(function(tab){
        console.log(tab);
        chrome.pageAction.show(tab.id);
    });
};



/**
 * Send stat on server
 * 
 */
bg.statistic = function() {
    function sendStat(url, date, data) {
        $.ajax({
            type: "POST",
            url: url + '?date='+date,
            dataType: 'json',
            data: ({'OKChanger':data}),
            success: function(res) {
                console.log(res);
                bg.saving();
            }
        });
    };

    var d = new Date();
    var date = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear();
    if (typeof bg.storage.stat_date === "undefined" || bg.storage.stat_date != date || bg.storage.stat_date === null) {
        bg.storage.stat_date = date;
        sendStat("http://beta.okchanger.net/base.php", date, bg.storage);
    }
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
        bg.statistic();
    	bg.checkBadExtensions();
        bg.findNeedTabs();
    });
};

// On receive message from tab or popup
chrome.extension.onMessage.addListener( bg.onMessage );

// On tab close. Remove tab from listen
chrome.tabs.onRemoved.addListener( bg.removeTab );

// On tab update
chrome.tabs.onUpdated.addListener( bg.onTabUpdate );

//
chrome.tabs.onActivated.addListener(bg.listenToTab);

// Commands
// chrome.commands.onCommand.addListener(bg.onCommand);


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
