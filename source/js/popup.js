/**
 * Popup window script
 * Uses jQuery
 * 
 * 
 * @author LestaD
 * @package net.lestad.okchanger
 * @version 2.0
 */


popup = {
    website: "http://okchanger.lestad.net/", // "http://changer.lestad.local/ajax/",
    storage: {},
    setts: {},
    decor: {},
    styles: {},
    fonts: {},
    mods: {},
    debug: false
};

/**
 * Prints any typed message to console
 * 
 * @param {mixed} message
 */
popup.log = function( message, object ) {
    if ( !popup.debug ) return;
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
popup.error = function( message, object ) {
    if ( !popup.debug ) return;
    if (typeof object === "undefined")
	console.error.apply(console, ['OKChm:', message]);
    else
	console.error.apply(console, ['OKChm:', message, object]);
};

/**
 * Saving settings to storage
 * 
 * @param {Event} event
 */
popup.saving = function(event) {
    // Push settings to Chrome sync storage
    chrome.storage.sync.set(popup.storage, function() {});

    popup.log( popup.storage );

    // Send message about update to background
    var sdata = {
	method: "updateAll",
	data: popup.storage
    };
    chrome.runtime.sendMessage({method: "sendDataToInjected", data: sdata }, function(response){});

    if ( event ) event.preventDefault();
};

/**
 * Hide all settings tab
 */
popup.hideAll = function() {
    $("#settings_block").hide();
    $("#decor_block").hide();
    $("#styles_block").hide();
    $("#fonts_block").hide();
    $("#mods_block").hide();
};

// =======================================================================

/**
 * Show default settings tab
 * 
 * @param {Event} event
 */
popup.setts.show = function(event) {
    // Hide all setts tab
    popup.hideAll();
    $("#settings_block").show();
    if ( event ) event.preventDefault();


    // Insert description
    $("#s_buttonsize")	    .attr("title", "Смотреть изменения в сообщениях");
    $("#s_avatardown")	    .attr("title", "Как было раньше");
    $("#s_stylescircle")    .attr("title", "Выбор цвета для текста");
    $("#s_minimize")	    .attr("title", "Для отключения требуется перезагрузка страницы");
};

/**
 * Load data to default settings tab from server
 */
popup.setts.load = function() {
    for ( var it in popup.storage ) {
	// value is setting
	if ( popup.storage[it] == 1 && it.substr(0,2) == "s_" ) {
	    var id = it+"";
	    // Check item if "on"
	    $("#" + id).addClass("pb_active");
	}
    }

    // Settings accordion categories
    $("#hidingblocks_accord").accordion({
	collapsible: true,
	d_active: false,
	heightStyle: "content"
    });

    // Page transparency slider
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

    // Change page color
    $("#pagecolor_selector").on("click", ".colorb", function(){
	var bgc = $(this).css('background-color');
	bgc = bgc.replace('rgb', '');
	popup.storage['l_pagecolor'] = bgc;
	popup.saving();
    });
};

/**
 * Trigger when clicked item from default settings tab
 * Enable|disable item
 * 
 * @param {Event} event
 */
popup.setts.clicked = function( event ) {
    // Current block
    var $a = $(this);
    // setting ID
    var bid = $a.attr('id')+"";
    // Checked?
    if ( $a.hasClass("pb_active") ) {
	    // Uncheck and set off
	    $a.removeClass("pb_active");
	    popup.storage[bid] = 0;
    } else {
	    // Check and set on
	    $a.addClass("pb_active");
	    popup.storage[bid] = 1;
    }

    // Save settings to storage and send message to injected for update
    popup.saving();

    // Block default event
    event.preventDefault();
};

// =======================================================================

/**
 * Show decor tab
 * 
 * @param {Event] event
 */
popup.decor.show = function( event ) {
    // Hide all settings tab
    popup.hideAll();
    $("#decor_block").show();
    if ( event ) event.preventDefault();
};

/**
 * Load data from server
 */
popup.decor.load = function() {
    // Event listeners for default buttons
    $("#dc_none, #dc_default").click(popup.decor.clicked);

    // Call server
    $.ajax({
	url: popup.website+"decor/",
	dataType: "json",
	success: function(data) {
	    // Check to errors
	    if ( data.error <= 0 ) {
		// Has decor
		if ( data.decor.length > 0 ) {
		    popup.log("decor_ajax 1");
		    // Each decor item
		    for ( var i = 0; i < data.decor.length; i++ ) {
			// Decor object
			var dec = data.decor[i];

			// Div item for select decor item
			$('<div id="dec_'+ dec.id +'" class="decbutton" />')
			    // Button background
			    .attr("style", (popup.storage.th_url ? "background: url("+popup.storage.th_url+"');" : "none") )
			    .attr("data-url", dec.url)
			    .attr("data-id", dec.id)
			    .attr("data-skip", "none")
			    // Set button background as decor
			    .html('<div class="decbg" style="background-image: url(\''+ dec.url +'\');">'+ dec.name +'</div>')
			    .appendTo("#decor_block");
		    }
		    // Event for all decor buttons
		    $("#decor_block").on('click', '.decbutton', popup.decor.clicked);
		} else {
		    // If decor not found
		    $("#decor_block").append("<center>"+chrome.i18n.getMessage('ServerIsDown')+"!<br/></center>");
		}
	    } else {
		// If has error
		$("#decor_block").append("<center>"+chrome.i18n.getMessage('ServerIsWork')+"!</center>");
	    }
	},
	error: function() {
	    // AJAX request is down
	    $("#decor_block").html("<center>"+chrome.i18n.getMessage('CheckInternet')+"!</center>");
	}
    });
};

/**
 * Trigger when decor item clicked
 * 
 * @param {Event} event
 */
popup.decor.clicked = function( event ) {
    // Decor DOM block
    var $d = $(this);

    // Update chrome storage
    popup.storage.dec_id = parseInt( $d.attr("data-id") );
    popup.storage.dec_url = $d.attr("data-url");

    // Save changes and send it to injected
    popup.saving();

    event.preventDefault();
};

// =======================================================================

/**
 * Show styles list tab
 * 
 * @param {Event} event
 */
popup.styles.show = function( event ) {
    // Hide all settings tab
    popup.hideAll();
    $("#styles_block").show();
    if ( event ) event.preventDefault();
};

/**
 * Load data to styles list tab from server
 */
popup.styles.load = function() {
    $("#st_none, #st_default").off('click').click(popup.styles.clicked);

    $.ajax({
	url: popup.website+"styles/",
	dataType: "json",
	success: function(data) {
	    // Check for errors from server
	    if ( data.error <= 0 ) {
		// Has styles
		if ( data.styles.length > 0 ) {
		    // Each style item
		    for ( var i = 0; i < data.styles.length; i++ ) {
			// Style object
			var th = data.styles[i];
			// Create style select button
			$('<div id="st_'+ th.id +'" class="stylebutton" />')
			    .attr("data-url", th.url)
			    .attr("data-id", th.id)
			    .attr("data-skip", "none")
			    .attr("style", "background-image: url('"+ th.preview +"');")
			    .html('<div class="stylebg">'+ th.title + "</div>")
			    .appendTo("#styles_block");
		    }
		    // Event on style item clicked
		    $("#styles_block").on('click', '.stylebutton', popup.styles.clicked);
		} else {
		    // No styles
		    $("#styles_block").append("<center>"+chrome.i18n.getMessage('ServerIsDown')+"!<br/></center>");
		}
	    } else {
		// Has errors
		$("#styles_block").append("<center>"+chrome.i18n.getMessage('ServerIsWork')+"!</center>");
	    }
	},
	error: function() {
	    // AJAX-request is down
	    $("#styles_block").html("<center>"+chrome.i18n.getMessage('CheckInternet')+"!</center>");
	}
    });
};

/**
 * Trigger when style item clicked
 * Change style in injected
 * 
 * @param {Event} event
 */
popup.styles.clicked = function( event ) {
    // Style div-button
    var $t = $(this);

    // Save to storage
    popup.storage.st_id = parseInt( $t.attr("data-id") );
    popup.storage.st_url = $t.attr("data-url");

    // Save data and send to injected
    popup.saving();
    
    event.preventDefault();
};

// =======================================================================

/**
 * Show font select tab
 * 
 * @param {Event} event
 */
popup.fonts.show = function( event ) {
    popup.hideAll();
    $("#fonts_block").show();
    event.preventDefault();
};

/**
 * Load data to font select tab
 * Create event listener
 */
popup.fonts.load = function() {
    $("#fonts_block").on('click', '.decbutton', popup.fonts.clicked);
};


/**
 * Trigger when font item clicked
 * Change font in OK page
 * 
 * @param {Event} event
 */
popup.fonts.clicked = function( event ) {
    var $t = $(this);

    popup.storage.ft = {
	'name': $t.attr("data-font"),
	'url': $t.attr('data-google')
    };

    popup.saving();
    event.preventDefault();
};

// =======================================================================

/**
 * Show mod select tab
 * 
 * @param {Event} event
 */
popup.mods.show = function( event ) {
    popup.hideAll();
    $("#mods_block").show();
    event.preventDefault();
};

/**
 * Load data to mod select tab from server
 */
popup.mods.load = function() {
    $("#mods_block").html("<div><div>");
    $.ajax({
	url: popup.website+"mods/",
	dataType: "json",
	success: function(data) {
	    if ( data.error <= 0 ) {
		if ( data.mods.length > 0 ) {
		    var stMods = {};
		    if ( typeof( popup.storage.mods ) !== "undefined" ) {
			stMods = popup.storage.mods;
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
};

/**
 * Trigger when click on any mod
 * Enable or disable it
 * 
 * @param {Event} event
 */
popup.mods.clicked = function( event ) {
    var $m = $(this);

    if ( typeof( popup.storage.mods ) === "undefined" ) {
	    popup.storage.mods = {};
    }

    $('#mods_block div[data-type="'+$m.attr('data-type')+'"]').removeClass('selected');

    if ( typeof(popup.storage.mods[$m.attr('data-type')]) !== "undefined"
	&& popup.storage.mods[$m.attr('data-type')]['id'] == $m.attr('data-id') ) {
	    popup.storage.mods[$m.attr('data-type')] = "remove";
    } else {
	popup.storage.mods[$m.attr('data-type')] = {
	    'id': $m.attr('data-id'),
	    'js': $m.attr('data-js'),
	    'css': $m.attr('data-css'),
	    'type': $m.attr('data-type')
	};
	$m.addClass('selected');
    }

    popup.saving();
    event.preventDefault();
};


// =======================================================================


/**
 * Load settings from chrome storage
 * Show default settings tab
 * Create listeners for buttons
 */
popup.ready = function() {
    $("[data-lang]").each(function(id){
	$(this).html(chrome.i18n.getMessage($(this).attr('data-lang')));
    });

    // Read settings from syncronized storage
    chrome.storage.sync.get(null, function(st) {
	// Clone settings object
	popup.storage = clones(st);

	popup.log(popup.storage);

	// Load data to all blocks
	popup.setts.load();
	popup.decor.load();
	popup.styles.load();
	popup.fonts.load();
	popup.mods.load();
    });

    // Default settings tab
    popup.setts.show();

    // Listeners for buttons
    $(".progbutton").click(popup.setts.clicked);
    $("#save_settings").click(popup.saving);
    $("#nav_setts").click(popup.setts.show);
    $("#nav_decor").click(popup.decor.show);
    $("#nav_styles").click(popup.styles.show);
    $("#nav_fonts").click(popup.fonts.show);
    $("#nav_mods").click(popup.mods.show);
};

// Run popup.ready after load DOM
document.addEventListener("DOMContentLoaded", popup.ready);

