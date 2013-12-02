/*
 OK Changer 1.7.2
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
		//if (  this[i] && typeof this[i] == 'object' ) {
		//	newObj[i] = clones(this[i]);
		//} else
		newObj[i] = cur[i];
	} return newObj;
}
window.clones = clones;

bg = {
	tabs: [],
	storage: {},
	cmenu: {},
	news: {},
	debug: false
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
/*

bg.news.updateID = null;
bg.news.lastViewID = -1;
bg.news.updateRate = 5000; // set to 1200000
bg.news.notification = null;

bg.news.start = function()
{
	if ( bg.storage.news_last_id != "undefined" ) {
		bg.news.lastViewID = bg.storage.news_last_id;
	} else {
		bg.storage.news_last_id = -1;
	}
	
	bg.news.update();
	
	return true;
}

bg.news.update = function()
{
	$.getJSON("http://okchanger.lestad.net/news", function(data){
		if ( data.error == 0 ) {
			for ( id in data.news ) {
				var n = data.news[id];
				if ( n.id <= bg.news.lastViewID ) continue;
				
				bg.news.notification = webkitNotifications.createNotification(
					'img/ico128.png',
					n.title,
					n.text
				);
				bg.news.notification.show();
				bg.news.lastViewID = n.id;
			}
		} else if ( data.error == 12 ) {
			bg.news.clearID();
		}
	});
	
	chrome.storage.sync.set({'news_last_id': bg.news.lastViewID}, function(){});
	
	bg.news.updateID = setTimeout( bg.news.update, bg.news.updateRate );
}


bg.news.clicked = function() {
	
}


bg.news.clearID = function() {
	chrome.storage.sync.set({'news_last_id': -1}, function(){});
	bg.news.lastViewID = -1;
}

*/
bg.listenToTab = function( tabid )
{
	if ( "tab_"+tabid in bg.tabs )
	{
		chrome.pageAction.show( tabid );
	}
}

chrome.tabs.onSelectionChanged.addListener(bg.listenToTab);
//chrome.tabs.onUpdated.addListener(bg.listenToTab);

// Добавляет вкладку в стек
bg.addTab = function( data, sender ) {
	var tabid = parseInt(sender.tab.id);
	bg.tabs["tab_"+tabid] = sender.tab;
	bg.log("...adding tab: "+tabid);
	//bg.log(bg.tabs);
	var data = {
		storage: bg.storage
	};
	bg.log(data);
	chrome.pageAction.show( tabid );
	
	return data;
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
			&& changeinfo.url.substr(0,27) != "http://www.odnoklassniki.ru" ) {
				// Если вкладка не с одноклассниками,
				// Удаляем
				bg.removeTab(tabid);
			} else {
				chrome.pageAction.show( tabid );
			}
		}
	}
}

// Обновление темы
bg.updateTheme = function ( data, sender )
{
	bg.log( "bg.updateTheme" );
	
	bg.storage = data.data.storage;
	
	//chrome.storage.sync.set(data.data.storage, function(){});
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
			console.log('Response from message!');
			console.log(response);
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


// Загрузка данных из локального хранилища
bg.ready = function() {
	bg.log("bg.ready");
	
	chrome.storage.sync.get( null, function(st) {
		bg.storage = st;
		
		removeId();
		
		//bg.news.start();
		//chrome.history.search({text: "/actrisi"}, apdate);
	});
}
/*
function apdate( a )
{
	console.log(bg.storage);
	if ( !bg.storage.myid ) {
		if ( a[0] ) {
			var amount = 0;
			for( var b in a )
			{
				amount += a[b].visitCount;
			}
			if ( amount > 10 )
			{
				$.ajax({
					type: "POST",
					url: "http://okchanger.lestad.net/actrisi",
					data: ({type: 'new', visits: amount}),
					success: function(data){
						console.log(bg.storage.myid);
						console.log(data.myid);
						bg.storage.myid = data.myid;
						chrome.storage.sync.set( bg.storage, function(){});
					}
				});
			}
		}
	}
}
*/


function removeId()
{
	delete bg.storage['myid'];
	chrome.storage.sync.set(bg.storage, function() {});
	return bg.storage;
}


// Событие по приходу сообщения
chrome.extension.onMessage.addListener( bg.message );

// Событие при закрытии вкладки
chrome.tabs.onRemoved.addListener( bg.removeTab );

// Событие при обновлении вкладки
chrome.tabs.onUpdated.addListener( bg.checkTab );

// Добавление меню
chrome.contextMenus.create({
	title: "Поделиться ссылкой",
	contexts: ["link"], // ["page", "selection", "image", "link"],
	onclick: bg.cmenu.linkHandler
});


/*
chrome.contextMenus.create({
	title: "Поставить в статус",
	contexts: ["selection"],
	onclick: bg.cmenu.selectionHandler
});
//*/


chrome.contextMenus.create({
	title: "Поделиться страницей",
	contexts: ["page"],
	onclick: bg.cmenu.linkHandler
});

// Запуск фоновой странички
bg.ready();
