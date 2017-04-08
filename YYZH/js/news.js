$(document).ready(function() {
	var  pageNum = 0; //ajax发送请求的data数据


    //刷新页面加载
	$.ajax({
		url: "http://www.vipyyzh.com:1080/yyzh/news/selectNewsFirst",
		type: "GET",
		dataType: "json",
		data: null,
		success:function(data){

			for(var i=0 ; i<data.length; i++){

			    $(".news li:last-child img").attr("src",data[i].url);
				$(".news li:last-child .news-one-one-1-p-1").text(data[i].title);
				$(".news li:last-child .news-one-one-1-p-2").text(data[i].time);
				$(".news li:last-child .news-one-one-1-p-3").text(data[i].content);
				var newsurl = $(".news li:last-child a").attr("href");
				var lastNum = newsurl.indexOf("?");
	            var newURL = newsurl.substring(0,lastNum);
				$(".news li:last-child a").attr("href",newURL + "?id=" + data[i].id);
				$(".news li:eq(0)").clone().appendTo(".news");
		    }

		    if(data.length >= 2){
		    	$(".news li:gt(0) a").removeClass("news-one-1");
		    	$(".news li:gt(0) a").addClass("news-one-2");
		    	$(".news li:gt(0) div").removeClass("news-one-1-text");
		    	$(".news li:gt(0) div").addClass("news-one-2-text");
		    	$(".news li:gt(0) .else-1").removeClass("news-one-one-1-p-1");
		    	$(".news li:gt(0) .else-1").addClass("news-one-one-2-p-1");
		    	$(".news li:gt(0) .else-2").removeClass("news-one-one-1-p-2");
		    	$(".news li:gt(0) .else-2").addClass("news-one-one-2-p-2");
		    	$(".news li:gt(0) .else-3").removeClass("news-one-one-1-p-3");
		    	$(".news li:gt(0) .else-3").addClass("news-one-one-2-p-3");

		    }
		    if(data.length >= 5){
		    	$(".news li:gt(3) a").removeClass("news-one-2");
		    	$(".news li:gt(3) a").addClass("news-one-3");
		    	$(".news li:gt(3) div").removeClass("news-one-2-text");
		    	$(".news li:gt(3) div").addClass("news-one-3-text");

		    }

		    if (data.length < 8) {
		    	//是否加载完所有新闻
		        $(".pages a").text("没有可加载的内容了");
		    }


	  //       $(".news li").each(function(i){
			// 	    $(this).find("img").attr("src",data[i].url);
			// 	    $(this).find($(".news-one-one-1-p-1")).text(data[i].title);
			// 	    $(this).find($(".news-one-one-1-p-2")).text(data[i].time);
			// 	    $(this).find($(".news-one-one-1-p-3")).text(data[i].content);

			// 	    var newsurl = $(this).find("a").attr("href");
			// 	    $(this).find("a").attr("href",newsurl + "?id=" + data[i].id);

			// });

		},
		error:function(){
			alert("加载失败!!!");
		}
	});	

	//点击加载更多发送请求

	$(".pages a").click(function(){
		pageNum++;
		$.ajax({
		url: "http://www.vipyyzh.com:1080/yyzh/news/selectNewsMore",
		type: "GET",
		dataType: "json",
		data: {page: pageNum},
		success:function(data){
		    for(var i=0 ; i<data.length; i++){
			    $(".news li:last-child").clone().appendTo(".news");

			    $(".news li:last-child img").attr("src",data[i].url);
				$(".news li:last-child .news-one-one-1-p-1").text(data[i].title);
				$(".news li:last-child .news-one-one-1-p-2").text(data[i].time);
				$(".news li:last-child .news-one-one-1-p-3").text(data[i].content);
				
				var newsurl = $(".news li:last-child a").attr("href");
				var lastNum = newsurl.indexOf("?");
	            var newURL = newsurl.substring(0,lastNum);
				$(".news li:last-child a").attr("href",newURL + "?id=" + data[i].id);
		    }
		},
		error:function(){
			alert("加载失败!!!");
		}
	});	

		
		});



	
	
});

