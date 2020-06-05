var $ = require('jquery');


'use strict';


var $win = $(window);
var $doc = $(document);
var $body = $('body');

(function () {
    var $header = $('.header');
    var $headerButton = $('.header-button');
    var $globalNavigation = $('.global-navigation');
    var $headerNavigation = $('.header-navigation');
    var $headerPanelButton = $('.header-navigation').find('.panel-button');
    var $headerNavpanel = $('.header-navigation').find('.navpanel');

    var $footerPanelButton = $('.footer-navigation').find('.panel-button');
    var $footerNavpanel = $('.footer-navigation').find('.navpanel');
    
    var flag = false;
    
    $headerButton.on('click', function () {
        var $this = $(this);
        
    
        if( flag === false ) {
            $this.next().slideDown();
            $this.addClass('active').closest($header).addClass('active');
            flag = true;
    
        } else {
            $this.next().slideUp();
            $this.removeClass('active').closest($header).removeClass('active');
            flag = false;
        }
    
    });

    $headerPanelButton.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        console.log($this);
        $this.toggleClass('active').parent().next().slideToggle();
    });

    $footerPanelButton.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass('active').parent().next().slideToggle();
    });

    $win.on('customMatchMedia', function (event, bool) {
        if (!bool) {
            //for pc
            $globalNavigation.removeAttr('style');
            $headerButton.removeClass('active').closest($header).removeClass('active');
            $headerNavpanel.removeAttr('style');
            $headerPanelButton.removeAttr('style');
            $headerPanelButton.removeClass('active').closest($header).removeClass('active');

            $footerNavpanel.removeAttr('style');
        }
    });
    

    
}());

(function () {
    var mediaQueryList = window.matchMedia('(max-width: 767px)');

    function mediaChange(mql) {
        $win.trigger('customMatchMedia', [mql.matches]);
    }
    mediaQueryList.addListener(mediaChange);

    mediaChange(mediaQueryList);
}());





