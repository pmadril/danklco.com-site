jQuery(function($){
	$('nav a').each(function(idx, el){
		if($(el).attr('href') == window.location.pathname){
			$(el).addClass('active');
		}
	});
	$('.client').each(function(index,elem){
		if((index + 3) % 3 == 0){
			$(elem).parent('div').addClass('offset-by-two');
			$(elem).parent('div').css('clear','both');
		}
		$(elem).click(function(){
			var id = $(elem).attr('id');
			$.colorbox.close();
			$('#client-box img').attr('src','/images/clients/'+id+'.png');
			$('#client-box img').load(function(){
				$.colorbox.resize();
			});
			var url = '/curriculum-vitae.html ';
			if($(elem).attr('data-id')){
				url += $(elem).attr('data-id');
			} else {
				url += '#'+id;
			}
			$('#client-box p').load(url, {}, function(){
				$('#client-box').show();
				$.colorbox({
			        inline:true,
			        href: '#client-box',
			        title:$(elem).find('h5').text(),
			        onClosed: function(){
			        	$('#client-box').hide();
			        	$('#client-box img').attr('src','/images/loading.gif');
			        }
			    });
				$.colorbox.resize();
			});
			return false;
		});
	});
});
