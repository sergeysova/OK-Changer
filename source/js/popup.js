/*
 OK Changer 1.7.6
 Popup page
*/

popup = {
	storage: {},
	setts: {},
	decor: {},
	styles: {},
	fonts: {},
	mods: {},
	debug: false
};

// Печать сообщений в консоль
popup.log = function( message ) {
	if ( !popup.debug ) return;
	
	if ( typeof message == "object" ) {
		console.log( "OKCHp: [object]" );
		console.log( message );
	} else {
		console.log( "OKCHp: " + message  );
	}
}

popup.error = function( message ) {
	if ( !popup.debug ) return;
	
	if ( typeof message == "object" ) {
		console.error( "OKCHp: [object]" );
		console.error( message );
	} else {
		console.error( "OKCHp: " + message  );
	}
}

// Сохранение настроек
popup.saving = function(event) {
	// Загружаем данные в Chrome
	chrome.storage.sync.set(popup.storage, function() {});
	
	popup.log( popup.storage );
	
	// Отправка сообщения об обновлении данных
	var sdata = {
		method: "updateAll",
		data: popup.storage
	};
	chrome.runtime.sendMessage({method: "sendDataToInjected", data: sdata }, function(response){});
	
	if ( event ) event.preventDefault();
}

// Скрытие всех блоков
popup.hideAll = function() {
	$("#settings_block").hide();
	$("#decor_block").hide();
	$("#styles_block").hide();
	$("#fonts_block").hide();
	$("#mods_block").hide();
}

// =======================================================================

// Отображение блока настроек
popup.setts.show = function(event) {
	// Скрываем все блоки
	popup.hideAll();
	$("#settings_block").show();
	if ( event ) event.preventDefault();
	
	
	// Добавление описания
	$("#s_buttonsize")		.attr("title", "Смотреть изменения в сообщениях");
	$("#s_avatardown")		.attr("title", "Как было раньше");
	$("#s_stylescircle")	.attr("title", "Выбор цвета для текста");
	$("#s_minimize")		.attr("title", "Для отключения требуется перезагрузка страницы");
}

// Загрузка данных в блок
popup.setts.load = function() {
	// Перебор всех значений хранилища
	for ( var it in popup.storage ) {
		// Значение является настройкой
		if ( popup.storage[it] == 1 && it.substr(0,2) == "s_" ) {
			var id = it+"";
			// Ставим метку на соответствующий пункт
			$("#" + it).addClass("pb_active");
		}
	}
	
	$("#hidingblocks_accord").accordion({
		collapsible: true,
		d_active: false,
		heightStyle: "content"
	});
	
	$("#l_pagetransp").slider({
		range: "min",
		min: 0,
		max: 100,
		value: popup.storage['l_pagetransp'],
		slide: function( event, ui )
		{
			popup.storage['l_pagetransp'] = ui.value;
			popup.saving();
		}
	});
	/*
	// gray
	for (var t = 255; t > 0; t-=36 ) {
		if(t < 0) t = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+t+','+t+','+t+')">');
	}
	
	// red
	for (var r = 235; r > 0; r-=30 ) {
		if( r < 0 ) r = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb(255,'+r+','+r+')">');
	}
	
	// green
	for( var g  = 235; g > 0; g-=30 )  {
		if (g < 0) g = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+g+',255,'+g+')">');
	}
	
	// blue
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+b+','+b+',255)">');
	}
	
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+b+','+(255-b)+',255)">');
	}
	
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+(255-b)+',255,'+b+')">');
	}
	
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb(255,'+(255-b)+','+b+')">');
	}
	
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+b+','+(255-b)+','+b+')">');
	}
	
	for( var b  = 235; b > 0; b-=30 )  {
		if (b < 0) b = 0;
		$("#pagecolor_selector").append('<div class="colorb" style="background: rgb('+b+','+b+','+(255-b)+')">');
	}
	*/
	// Изменить цвет странички
	$("#pagecolor_selector").on("click", ".colorb", function(){
		var bgc = $(this).css('background-color');
		bgc = bgc.replace('rgb', '');
		popup.storage['l_pagecolor'] = bgc;
		popup.saving();
	});
}

// Клик на элементе из списка
popup.setts.clicked = function( event ) {
	// Текущий блок с настройкой
	var $a = $(this);
	// ID настройки
	var bid = $a.attr('id')+"";
	// Отмечен ли?
	if ( $a.hasClass("pb_active") ) {
		// Снимаем метку и меняем данные в хранилище
		$a.removeClass("pb_active");
		popup.storage[bid] = 0;
	} else {
		// Ставим метку и меняем данные
		$a.addClass("pb_active");
		popup.storage[bid] = 1;
	}
	// Смена состояния кнопки Сохранить
	//$("#save_settings").removeClass("pb_active").html("Сохранить");
	
	// Сохранение настроек и отправка изменений в injected
	popup.saving();
	
	// Блокировка стандартного события
	event.preventDefault();
}

