/*
 OK Changer 1.7.6
 InPage injected script
*/

/*
var unused_comments = "\
	OK Changer \
	Author: LestaD \
	Page: http://ok.ru/lestad \
	\
	Специально для автора плагина OkTools. \
	Уважаемый Евгений Андреев, если Вы считаете свое расширение столь хорошим \
	Зачем крадете чужой код? \
	Видимо функции OK Changer Вам нравятся больше чем OkTools. \
	Я долго изучал Ваш код и могу признать, функций у него много. \
	Но, очень много глюков, не работающих вовсе функций и фич. \
	Огромное количество тем просто ужасны. \
	Если Вы хотите сделать свое расширение лучше, то займитесь им! \
	Мы лучше Вас. Потому что мы отбираем каждую тему, проверяем каждую строчку кода. \
	Исправляем все ошибки работы которые находим мы и наши пользователи. \
	Такого качества кода у Вас нет. Мы любим своих пользователей. \
	За полгода мы набрали 5 000 пользователей. И всё набираем. \
	Я буду пополнять список этих коментариев. \
	03.08.2013 22:34 \
	\
	Теперь у нас 11 000 пользователей. \
	Улучшаю функциональность. \
	18.08.2014 21:55 \
	";
*/

var inj = {
	cookie: {},
	storage: {},
	upd: {},
	newst: {},
	obj: {},
	music: {},
	bgs: {},
	debug: false,
	updateRate: 300,
	updateID: 0,
	jSessionID: ""
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
}

b = {};

	
// Вызов метода по имени
inj.thinkMethod = function( method, request, sender ) {
	// Наличие метода
	if ( typeof inj[method] == "function" ) {
		// Вызов метода и возврат его значения
		return inj[method]( request, sender );
	}
}


// Отслеживание сообщений
inj.message = function( request, sender, sendResponse ) {
	inj.log("message!");
	inj.log( request );
	
	if ( typeof request.method != "undefined" ) {
		// Вызов метода с передачей всех данных
		sendResponse( inj.thinkMethod( request.method, request.data, sender ) );
	}
}

// Печать сообщений в консоль
inj.log = function( message ) {
	if ( !inj.debug ) return;
	
	if ( typeof message == "object" ) {
		console.log( "OKCHi: [object] _______" );
		console.log( message );
	} else {
		console.log( "OKCHi: " + message  );
	}
}

inj.error = function( message ) {
	if ( !inj.debug ) return;
	
	if ( typeof message == "object" ) {
		console.error( "OKCHi: [object] _______" );
		console.error( message );
	} else {
		console.error( "OKCHi: " + message  );
	}
}

// Ссылка на пустую функцию
inj.epmty = function(){};

// Скрытие блока
b.hide = function( name ) {
	var $block = $(name);
	if ( $block.css("display") != "none" ) {
		$block.hide();
	}
}

// Показать блок
b.show = function( name ) {
	var $block = $(name);
	if ( $block.css("display") == "none" ) {
		$block.show();
	}
}

// Удалить блок
b.remove = function( name ) {
	var $block = $(name);
	if ( $block.exists() ) {
		$block.remove();
	}
}

b.stylehiding = function(name,value,css)
{
	if ( value == 1 || value == true ) {
		$("#okch_"+name).remove();
		$('<style id="okch_'+name+'" />').html(css).appendTo('body');
	} else {
		$("#okch_"+name).remove();
	}
}

// Вырезание рекламы
inj.upd.s_adblock = function( value ) {
	b.stylehiding('adblock',value,"\
				#hook_Block_ForthColumnTopBanner.hookBlock, \
				.fo4c_h_divider__first, \
				#hook_Block_StickyBannerContainer, \
				.fcofw .dialogWrapperBanner, \
				.topPanel_m .dialogWrapperBanner, .topPanel_d .dialogWrapperBanner, \
				.dialogWrapperBanner__inner, .banner_new__loaded, .dialogWrapperBanner__bottom \
				{ display: none } \
				.fo4c_h {padding-top: 15px} \
				.mctc_link.__v1 {display:none}\
			");
	inj.storage.s_adblock = value;
}

