"use strict";

function initMap() {
  var location_1 = new google.maps.LatLng(-12.078021, -76.996479);
  var center = new google.maps.LatLng(-12.078021, -76.996479);

  var mapOptions = {
    zoom: 15,
    center: center
  };

  var map = new google.maps.Map(document.getElementById("location"), mapOptions);

  var marker_1 = new google.maps.Marker({
      position: location_1,
      title:"Sede Principal",
      map: map
  });

  var contentString_1 = "<b>Jesús el Buen Pastor</b><br/>Jr. Alava 209 Urb.Javier Prado - San Luis";

  var infowindow_1 = new google.maps.InfoWindow({
    content: contentString_1
  });

  marker_1.addListener('click', function() {
    infowindow_1.open(map, marker_1);
  });
}

jQuery(document).ready(function($){

 $(".element").typed({
    strings: ["<h1>Jesús  el  Buen  Pastor</h1>" +
      "<p class='slogan'>Más que un método, un <strong>sistema integral éxitoso</strong></p>"],
    typeSpeed: 30,
    startDelay: 1000,
    showCursor: false
  });

  // quicksand
  $('#filterOptions li.active a').attr('class');

  var $holder = $('#item-list');

  var $data = $holder.clone();

  $('#filterOptions li a').click(function() {

    $('#filterOptions li').removeClass('active');

    var $filterType = $(this).attr('class');
    $(this).parent().addClass('active');
    var $filteredData;
    if ($filterType === 'todos') {
      $filteredData = $data.find('article');
    }
    else {
      $filteredData = $data.find('article[data-type=' + $filterType + ']');
    }

    $holder.quicksand($filteredData, {
      duration: 800,
      easing: 'easeInCubic',
      adjustHeight: false,
      adjustWidth :false
    });

    return false;
  });
  //end quicksand

$(".fancybox").fancybox({
    padding    : 0,
    margin     : 5,
    autoCenter : false,
    afterLoad  : function () {
      $.extend(this, {
          aspectRatio : false,
          type    : 'html',
          width   : '100%',
          height  : '100%',
          content : '<div class="fancybox-image" style="background-image:url(' + this.href + '); background-size: cover; background-position:50% 50%;background-repeat:no-repeat;height:100%;width:100%;" /></div>'
      });
    }
  });

  //Nav
  var secondaryNav = $('.jbp-nav'),
  secondaryNavTopPosition = secondaryNav.offset().top,
  contentSections = $('.jbp-section');

  $(window).on('scroll', function(){
    if($(window).scrollTop() > secondaryNavTopPosition ) {
      secondaryNav.addClass('is-fixed');
      setTimeout(function() {
        $('#logo-header').addClass('slide-in');
        secondaryNav.addClass('animate-children');
      }, 50);
    } else {
      secondaryNav.removeClass('is-fixed');
      setTimeout(function() {
        secondaryNav.removeClass('animate-children');
        $('#logo-header').removeClass('slide-in');
      }, 50);
    }

    updateSecondaryNavigation();
  });

  function updateSecondaryNavigation() {
    contentSections.each(function(){
      var actual = $(this),
      actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
      actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
      if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
        actualAnchor.addClass('active');
      }else {
        actualAnchor.removeClass('active');
      }
    });
  }

  //on mobile - open/close secondary navigation clicking/tapping the .cd-secondary-nav-trigger
  $('.jbp-nav-trigger').on('click', function(event){
    event.preventDefault();
    $(this).toggleClass('menu-is-open');
    secondaryNav.find('ul').toggleClass('is-visible');
  });

  //smooth scrolling when clicking on the secondary navigation items
  secondaryNav.find('ul a').on('click', function(event){
    event.preventDefault();
    var target= $(this.hash);
    $('body,html').animate({
      'scrollTop': target.offset().top - secondaryNav.height() + 1
    }, 400
    );
    //on mobile - close secondary navigation
    $('.jbp-nav-trigger').removeClass('menu-is-open');
    secondaryNav.find('ul').removeClass('is-visible');
  });

  $('#logo-header').find('a').on('click', function(event){
   event.preventDefault();
   var target= $(this.hash);
   $('body,html').animate({
    'scrollTop': target.offset().top - secondaryNav.height() + 1
   },400);
  });

  $('#logo-home').on('click',function(){
    var target = $('#services');
    $('body,html').animate({
      'scrollTop': target.offset().top - secondaryNav.height() + 1
    },400);
  });

  //on mobile - open/close primary navigation clicking/tapping the menu icon
  $('.cd-primary-nav').on('click', function(event){
    if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
  });

  $("#contact-submit").on('click',function() {
    var $contact_form = $('#jbp-contact');
    var fields = $contact_form.serialize();

    $.ajax({
      type: "POST",
      url: "php/contact.php",
      data: fields,
      dataType: 'json',
      success: function(response) {

        if(response.status){
          $('#jbp-contact input').val('');
          $('#tta-contact textarea').val('');
        }

        $('#contact-response').empty().html(response.html);
      }
    });
    return false;
  });
});
