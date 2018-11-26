$(document).ready(function() {

  // Header
  let anim1 = new TweenMax.to('.main-header', 1, {
    ease: Power4.easeInOut,
    delay: .5, 
    opacity: 1
  });

  // Hero text
  let anim2 = new TweenMax.to('.hero__align', 1, {
    ease: Power4.easeInOut,
    opacity: 1
  });

  let timeLine = new TimelineMax().add(anim1).add(anim2);

  // Video
  let controller = new ScrollMagic.Controller();
  let hero = new TimelineMax()
    .add([
      TweenMax.to('.hero__video', 1, {
        ease: Power4.easeInOut,
        opacity: 0
      }),
      TweenMax.to('.hero__bg', 1, {
        ease: Power4.easeInOut,
        opacity: 0
      })
    ]);
  let scene = new ScrollMagic.Scene({
    triggerElement: '.hero',
    duration: 1700
  })
  .setTween(hero)
  .setPin('.hero__video')
  .addTo(controller);

  // TEXT ANIMATIONS

  // Text blast
  $('.h2').addClass('h1--hidden');
  $('.h2').each(function() {
    new ScrollMagic.Scene({
      triggerElement: this
    })
    .on('start', function() {
      let item = this.triggerElement();
      $(item).removeClass('h2--hidden');
      $(item).addClass('h2--visible');
    })
    .addTo(controller);

    $(this).blast({ delimiter: "word" });
  });

  // Works
  // $('.work').on('mouseenter', function() {
  //   let workPlate = new TweenMax.to($(this).find('.work__hover'), 1, {
  //     ease: Power4.easeInOut,
  //     opacity: 1
  //   });
  //   let workTitle = new TweenMax.to($(this).find('.work__hover'), 1, {
  //     ease: Power4.easeInOut,
  //     opacity: 1
  //   });
  //   let workHoverTimeline = new TimelineMax().add(workPlate);
  //   // TweenMax.to($(this).find())
  // })

  // Basic animation
  $('.basic-animation-container').each(function() {
    let basicAnimation = new TimelineMax()
      .staggerFromTo($(this).find('.basic-animation'), .5, {
        y: 48,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1
      }, .3, '-=.3')
    new ScrollMagic.Scene({
      reverse: false,
      triggerElement: this
    })
    .setTween(basicAnimation)
    .addTo(controller);
  });

});