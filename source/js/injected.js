/**
 * Script injected to main OK page
 * 
 * Connects popup window and main page
 * Manage tabs with OK pages.
 * 
 * 
 * @author LestaD
 * @package net.lestad.okchanger
 * @version 2.0
 */

var inj = {
	cookie: {},
	storage: {},
	upd: {},
	newst: {},
	obj: {},
	music: {},
	bgs: {},
	debug: true,
	updateRate: 500,
	updateID: 0,
	jSessionID: "",
	_userdata: null,
};

inj.loadCookie = function()
{
	var $dco = document.cookie;
	$dco = $dco.replace(' ', '');
	var $bsd = $dco.split(';');
	for ( i in $bsd )
	{
		var z = $bsd[i].split('=');
		inj.cookie[z[0]] = z[1];
	}
};

b = {};

	
/**
 * Call method from inj by his name
 * 
 * @param {string} method name
 * @param {object} request
 * @param {type} sender
 */
inj.call = function( method, request, sender ) {
	// Наличие метода
	if ( typeof inj[method] === "function" ) {
		// Вызов метода и возврат его значения
		return inj[method]( request, sender );
	}
	else {
	    if (inj.debug) {
		console.warn.apply(console, ['OKChm:', 'Function does not exists', 'inj[', method, '], typeof -> ', typeof inj[method] ])
	    }
	}
};


// Отслеживание сообщений
inj.onMessage = function( request, sender, sendResponse ) {
	inj.log("message!");
	inj.log( request );
	
	if ( typeof request.method !== "undefined" ) {
		// Вызов метода с передачей всех данных
		sendResponse( inj.call( request.method, request.data, sender ) );
	}
};

// Печать сообщений в консоль
inj.log = function( message, object ) {
    if ( !inj.debug ) return;
    if (typeof object === "undefined")
	console.log.apply(console, ['OKChm:', message]);
    else
	console.log.apply(console, ['OKChm:', message, object]);
};

/**
 * Prints error message to console
 * 
 * @param {type} message
 */
inj.error = function( message, object ) {
    if ( !inj.debug ) return;
    if (typeof object === "undefined")
	console.error.apply(console, ['OKChm:', message]);
    else
	console.error.apply(console, ['OKChm:', message, object]);
};

// Ссылка на пустую функцию
inj.epmty = function(){};

// Скрытие блока
b.hide = function( name ) {
	var $block = $(name);
	if ( $block.css("display") != "none" ) {
		$block.hide();
	}
};

// Показать блок
b.show = function( name ) {
	var $block = $(name);
	if ( $block.css("display") == "none" ) {
		$block.show();
	}
};

// Удалить блок
b.remove = function( name ) {
	var $block = $(name);
	if ( $block.exists() ) {
		$block.remove();
	}
};

/**
 * Update CSS-code block
 * 
 * @param {string} name Name of block with css code
 * @param {boolean} value Current value of setting 
 * @param {string} css CSS-code for set
 */
b.stylehiding = function(name,value,css)
{
	if ( value == 1 || value == true ) {
		$("#okch_"+name).remove();
		$('<style id="okch_'+name+'" />').html(css).appendTo('body');
	} else {
		$("#okch_"+name).remove();
	}
};

// Вырезание рекламы
inj.upd.s_adblock = function( value ) {
	b.stylehiding('adblock',value,"\
				#hook_Block_ForthColumnTopBanner.hookBlock, \
				.fo4c_h_divider__first, \
				#hook_Block_StickyBannerContainer, \
				.fcofw .dialogWrapperBanner, \
				.topPanel_m .dialogWrapperBanner, .topPanel_d .dialogWrapperBanner, \
				.dialogWrapperBanner__inner, .banner_new__loaded, .dialogWrapperBanner__bottom, #hook_Block_BlockAsyncFrOln4thCol, \
				#hook_Block_LeftColumnAdCustom,\
				#hook_Block_ViewportHeightAwareBanner,\
				.mctc_link.__v1 {display:none !important;}\
			");
	inj.storage.s_adblock = value;
};

/**
 * @deprecated 
 * @param {type} value
 * @returns {undefined}
 */
inj.upd.s_buttonsize = function( value ) {
	delete inj.storage.s_buttonsize;
};

// Автоматическое перенаправление по ссылкам
inj.upd.t_fullredirect = 0;
inj.upd.s_fullredirect = function( value ) {
	if ( value == 1 || value == true ) {
		clearInterval(inj.upd.t_fullredirect);
		inj.upd.t_fullredirect = setInterval(function(){
			if ( $("div.service-stub_content").exists() ) {
				var link = $("div.service-stub_content a").attr("href");
				document.location.href = link;
				clearInterval(inj.upd.t_fullredirect);
			}
		}, 200);
	} else {
		clearInterval(inj.upd.t_fullredirect);
	}
	
	inj.storage.s_fullredirect = value;
}


