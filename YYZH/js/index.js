/**
 * Created by EZIO on 2016/9/22.
 */
$(function () {
    $('.flexslider').flexslider({
        slideshowSpeed: 4000, //展示时间间隔ms
        animationSpeed: 400, //滚动时间ms
        animation: "slide",
        directionNav: false ,
    });
})

window.onload = function(){

    /*计算一个segment的宽度*/

    var segmentWidth = 0;
    $(".definition-of-quality-life-ul li").each(function(){
        segmentWidth+= $(this).outerWidth(true);
    });

    $(".definition-of-quality-life-ul li").clone().appendTo($(".definition-of-quality-life-ul"));

    run(10000);

    function run(interval){
        $(".definition-of-quality-life-ul").animate({"left":-segmentWidth}, interval,"linear",function(){
            $(".definition-of-quality-life-ul").css("left",0);
            run(10000);
        });
    }

    $(".definition-of-quality-life-div").mouseenter(function(){
        $(".definition-of-quality-life-ul").stop();
    }).mouseleave(function(){
        var passedCourse = -parseInt($(".definition-of-quality-life-ul").css("left"));
        var time = 6000 * (1 - passedCourse/segmentWidth);
        run(time);
    });
};