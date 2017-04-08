$(document).ready(function(){

	$(".right").children().css('display', 'none');
	$(".hint").css('display', 'block');

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

    //点击产品页面
    $(".left-function1 a:eq(0)").click(function(event){

    	$(".right-content-left ul").empty();
    	$(".right").children().css('display', 'none');
		$(".left p").removeClass('left-function-style');
		$(event.target).parent().addClass('left-function-style');
		$(".right-content").css('display', 'block');
		var URL1 = "http://www.vipyyzh.com:1080/yyzh/case/selectAllCaseName";
		indexshow(URL1);

		//点击case文章的添加按钮
		$(".right-add a").click(function(event){

		//重置表单
		document.getElementsByClassName("case-form1-file")[0].reset();
		document.getElementsByClassName("case-form1-title")[0].reset();
		document.getElementsByClassName("case-form2-file1")[0].reset();
		document.getElementsByClassName("case-form2-file2")[0].reset();
		document.getElementsByClassName("case-form2-content")[0].reset();


		//上传case文章
		$(".right").children().css('display', 'none');
		$(".right-case-fileup").css('display', 'block');

		//执行第一步上传页面
		$(".case-form1-file button").click(function(event){
			var littletitle = $(".case-form1-title input").val();
			var MyForm = new FormData(document.getElementsByClassName("case-form1-file")[0]);
			MyForm.append("title",littletitle);
			MyForm.append("username",userNAME);
			var URL3 = "http://www.vipyyzh.com:1080/yyzh/case/uploadCaseContentPicture1";
			casefile(URL3,MyForm);

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
            	var URL2 = "http://www.vipyyzh.com:1080/yyzh/case/selectCaseInfo";
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
            		url: 'http://www.vipyyzh.com:1080/yyzh/case/delete',
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
            data: fileForm,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
            success: function(data){
        
            		alert("添加图片成功！");
            		TypeId = JSON.parse(data).id;


            	//执行case第二步上传
            	$(".case-form1-first").css('display', 'none');
			    $(".case-form2-second").css('display', 'block');

			    //case-subcage的大图
				var form2P1 = null;
				$(".form2-file1").change(function(){
					var MyForm2 = new FormData(document.getElementsByClassName("case-form2-file1")[0]);
					MyForm2.append("id",TypeId);
					$.ajax({
						url: "http://www.vipyyzh.com:1080/yyzh/case/uploadCaseSbContentPicture",
			            type: "POST",
			            data: MyForm2,
			            processData: false,  // 告诉jQuery不要去处理发送的数据
			            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
			            success: function(data){
			            	alert("上传图片成功");
			            	form2P1 = JSON.parse(data).url;
			            },
			            error: function(){
			            	alert("访问图片服务器失败！");
			            }
					});
				});
				
				//case-subcage的成品展示图
				var form2P2 = null;
				$(".form2-file2").change(function(){
					var MyForm3 = new FormData(document.getElementsByClassName("case-form2-file2")[0]);
					MyForm3.append("id",TypeId);
					$.ajax({
						url: "http://www.vipyyzh.com:1080/yyzh/case/uploadCaseSbContentPicture",
			            type: "POST",
			            data: MyForm3,
			            processData: false,  // 告诉jQuery不要去处理发送的数据
			            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
			            success: function(data){
			            	alert("上传图片成功");
			            	form2P2 = JSON.parse(data).url;
			            },
			            error: function(){
			            	alert("访问图片服务器失败！");
			            }
					});
				});

				
				
				//上传case-subpage的代码
				$(".case-form2-content button").click(function(event){
					var caseTitle = $(".case-form2-content input[name=title]").val();
					var caseSbtitle = $(".case-form2-content input[name=sbtitle]").val();
					var casePrice = $(".case-form2-content input[name=price]").val();
					var caseTime = $(".case-form2-content input[name=time]").val();
					var caseDegree = $(".case-form2-content input[name=degree]").val();
					var casePos = $(".case-form2-content input[name=pos]").val();
					var casePlate = $(".case-form2-content textarea[name=plate]").val();

					//将图片和文字整理成一段html代码
					var form2HTML = '<div class="box"><img src="'+form2P1+'" alt="" class="banner"><div class="plate"><p class="title">'+caseTitle+'<span>'+caseSbtitle+'</span></p><div class="info"><div><div class="price"><p>价格:</p><span>'+casePrice+'</span></div><div class="time"><p>工期：</p><span>'+caseTime+'</span></div></div><div><div class="degree"><p>满意度：</p><span>'+caseDegree+'</span></div><div class="pos"><p>'+casePos+'</p></div></div></div></div><div class="plate"><p class="title">设计背景</p><p class="design-bg">'+casePlate+'</p></div><div class="plate"><p class="title">成品展示</p><img src="'+form2P2+'" alt="" class="simple"></div></div>';

					$.ajax({
					        url: 'http://www.vipyyzh.com:1080/yyzh/case/updateSbContent',
					        type: 'POST',
					        dataType: 'json',
					        data: {id:TypeId,sbcontent:form2HTML},
					        success: function(data){
					            if(data.msg == "更新成功"){
					            	alert("上传case文章成功！！");
					            	 $(".left-function1 a:eq(0)").trigger("click");
					            }
					            else{
					            	alert("上传case文章失败！！");
					            }
					        },
					        error: function(){
					            alert("上传case文章时访问服务器失败");
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
	// 		url: "http://www.vipyyzh.com:1080/yyzh/case/uploadCaseSbContentPicture",
 //            type: "POST",
 //            data: URLreturn,
 //            processData: false,  // 告诉jQuery不要去处理发送的数据
 //            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
 //            success: function(data){
 //            	alert("上传图片成功");
 //            	returnUrl = JSON.parse(data).url;
 //            },
 //            error: function(){
 //            	alert("访问图片服务器失败！");
 //            }
	// 	});
	// }



});