/**
 * @deprecated 
 * @param {type} value
 * @returns {undefined}
 */
inj.upd.s_minimize = function( value ) {
	delete inj.storage.s_minimize;
}


// Удаление блока "Что общего"
inj.upd.s_friendcommon = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_FriendCommonData");
	} else {
		b.show("#hook_Block_FriendCommonData");
	}
	
	inj.storage.s_friendcommon = value;
}


// Скрыть блок "Закладки"
inj.upd.s_bookmarks = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_LeftColumnBookmarks");
	} else {
		b.show("#hook_Block_LeftColumnBookmarks");
	}
	
	inj.storage.s_bookmarks = value;
}

// Скрытие блока "Группы"
inj.upd.s_groups = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_RecommendedGroups");
	} else {
		b.show("#hook_Block_RecommendedGroups");
	}
	
	inj.storage.s_groups = value;
}

// Скрытие блока "Мероприятия"
inj.upd.s_happenings = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_RightColumnHappeningList");
	} else {
		b.show("#hook_Block_RightColumnHappeningList");
	}
	
	inj.storage.s_happenings = value;
}

// Скрытие блока "Работали вместе?"
inj.upd.s_workwith = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_RightColumnRecommendationsByRelation");
	} else {
		b.show("#hook_Block_RightColumnRecommendationsByRelation");
	}
	
	inj.storage.s_workwith = value;
}


// Скрытие блока "Рекомендуем"
inj.upd.s_recommended = function( value )
{
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_RecommendedGroups");
	} else {
		b.show("#hook_Block_RecommendedGroups");
	}
	
	inj.storage.s_recommended = value;
}


// Скрытие блока "О Себе"
inj.upd.s_abouts = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_AboutUserRB");
	} else {
		b.show("#hook_Block_AboutUserRB");
	}
	
	inj.storage.s_abouts = value;
}

// Скрытие блока "Игры"
inj.upd.s_games = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_TargetBanner");
	} else {
		b.show("#hook_Block_TargetBanner");
	}
	
	inj.storage.s_games = value;
}

inj.upd.s_music4u = function( value ) {
	b.stylehiding('music4u', value, "\
			#hook_Block_RightColumnMusicRecommendations {display: none;}\
		");
	inj.storage.s_music4u = value;
}

// Скрытие блока "Праздники друзей"
inj.upd.s_holydays = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_HolidaysPortlet");
	} else {
		b.show("#hook_Block_HolidaysPortlet");
	}
	
	inj.storage.s_holydays = value;
}

// Скрытие блока "Вы знакомы?"
inj.upd.s_possible = function( value ) {
	if ( value == 1 || value == true ) {
		b.hide("#hook_Block_UserRecommendationsWithTarget");
	} else {
		b.show("#hook_Block_UserRecommendationsWithTarget");
	}
	
	inj.storage.s_possible = value;
}

// Скрытие блока "Вошел на сайт"
inj.upd.s_friendonline = function ( value ) {
	if ( value == 1 || value == true ) {
		b.hide(".friendOnlineWrapper");
	} else {
		b.show(".friendOnlineWrapper");
	}
	
	inj.storage.s_friendonline = value;
}


/**
 * Revert old messages view
 * 
 * @param {boolean} value
 */
inj.upd.s_oldmessages = function(value) {
	b.stylehiding('oldmessages', value, "");
	inj.storage.s_oldmessages = value;
};


/**
 * @deprecated 
 * @param {type} value
 * @returns {undefined}
 */
inj.upd.s_hidedecor = function( value )
{
	inj.storage.s_hidedecor = value;
}


/**
 * @deprecated 
 * @param {type} value
 * @returns {undefined}
 */
inj.upd.s_logotypemenu = function( value ) {
	delete inj.storage.s_logotypemenu;
};

// Скрытие панели Mail.Ru
inj.upd.s_mailbar = function( value ) {
	b.stylehiding('mailbar', value, "\
					#hook_Block_Portal {display: none;} \
					#topPanel {height: 48px;} \
					.multimedia-layer, .user #hook_Block_MainContainer, .layer-video, .pl, .vp, .layer-media .layer_ovr, .layer-media, .topPanel .modal_overlay {top: 48px;} \
					.topPanel .dialogWrapper, #nwsbw, #nwslc {top: 54px;} \
					.ntf_spacer {margin-top:54px} \
					.layer_hld {margin-top: 6px} \
					.user #hook_Block_MainContainer{padding-top: 48px;}\
					.modal.__toolbar-indent{ top: 48px; } \
				");
	inj.storage.s_mailbar = value;
}


