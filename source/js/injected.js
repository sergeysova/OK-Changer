/*
 OK Changer 1.7.2
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
	smile: {},
	ad: {},
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
/*
b.ad_css = "a.trg-b-all-in-link table {width: 100%;}\
div.trg-b-admin-group {\
	position: relative;\
	width: 214px;\
	font-family: Arial, Helvetica, Sans-serif;\
	font-size: 12px;\
	color: #333;\
	margin: 0 0 9px;\
}\
.trg-b-admin-group ul.trg-b-list {\
	width: 214px;\
	padding: 8px 0 11px;\
	margin: 0;\
	list-style: none;\
	font-size: 12px;\
	color: #333;\
	text-align: left;\
	z-index: 9;\
}\
.trg-b-admin-group li.trg-b-banner {\
	margin: 0;\
	width: 212px;\
	border: 1px dashed #c4c4c4;\
    overflow: hidden;\
	background-color: white;\
}\
.trg-b-admin-group a.trg-b-all-in-link, .trg-b-admin-group a.trg-b-all-in-link:hover {\
	text-decoration: none;\
}\
.trg-b-admin-group-inside-wrap {\
    padding: 9px 12px 10px 7px;\
    width: 193px;\
    overflow: hidden;\
}\
.trg-b-admin-group img.trg-b-img {\
	padding: 0 5px 0 0;\
	float: left;\
	cursor: pointer;\
}\
.trg-b-admin-group span.trg-b-animate {\
	margin: 0 5px 0 0;\
	float: left;\
	cursor: pointer;\
}\
.trg-b-admin-group a.trg-b-header {\
	color: #333333;\
	text-decoration: none;\
	font-size: 14px;\
        line-height: 17px;\
	white-space: nowrap;\
	display: block;\
	margin: 0 0 5px 0;\
        width: 176px;\
        overflow: hidden;\
}\
.trg-b-admin-group a.trg-b-header:hover {\
    text-decoration: underline;\
}\
.trg-b-admin-group a.trg-b-header:hover, .trg-b-admin-group a.trg-b-footer:hover, .trg-b-admin-group .trg-b-contact-us-link:hover, .trg-b-admin-group a.trg-b-footer:hover {\
	color: #EB722E;\
}\
.trg-b-admin-group span.trg-b-text {\
	display: block;\
	color: #666;\
	cursor: pointer;\
	font-size: 12px;\
	margin: 0 0 2px;\
}\
.trg-b-admin-group span.trg-b-text:hover {\
    text-decoration: underline;\
}\
.trg-b-admin-group a.trg-b-footer { \
	color: #0857A6;\
	text-decoration: underline;\
	white-space: normal;\
	font-size: 12px;\
}\
div.trg-b-admin-group .admin-group-title {\
       border-bottom: 1px solid #8b9fa4;\
       font-size: 18px;\
       line-height: 1.5;\
       color: #333333;\
       display: block;\
}\
.trg-b-admin-group .admin-group-create-link {\
    text-decoration: none;\
    color: #f26d00;\
    font-size: 12px;\
    line-height: 12px;\
}\
.trg-b-admin-group .admin-group-create-link:hover {\
    text-decoration: underline;\
    color: #b84819;\
}\
.trg-b-admin-group .admin-group-wrapper-list {\
    position: relative;\
}\
.trg-b-admin-group .admin-group-sample-panel {\
    background: url(http://rs.mail.ru/b19193825.png);\
    width: 48px;\
    height: 51px;\
    display: block;\
    position: absolute;\
    top: 8px;\
    right: 0px;\
    z-index: 10;\
}";

b.ad_template = '\
	<div class="trg-b-admin-group">\
		<div class="admin-group-wrapper-list">\
			<ul class="trg-b-list">\
				<li class="trg-b-banner">\
					<a class="trg-b-all-in-link" href="{link}" onclick="window.open(this.href,\'_blank\');return!1">\
						<div class="trg-b-admin-group-inside-wrap">\
							<table border="0" cellpadding="0" cellspacing="0">\
								<tbody><tr><td>\
									<a class="trg-b-header" href="{link}" onclick="return!1">{title}</a>\
									<img class="trg-b-img" src="{image}" border="0" style="width:90px;height:90px;">\
									<span class="trg-b-text">{description}</span>\
								</td></tr></tbody>\
							</table>\
						</div>\
					</a>\
				</li>\
		</ul></div>\
	</div>';

*/
	
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
	b.stylehiding('buttonsize', value, "\
		.mdialog_chat_add-comment.__redesign .disc_input_btn.__call {margin-left: 85px}\
		.mdialog_chat_add-comment.__redesign .disc_input_btn {min-height: 32px; position: absolute; max-height: 103px; height: 100%}\
		\
	");
