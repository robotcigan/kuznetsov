$(document).ready(function() {

  // Video
  document.querySelector('video').play();

  // SVG magic
  jQuery('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  // Mouse
  let cursor = $('.cursor')
  $(window)
    .on('mousemove', (e) => {
        cursor.css({
            left: e.clientX - 4,
            top: e.clientY - 4,
        });
    })
  $('.btn, a').on('mouseenter', () => {
    cursor.addClass('cursor__active');
  });
  $('.btn, a').on('mouseleave', () => {
    cursor.removeClass('cursor__active');
  });

  // Tilt.js
  $('.tilt').tilt({
    easing: 'cubic-bezier(.33,1.02,.58,1)',
    maxTilt: 5,
    glare: true,
    maxGlare: .05
  });


});

// $(window).on('load', function() {
//   $('.hero__video video')[0].play();
// })