// Автоскрытие верхней панели
inj.upd.s_autohidebar = function( value ) {
	if ( value ) {
		b.stylehiding('autohidebar', value, "\
					#topPanel {transition: margin-top .3s}\
					.modal.__toolbar-indent{top: 0}\
				");
		$(window).scroll(function(){
			inj.log($("body").scrollTop());
			if ( $(window).scrollTop() < 200 ) {
				$("#topPanel").css("margin-top", "0px");
			} else $("#topPanel").css("margin-top", "-50px");
		});
		$(window).trigger("scroll");
	} else {
		b.stylehiding('autohidebar', false, "\
					#topPanel {transition: margin-top .3s}\
				");
		$(window).off("scroll");
		$("#topPanel").css("margin-top", "0px");
	}
	
	inj.storage.s_autohidebar = value;
}


/**
 * @deprecated 
 * @param {type} value
 * @returns {undefined}
 */
inj.upd.s_shadows = function( value ) {
	delete inj.storage.s_shadows;
}


// Опустить аватарку
inj.upd.s_avatardown = function( value ) {
	b.stylehiding('avatardown', value, "\
				#mainContent.grid #mainContentLeftColumn {margin-top: -20px}\
				.user #mainContent:before{top: 0px !important;}\
			");
	inj.storage.s_avatardown = value;
};


// Убрать оценки над фотографиями
inj.upd.s_hidemarks = function( value ) {
	b.stylehiding('hidemarks', value, "\
				.mark_ic {display: none;} \
			");
	inj.storage.s_hidemarks = value;
}


// Убрать подарки
inj.upd.s_hidepresents = function( value ) {
	b.stylehiding('hidepresents', value, "\
				.photoPresentSmall {display: none;} \
			");
	inj.storage.s_hidepresents = value;
}


/**
 *  Убрать всплывающее меню
 * @deprecated
 */
inj.upd.s_contentmenu = function( value ) {
	delete inj.storage.s_contentmenu;
}


// Убрать Всплывающие оповещения
inj.upd.s_bubblenotif = function( value ) {
	b.stylehiding('bubblenotif', value, "\
				.ntf_spacer {display: none;} \
				.ntf_spacer__on {display: none; visibility: hidden}\
			");
	inj.storage.s_bubblenotif = value;
}


// Убрать подарки
inj.upd.s_hidecounters = function( value ) {
	b.stylehiding('hidecounters', value, "\
				.notifications {display: none;} \
			");
	inj.storage.s_hidecounters = value;
}


// Выключить моргающий маркер онлайна
inj.upd.s_hideonlinem = function( value ) {
	b.stylehiding('hideonlinem', value, "\
				.ic_online {display: none;} \
			");
	inj.storage.s_hideonlinem = value;
}


// Прозрачность страницы
inj.upd.l_pagetransp = function( value )
{
	$("#okch_pagetransp").remove();
	
	if ( value < 5 ) {
		$('<style id="okch_pagetransp" />').html(".mainContent_w{opacity: 0} \
		#hook_Block_FriendsOnlineWrapper { opacity: 0; }").appendTo("body");
	} else {
		var bgc = typeof inj.storage.l_pagecolor == "undefined" ? "(255,255,255," : inj.storage.l_pagecolor.replace(')', ',');
		$('<style id="okch_pagetransp" />').html( "#mainContent.grid, .user #mainContent.grid, .user.fcofw #fthColWrp.grid:before, .fcofw .online-fr.grid .online-fr_block,.user #mainContent.grid:before \
		{ background: rgba"+bgc+""+ ( value / 100) +") !important; }").appendTo("body");
	}
	
	inj.storage.l_pagetransp = value;
}


// Цвет страницы
inj.upd.l_pagecolor = function( value )
{
	inj.storage.l_pagecolor = value;
	inj.upd.l_pagetransp( inj.storage.l_pagetransp );
}


// Скрытие кнопки плеера
inj.upd.s_playerbutton = function( value ) {
	b.stylehiding('playerbutton', value, "\
				#topPanelMusicPlayerControl {display: none;} \
				.toolbar_nav_a__audio {margin-right:0px} \
			");
	inj.storage.s_playerbutton = value;
}

// 
inj.upd.s_rightcolumn = function( value ) {
	inj.storage.s_rightcolumn = value;
}

