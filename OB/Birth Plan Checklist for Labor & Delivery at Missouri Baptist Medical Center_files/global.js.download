// Fix Array.indexOf() issue on IE7
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    };
}

$(document).ready(function () {
    /*searchBox effect*/
    $(".mobile-header .m-toggle").click(function () {
        var openedTarget = $(this).data("toggle");//get opened target
        if ($(".mobile-header .m-toggle").hasClass("opened"))//get all .m-toggle button
        {
            $(".mobile-header .m-toggle").not($(this)).removeClass("opened");//remove class opened from these items except the current one
        }
        //close all opened target except the current one
        if ($('.m-search-wrapper, .m-nav-wrapper').is(':visible')) {
            $('.m-search-wrapper, .m-nav-wrapper').not(openedTarget).slideUp('fast');
        }
        $(this).toggleClass("opened");//toggle class for current one        
        $(openedTarget).slideToggle('fast');//slide toggle it.
    });

    var timelineAnimate;
    timelineAnimate = function (elem) {
        return $(".animated img").each(function (ashxi) {
            var bottom_of_object, bottom_of_window;
            bottom_of_object = $(this).position().top + $(this).outerHeight()/2;
            bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                return $(this).addClass("active");
            }
        });
    };
    timelineAnimate();
    $(window).scroll(function () {
        return timelineAnimate();
    });

    /*Add required icon to required fields on Action Forms*/
    $(".phFormTemplate .form-group .control-label.af-slide.required").prepend('<span class="asterisk">*</span>');

    /* Back To Top*/
    $("#topbtn").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(window).scroll(function () {
        return showMasthead();
    });
    
    // Fix Reset Password issue
    var $resetPasswordLink = $(".dnnLoginService [id*=liPassword] > a");
    if ($resetPasswordLink.length > 0) {
        $resetPasswordLink.attr("onclick", $resetPasswordLink.attr("onclick").replace("http://", "https://"));
        $resetPasswordLink.attr("href", $resetPasswordLink.attr("href").replace("http://", "https://"));
    }
	
	//Social feed toggle js
    $('#click-toggle-fb').click(function(){
        document.getElementById('tabs-1').style.display = 'block';
        document.getElementById('tabs-2').style.display = 'none';
    });

    $('#click-toggle-twit').click(function(){
        document.getElementById('tabs-2').style.display = 'block';
        document.getElementById('tabs-1').style.display = 'none';
    });
        //fb plugin required js
    (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1&appId=415205372235932&autoLogAppEvents=1';
         fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

function showMasthead()
{
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 38) {
        $(".desktop-header .row2").addClass("fixed-masthead");
        $(".desktop-header").attr("style", "height: 124px");
    }
    else {
        $(".desktop-header .row2").removeClass("fixed-masthead");
        $(".desktop-header").attr("style", "height: auto");
    }
}

