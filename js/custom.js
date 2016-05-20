---
---

jQuery(function($){
    var bg_images = [];
    {% for file in site.static_files %}{% if file.path contains "images/backgrounds" %}bg_images.push("{{file.path}}");{% endif %}{% endfor %}
	$(document).ready(function(){
		$('a').click(function(){
			if ($(this).attr('href').indexOf('http') != -1) {
				_gaq.push(['_trackEvent', 'Outbound Link', 'Click', $(this).attr('href')]);
			}
		});
        $('body').css('background','linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,.1)),url('+bg_images[Math.floor(Math.random() * (bg_images.length))]+') no-repeat center center fixed');
        $('body').css('background-size','cover');
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
			});
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