// Уменьшение строки поиска
inj.upd.s_searchfield = function( value ) {
	inj.storage.s_searchfield = value;
}

// Круглые цвета текста
inj.upd.s_stylescircle = function( value )
{
	inj.storage.s_stylescircle = value;
}


// Скрыть блок Модератор Одноклассников
inj.upd.s_moderatorblock = function( value )
{
	b.stylehiding('moderatorblock', value, "\
				#hook_Block_ModerationLauncher {display:none !important} \
			");
	inj.storage.s_moderatorblock = value;
}

// Блок различной рекламы
inj.upd.s_adcustomblock = function( value )
{
	b.stylehiding('adcustomblock', value, "\
				leftCustomAdv, #hook_Block_LeftColumnAdCustom{display:none} \
			");
	inj.storage.s_moderatorblock = value;
}

// Вызов функции при изменении параметров
inj.upd.st_id = function( value ) {
	// ...
	
	inj.storage.st_id = value;
}

inj.upd.st_url = function( value ) {
	$("#okch_style_set").attr("href", value);
	
	inj.storage.st_url = value;
}

inj.upd.ft = function( value )
{
	if ( value.name != -1 ) {
		$("#okch_setfont").html("\
		@import url("+value.url+"); \
		* {font-family: '"+value.name+"'}");
	} else {
		$("#okch_setfont").html("* {}");
	}
	inj.storage.ft = value;
}


inj.upd.mods = function(value) {
	for( var i in value ) {
		var mod = value[i];
		$("#okch_mod_"+i).remove();
		if ( mod == "remove" ) {
			delete value[i];
			continue;
		}
		var $o = $('<div id="okch_mod_'+i+'" style="display: none" />')
		if ( typeof(mod.css) != "undefined" && mod.css != "" && mod.css != false ) {
			$o.append('<link rel="stylesheet" type="text/css" href="'+mod.css+'" />');
		}
		
		$o.appendTo('head');
	}
	inj.storage.mods = value;
}

// Dummy for statistic
inj.upd.stat_date = function( value ) {
	inj.storage.stat_date = value;
}

inj.upd.stat_useragent = function( value ) {
  inj.storage.stat_useragent = value;
}

inj.upd.stat_okchanger = function( value ) {
	inj.storage.stat_okchanger = value;
}

inj.upd.useragent = function (v) {}

inj.upd.dec_id = function( value ) {
	// ...
	
	inj.storage.dec_id = value;
}

inj.upd.dec_url = function( value )
{
	if ( value == "orig" )
	{
		$("#okch_setdecor").html("");
	}
	else if ( value == "empty" )
	{
		$("#okch_setdecor").html(".fcofw .toolbar_decor, .toolbar_decor {background-image: none;}");
	}
	else
	{
		$("#okch_setdecor").html("\
			.fcofw .toolbar_decor, .toolbar_decor { background-image:url('"+value+"'); \
			background-repeat: no-repeat; background-position:top } \
		");
	}
	
	inj.storage.dec_url = value;
}

inj.upd.theme_id = function( val )
{
	inj.storage.theme_id = val;
}

inj.upd.theme_file = function( value )
{
	inj.storage.theme_file = value;
	
	inj.bgs.apply( inj.storage.theme_id, inj.storage.theme_file );
	
	inj.log( inj.storage );
}

inj.upd.news_last_id = function( value ) {
	inj.storage.news_last_id = value;
}

// Добавление ссылки на офицальную группу
inj.upd.update_authorspage = function()
{
	if ( !$("#action_menu_official_group").exists() )
	{
		$(".u-menu__mt").append('\
			<li class="u-menu_li" id="action_menu_official_group">\
				<a class="u-menu_a" id="action_menu_official_group_a" href="/okchanger" hrefattrs="st.cmd=userMain&amp;st._aid=FriendFriend_Visit" title="OK Changer">\
					<span class="tico"><i class="tico_img ic ic_officialg"></i>'+chrome.i18n.getMessage('officialGroup')+'</span>\
				</a>\
			</li>\
		'); // background-position: left -538px;
	}
}

// Официальная страница на группу и профиль Автора
inj.upd.update_officialpage = function()
{
	
}

