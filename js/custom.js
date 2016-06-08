jQuery(function($){
	$(document).ready(function(){
        
		// Contact form validation
		$('input,textarea,select').bind('invalid', function(evt) {
			$(evt.target).parent().addClass('has-error');
			$(evt.target).parent().find('.help-block').show().removeClass('hidden');
			return false;
		});
        var validateField = function(event){
            if(event.target.checkValidity()){
				$(event.target).parent().removeClass('has-error');
				$(event.target).parent().find('.help-block').hide();
			}
        };
		$('input,textarea,select').blur(validateField).keyup(validateField);
        
        // Track Events
		$('a').click(function(){
			if ($(this).attr('href').indexOf('http') != -1) {
				_gaq.push(['_trackEvent', 'Outbound Link', 'Click', $(this).attr('href')]);
			}
		});
		$('.footer-search,.gsc-search-box').submit(function(){
			_gaq.push(['_trackEvent', 'Search', 'Search', $(this).find('input[name=q]').val()]);
		});
		$('.social-networks a').click(function(){
			_gaq.push(['_trackEvent', 'Social Link', 'Click', $(this).attr('id')]);
		});
		$('#contact-form').submit(function(){
			_gaq.push(['_trackEvent', 'Contact Form', 'Submit']);
		});
        
        // Client Modals on the My Work page
		$('.client').click(function(){
			$client = $(this);
			var id = $client.attr('id');
			_gaq.push(['_trackEvent', 'Client','Open',id]);
			$('#client-box img').attr('src',$client.attr('data-image')).attr('width',$client.attr('data-image-width'));
			var url = '/curriculum-vitae/ article[data-client='+id+']';
			$('.modal-title').html($client.find('h3').html());
			$('#client-box .client-content').load(url, function(){
				$('#client-box').show().modal('show');
			});
			return false;
		});
        
        // handle pin clicks
        var pinClick = function(){
			$pin = $(this);
			if($pin.attr('data-url')){
                _gaq.push(['_trackEvent', 'Pin', 'Click', $(this).attr('href')]);
				if($pin.attr('data-url').indexOf('http') != -1){
                    _gaq.push(['_trackEvent', 'Outbound Link', 'Click', $(this).attr('href')]);
					window.open($pin.attr('data-url'), '_blank');
				} else {
					window.location = $pin.attr('data-url');
				}
				return false;
			}
		};
		$('.pin').click(pinClick);
        
        // Home page article paging
		var totalPages = $('.articles-wrapper').attr('data-total-pages');
		var currentPage = 1;
		$('.loader').hide();
        var loadNext = function(){
			$btn = $(this);
			$ldr = $btn.siblings('.loader');
			window.location.hash = '#!' + $btn.attr('href');
			$btn.hide();
			$ldr.show();
			$("<div>").load($btn.attr('href')+" .articles-wrapper", function() {
				$(".recent-activity").append($(this).html());
                $('#'+$(this).find('section.articles-wrapper').attr('id')).find('.pin').click(pinClick);
				$btn.show();
				$ldr.hide();
			});
			if(currentPage < totalPages){
				currentPage++;
				$btn.attr('href','/page'+(currentPage+1));
			} else {
				$btn.attr('disabled','disabled');
			}
            window.scrollBy(0, window.innerHeight);
			return false;
		};
		$('.next-page').click(loadNext);
        if(window.location.pathname == '/' && window.location.hash.match(/#!\/page\d+\/?/)){
            var page = parseInt(window.location.hash.match(/\d+\/?$/)[0].substring(0,1),10);
            for(var i=0;i<(page - 1);i++){
                $('.next-page').click();
            }
        }
	});
});
