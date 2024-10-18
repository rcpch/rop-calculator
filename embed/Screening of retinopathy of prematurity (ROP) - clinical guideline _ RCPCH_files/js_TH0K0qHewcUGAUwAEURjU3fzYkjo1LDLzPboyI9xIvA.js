/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($){"use strict";var nonce=Date.now();function debounce(func,delay){var inDebounce;return function(){var context=this;var args=arguments;clearTimeout(inDebounce);inDebounce=setTimeout(function(){return func.apply(context,args);},delay);};}function hostname(url){var a=document.createElement('a');a.href=url;return a.hostname===location.hostname?'this embedded media':a.hostname;}Drupal.theme.ndpCookiesCoverplate=Drupal.theme.ndpCookiesCoverplate||function(hostname,category){return '<div class="coverplate"><p>Content from <i>'+hostname+'</i> is blocked until you accept '+category+' cookies.</p><button href="" class="accept">Accept cookies</button></div>';};Drupal.behaviors.ndpCookies={attach:function(context,settings){$('iframe[data-cookiecategory], embed[data-cookiecategory], script[data-cookiecategory]',context).each(function(){var $embed=$(this),host=hostname($embed.data('src')),category=$embed.data('cookiecategory'),$coverplate=$(Drupal.theme.ndpCookiesCoverplate(host,category));if(host==='platform.twitter.com')return;var $container;if($embed.is('script')&&$embed.prev('div').length>0&&$embed.prev('div').children().length===0)$container=$embed.prev('div');else{if($embed.is('script')&&$embed.prev('blockquote.instagram-media').length>0){$container=$embed.prev('blockquote.instagram-media');$coverplate.css('position','absolute');$container.css('position','relative');}}if(!$container)$container=$embed;$coverplate.css('min-height',$container.height()).css('min-width',$container.width()).css('z-index',1);$coverplate.children('.accept').on('click',null,category,function(e){var ccConfig=CookieControl.config(),optionalCookies=ccConfig.optionalCookies,l=optionalCookies.length;for(var i=0;i<l;i++){var name=optionalCookies[i].name.toLowerCase();if(name===e.data)CookieControl.changeCategory(i,true);}});var id='coverplate-'+(nonce++);$coverplate.attr('id',id);$embed.attr('aria-describedby',id);if($embed.parent('.video-embed-field-responsive-video').length>0)$embed.before($coverplate.css('position','absolute').css('min-height','').css('min-width','').css('height','100%').css('top',0));else if($embed.is($container)){if($embed.parent('div[style]').length>0){var parent=$embed.parent('div[style]');if(parent.attr('style').match('padding-top:max')){var originalStyle=$embed.parent('div').attr('style');$embed.data('ndpCookie_changeConsent',function($embed,consent){if(consent)$embed.parent('div[style]').attr('style',originalStyle);else{$embed.parent('div[style]').css('padding-top',0);$embed.parent('div[style]').css('height','auto');}});}}$embed.before($coverplate);}else $container.prepend($coverplate);});this.scan(context);},detach:function(context,settings,trigger){$('.coverplate',context).remove();},consentChange:function(){window.setTimeout(this.scan,0);},scan:debounce(function(context){var ccConfig=CookieControl.config(),optionalCookies=ccConfig.optionalCookies,l=optionalCookies.length,datalayer={};for(var i=0;i<l;i++){var name=optionalCookies[i].name.toLowerCase(),consent=CookieControl.getCategoryConsent(i);datalayer[name]=!!consent;$('iframe[data-cookiecategory~="'+name+'"], embed[data-cookiecategory~="'+name+'"], script[data-cookiecategory~="'+name+'"]',context).each(function(){var $embed=$(this),$coverplate=$('#'+$embed.attr('aria-describedby')),fromAttr,toAttr;if(consent){fromAttr='data-src';toAttr='src';if($embed.is('script')){$embed.remove();$embed.removeAttr('type');$embed.appendTo(document.head);}}else{fromAttr='src';toAttr='data-src';}$embed.attr(toAttr,$embed.attr(fromAttr)).removeAttr(fromAttr);consent?$coverplate.hide():$coverplate.show();if(typeof $embed.data('ndpCookie_changeConsent')==='function')$embed.data('ndpCookie_changeConsent')($embed,consent);});}if(!$.isEmptyObject(datalayer)&&window.dataLayer)window.dataLayer.push({'event':'cookieConsentChange','cookieConsent':datalayer});},300)};})(jQuery);;