// Кнопка выход на панели
inj.upd.update_exitbutton = function() {
	if ( inj.storage.s_mailbar != 1 && inj.storage.s_mailbar != true ) {
		b.stylehiding("searchfield", false, "");
		return;
	}
	
	if ( !$("#toolbar_nav_exit").exists() && $("#hook_Block_HeaderTopMenuInToolbar").exists() ) {
		b.stylehiding("searchfield", true, "\
					div.toolbar_search {width: 150px} \
					#liveSearchSugg #field_query {width: 125px} \
					\
				");
		
		$('\
			<li class="toolbar_nav_i" id="toolbar_nav_exit">\
				<div class="hookBlock">\
					<a propagate="true" class="toolbar_nav_a toolbar_nav_a__guests" href="/dk?st.cmd=userMain&cmd=PopLayer&st.layer.cmd=PopLayerLogoffUser" id="nav_toolbar_a_exit">\
						<div class="toolbar_nav_i_glow"></div>\
						<div class="toolbar_nav_i_ic">\
							<div unselectable="on" class="toolbar_nav_i_tx-w usel-off">'+chrome.i18n.getMessage('buttonExit')+'</div>\
						</div>\
					</a>\
				</div>\
			</li>\
			\
			').appendTo("ul.toolbar_nav");
	}
}

inj.upd.update_mailbutton = function() {
	if ( inj.storage.s_mailbutton ) {
		$("#toolbar_nav_mail").remove();
		return;
	}
	
	if ( inj.storage.s_mailbar != 1 && inj.storage.s_mailbar != true ) {
		$("#toolbar_nav_mail").remove();
		return;
	}
	
	
	if ( !$("#toolbar_nav_mail").exists() && $("#hook_Block_HeaderTopMenuInToolbar").exists() ) {
		$('\
			<li class="toolbar_nav_i" id="toolbar_nav_mail">\
				<style>\
					.toolbar_nav_i{margin: 0 1px}\
				</style>\
				<div class="hookBlock">\
					<a target="_blank" rel="nofollow" class="toolbar_nav_a" href="http://e.mail.ru/messages/inbox/" id="nav_toolbar_a_mail">\
						<div class="toolbar_nav_i_glow"></div>\
						<div class="toolbar_nav_i_ic" style="background-image: url(http://okchanger.net/mailrubutton.png); background-position: 8px 3px">\
							<div unselectable="on" class="toolbar_nav_i_tx-w usel-off">Mail.Ru</div>\
						</div>\
						<div class="toolbar_nav_notif"><div id="counter_MailCounter" class="notifications"><div class="counterText"></div></div></div>\
					</a>\
				</div>\
			</li>\
			\
			').appendTo("ul.toolbar_nav");
			$('counter_MailCounter').hide();
	}
	
	var count = parseInt( $("#g_mail_events").text() );
	if ( count > 0 && count !== NaN ) {
		$('#counter_MailCounter').html('<div class="counterText">'+count+'</div>').show();
	} else {
		$('#counter_MailCounter').hide();
	}
}



// Проверка скрытия блоков
inj.upd.update_blocks_hiding = function()
{
	inj.upd.s_minimize		( inj.storage.s_minimize );
	inj.upd.s_friendcommon	( inj.storage.s_friendcommon );
	inj.upd.s_bookmarks		( inj.storage.s_bookmarks );
	inj.upd.s_groups		( inj.storage.s_groups );
	inj.upd.s_happenings	( inj.storage.s_happenings );
	inj.upd.s_holydays		( inj.storage.s_holydays );
	inj.upd.s_abouts		( inj.storage.s_abouts );
	inj.upd.s_possible		( inj.storage.s_possible );
	inj.upd.s_games			( inj.storage.s_games );
	inj.upd.s_friendonline	( inj.storage.s_friendonline );
	inj.upd.s_recommended	( inj.storage.s_recommended );
	inj.upd.s_adcustomblock	( inj.storage.s_adcustomblock );
};



// Проверка на загрузку музыки
inj.music.update = function() {
	if ( $('.mus-tr_i[data-ok-down != "true"]').exists() ) {
		$('.mus-tr_i[data-ok-down != "true"]').each(function(index, element) {
			$(this).find(".ic16_download").remove();
			var trID = JSON.parse( $(this).attr("data-query") ).trackId;
			var $downsong = $("<a class=\"ic16 ic16_play-control ic16_download\" title=\""+chrome.i18n.getMessage('DownloadSong')+"\"></a>");
			$downsong.attr("id", "ok-musdn_" + trID);
			
			var data = {};
			data.id = trID;
			data.artist = $(this).find(".mus-tr_artist").text();
			data.song = $(this).find(".mus-tr_song").text();
			
			$downsong.hover(function(){inj.music.hover(data);return false;});
			
			$(this).find('.ic16_play').after($downsong);
			$(this).attr("data-ok-down", "true").addClass("mus-tr_i__download");
		});
	}
}

