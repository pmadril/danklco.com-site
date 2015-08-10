jQuery(function($){
	$(document).ready(function(){
		$('a').click(function(){
			if ($(this).attr('href').indexOf('http') != -1) {
				_gaq.push(['_trackEvent', 'Outbound Link', 'Click', $(this).attr('href')]);
			}
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
			var url = '/curriculum-vitae.html article[data-client='+id+']';
			$('#client-box h4').html($client.find('p').html());
			$('#client-box .client-content').load(url, function(){
				$('#client-box').show();
				$('#client-box').modal('show');
			});
			return false;
		});
		var totalPages = $('#columns').attr('data-total-pages');
		var currentPage = 1;
		$('.next-page').click(function(){
			$btn = $(this);
			$btn.hide();
			$("<div>").load($btn.attr('href')+" #columns > .pin", function() {
				$("#columns").append($(this).html());
				$btn.show();
			});
			if(currentPage < totalPages){
				currentPage++;
				$btn.attr('href','/page'+(currentPage+1));
			}
			return false;
		});
	});
});
