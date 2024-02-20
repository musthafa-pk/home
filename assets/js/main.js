
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });
  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
//typing like text
// document.addEventListener('DOMContentLoaded', function () {
//   var textElement = document.getElementById('typing-text');
//   var cursorElement = document.getElementById('cursor');
//   var textContent = textElement.textContent;
//   textElement.textContent = ''; // Clear the text content

//   function typeText(index) {
//     if (index < textContent.length) {
//       var currentChar = textContent.charAt(index);
//       if (currentChar === '.') {
//         // Make the dot in blue color
//         textElement.innerHTML += '<span style="color: #31d9f7;">' + currentChar + '</span>';
//       } else if (currentChar === 'i') {
//         textElement.innerHTML += '<span style="background: linear-gradient(-10deg,#fff,#fff, #fff,#fff, #31d9f7,#31d9f7); -webkit-background-clip: text; color: transparent;">' + currentChar + '</span>';
//       } else {
//         textElement.innerHTML += currentChar;
//       }
//       index++;
//       setTimeout(function () {
//         typeText(index);
//       }, 100); // Adjust the typing speed (in milliseconds)
//     } else {
//       // Cursor blinking effect
//       cursorElement.style.display = (cursorElement.style.display === 'none') ? 'inline' : 'none';
//       setTimeout(function () {
//         // Start backspacing after cursor blinks
//         backspaceText(textContent.length);
//       }, 500); // Adjust the delay before backspacing (in milliseconds)
//     }
//   }

//   function backspaceText(index) {
//     if (index >= 0) {
//       textElement.textContent = textContent.substring(0, index);
//       index--;
//       setTimeout(function () {
//         backspaceText(index);
//       }, 50); // Adjust the backspacing speed (in milliseconds)
//     } else {
//       // Restart typing after backspacing
//       textElement.innerHTML = ''; // Clear the text content before restarting
//       setTimeout(function(){
//         typeText(0);
//       },500);
//     }
//   }

//   // Trigger the typing effect
//   typeText(0);
// });
          // Select the typing text element
const typingText = document.getElementById('typing-text');

// Define the text to be typed
const texts = ["Keying smart moves...", "Keying smart moves...", "Keying smart moves..."];

// Initialize index for tracking current text
let textIndex = 0;

// Initialize index for tracking current character
let charIndex = 0;

// Speed of typing in milliseconds
const typingSpeed = 100;

// Function to type text
function type() {
  if (charIndex < texts[textIndex].length) {
      if (texts[textIndex].charAt(charIndex) === '.') {
          // If the character is a period, add it in blue color
          typingText.innerHTML += '<span style="color: #31d9f7;">.</span>';
      } else if (texts[textIndex].charAt(charIndex) === 'i') {
          // If the character is 'i', add it in blue color
          typingText.innerHTML += '<span style="background: linear-gradient(-10deg,#fff,#fff, #fff,#fff, #31d9f7,#31d9f7); -webkit-background-clip: text; color: transparent;">' + texts[textIndex].charAt(charIndex) + '</span>';
      } else {
          // Otherwise, add the character normally
          typingText.textContent += texts[textIndex].charAt(charIndex);
      }
      charIndex++;
      setTimeout(type, typingSpeed);
  } else {
      setTimeout(erase, 5000); // Pause before erasing text
  }
}
// Function to erase text
function erase() {
    if (charIndex > 0) {
        typingText.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, typingSpeed / 2);
    } else {
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
        setTimeout(type, typingSpeed / 2);
    }
}

// Start typing initially
type();


(function() 
{

  var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = {x: width/2, y: height/2};

      largeHeader = document.getElementById('large-header');
      largeHeader.style.height = height+'px';

      canvas = document.getElementById('demo-canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');

      // create points
      points = [];
      for(var x = 0; x < width; x = x + width/20) {
          for(var y = 0; y < height; y = y + height/20) {
              var px = x + Math.random()*width/20;
              var py = y + Math.random()*height/20;
              var p = {x: px, originX: px, y: py, originY: py };
              points.push(p);
          }
      }

      // for each point find the 5 closest points
      for(var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for(var j = 0; j < points.length; j++) {
              var p2 = points[j]
              if(!(p1 == p2)) {
                  var placed = false;
                  for(var k = 0; k < 5; k++) {
                      if(!placed) {
                          if(closest[k] == undefined) {
                              closest[k] = p2;
                              placed = true;
                          }
                      }
                  }

                  for(var k = 0; k < 5; k++) {
                      if(!placed) {
                          if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                              closest[k] = p2;
                              placed = true;
                          }
                      }
                  }
              }
          }
          p1.closest = closest;
      }

      // assign a circle to each point
      for(var i in points) {
          var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
          points[i].circle = c;
      }
  }

  // Event handling
  function addListeners() {
      if(!('ontouchstart' in window)) {
          window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
  }

  function mouseMove(e) {
      var posx = posy = 0;
      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      }
      else if (e.clientX || e.clientY)    {
          posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      target.x = posx;
      target.y = posy;
  }

  function scrollCheck() {
      if(document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
  }

  function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height+'px';
      canvas.width = width;
      canvas.height = height;
  }

  // animation
  function initAnimation() {
      animate();
      for(var i in points) {
          shiftPoint(points[i]);
      }
  }

  function animate() {
      if(animateHeader) {
          ctx.clearRect(0,0,width,height);
          for(var i in points) {
              // detect points in range
              if(Math.abs(getDistance(target, points[i])) < 4000) {
                  points[i].active = 0.3;
                  points[i].circle.active = 0.6;
              } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                  points[i].active = 0.1;
                  points[i].circle.active = 0.3;
              } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                  points[i].active = 0.02;
                  points[i].circle.active = 0.1;
              } else {
                  points[i].active = 0;
                  points[i].circle.active = 0;
              }

              drawLines(points[i]);
              points[i].circle.draw();
          }
      }
      requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
      TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
          y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
          onComplete: function() {
              shiftPoint(p);
          }});
  }

  // Canvas manipulation
  function drawLines(p) {
      if(!p.active) return;
      for(var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
          ctx.stroke();
      }
  }

  function Circle(pos,rad,color) {
      var _this = this;

      // constructor
      (function() {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
      })();

      this.draw = function() {
          if(!_this.active) return;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
          ctx.fill();
      };
  }

  // Util
  function getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
  
})();

//get current year
// Get the current year
const currentYear = new Date().getFullYear();

// Insert the current year into the span element
document.getElementById('currentYear').textContent = currentYear;


//show more button in products
document.addEventListener("DOMContentLoaded", function() {
  const viewMoreButtons = document.querySelectorAll('.view-more');

  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const content = this.previousElementSibling;

      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        this.textContent = 'View More';
      } else {
        content.classList.add('expanded');
        this.textContent = 'View Less';
      }
    });
  });
});


// products page
// flip card