// Настройка кнопки для загрузки песни
inj.music.hover = function(datas) {
	var filename = translit( datas.artist + " - " + datas.song + ".mp3" );
	
	$.ajax({
		type: "GET",
		url: "http://wmf1.odnoklassniki.ru/play;jsessionid="+inj.jSessionID+"?tid="+datas.id+"&",
        dataType: "json",
        success: function(data) {
			var md5 = data.play.match(/(?:\?|&)md5=([\da-f]{32})/i);
			if (md5 && md5.length > 1) {
				md5 = md5[1];
				try {
					md5 = md5_hash(md5 + 'secret');
					var hash = getHash(md5, false);
					var url = data.play + (hash ? '&clientHash=' + hash : '');
					
					$("#ok-musdn_" + datas.id)
						.attr("download", filename+"")
						.attr("href", "" + url + "&fn=" + filename + "")
						.attr("data-downloadurl", "audio/mpeg:"+ filename + ":" + url + "&fn=" + filename + "" );
				}
				catch (err) {}
			}
		}
	});
	return false;
}


// Проверка и обработка страницы с темами
inj.bgs.check = function()
{
	// Если открыт список тем
	if ( !$("#OKCH_themes").exists() && document.location.href.match("\/themes") )
	{
		$('#mainContent').removeClass('mainContentSingleColumn').addClass('mainContentDoubleColumn');
		$('<div id="mainContentLeftColumn">'
			+ '<div id="hook_Block_LeftColumn">'
				+ '<div id="leftColumn">'
					+ '<div id="hook_Block_OKCHThemesType" class="hookBlock">'
						+ '<div id="OKCH_ThemesTypes" class="panelRounded">'
							+ '<div class="panelRounded_body">'
								+ '<div class="nav-side"></div>'
							+ '</div>'
						+ '</div>'
					+ '</div>'
				+ '</div>'
			+ '</div>'
		+ '</div>').insertAfter('#mainContentContentColumn');

		$("div.covers_cat_lst").attr("id", "def_themes").hide();
		$('<div id="OKCH_themes" class="covers_cat_lst OKCH_Themes_Category">'
				+ '<div class="portlet-i_h">'
					+ '<div class="ellip">' + chrome.i18n.getMessage('OKChangerThemes')+'</div>'
				+ '</div>'
				+ '<div class="okch_themes_content" />'
			+'</div>').appendTo(".covers_cat");

		$('<div id="OKCH_themes2" class="covers_cat_lst OKCH_Themes_Category">'
				+ '<div class="portlet-i_h">'
					+ '<div class="ellip">' + chrome.i18n.getMessage('ThemesFromUsers')+'</div>'
				+ '</div>'
				+ '<div class="okch_themes_content" />'
			+'</div>').appendTo(".covers_cat").hide();
		
		// Category
		$('#OKCH_ThemesTypes .nav-side').append('<a href="" class="okch_link nav-side_i __ac" data-page="okch">OK Changer</a>');
		$('#OKCH_ThemesTypes .nav-side').append('<a href="" class="okch_link nav-side_i" data-page="users">'+chrome.i18n.getMessage('ThemesFromUsers')+'</a>');
		$('#OKCH_ThemesTypes .nav-side').append('<a href="" class="okch_link nav-side_i" data-page="default">'+chrome.i18n.getMessage('ThemesDefault')+'</a>');

		// Create new
		// TODO: uncomment when Editor was finished
		//$('#OKCH_ThemesTypes .nav-side').append('<div class="nav-side_delim" />');
		//$('#OKCH_ThemesTypes .nav-side').append('<a href="http://beta.okchanger.net/editor" class="nav-side_i" data-page="okch">Create new theme</a>');

		inj.bgs.getthemes();
		
		$('#OKCH_ThemesTypes .nav-side').on('click', '.okch_link', inj.bgs.switch_themes_category);
	}
}

inj.bgs.switch_themes_category = function(e)
{
	e.preventDefault();

	// hide all blocks
	$("#OKCH_themes").hide();
	$("#OKCH_themes2").hide();
	$("#def_themes").hide();

	$(this).parent().find('.nav-side_i').removeClass('__ac');
	$(this).addClass('__ac');

	var page = $(this).attr('data-page');
	switch(page) {
		case 'okch':
			$("#OKCH_themes").show();
			break;
		case 'users':
			$("#OKCH_themes2").show();
			break;
		case 'default':
			$("#def_themes").show();
			break;
	}
}