// Изменение размеров кнопок отправить и видеозвонок
inj.upd.s_buttonsize = function( value ) {
	inj.storage.s_buttonsize = value;
}

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


// Уменьшить страницу
inj.upd.s_minimize = function( value ) {
	
	if ( value == 1 || value == true ) {
		$("html, body").removeClass("fcofw");
	}
	
	inj.storage.s_minimize = value;
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
		b.hide("#hook_Block_UserGroupsPortlet");
	} else {
		b.show("#hook_Block_UserGroupsPortlet");
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
		b.hide("#RightColumnFriendPossible");
	} else {
		b.show("#RightColumnFriendPossible");
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


// Скрытие оформления панели
inj.upd.s_hidedecor = function( value )
{
	inj.storage.s_hidedecor = value;
}


// Скрытие меню на логотипе
inj.upd.s_logotypemenu = function( value ) {
	inj.storage.s_logotypemenu = value;
}

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


// Тень элементов дизайна
inj.upd.s_shadows = function( value ) {
	b.stylehiding('shadows', value, "\
					.topPanel .dialogWrapper, #nwsbw, #nwslc, table.mw_tbl, .modal_box, .pl_cw \
						{box-shadow: 0 0 25px 0px rgba(0, 0, 0, 1);} \
					.okch_gs_go-top, .friendOnlineWrapper, .go-top__show {box-shadow: 0 0 15px -1px rgba(0, 0, 0, .4);} \
					.photoWrapper {box-shadow: 0 0 7px rgba(0, 0, 0, .2);} \
					.lcTc .u-menu_li_ul {box-shadow: 0 1px 5px rgba(0, 0, 0, .3);} \
					.liveSearchSuggPopup {box-shadow: 0 5px 15px rgba(0, 0, 0, .3);} \
					.topPanel .dialogWrapper{bottom: 55px}\
					");
	inj.storage.s_shadows = value;
}


// Опустить аватарку
inj.upd.s_avatardown = function( value ) {
	b.stylehiding('avatardown', value, "\
				.lcTc_avatar {margin-top: 0px;} \
				.lcTc_status { margin-bottom: 20px; }\
			");
	inj.storage.s_avatardown = value;
}


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


// Убрать всплывающее меню
inj.upd.s_contentmenu = function( value ) {
	b.stylehiding('contentmenu', value, "\
				.gwt-shortcutMenu {display: none;} \
			");
	inj.storage.s_contentmenu = value;
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
		$('<style id="okch_pagetransp" />').html( ".user #mainContent, .user.fcofw .mainContent_w:before, .user #mainContent.__ntr, .fcofw .online-fr_block \
		{ background: rgba"+bgc+""+ ( value / 100) +") }").appendTo("body");
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
				#hook_Block_RightColumn #hook_Block_ModerationLauncher{display:none !important} \
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


// Скрыть все блоки
inj.upd.s_expandmod = function( value ) {
	b.stylehiding('expandmod', value, "\
				.middleRightColumn {display: none;} \
				#middleColumn {width: 725px} \
				.gwt-RichTextArea-FormatDropdown .selected a {border-radius: 50%; border: 1px solid inherit} \
			");
	inj.storage.s_expandmod = value;
}

// Скрытие кнопки писем Mail
inj.upd.s_mailbutton = function( value ) {
	inj.storage.s_mailbutton = value;
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
		$(".toolbar_c").css("display", "inline-block");
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
						<div class="toolbar_nav_i_ic" style="background-image: url(http://okchanger.lestad.net/mailrubutton.png); background-position: 8px 3px">\
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

// Кнопка "Наверх"
inj.upd.update_upbutton = function() {
	return;
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
}



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
		$('<div id="OKCH_themes" />').appendTo(".covers_cat");
		$('<div id="OKCH_themes2" />').hide().appendTo(".covers_cat");
		$("div.covers_cat_lst").attr("id", "def_themes").hide();
		
		var tpl = '<div class="mctc_navMenu">\
					<a href="" class="mctc_navMenuSec mctc_navMenuActiveSec" id="okth_load_ok">OK Changer</a>\
					<a href="" class="mctc_navMenuSec" id="okth_load_users">'+chrome.i18n.getMessage('ThemesFromUsers')+'</a>\
					<a href="" class="mctc_navMenuSec" id="okth_load_def">'+chrome.i18n.getMessage('ThemesDefault')+'</a>\
					</div>';
		
		$("<div/>").attr("id", "def_title").html(tpl).insertAfter('#mainTopContentRow');
		
		inj.bgs.getthemes();
		
		$("#okth_load_ok").on('click', inj.bgs.mythemes);
		$("#okth_load_def").on('click', inj.bgs.defthemes);
		$("#okth_load_users").on('click', inj.bgs.userthemes);
	}
}

inj.bgs.getthemes = function()
{
	if ( $("#OKCH_themes").exists() ) {		
	inj.log("---GetThemes()---");
		$.ajax({
			type: "GET",
			url: "http://okchanger.lestad.net/themes/",
			dataType: "json",
			success: inj.bgs.loadthemes,
			error: function()
			{
			}
		});
	}
}

inj.bgs.hideblockthemes = function()
{
	$("#def_themes").hide();
	$("#OKCH_themes").hide();
	$("#OKCH_themes2").hide();
}


// Handlers
inj.bgs.mythemes = function(e)
{
	$("#def_themes").hide();
	$("#OKCH_themes2").hide();
	$("#OKCH_themes").show();
	
	$("#okth_load_ok").removeClass("mctc_navMenuActiveSec").addClass("mctc_navMenuActiveSec");
	$("#okth_load_def").removeClass("mctc_navMenuActiveSec");
	$("#okth_load_users").removeClass("mctc_navMenuActiveSec");
	
	e.preventDefault();
}

inj.bgs.defthemes = function(e)
{
	$("#OKCH_themes").hide();
	$("#OKCH_themes2").hide();
	$("#def_themes").show();
	
	$("#okth_load_ok").removeClass("mctc_navMenuActiveSec");
	$("#okth_load_def").removeClass("mctc_navMenuActiveSec").addClass("mctc_navMenuActiveSec");
	$("#okth_load_users").removeClass("mctc_navMenuActiveSec");
	
	e.preventDefault();
}

inj.bgs.userthemes = function(e)
{
	$("#def_themes").hide();
	$("#OKCH_themes").hide();
	$("#OKCH_themes2").show();
	
	$("#okth_load_ok").removeClass("mctc_navMenuActiveSec");
	$("#okth_load_def").removeClass("mctc_navMenuActiveSec");
	$("#okth_load_users").removeClass("mctc_navMenuActiveSec").addClass("mctc_navMenuActiveSec");
	
	e.preventDefault();
}

// Обработчик применения темы
inj.bgs.applyHandler = function( e )
{
	var cfile = $(this).attr("-data-file");
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
		var $okthemes = $("#OKCH_themes");
		var $usthemes = $("#OKCH_themes2");
		
		var template = '<a class="covers_cat_i show-on-hover" id="{id}" -data-file="{file}"><div class="covers_cat_i_cnt">\
<div class="covers_cat_preview"><img height="90" class="covers_cat_img" src="{image}" /></div>\
<div class="covers_cat_descr_w"><div class="covers_cat_descr"><div class="covers_cat_name ellip">{name}</div></div></div>\
<div class="covers_cat_i_footer"><div class="covers_cat_inf"><span class="tico" style="padding-left:0" title="Автор темы">{author}</span></div></div></div></a>';
		
		var selectedtpl = '<div class="covers_cat_i covers_cat_i__selected show-on-hover" id="{id}" -data-file="{file}"><div class="covers_cat_i_cnt">\
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
	inj.upd.update_upbutton();
	inj.upd.update_mailbutton();
	inj.upd.update_blocks_hiding();
	inj.music.update();
	inj.bgs.check();
	
	// Повтор
	clearTimeout(inj.updateID);
	inj.updateID = setTimeout( inj.update, inj.updateRate );
}

// Обновление настроек
inj.updateAll = function( data, sender ) {
	inj.log("inj.updateAll()");
	//inj.log( data );
	
	for ( var i in data ) {
		if ( data[i] != inj.storage[i] ) {
			if ( typeof inj.upd[i] == "function" ) {
				inj.log( i + ": " + data[i] );
				inj.upd[i]( data[i] );
			} else {
				inj.error( "Function \"inj.upd."+ i + "\" doesn't exists!" );
			}
		}
	}
}


inj.ready = function() {
	inj.log("inj.ready()");
	
	inj.log( inj.storage );
	
	inj.loadCookie();
	chrome.runtime.sendMessage({method: "checkBadExtensions", data: {} });
	
	// Подпись на событие о принятии сообщения
	chrome.runtime.onMessage.addListener( inj.message );
	
	// Добавляем вкладку для слежения
	chrome.runtime.sendMessage({method: "addTab"}, function(data) {
		inj.log(data);
		inj.updateAll(data.storage, {});
	});
	
	// Базовые стили
	$('<style id="okch_basestyles" />').html( "\
			.ic_officialg {background-image: url(http://okchanger.lestad.net/themes/ico16.png);} \
			#OKCH_themes, #OKCH_themes2 {margin-top: 2px; position: relative;min-height: 590px;background-color: #EFEFEF;padding-bottom: 20px;} \
			.infothemes {padding: 30px; font-size: 16px;} \
			#hook_Block_MusicFlash, #_music_flash_container { display: block; } \
			#_music_flash_container {top: -100px; opacity: 0;}\
			.m_search_input{border-radius: inherit;padding-left: 7px;} .m_search_input_wrapper{border-radius: inherit;} \
			.m_search_input_container{border-radius: 26px;border-top-right-radius: 0;border-bottom-right-radius: 0;}\
			.m_search_button{border-top-left-radius: 0;margin-top: 10px;border-bottom-left-radius: 0;}\
			.toolbar_search.__redesign{width:160px}\
			.OKCH_smiles_mod{height: 200px} .OKCH_smiles_header{height: 32px}\
			.OKCH_smiles_container{padding-right:5px;margin-right:0px;overflow-y:auto;overflow-x:hidden;font-family:verdana;font-size:11px;position:relative;height: 170px; text-align: left} \
			.OKCH_smiles_links a{text-decoration: none;padding: 7px 10px;display: inline-block;background: #EBF5D6;margin: 0px;outline: none;-webkit-transition: background-color .2s;}\
			.OKCH_smiles_links a:hover{background: #EEF9D9}\
			.OKCH_smiles_links a.sm_cat_selected{padding: 7px 10px; border: 1px solid #9C3}\
			.OKCH_smiles_links a.sm_cat_selected:hover{padding: 7px 10px; border: 1px solid #9C3}\
			.user .fake-toolbar{display:none}\
			.toolbar_nav{margin-left: 240px}\
			.toolbar_nav_i_tx-w{padding-left: 1px; padding-right: 1px}\
			.mus-tr_hld{padding: 0 50px 0 50px;}\
			#pointerOverlay{display: none !important}\
			.mus-tr_cnt{margin-left:20px}\
			#def_title{padding: 25px; z-index:3;display: block;position: relative;}\
	").appendTo("body");
	
	$('<style type="text/css"/>').html(b.ad_css).appendTo('head');
	$('<link href="" type="text/css" rel="stylesheet" id="okch_style_set" />').appendTo("body");
	$('<link href="" type="text/css" rel="stylesheet" id="okch_theme_set" />').appendTo("body");
	$('<style id="okch_setdecor" />').appendTo("body");
	$('<style id="okch_setfont" />').appendTo("body");
	
	// jSessionID
	inj.jSessionID = inj.cookie.JSESSIONID;
	
	// Первый запуск таймера
	inj.updateID = setTimeout( inj.update, inj.updateRate );
}

document.addEventListener("DOMContentLoaded", inj.ready);
