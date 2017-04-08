var pageNum;  //页数


$(document).ready(function(){

	pageNum = 1;
    ajaxget(pageNum);
	$("form button").click(function(event) {
		pageNum = $(event.target).text();
		$(event.target).siblings().removeClass("active");
		$(event.target).addClass("active");
		ajaxget(pageNum);
		
	});	
});

function ajaxget(Num){

	$.ajax({
		url: "http://www.vipyyzh.com:1080/yyzh/case/selectCaseByPage",
		type: "GET",
		dataType: "json",
		data: {page: Num},
		success : function(data){


	  //       $(".simple li").each(function(i){
			// 	    $(this).find("img").attr("src",data[i].url);
			// 	    $(this).find("p").text(data[i].title);
			// 	    var caseurl = $(this).find("a").attr("href");
			// 	    $(this).find("a").attr("href",caseurl + "?id=" + data[i].id);

			// });

			for(var i=0 ; i<data.length; i++){

			    $(".simple li:last-child img").attr("src",data[i].url);
				$(".simple li:last-child p").text(data[i].title);
				var newsurl = $(".simple li:last-child a").attr("href");
				var lastNum = newsurl.indexOf("?");
	            var newURL = newsurl.substring(0,lastNum);
				$(".simple li:last-child a").attr("href",newURL + "?id=" + data[i].id);
				$(".simple li:eq(0)").clone().appendTo(".simple");
		    }
		
	},
	   error : function() {
	   	alert("加载失败！");
	   }
	});
}