inj.bgs.getthemes = function()
{
	if ( $("#OKCH_themes").exists() ) {		
	inj.log("---GetThemes()---");
		$.ajax({
			type: "GET",
			url: "http://okchanger.net/themes/",
			dataType: "json",
			success: inj.bgs.loadthemes,
			error: function()
			{
			}
		});
	}
}
// Обработчик применения темы
inj.bgs.applyHandler = function( e )
{
	var cfile = $(this).attr("data-file");
	var cid = $(this).attr("id");
	
	inj.bgs.apply( cid, cfile );
}

inj.bgs.apply = function( cid, cfile )
{
	// Проверка
	inj.log( "cid: " + cid );
	inj.log( "cfile: " + cfile );
	
	inj.storage.theme_id = cid;
	inj.storage.theme_file = cfile;
	
	chrome.runtime.sendMessage({method: "updateTheme", data: {storage: inj.storage} });
	
	$("#okch_theme_set").attr("href", cfile);
	
	inj.bgs.getthemes();
}


// Ajax handler
inj.bgs.loadthemes = function( data )
{
		var $def_themes = $("#def_themes");
		var $def_title = $("#def_title");
		var $okthemes = $("#OKCH_themes .okch_themes_content");
		var $usthemes = $("#OKCH_themes2 .okch_themes_content");
		
		var template = '<a class="covers_cat_i show-on-hover" id="{id}" data-file="{file}"><div class="covers_cat_i_cnt">\
<div class="covers_cat_preview"><img height="90" class="covers_cat_img" src="{image}" /></div>\
<div class="covers_cat_descr_w"><div class="covers_cat_descr"><div class="covers_cat_name ellip">{name}</div></div></div>\
<div class="covers_cat_i_footer"><div class="covers_cat_inf"><span class="tico" style="padding-left:0" title="Автор темы">{author}</span></div></div></div></a>';
		
		var selectedtpl = '<div class="covers_cat_i covers_cat_i__selected show-on-hover" id="{id}" data-file="{file}"><div class="covers_cat_i_cnt">\
<div class="covers_cat_preview"><img height="90" class="covers_cat_img" src="{image}"></div>\
<div class="covers_cat_descr_w"><div class="covers_cat_descr"><div class="covers_cat_name ellip">{name}</div>\
<div class="covers_cat_inf"><span class="tico"><i class="tico_img ic ic_ok"></i>'+chrome.i18n.getMessage('ThemeSelected')+'</span></div></div></div>\
<div class="covers_cat_i_footer"><div class="covers_cat_inf"><span class="tico" style="padding-left:0" title="Автор темы">{author}</span></div></div></div></div>';
		
		if ( data.error > 0 )
		{
			$okthemes.html("<center class=\"infothemes\">"+chrome.i18n.getMessage("ServerIsDown")+"!</center>");
			return;
		}
		
		if ( data.themes.length < 1 )
		{
			$okthemes.html("<center class=\"infothemes\">"+chrome.i18n.getMessage("ServerIsWork")+"!<br/></center>");
			return;
		}
		
		var tpl = "";
		
		$okthemes.html("");
		$usthemes.html("");
		
		for ( it in data.themes )
		{
			tpl = template;
			if ( inj.storage.theme_id == data.themes[it].id )
			{
				tpl = selectedtpl;
			}
			
			if ( data.themes[it].author == "team" )
			{
			
				$okthemes.append( tpl
								.replace( "{id}",		data.themes[it].id )
								.replace( "{image}",	data.themes[it].preview )
								.replace( "{name}",		data.themes[it].title )
								.replace( "{file}",		data.themes[it].file)
								.replace( "{author}",	"" )
							);
			}
			else
			{
				$usthemes.append( tpl
								.replace( "{id}",		data.themes[it].id )
								.replace( "{image}",	data.themes[it].preview )
								.replace( "{name}",		data.themes[it].title )
								.replace( "{file}",		data.themes[it].file )
								.replace( "{author}",	data.themes[it].author ? data.themes[it].author : chrome.i18n.getMessage('NoAuthor') )
							);
			}
		}
		
		// FIX: write loading users themes
		
		
		
		$("#OKCH_themes").on("click", "a", inj.bgs.applyHandler);
		$("#OKCH_themes2").on("click", "a", inj.bgs.applyHandler);
}

inj.upd.myid = function(a){}

// Регулярное обновление
inj.update = function()
{
	// Функции для обновления
	
	inj.upd.update_authorspage();
	inj.upd.update_exitbutton();
	inj.upd.update_blocks_hiding();
	inj.music.update();
	inj.bgs.check();
	
	// Повтор
	clearTimeout(inj.updateID);
	inj.updateID = setTimeout( inj.update, inj.updateRate );
};

