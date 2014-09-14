/*
 OK Changer 1.7.6
 Background page script
*/

function in_array(value, array) 
{
    for(var i = 0; i < array.length; i++) 
    {
        if(array[i] == value) return true;
    }
    return false;
}

clones = function( cur ) {
	var newObj = ( cur instanceof Array ) ? [] : {};
	for ( i in cur ) {
		if ( i == 'clone' ) continue;
		newObj[i] = cur[i];
	} return newObj;
}
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


// Печать сообщений в консоль
bg.log = function( message ) {
	if ( !bg.debug ) return;
	
	if ( typeof message == "object" ) {
		console.log( "OKCHg: [object]" );
		console.log( message );
	} else {
		console.log( "OKCHg: " + message  );
	}
}

bg.error = function( message ) {
	if ( !bg.debug ) return;
	
	if ( typeof message == "object" ) {
		console.error( "OKCHg: [object]" );
		console.error( message );
	} else {
		console.error( "OKCHg: " + message  );
	}
}

bg.listenToTab = function( tabid )
{
	if ( "tab_"+tabid in bg.tabs )
	{
		chrome.pageAction.show( tabid );
	}
}

chrome.tabs.onSelectionChanged.addListener(bg.listenToTab);

// Добавляет вкладку в стек
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
}

// Удаление вкладки из стека
bg.removeTab = function( tabid, info ) {
	if ( "tab_"+parseInt(tabid) in bg.tabs ) {
		delete bg.tabs["tab_"+parseInt(tabid)];
		bg.log("remove tab: "+tabid);
		chrome.pageAction.hide( tabid );
	}
}

// Проверка вкладки
bg.checkTab = function( tabid, changeinfo, tab) {
	if ( "tab_" + parseInt(tabid) in bg.tabs ) {
		// URL влкадки задан
		if ( typeof changeinfo.url != "undefined" ) {
			if ( changeinfo.url.substr(0,23) != "http://odnoklassniki.ru"
			&& changeinfo.url.substr(0,27) != "http://www.odnoklassniki.ru"
			&& changeinfo.url.substr(0,16) != "http://www.ok.ru"
			&& changeinfo.url.substr(0,12) != "http://ok.ru" ) {
				// Если вкладка не с одноклассниками,
				// Удаляем
				bg.removeTab(tabid);
			} else {
				chrome.pageAction.show( tabid );
				bg.checkBadExtensions();
			}
		}
	}
}

// Обновление темы
bg.updateTheme = function ( data, sender )
{
	bg.log( "bg.updateTheme" );
	
	bg.storage = data.data.storage;
	
	chrome.storage.sync.set( bg.storage, function(){});
}



// Вызов метода по его имени
bg.thinkMethod = function( method, request, sender ) {
	// Наличие метода
	if ( typeof bg[method] == "function" ) {
		// Вызов метода и возврат его значения
		var ret = bg[method]( request, sender );
		return ret;
	} else {
		bg.error( "Method not exists!" );
		return false;
	}
}

// Обработка сообщения
bg.message = function(request, sender, sendResponse) {
	bg.log("bg.message");
	
	if ( sender.tab ) {
		// From injected
		if ( typeof request.method != "undefined" ) {
			// Вызов метода с передачей всех данных
			var ret = bg.thinkMethod(request.method, request, sender);
			sendResponse( ret );
		}
	} else {
		// From popup
		if ( typeof request.method != "undefined" ) {
			// Вызов метода без передачи имени метода
			sendResponse( bg.thinkMethod(request.method, request.data, sender) );
		}
	}
}

// Метод отправки данных в injected
bg.sendDataToInjected = function( data, sender ) {
	bg.log("...sendDataToInjected");
	bg.updateTabs( data );
}

// Отправка данных во все отслеживаемые вкладки
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
}


// Добавление ссылки
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
}

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
    var res = confirm(msg);
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
}

bg.checkBadExtensions = function()
{
    bg.log('bg.checkBadExtensions');
    var bads = [];
    chrome.management.getAll(function(all){
	for (i in all) {
	    var ext = all[i];
	    console.log(ext.name + ': ' + (ext.enabled ? 'enabled' : 'disabled')
			+' - '+ (typeof bg.badexts[ext.id] !== "undefined" ? 'exists': 'hasnt'));
	    if (typeof bg.badexts[ext.id] != "undefined") {
		if (ext.enabled) {
		    bads.push(ext.id);
		}
	    }
	}
	
	console.log(bads);
	if (bads.length > 0) {
	    //if (typeof(bg.storage['batthert']) == "undefined" || bg.storage['batthert'] == false) {
		bg.batthertExts(bads);
	    //}
	}
    });
    
}

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

// Загрузка данных из локального хранилища
bg.ready = function() {
	bg.log("bg.ready");
	
	chrome.storage.sync.get( null, function(st) {
		bg.storage = st;
		bg.checkBadExtensions();
	});
}

// Событие по приходу сообщения
chrome.extension.onMessage.addListener( bg.message );

// Событие при закрытии вкладки
chrome.tabs.onRemoved.addListener( bg.removeTab );

// Событие при обновлении вкладки
chrome.tabs.onUpdated.addListener( bg.checkTab );

// Добавление меню
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

// Запуск фоновой странички
bg.ready();
