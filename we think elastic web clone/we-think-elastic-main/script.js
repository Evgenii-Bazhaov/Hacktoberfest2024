function initial() {
      gsap.registerPlugin(ScrollTrigger);

      const locoScroll = new LocomotiveScroll({
            el: document.querySelector(".main"),
            smooth: true
      });

      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(".main", {
            scrollTop(value) {
                  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                  return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },

            pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
      });


      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

      ScrollTrigger.refresh();

}
initial();
function loadingAnimation() {
      document.addEventListener("DOMContentLoaded", function () {
            let counter = 1;

            setInterval(function () {
                  const loaderImages = document.querySelectorAll("#loader img");
                  loaderImages.forEach(img => img.style.display = "none");

                  const currentImage = document.querySelector(`#loader img:nth-child(${counter})`);
                  if (currentImage) {
                        currentImage.style.display = "block";
                        counter = (counter % loaderImages.length) + 1;
                  }
            }, 100); // Change every 1 second
      });

      let t1 = gsap.timeline();
      t1.to("#loader", {
            y: "-100%",
            delay: 2,
            duration: 1,
            scaleY: 0,
            ease: "power1.inOut"
      })
      t1.from(".hero-section-title span", {
            y: "60%",
            duration: 1,
            ease: "power1.inOut",
            stagger: 0.2
      })
}


let projectItems = document.querySelectorAll(".figure")
console.log(projectItems)

projectItems.forEach((item) => {
      item.addEventListener('mousemove', () => {
            const img = item.querySelector(".figure-img-container");
            if (img) { // Check if the .figure-img-container exists
                  img.style.transform = 'scale(1.15)';
            }
            const figure = item.querySelector(".figure-img");
            if (figure) {
                  figure.style.transform = 'scale(0.98)';
                  figure.style.borderRadius = '20px';
            }
      })
      item.addEventListener('mouseleave', () => {
            const img = item.querySelector(".figure-img-container");
            if (img) { // Check if the .figure-img-container exists
                  img.style.transform = 'scale(1)';
            }
            const figure = item.querySelector(".figure-img");
            if (figure) {
                  figure.style.transform = 'scale(1)';
                  figure.style.borderRadius = '0';
            }
      })
})

function videoAnimation() {
      let t1 = gsap.timeline({
            scrollTrigger: {
                  trigger: ".video-section",
                  scroller: ".main",
                  markers: false,
                  start: "top 47%",
                  end: "top 0%",
                  scrub: 3
            }
      })

      t1.to(".video-section-content-inner", {
            scale: 1
      })

}

function horizontalScroll(){
      gsap.to(".horizontal-section-title", {
            transform: "translateX(-140%)",
            scrollTrigger: {
                  trigger: ".horizontal-section",
                  scroller: ".main",
                  markers: false,
                  start: "top 0%",
                  end: "top -100%",
                  pin: true,
                  scrub: 3
            }
      })
}

function contectAanimation(){
      let t4 = gsap.timeline({
            scrollTrigger: {
                  trigger: ".contect-section",
                  scroller: ".main",
                  markers: false,
                  start: "top 47%",
                  end: "top 0%",
                  scrub: 3
            }
      })
      
      t4.from(".contact-heading h1", {
            y: 70,
            opacity: 0,
            duration: 1,
            stagger: 0.4,
            
        })
}



loadingAnimation();
videoAnimation();
horizontalScroll();
contectAanimation();