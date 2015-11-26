"use strict";

var defaultVideoOptions = {
  controls:false,
  autoplay:false,
  preload:'auto',
  width:'auto',
  height:'auto',
  muted:true
};

var videosArray = [];
var video1 = null, video2 = null, video3 = null,
    video4 = null, video5 = null, video6 = null;

function setAnimation(element,animation) {
  element.removeClass().addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    element.removeClass();
    element.removeAttr('style');
  });
}

video1 = videojs('v_prueba_1',defaultVideoOptions, function() {
  this.on('ended', function() {
    setAnimation($('#video2'),'animated shake');
    video2.play();
  });
  videosArray.push({element:this,ratio:68/86});
});

video2 = videojs('v_prueba_2', defaultVideoOptions, function() {
  this.on('ended', function() {
    video1.play();
  });
  videosArray.push({element:this,ratio:44/25});
});

video3 = videojs('v_prueba_3',defaultVideoOptions, function() {
  this.on('ended', function() {
    setAnimation($('#video4'),'animated shake');
    video4.play();
  });
  videosArray.push({element:this,ratio:562/860});
});

video4 = videojs('v_prueba_4', defaultVideoOptions, function() {
  this.on('ended', function() {
    video3.play();
  });
  videosArray.push({element:this,ratio:44/25});
});

video5 = videojs('v_prueba_5',defaultVideoOptions, function() {
  this.on('ended', function() {
    setAnimation($('#video6'),'animated shake');
    video6.play();
  });
  videosArray.push({element:this,ratio:562/860});
});

video6 = videojs('v_prueba_6', defaultVideoOptions, function() {
  this.on('ended', function() {
    video5.play();
  });
  videosArray.push({element:this,ratio:44/25});
});

// var wow = new WOW(
//   {
//     boxClass:     'wow',
//     animateClass: 'animated', // animation css class (default is animated)
//     offset:       150,          // distance to the element when triggering the animation (default is 0)
//     mobile:       false,       // trigger animations on mobile devices (default is true)
//     live:         true,       // act on asynchronously loaded content (default is true)
//     callback:     function(box) {
//       switch(box.id){
//         case 'video1':
//           video1.play();
//           break;
//         case 'video3':
//           video3.play();
//           break;
//         case 'video5':
//           video5.play();
//           break;
//         default:
//           break;
//       }
//       video1.play();
//     }
//   }
// );
// wow.init();

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

  $('div[name=sca-animation]').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
    $(this).removeClass();
    $(this).removeAttr('style');
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

  $(".sca-slider").nerveSlider({
    sliderFullscreen: false,
    slideTransitionDelay: 55000
  });

});

function resizeVideoJS(){
  for(var video in videosArray){
    var width = document.getElementById(videosArray[video].element.id()).parentElement.offsetWidth-50;
    videosArray[video].element.width(width).height( width * videosArray[video].ratio );
  }
}

resizeVideoJS();
window.onresize = resizeVideoJS;
