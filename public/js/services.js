$("#scrollbutton").click(function() {
    $('html,body').animate({
        scrollTop: $("#sectionteow").offset().top},
        'slow');
});