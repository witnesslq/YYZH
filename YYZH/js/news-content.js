$(document).ready(function(){
    //解析ID
    var str = location.href;
    var s = str.indexOf("?");
    var t = str.substring(s+1);
    var u = t.indexOf("=");
    var pageId = t.substring(u+1);
    ajaxget(pageId);
});

function ajaxget(ID){
    //请求文字内容
	$.ajax({
		url: "http://www.vipyyzh.com:1080/yyzh/news/selectSbContentById",
		type: "GET",
		dataType: "json",
		data: {id: ID},
		success : function(data){
			$(".text").html(data.msg);
	},
	   error : function() {
	   	    alert("加载失败！");
	   }
	});
}