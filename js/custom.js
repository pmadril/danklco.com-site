---
---

jQuery(function($){
    var bg_images = [];
    {% for file in site.static_files %}{% if file.path contains "images/backgrounds" %}bg_images.push("{{file.path}}");{% endif %}{% endfor %}
	$(document).ready(function(){
        var pinClick = function(){
            $pin = $(this);
            if($pin.attr('data-url')){
		_gaq.push(['_trackEvent', 'Pin', 'Click', $(this).attr('href')]);
		if($pin.attr('data-url').indexOf('http') != -1){
			window.open($pin.attr('data-url'), '_blank');
		} else {
        		window.location = $pin.attr('data-url');
		}
            	return false;
            }
        };
        $('.pin').click(pinClick);
        // suppress "invalid" events on URL inputs
        $('input,textarea').bind('invalid', function(evt) {
            $(evt.target).parent().addClass('has-error');
            $(evt.target).parent().find('.help-block').show().removeClass('hidden');
            return false;
        });
        $('input,textarea').blur(function(event) {
            if(event.target.checkValidity()){
                $(event.target).parent().removeClass('has-error');
                $(event.target).parent().find('.help-block').hide();
            }
        });
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
		$('.client').click(function(){
			$client = $(this);
			var id = $client.attr('id');
			_gaq.push(['_trackEvent', 'Client','Open',id]);
			
			// close bootstrap modal
			$('#client-box img').attr('src',$client.attr('data-image'));
			$('#client-box img').attr('width',$client.attr('data-image-width'));
			var url = '/curriculum-vitae/ article[data-client='+id+']';
			$('.modal-title').html($client.find('h3').html());
			$('#client-box .client-content').load(url, function(){
				$('#client-box').show();
				$('#client-box').modal('show');
			});
			return false;
		});
		var totalPages = $('.articles-wrapper').attr('data-total-pages');
		var currentPage = 1;
        $('.loader').hide();
		$('.next-page').click(function(){
			$btn = $(this);
            $ldr = $btn.siblings('.loader');
			window.location.hash = '#!' + $btn.attr('href');
			$btn.hide();
            $ldr.show();
			$("<div>").load($btn.attr('href')+" .articles-wrapper", function() {
				$(".recent-activity").append($(this).html());
				$btn.show();
                $ldr.hide();
			}).find('.pin').click(pinClick);
			if(currentPage < totalPages){
				currentPage++;
				$btn.attr('href','/page'+(currentPage+1));
			} else {
				$btn.attr('disabled','disabled');
			}
			return false;
		});
	});
});