/*
	b.stylehiding('buttonsize',value,"\
					.disc_simple_input_btn[uid=\"uidTrigerSendMsg\"], .disc_text_area_button[uid=\"uidTrigerSendMsg\"] \
						{width:100px; right: 65px; background-position: center; font-size: 0} \
					\
					.disc_simple_input_btn[uid=\"callVMailFromComments\"], .disc_text_area_button[uid=\"callVMailFromComments\"] \
						{width: 56px; background-position: center; font-size: 0} \
					\
					.disc_simple_input_btn[uid=\"callFromComments\"], .disc_text_area_button[uid=\"callFromComments\"] \
						{width: 56px; background-position: center; font-size: 0} \
					\
					.disc_simple_input_btn[uid=\"uidClickSimpleInput\"], .disc_text_area_button[uid=\"uidClickSimpleInput\"] \
						{width: 100px; right: 65px; background-position: center; font-size: 0} \
					\
					.mdialog_m .disc_simple_input_btn_call.vmail, .mdialog_m .disc_text_area_button_call.vmail \
						{background-position: center} \
					\
					.disc_text_area_button[uid=\"sendComment\"] {width: 100px; right: 0px; background-position: center; font-size: 0} \
					\
					.disc_simple_input_btn[id *= \"smplBtnId\"] {font-size: 0;background-position: center; background-repeat: no-repeat;} \
					");*/
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
		b.hide("#leftPossibleFriendsPanel");
	} else {
		b.show("#leftPossibleFriendsPanel");
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
	b.stylehiding('logotypemenu', value, "\
				#hook_Block_ToolbarMenu {display: none;} \
			");
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
				");
	inj.storage.s_mailbar = value;
}


// Автоскрытие верхней панели
inj.upd.s_autohidebar = function( value ) {
	if ( value ) {
		b.stylehiding('autohidebar', value, "\
					#topPanel {transition: margin-top .3s}\
				");
		$(window).scroll(function(){
			inj.log($("body").scrollTop());
			if ( $(window).scrollTop() < 200 ) {
				$("#topPanel").css("margin-top", "0px");
			} else $("#topPanel").css("margin-top", "-50px");
		});
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
		$('<style id="okch_pagetransp" />').html( ".user #mainContent, .user.fcofw .mainContent_w:before { background: rgba(255,255,255,"+ ( value / 100) +") }").appendTo("body");
	}
	
	inj.storage.l_pagetransp = value;
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
	b.stylehiding('stylescircle', value, "\
				a.cp {border-radius: 50%; border-color: rgba(0,0,0,.3)} \
				a.cp .selected {border-radius: 50%; border-color: transparent} \
				a.cp .selected a {border-radius: 50%; border: 1px solid inherit} \
				a.cp_ff, a.cp_ef, a.cp_al {border:none;border-radius:0}\
			");
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
console.log(value);
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
	/*
	if ( !$("#action_menu_official_group").exists() ) {
		$("#action_menu_expand_item").before('<li class="u-menu_li" id="action_menu_official_group"><a class="u-menu_a" id="action_menu_official_group_a" href="/okchanger" hrefattrs="st.cmd=userMain&amp;st._aid=FriendFriend_Visit" title="Официальная группа OK Changer"><span class="tico"><i class="tico_img ic ic_officialg"></i>официальная группа</span></a></li>'); // background-position: left -538px;
	}
	//*/
}

// Официальная страница на группу и профиль Автора
inj.upd.update_officialpage = function()
{
	/*
	// Официальная группа
	if ( !$("#OK_premium_group_Changer").exists() && document.location.href.match("\/okchanger|\/refreshgame") )
	{
		$(".mctc_name span").html( '<div id="OK_premium_group_Changer" class="ic_premium_group_blue" title="Официальная группа"></div>' + $(".mctc_name span").html() );
		$("<style id=\"OK_specific_group_styles\" type=\"text/css\" />")
			.html("#mainContainer {background-image: url(http://dsp.odnoklassniki.ru/getTheme?photoId=69&type=52);} \
					#hook_Block_ThemesControlRB {display: none} \
					.cover_t_c_repeat_l,.cover_t_c_repeat_r {background-image: url(http://dsp.odnoklassniki.ru/getTheme?photoId=69&type=53);} \
					.cover_ov_b_c {background-image: url(http://dsp.odnoklassniki.ru/getTheme?photoId=69&type=75);} \
					.cover_t_l,.cover_t_r,.cover_ov_t_l,.cover_ov_t_r,.cover_ov_t_c,.cover_b_l,.cover_b_r,.cover_b_c,.cover_ov_b_l,.cover_ov_b_r {background-image: none;} \
					"
			).appendTo("#mainContainer");
	}
	else if ( !document.location.href.match("\/okchanger|\/refreshgame") )
	{
		b.remove("#OK_specific_group_styles");
		b.remove("#OK_premium_group_Changer");
	}
	
	// Официальная страница
	if ( !$("#OK_premium_user_Changer").exists() && document.location.href.match("\/lestad|\/profile.user")  ) {
		//$(".mctc_nameAndOnline")
			//.before( '<div class="premiumIcon ic_premium_group" id="OK_premium_user_Changer" title="Автор расширения"></div>' );
		$(".mctc_name").before( '<div id="OK_premium_user_Changer" class="ic_premium_group_blue" title="Официальная группа"></div>');
	} else if ( $("#OK_premium_user_Changer").exists() && !document.location.href.match("\/lestad|\/profile.user") ) {
		b.remove("#OK_premium_user_Changer");
	}
	*/
}