// =======================================================================

// Отображение списка декора
popup.decor.show = function( event ) {
	// Скрываем все блоки
	popup.hideAll();
	$("#decor_block").show();
	if ( event ) event.preventDefault();
}

// Загрузка данных в блок
popup.decor.load = function() {
	// Событие для стандартных кнопок
	$("#dc_none, #dc_default").click(popup.decor.clicked);
	
	// Запрос к серверу за декором
	$.ajax({
		url: "http://okchanger.lestad.net/decor/",
		dataType: "json",
		success: function(data) {
			// Проверка наличия ошибок сервера
			if ( data.error <= 0 ) {
				// Количество декора в списке
				if ( data.decor.length > 0 ) {
					popup.log("decor_ajax 1");
					// Перебор каждого декора
					for ( var i = 0; i < data.decor.length; i++ ) {
						// Объект декора
						var dec = data.decor[i];
						
						//popup.log(i);
						
						// Блок выбора темы
						$('<div id="dec_'+ dec.id +'" class="decbutton" />')
							// Фон кнопки выбранной темы
							.attr("style", (popup.storage.th_url ? "background: url("+popup.storage.th_url+"');" : "none") )
							.attr("data-url", dec.url)
							.attr("data-id", dec.id)
							.attr("data-skip", "none")
							// Стиль кнопки в виде декора
							.html('<div class="decbg" style="background-image: url(\''+ dec.url +'\');">'+ dec.name +'</div>')
							.appendTo("#decor_block");
					}
					// Событие для всех элементов
					$("#decor_block").on('click', '.decbutton', popup.decor.clicked);
				} else {
					// Массив decor пуст
					$("#decor_block").append("<center>"+chrome.i18n.getMessage('ServerIsDown')+"!<br/></center>");
				}
			} else {
				// Переменная error больше 0
				$("#decor_block").append("<center>"+chrome.i18n.getMessage('ServerIsWork')+"!</center>");
			}
		},
		error: function() {
			// Не прошел AJAX запрос
			$("#decor_block").html("<center>"+chrome.i18n.getMessage('CheckInternet')+"!</center>");
		}
	});
}

// Клик на элементе из списка
popup.decor.clicked = function( event ) {
	// Блок с данными декора
	var $d = $(this);
	
	// Загрузка информации в хранилище расширения
	popup.storage.dec_id = parseInt( $d.attr("data-id") );
	popup.storage.dec_url = $d.attr("data-url");
	
	// Сохранение настроек и отправка изменений в injected
	popup.saving();
	
	// Блокирование стандартного события
	event.preventDefault();
}

// =======================================================================

// Отображение списка тем
popup.styles.show = function( event ) {
	// Скрываем все блоки
	popup.hideAll();
	$("#styles_block").show();
	if ( event ) event.preventDefault();
}

// Загрузка данных в блок
popup.styles.load = function() {
	$("#st_none, #st_default").off('click').click(popup.styles.clicked);
	
	$.ajax({
		url: "http://okchanger.lestad.net/styles/",
		dataType: "json",
		success: function(data) {
			// Проверка наличия ошибок сервера
			if ( data.error <= 0 ) {
				// Наличие стилей на сервере
				if ( data.styles.length > 0 ) {
					// Перебор каждого стиля
					for ( var i = 0; i < data.styles.length; i++ ) {
						// Объект стиля
						var th = data.styles[i];
						// Создание блока выбора стиля
						$('<div id="st_'+ th.id +'" class="stylebutton" />')
							.attr("data-url", th.url)
							.attr("data-id", th.id)
							.attr("data-skip", "none")
							.attr("style", "background-image: url('"+ th.preview +"');")
							.html('<div class="stylebg">'+ th.title + "</div>")
							.appendTo("#styles_block");
					}
					// Событие выбора темы
					$("#styles_block").on('click', '.stylebutton', popup.styles.clicked);
				} else {
					// Массив themes пуст
					$("#styles_block").append("<center>"+chrome.i18n.getMessage('ServerIsDown')+"!<br/></center>");
				}
			} else {
				// Переменная error больше 0
				$("#styles_block").append("<center>"+chrome.i18n.getMessage('ServerIsWork')+"!</center>");
			}
		},
		error: function() {
			// Не прошел AJAX запрос
			$("#styles_block").html("<center>"+chrome.i18n.getMessage('CheckInternet')+"!</center>");
		}
	});
}

