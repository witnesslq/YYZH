$(document).ready(function(){

	//全局变量.返回的URL值
	var returnUrl = null;
	//文章ID
	var TypeId = null;

	//解析url
    var str = location.href;
    var s = str.indexOf("?");
    var usermessage = str.substring(s+1);
    var userdeparate = usermessage.split("&");
    var userNAME = userdeparate[0];
    var userMANAGER = userdeparate[1];
    $(".left-user span").text(userNAME);


    //点击news页面
    $(".left-function1 a:eq(1)").click(function(event){

    	$(".right-content-left ul").empty();
 
    	$(".right").children().css('display', 'none');
		$(".left p").removeClass('left-function-style');
		$(event.target).parent().addClass('left-function-style');
		$(".right-content").css('display', 'block');
		var URL1 = "http://www.vipyyzh.com:1080/yyzh/news/selectAllNewsName";
		indexshow(URL1);


		//点击news文章的添加按钮
		$(".right-add a").click(function(event){



		//重置表单
		document.getElementsByClassName("case-news1-file1")[0].reset();
		document.getElementsByClassName("case-news1-file2")[0].reset();
		document.getElementsByClassName("case-news1-title")[0].reset();
		document.getElementsByClassName("case-news2-file")[0].reset();
		document.getElementsByClassName("case-news2-content")[0].reset();

		//上传news文章
		var Sign = null; //是否是主新闻
		$(".right").children().css('display', 'none');
		$(".right-news-fileup").css('display', 'block');
		

		$("#selectID").change(function(){
			if($("#selectID").val() == 0){
				$(".case-news1-file2").css("display","none");
				$(".case-news1-file1").css("display","block");
			}
			else{
				$(".case-news1-file1").css("display","none");
				$(".case-news1-file2").css("display","block");
			}
		});

		//执行第一步上传页面
		$(".case-news1-title button").click(function(event){

			var littleTitle = $(".case-news1-title input:eq(0)").val();
			var littleAbout = $(".case-news1-title textarea:eq(0)").val();

			var Sign = $("#selectID").val();
			if(Sign == 0){
				var MyForm = new FormData(document.getElementsByClassName("case-news1-file1")[0]);
				MyForm.append("title",littleTitle);
				MyForm.append("content",littleAbout);
			    MyForm.append("username",userNAME);
			    var URL3 = "http://www.vipyyzh.com:1080/yyzh/news/uploadNewsContentPicture2";
				casefile(URL3,MyForm);
			}
			if(Sign == 1){
				var MyForm = new FormData(document.getElementsByClassName("case-news1-file2")[0]);
				MyForm.append("title",littleTitle);
				MyForm.append("content",littleAbout);
			    MyForm.append("username",userNAME);
			    var URL3 = "http://www.vipyyzh.com:1080/yyzh/news/uploadNewsContentPicture1";
				casefile(URL3,MyForm);
			}

		});

		});
	    		
    });


    //加载对应的case-news内容
    function indexshow(URL11){
		$.ajax({
			url: URL11,
			type: 'GET',
			dataType: 'json',
			data: null,
			success: function(data){

			//请求成功后加载相应内容
            for(var i = 0; i<data.length; i++){
            	$("<li><a href=\"javascript:void(0)\"></a> </li>").appendTo($(".right-content-left ul"));
                $(".right-content-left ul li:last-child a").text(data[i]);
            }

            //点击标题加载具体内容
            $(".right-content-left ul li").click(function(event){
            	var messageTitle = $(event.target).text();
            	var URL2 = "http://www.vipyyzh.com:1080/yyzh/news/selectNewsInfo";
            	showDetail(URL2,messageTitle);
            });
			},
			error: function(){
				alert("加载文章标题失败");
			}
		});
	}


	//根据标题加载具体内容
	function showDetail(URL22,mTitle){
		var deleteId = null;
		$.ajax({
            url: URL22,
			type: 'GET',
			dataType: 'json',
			data: {title: mTitle},
			success: function(data){

            //请求成功后更新上传者和时间
            $(".right-content-tip p:eq(0)").text(data.username);
            $(".right-content-tip p:eq(1)").text(data.time);
            deleteId = data.id;

            //删除某一篇文章
            $(".delete2").click(function(event){
            	$.ajax({
            		url: 'http://www.vipyyzh.com:1080/yyzh/news/delete',
			        type: 'GET',
			        dataType: 'json',
			        data: {id: deleteId},
			        success: function(data){
			        	alert(data.msg);
			        	window.location.reload();
			        },
			        error: function(){
			        	alert("删除时访问服务器失败");
			        }
            	});
            });
			},
			error: function(){
			alert("请求服务器失败！");
			}
		});
	}


	//上传case第一步并执行第二步上传
	function casefile(URL33,fileForm){
		$.ajax({
			url: URL33,
            type: "POST",
            data:fileForm,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
            success: function(data){
            	TypeId = JSON.parse(data).id;
            	alert("添加图片成功！");
            	

            	
            	//执行case第二步上传
            	$(".case-news1-first").css('display', 'none');
			    $(".case-news2-second").css('display', 'block');
			    var photoArr = new Array();
			    var num = 0;

			    $(".news2-file1").change(function(){
			    
			    	var MyForm2 = new FormData(document.getElementsByClassName("case-news2-file")[0]);
					MyForm2.append("id",TypeId);
					$.ajax({
						url: "http://www.vipyyzh.com:1080/yyzh/news/uploadNewsSbContentPicture",
			            type: "POST",
			            data: MyForm2,
			            processData: false,  // 告诉jQuery不要去处理发送的数据
			            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
			            success: function(data){
			            	alert("上传图片成功");
			            	photoArr[num] = " [[" + JSON.parse(data).url + "]] ";
			            	$(".case-news2-content textarea").val($(".case-news2-content textarea").val() + photoArr[num]);
			            	num ++ ;
			            },
			            error: function(){
			            	alert("上传图片失败！");
			            }
					});

			    });
			   

				//将图片和文字整理成一段html代码
				
				$(".case-news2-content button").click(function(event){
					var news2HTML = null;

					news2HTML = $(".case-news2-content textarea").val().replace(/(\[\[)/g,"<p><img src=\"");
					news2HTML = news2HTML.replace(/(\]\])/g,"\"</p>");
					news2HTML = '<p class="text-p-3">'+news2HTML+'</p>';
					

					$.ajax({
					        url: 'http://www.vipyyzh.com:1080/yyzh/news/updateSbContent',
					        type: 'POST',
					        dataType: 'json',
					        data: {id:TypeId,sbcontent:news2HTML},
					        success: function(data){
					            if(data.msg == "更新成功"){
					            	alert("上传news文章成功！！");
					        
			                        $(".left-function1 a:eq(1)").trigger("click");
					            	
					            }
					            else{
					            	alert("上传news文章失败！！");
					            }
					        },
					        error: function(){
					            alert("上传news文章时访问服务器失败");
					        }
					});
				});
            },
            error: function(){
            	alert("访问图片服务器失败！");



            	
            }
		});
	}


	//上传图片文件返回相应的URL
	// function returnURL(URLreturn){
	// 	$.ajax({
	// 		url: "http://www.vipyyzh.com:1080/yyzh/news/selectSbContentById",
 //            type: "POST",
 //            data: URLreturn,
 //            processData: false,  // 告诉jQuery不要去处理发送的数据
 //            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
 //            success: function(data){
 //            	alert("上传图片成功");
 //            	returnUrl = data.url;
 //            },
 //            error: function(){
 //            	alert("访问图片服务器失败！");
 //            }
	// 	});
	// }

 

});