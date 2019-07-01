$(function(){
    //upload common parts of page
    let links = Array.from($('link[rel=import]'));
    links.forEach(element => {
        $('body').append($(element.import).find('body').html());
    });

    //make header smaller while scroll down
    window.onscroll = function() {
        if ( window.pageYOffset > 100 )
            $('#top').addClass("top-down");
        else
            $('#top').removeClass("top-down");
    }

    //Set copyright year
    $('#copyright span').text(new Date().getFullYear());

    //rotate angle button of menu while hovering
    $('.menuAngle').add('#menuButtonInner').add('#menuButtonOuter').hover(
        () => {$('.menuAngle').css('transform', 'rotateX(180deg)');},
        () =>{$('.menuAngle').css('transform', 'rotateX(0deg)');}
    );

    //open-close menu
    $('#menuAngleOpen').add('#menuButtonInner').add('#menuAngleClose').add('#menuButtonOuter').click(()=>{
        $('#leftMenuSide').toggleClass('leftMenuSideOpen');
        $('#rightMenuSide').toggleClass('rightMenuSideOpen');
    });

    //show search input
    $('.searchButton').click((e) =>{
        let pair = $(e.target).attr("data-pair");
        let parent = $(e.target).parent();
        if($(e.target).attr("data-expanded") == "0"){
            $(e.target).attr("data-expanded", "1");
            $(parent).toggleClass('searchExpanded' + pair);
            $(parent).toggleClass('searchCollapsed');
            if(window.innerWidth <= 720 && pair == 1)
                $('#logo-text').toggleClass('blurred-logo');
        }
        else{
            $(e.target).attr("data-expanded", "0");
            $(parent).toggleClass('searchCollapsed');
            $(parent).toggleClass('searchExpanded' + pair);
            if(window.innerWidth <= 720 && pair == 1)
                $('#logo-text').toggleClass('blurred-logo');
        }
    });
})