// Обновление настроек
inj.updateAll = function( data, sender )
{
	inj.log("inj.updateAll()", data);
	//inj.log( data );
	
	for ( var i in data )
	{
		if ( data[i] !== inj.storage[i] )
		{
			if ( typeof inj.upd[i] === "function" )
			{
				inj.log( i + ": " + data[i] );
				inj.upd[i]( data[i] );
			}
			else
			{
				inj.error( "Function \"inj.upd."+ i + "\" doesn't exists!" );
			}
		}
	}
};

/**
 * Load current user data from page
 *
 * {
 *   id: string,
 *   name: string,
 *   surname: string,
 *   link: null or string,
 *   lang: string (ru, en),
 *   male: boolean (false = female)
 * }
 * 
 * 
 * @return {object}  id, name, surname, link, lang, male
 */
inj.getUser = function(debug)
{
	if (inj._userdata != null && !debug)
	{
		return inj._userdata;
	}

	var _userconfig = document.getElementById('hook_Cfg_CurrentUser').innerHTML;
	if (_userconfig)
	{
		_userconfig = _userconfig.replace('<!--', '').replace('-->', '');

		var userconfig = JSON.parse(_userconfig);
		if (debug == true) return userconfig;
		return inj._userdata = {
			id: Number(userconfig.oid),
			name: userconfig.firstName,
			surname: userconfig.lastName,
			link: userconfig.custLink,
			lang: userconfig.lang,
			male: userconfig.male,
			_: {
				pbhid: userconfig.pbhid
			}
		}
	}
	return null;
};



/**
 * Get information about guest
 *
 * {
 *   id: string,
 *   name: string,
 *   surname: string,
 *   link: null or string,
 *   lang: string (ru, en),
 *   male: boolean (false = female)
 * }
 * 
 * @return {object}  id, name, surname, link, lang, male
 */
inj.getGuest = function(debug)
{
	var hookBlocks = $('[id^="hook_ShortcutMenu_"]');
	for (var i = 0; i < hookBlocks.length; i++) {
		var hookBlock = hookBlocks[i];
		if (hookBlock)
		{
			var _data = JSON.parse(hookBlock.innerHTML.replace('<!--', '').replace('-->', ''));
			
			console.log(_data);

			var fio = _data.fio.split(' ');
			if (!_data.photoLink) continue;
			var link = _data.photoLink.match(/^\/((profile\/[0-9]+)|([a-z0-9.]+))\/?/);
			if (link) link = link[1];
			else link = null;

			var currentLink = window.location.href.match(/^http[s]?:\/\/(odnoklassniki|ok).ru\/((profile\/[0-9]+)|([a-z0-9.]+))\/?/i);
			if (currentLink) currentLink = currentLink[2];
			
			if (currentLink != link) {
				continue;
			}

			return {
				id: Number(_data.userId),
				name: fio[0],
				surname: fio[1],
				link: link, // BAD CODE HERE!!!
				male: _data.male
			}
		}
	}
	
	return false;
}


/**
 * Checks if opened page owned by current user
 * 
 * @return {Boolean} Current user own
 */
inj.isCurrentUser = function()
{
	return inj.getUser().id == (g = inj.getGuest() ? g.id : false);
}


/**
 * Run all functions
 */
inj.ready = function() {
	inj.log("inj.ready()");
	inj.log( 'inj.storage', inj.storage );
	inj.loadCookie();
	
	//chrome.runtime.sendMessage({method: "checkBadExtensions", data: {} });
	
	// Подпись на событие о принятии сообщения
	chrome.runtime.onMessage.addListener( inj.onMessage );
	
	// Добавляем вкладку для слежения
	chrome.runtime.sendMessage({method: "onAddTab", manage: "base"}, function(data) {
		inj.log(data);
		inj.updateAll(data.storage, {});
	});
	
	// Базовые стили
	$('<link rel="stylesheet" type="text/css" />')
		.attr('id', 'base_styles')
		.attr('href', chrome.extension.getURL('css/injected.css'))
		.appendTo("head");
	
	$('<link href="" type="text/css" rel="stylesheet" id="okch_style_set" />').appendTo("body"); // Style
	$('<link href="" type="text/css" rel="stylesheet" id="okch_theme_set" />').appendTo("body"); // Theme
	$('<style id="okch_setdecor" />').appendTo("body"); // Decor
	$('<style id="okch_setfont" />').appendTo("body"); // Font
	
	// jSessionID
	//inj.jSessionID = inj.cookie.JSESSIONID;
	
	// Первый запуск таймера
	inj.updateID = setTimeout( inj.update, inj.updateRate );
};

document.addEventListener("DOMContentLoaded", inj.ready);