// Кнопка выход на панели
inj.upd.update_exitbutton = function() {
	if ( inj.storage.s_mailbar != 1 && inj.storage.s_mailbar != true ) {
		$("#toolbar_nav_exit").remove();
		return;
	}
	
	if ( !$("#toolbar_nav_exit").exists() && $("#hook_Block_HeaderTopMenuInToolbar").exists() ) {
		$(".toolbar_c").css("display", "inline-block");
		$("#okch_searchfield").remove();
		$('<style id="okch_searchfield" />')
			.html( "\
					div.toolbar_search {width: 150px} \
					#liveSearchSugg #field_query {width: 125px} \
					\
				").appendTo("body");
		
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
	/*
	if ( $("#okch_upbutton").exists() ) return;
	//$('<div id="okch_scrollToTop" class="okch_gs_go-top" title="Наверх">Наверх</div>').appendTo("#hook_Block_MainContainer");
	$('<style id="okch_upbutton" />').html( "\
			.okch_gs_go-top {} \
			.fcofw .okch_gs_go-top {margin-left: 307px;} \
		").appendTo("body");
	$("#okch_scrollToTop").on("click", function(event){
		$("#hook_Block_MainContainer").animate({scrollTop: 0},"easy");
		event.preventDefault();
	});
	
	$("#hook_Block_MainContainer").scroll(function(){
		if ( $("#hook_Block_MainContainer").scrollTop() < 350 ) {
			$("#okch_scrollToTop").hide();
		} else $("#okch_scrollToTop").show();
	});
	*/
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


inj.smile.htmlcode = "";
inj.smile.active = 0;

inj.smile.preload = function()
{
	/*
	$.ajax({
		url: "http://okchanger.lestad.net/smiles",
		dataType: "json",
		success: function(data) {
			
			var items = "";
			
			var everten = 1;
			
			$.each(data.packs.base, function(key, val){
				if ( everten == 1 )
				{
					items +='<tr id="popularRow2_0">';
				}
				
				items += '<td><div class="smileContainerODKL"><img class="gwt-Image" src="' + val.url + '" alt="'+val.symbols+'" id="smileItem_'+key+'" /></div></td>';
				
				if ( everten == 10 )
				{
					items += '</tr>';
					everten = 1;
				}
				everten++;
			});
			
			inj.smile.htmlcode = items;
			inj.smile.active = 1;
		}
	});
	*/
}




// смайлики
inj.smile.update = function()
{
	/*
	if ( !inj.smile.active ) return;
	
	var $smarea = $("#richTextAreaSmilesDropdown");
	if ( !$smarea.hasClass("OKCH_smiles_mod") )
	{
		$smarea.addClass("OKCH_smiles_mod");
		
		if ( !$("#OKCH_smiles_header").exists() )
		{
			var $d = $smarea.children().children();
			$d.prepend("<div class=\"OKCH_smiles_header\" id=\"OKCH_smiles_header\">\
				<div class=\"OKCH_smiles_links\" style=\"padding: 2px\">\
				<a href id=\"okch_smiles_sel_ok\" class=\"sm_cat_selected\">OK</a>\
				<a href id=\"okch_smiles_sel_other\">Другие</a>\
				</div>\
			</div>\
			<div class=\"sbin sbin_corner OKCH_smiles_container\" style=\"display:none\" id=\"OKCH_smilesContainer_1\">\
				<table class=\"panelAdvSmiles\" cellspacing=\"0\" cellpadding=\"1\">\
				"+inj.smile.htmlcode+"\
				</table>\
			</div>\
			");
			
			$("#okch_smiles_sel_ok").on("click", inj.smile.sel_ok);
			$("#okch_smiles_sel_other").on("click", inj.smile.sel_other);
			$(".OKCH_smiles_container").on("click", ".gwt-Image", inj.smile.click);
		}
	}
	*/
}

inj.upd.myid = function(a){}

inj.smile.click = function(e)
{
	/*
	var tag = $(this).attr("alt");
	
	//inj.smile.textarea_send(tag);
	//inj.smile.textarea_send($(this).html());
	
    var div = $('.gwt-RichTextArea').each(function(){
		$(this).contents().each(function(){
		    var a = $(this).find("body").html()
		    //console.log( a );
		    //var b = '<img src="http://okchanger.lestad.net/smiles/base/cranky.gif" ondragstart="return false" onresizestart="return false" onresizeend="return false" alt="[cranky]">&nbsp;'
			var b = '' + tag + '&nbsp;';
		    $(this).find("body").html(a + b);
		})
	});
    
	
	e.preventDefault();
	*/
}

inj.smile.textarea_send = function(text, mod)
{
	var disc_simple=document.getElementsByClassName('disc_simple_input_cont') || null;
	if (disc_simple)
	{  		
		for (var ds=0;ds<disc_simple.length;ds++)
		{
			disc_simple[ds].setAttribute('style','display:none');
		}
	}								
	var disc_rich=document.getElementsByClassName('disc_rich_input_cont') || null;
	if (disc_rich)
	{  		
		for (var dr=0;dr<disc_rich.length;dr++)
		{
			disc_rich[dr].setAttribute('style','display:block');
		}
	}
	var disc_hide=document.getElementsByClassName('disc_hide_text_area') || null;
	if (disc_hide)
	{  		
		for (var dh=0;dh<disc_hide.length;dh++)
		{
			disc_hide[dh].setAttribute('style','display:block');
		}
	}	
	var comment_div=document.getElementsByClassName('gwt-RichTextArea') || null;
	if (comment_div)
	{  		
		if (mod=="voice")
		{			
			sendRequest({action: 'load_option', param: 'OkVoiceText'}, function(result) { 
				if (result) 
				{
					for (var c=0;c<comment_div.length;c++)
					{  
						var textarea_value=comment_div[c].contentDocument.getElementsByTagName('body')[0].innerHTML;
						comment_div[c].contentDocument.getElementsByTagName('body')[0].innerHTML=''+textarea_value+' '+text+'';
					}					
				}
				else
				{
					for (var c=0;c<comment_div.length;c++)
					{  						
						comment_div[c].contentDocument.getElementsByTagName('body')[0].innerHTML += text+'';
					}
				}
			});				
		}
		else
		{
			for (var c=0;c<comment_div.length;c++)
			{  
				comment_div[c].contentDocument.getElementsByTagName('body')[0].innerHTML += text+'';
			}
		}
	}	
}



inj.smile.hide_allblocks = function()
{
	$("#okch_smiles_sel_other").removeClass("sm_cat_selected");
	$("#okch_smiles_sel_ok").removeClass("sm_cat_selected");
	$("#smileContainer_0").hide();
	$("#OKCH_smilesContainer_1").hide();
}


inj.smile.sel_ok = function(e)
{
	inj.smile.hide_allblocks();
	
	$("#okch_smiles_sel_ok").addClass("sm_cat_selected");
	$("#smileContainer_0").show();
	
	e.preventDefault();
	return false;
}


inj.smile.sel_other = function(e)
{
	inj.smile.hide_allblocks();
	
	$("#okch_smiles_sel_other").addClass("sm_cat_selected");
	$("#OKCH_smilesContainer_1").show();
	
	e.preventDefault();
	return false;
}


// Регулярное обновление
inj.update = function()
{
	// Функции для обновления
	
	inj.upd.update_authorspage();
	inj.upd.update_exitbutton();
	//inj.upd.update_officialpage();
	inj.upd.update_upbutton();
	inj.upd.update_mailbutton();
	inj.upd.update_blocks_hiding();
	inj.music.update();
	inj.bgs.check();
	//inj.smile.update();
	
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
	
	// Подпись на событие о принятии сообщения
	//chrome.extension.onMessage.addListener( inj.message );
	chrome.runtime.onMessage.addListener( inj.message );
	
	// Добавляем вкладку для слежения
	chrome.runtime.sendMessage({method: "addTab"}, function(data) {
		inj.log(data);
		inj.updateAll(data.storage, {});
	});
	
	//inj.smile.preload();
	
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
	
	//inj.ad.load();
	
	// jSessionID
	inj.jSessionID = inj.cookie.JSESSIONID;
	
	// Первый запуск таймера
	inj.updateID = setTimeout( inj.update, inj.updateRate );
}

document.addEventListener("DOMContentLoaded", inj.ready);