// Клик на элементе из списка
popup.styles.clicked = function( event ) {
	// Данные темы
	var $t = $(this);
	
	// Сохранение в хранилище
	popup.storage.st_id = parseInt( $t.attr("data-id") );
	popup.storage.st_url = $t.attr("data-url");
	
	// Отправка и сохранение
	popup.saving();
	
	// Стандартное событие
	event.preventDefault();
}

// =======================================================================

popup.fonts.show = function( event ) {
	popup.hideAll();
	$("#fonts_block").show();
	event.preventDefault();
}

popup.fonts.load = function() {
	$("#fonts_block").on('click', '.decbutton', popup.fonts.clicked);
}

popup.fonts.clicked = function( event ) {
	var $t = $(this);
	
	
	popup.storage.ft = {
		'name': $t.attr("data-font"),
		'url': $t.attr('data-google')
	};
	
	popup.saving();
	
	event.preventDefault();
}

// =======================================================================

popup.mods.show = function( event ) {
	popup.hideAll();
	$("#mods_block").show();
	event.preventDefault();
}

popup.mods.load = function() {
	//$("#mods_block").on('click', '.decbutton', popup.fonts.clicked);
	$("#mods_block").html("<div><div>");
	$.ajax({
		url: "http://okchanger.lestad.net/mods/",
		dataType: "json",
		success: function(data) {
			if ( data.error <= 0 ) {
				if ( data.mods.length > 0 ) {
					var stMods = {};
					if ( typeof( popup.storage.mods ) != "undefined" ) {
						stMods = popup.storage.mods;
						console.log(stMods);
					}
					
					for ( var i = 0; i < data.mods.length; i++ ) {
						var mod = data.mods[i];
						
						$('<div id="mod_'+mod.id+'" class="sqbutton" />')
							.attr("data-css", mod.manifest.load.css)
							.attr("data-id", mod.id)
							.addClass(typeof(stMods[mod.manifest.type])=="undefined" ? '' : (stMods[mod.manifest.type]['id']==mod.id ? 'selected' : '') )
							.attr("data-type", mod.manifest.type)
							.attr("title", 'by ' + mod.manifest.author)
							.html('<div class="insqimg"><img src="'+mod.manifest.image+'" /></div><div class="insqbtn">'+ mod.manifest.name +'</div>')
							.appendTo("#mods_block");
						
					}
					$("#mods_block").on('click', '.sqbutton', popup.mods.clicked);
				} else {
					$("#mods_block").append("<center>"+chrome.i18n.getMessage('ServerIsDown')+"!<br/></center>");
				}
			} else {
				$("#mods_block").append("<center>"+chrome.i18n.getMessage('ServerIsWork')+"!</center>");
			}
		},
		error: function() {
			$("#mods_block").html("<center>"+chrome.i18n.getMessage('CheckInternet')+"!</center>");
		}
	});
	
	
}

popup.mods.clicked = function( event ) {
	
	var $m = $(this);
	
	if ( typeof( popup.storage.mods ) == "undefined" ) {
		popup.storage.mods = {};
	}
	
	$('#mods_block div[data-type="'+$m.attr('data-type')+'"]').removeClass('selected');
	
	if ( typeof(popup.storage.mods[$m.attr('data-type')]) != "undefined"
		&& popup.storage.mods[$m.attr('data-type')]['id'] == $m.attr('data-id') ) {
			popup.storage.mods[$m.attr('data-type')] = "remove";
	} else {
		popup.storage.mods[$m.attr('data-type')] = {
			'id': $m.attr('data-id'),
			'js': $m.attr('data-js'),
			'css': $m.attr('data-css'),
			'type': $m.attr('data-type')
		}
		$m.addClass('selected');
	}
	
	popup.saving();
	event.preventDefault();
}


// =======================================================================


// Готовность
popup.ready = function() {
	$("[data-lang]").each(function(id){
		$(this).html(chrome.i18n.getMessage($(this).attr('data-lang')));
	});
	
	
	// Читаем настройки из хранилища Chrome
	chrome.storage.sync.get(null, function(st) {
		// Корректное клонирование объекта
		popup.storage = clones(st);
		
		popup.log(popup.storage);
		
		// Загрузка данных по блокам
		popup.setts.load();
		popup.decor.load();
		popup.styles.load();
		popup.fonts.load();
		popup.mods.load();
	});
	
	// Отображение стандартного блока
	popup.setts.show();
	
	// События на кнопки
	$(".progbutton").click(popup.setts.clicked);
	$("#save_settings").click(popup.saving);
	$("#nav_setts").click(popup.setts.show);
	$("#nav_decor").click(popup.decor.show);
	$("#nav_styles").click(popup.styles.show);
	$("#nav_fonts").click(popup.fonts.show);
	$("#nav_mods").click(popup.mods.show);
}

// Хватаем завершение загрузки разметки Popup
document.addEventListener("DOMContentLoaded", popup.ready);

