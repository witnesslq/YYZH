$(document).ready(function(){

	//全局变量.返回的URL值

	//解析url
    var str = location.href;
    var s = str.indexOf("?");
    var usermessage = str.substring(s+1);
    var userdeparate = usermessage.split("&");
    var userNAME = userdeparate[0];
    var userMANAGER = userdeparate[1];
    $(".left-user span").text(userNAME);


    //用户管理板块
	$(".left-function2 a").click(function(event) {

      $(".table-message table tr:gt(1)").remove();

	$(".right").children().css('display', 'none');
	$(".left p").removeClass('left-function-style');
	$(event.target).parent().addClass('left-function-style');

	//检验是否有权限操作
	var typeNum = $(event.target).parent().index();
			if(typeNum == 1){
				if(userMANAGER == 1){
					$(".right-manager").css('display', 'block');
					var URL = "http://www.vipyyzh.com:1080/yyzh/user/lookUser";
				    ajaxManager(URL,userMANAGER);
				}
				else{
					alert("此功能需管理员权限，该用户无法操作！");
				}
				
			}
			else{
				//注销登陆
				if(confirm("确定注销登陆?")){
					window.location.href = "login.html";
				}
			}
		});

	//ajax用户管理功能封装
	function ajaxManager(requireURL,userManage){
		$.ajax({
			url: requireURL,
			type: 'GET',
			dataType: 'json',
			data: null,
			success: function(data){

            //更新信息
            for(var i=0 ; i<data.length ;i++){
            	var ad = i+1;
            	$(".table-message table tr:last-child td:eq(0)").text(data[i].username);
            	$(".table-message table tr:last-child td:eq(1)").text(data[i].post);
            	$("table tr:eq(1)").clone().appendTo("table");
            }
            $(".table-message table tr:last-child").remove();

            //添加用户
            $(".table-add").click(function(event){
            	$(".table-suredelete").css('display', 'none');
            	$(".user-add").css('display', 'block');

            	//确认添加
            	$(".user-add-sure").click(function() {
            		var userName = $(".user-add-name").val();
            		var userPass = $(".user-add-pass").val();
            		var userType1 = $(".user-add-type").val();
            		$.ajax({
            			url: 'http://www.vipyyzh.com:1080/yyzh/user/insertUser',
            			type: 'POST',
            			dataType: 'json',
            			data: {"user":"{username:"+userName+",password:"+userPass+",post:"+userType1+"}"},
            			success: function(data){
            				if(data.msg == "添加成功"){
            					alert("添加用户成功！");
                                          $(".left-function2 a:eq(0)").trigger("click");
            				}
            				
            			    if(data.msg == "添加失败"){
            			    	alert("添加用户失败！");
            			    }
            				$(".user-add").css('display', 'none');
            			},
            			error: function(){
            				alert("添加用户时访问服务器失败！");
            			}
            		});
            		
            		
            	});

            	//取消添加
            	$(".user-add-cancel").click(function() {
            		$(".user-add").css('display', 'none');
            	});

            });

            //删除用户
            $(".table-delete").click(function(event) {
            	$(".user-add").css('display', 'none');
            	$(".table-suredelete").css('display', 'block');
            	var userdeletename = $(event.target).prev().prev().text();

            	//确认删除
            	$(".user-delete2").click(function() {
            		$.ajax({
            			url: 'http://www.vipyyzh.com:1080/yyzh/user/delete',
            			type: 'GET',
            			dataType: 'json',
            			data: {"username":userdeletename},
            			success: function(data){
            				if(data.msg == "删除成功"){
            					alert("删除用户成功！");
                                           $(".left-function2 a:eq(0)").trigger("click");
            				}
            				
            			    if(data.msg == "删除失败"){
            			    	alert("删除用户失败！");
            			    }
            				$(".table-suredelete").css('display', 'none');
            			},
            			error: function(){
            				alert("删除用户时访问服务器失败！");
            			}
            		})
            		
            		
            	});

            	//取消删除
            	$(".user-delete3").click(function() {
            		$(".table-suredelete").css('display', 'none');
            	});
            });
            
				
			},
			error: function(){
				alert("请求所有用户信息时访问服务器失败！");
}
		});
	}


});