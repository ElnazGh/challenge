$(function() {

    function sumSection() {
        return $(".main-content.timeline-wrapper").height()
    }

    function setDimensionBar() {
        $(".bar").css({
            "height": ($(window).height()/sumSection())*100 + "%"
        })
    }

    if( $('.timeline')) {
        if(window.scrollY/sumSection() > 0.06) {
            $('.timeline').css('top', 40);
        } else{
            $('.timeline').css('top', 250);
        }

        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('.timeline').css('height', 63+"%");
        } else {
            $('.timeline').css('height', 100+"%");
        }
    }
  
    function addBehaviours() {
        let sections = $("section")
        $.each($(".node"), function(i, element) {
            $(element).on("click", function(e) {
                e.preventDefault()
                let scroll = $(sections[i]).offset().top
                $('html, body').animate({
                    scrollTop: scroll
                }, 500);
            })
        })
    }
  
    function arrangeNodes() {
        $(".node").remove()
        $.each($("section"), function(i, element) {
            let name = $(element).data("name")
            let node = $("<li class='node'><span>"+name+"</span></li>")
            $(".timeline").append(node)

            $(node).css({
                "top": ($(".timeline").height()/$(document).height()) * $(element).offset().top
            })
        })
        addBehaviours()
    }
  
    $(window).on("scroll", function() {
        let top = (window.scrollY/sumSection())*100
        $(".bar").css({
            "top": top + "%"
        })

        if($(window).scrollTop() > 150) {
            $('.timeline').css('top', 40);
        } else {
            $('.timeline').css('top', 250);
        }

        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('.timeline').css('height', 63+"%");
        } else {
            $('.timeline').css('height', 100+"%");
        }
    })
  
    $(window).on("resize", function() {
        //setSection()
        arrangeNodes()
        setDimensionBar()
    })
  
    setTimeout(
        function() {
          //setSection()
          arrangeNodes()
          setDimensionBar()      
        },
        200
    );

    // data popup - open
    $(document).on('click', '[data-popup-open]', function (e) {
    
        $('body').css('overflow','hidden');
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);

        e.preventDefault();
    });

    // data popup - close
    $(document).on('click', '[data-popup-close]', function (e) {
        $('body').css('overflow','unset');
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);

        e.preventDefault();
    });
})