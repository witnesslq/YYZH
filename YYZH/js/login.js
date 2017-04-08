$(document).ready(function(){
	$("form button").click(function() {
		
		var uesrname = $("form input[name=user]").val();
		var uesrword = $("form input[name=password]").val();
		$.ajax({
			url: 'http://www.vipyyzh.com:1080/yyzh/user/login',
			type: 'POST',
			dataType: 'json',
			data: {"user":"{username:"+uesrname+",password:"+uesrword+"}"},
			success: function(data){
				if(data.userid != null ){
					
				window.location.href = "content.html?" + data.username + "&" + data.manager;
				}
				else{
					alert(data.msg);
					
				}
				
				
			},
			error: function(){
				alert("请求服务器失败！");
			}
		});
		
		
	});
})