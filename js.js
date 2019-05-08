$(function(){
    window.onscroll = function() {
        if ( window.pageYOffset > 100 )
            $('#top').addClass("top-down");
        else
            $('#top').removeClass("top-down");
    }

    $('.menuAngle').add('#menuButtonInner').add('#menuButtonOuter').hover(
        () => {$('.menuAngle').css('transform', 'rotateX(180deg)');},
        () =>{$('.menuAngle').css('transform', 'rotateX(0deg)');}
    );
    $('#menuAngleOpen').add('#menuButtonInner').add('#menuAngleClose').add('#menuButtonOuter').click(()=>{
        $('#leftMenuSide').toggleClass('leftMenuSideOpen');
        $('#rightMenuSide').toggleClass('rightMenuSideOpen');
    });
    $('.searchButton').click((e) =>{
        let pair = $(e.target).attr("data-pair");
        let input = $(".floatingInput[data-pair = " + pair + "]");
        let marIn = pair == 1 ? 435 : 300;
        let marBut = pair == 1 ? 390 : 300;
        if($(e.target).attr("data-expanded") == "0"){
            $(input).css('left', 'calc(100% - ' + marIn + 'px)');
            $(e.target).css('margin-right', marBut);
            $(e.target).attr("data-expanded", "1");
        }
        else{
            $(input).css('left', 'calc(100%)');
            $(e.target).css('margin-right', '0');
            $(e.target).attr("data-expanded", "0");
        }
    });
    let oldw, oldh, oldl, oldt, firstTime;
    $('.flip-card').on('click', function(){
        firstTime = true;
        let w = $(this).attr('data-w');
        let h = $(this).attr('data-h');
        oldw = $(this).width();
        oldh = $(this).height();
        let left = $(window).width() / 2 - w / 2;
        let top = $(window).height() / 2 - h / 2;
        $($(this).children()[0]).css('transform', 'rotateY(180deg)');
        $($(this).children()[1]).css({
            'transform': 'rotateY(0deg)',
            'z-index' : '51'
        });
        let pos = $(this).offset();
        oldl = pos.left;
        oldt = pos.top;
        $(this).css({
            'position' : 'fixed',
            'z-index' : '51',
			'top' : pos.top - window.pageYOffset,
			'left' : pos.left,
			'width' : $(this).width(),
            'height' : $(this).height(),
            'border' : "none"
        });
        $(this).animate({
            'top' : top,
            'left' : left,
            'width' : w,
            'height' : h
        }, 1000);
		$(this).promise().then(function() {
			$(this).css({
                'box-shadow': '0px 0px 0px 9999px rgba(0, 0, 0, 0.6)',
			});
        });
        $(this).addClass('opened-card')
    });
    $('section').click(function(e){
        if($(e.target).parents('.opened-card').length == 0 && firstTime == false)
        {
            firstTime = true;
            let obj = $('.opened-card');
            $($(obj).children()[0]).css('transform', 'rotateY(0deg)');
            $($(obj).children()[1]).css({
                'transform': 'rotateY(180deg)',
                'z-index' : '49'
            });
            let pos = $(obj).offset();
            $(obj).css({
                'position' : 'relative',
            });
            let diffx = oldl - pos.left;
            let diffy = oldt - pos.top;
            // $(obj).offset({top : window.pageYOffset + pos.top, left : pos.left});
            $(obj).animate({
                'width' : oldw,
                'height' : oldh,
                'top' : '0',
                'left' : '0',
            }, 1000);
            $(obj).promise().then(function() {
                $(obj).css({
                    'box-shadow': 'none',
                });
            });
            $(obj).removeClass('opened-card');
        }
        else
            firstTime = false;
    });
    let oldWindowWidth = window.innerWidth; 
    function onWindowResize() {
        let size1, size2, cnt;
        if(window.innerWidth <= 1200){
           if(window.innerWidth >= 768){
                size1 = "offset-sm-2 col-sm-3";
                size2 = "offset-sm-2 col-sm-3";
                cnt = 2;
           }
           else{
                size1 = "offset-sm-3 col-sm-6";
                //size2 = "offset-sm-1 col-sm-2";
                cnt = 1;
           }
        }
        else{
            size1 = "offset-sm-2 col-sm-2";
            size2 = "offset-sm-1 col-sm-2";
            cnt = 3;
        }
        console.log(cnt);
        let arr = $('.car-item');
        let classes, row, elem, elemOuter;
        let parent = $('#myCar');
        $(parent).empty();
        for (let i = 0; i < arr.length;) {
            classes = i == 0 ? 
                "carousel-item active row" : 
                "carousel-item row";
            row = $('<div/>', {
                "class" : classes,
                "data-interval" : "6000"
            });
            elemOuter = $('<div/>', {
                "class" : "d-flex flex-row"
            });
            for (let j = i; j < i + cnt; j++) {
                classes = j == i ? size1 : size2;
                elem = $('<div/>', {
                    "class" : classes
                });
                $(elem).append(arr[j]);
                $(elemOuter).append(elem);
                $(row).append(elemOuter);
            }
            $(row).append(elemOuter);
            $(parent).append(row);
            //console.dir(row);
            i += cnt;
        }
       oldWindowWidth = window.innerWidth; 
    };
    $(window).resize(onWindowResize);
    onWindowResize();
})