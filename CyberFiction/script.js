function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
    ./images/male0001.png
    ./images/male0002.png
    ./images/male0003.png
    ./images/male0004.png
    ./images/male0005.png
    ./images/male0006.png
    ./images/male0007.png
    ./images/male0008.png
    ./images/male0009.png
    ./images/male0010.png
    ./images/male0011.png
    ./images/male0012.png
    ./images/male0013.png
    ./images/male0014.png
    ./images/male0015.png
    ./images/male0016.png
    ./images/male0017.png
    ./images/male0018.png
    ./images/male0019.png
    ./images/male0020.png
    ./images/male0021.png
    ./images/male0022.png
    ./images/male0023.png
    ./images/male0024.png
    ./images/male0025.png
    ./images/male0026.png
    ./images/male0027.png
    ./images/male0028.png
    ./images/male0029.png
    ./images/male0030.png
    ./images/male0031.png
    ./images/male0032.png
    ./images/male0033.png
    ./images/male0034.png
    ./images/male0035.png
    ./images/male0036.png
    ./images/male0037.png
    ./images/male0038.png
    ./images/male0039.png
    ./images/male0040.png
    ./images/male0041.png
    ./images/male0042.png
    ./images/male0043.png
    ./images/male0044.png
    ./images/male0045.png
    ./images/male0046.png
    ./images/male0047.png
    ./images/male0048.png
    ./images/male0049.png
    ./images/male0050.png
    ./images/male0051.png
    ./images/male0052.png
    ./images/male0053.png
    ./images/male0054.png
    ./images/male0055.png
    ./images/male0056.png
    ./images/male0057.png
    ./images/male0058.png
    ./images/male0059.png
    ./images/male0060.png
    ./images/male0061.png
    ./images/male0062.png
    ./images/male0063.png
    ./images/male0064.png
    ./images/male0065.png
    ./images/male0066.png
    ./images/male0067.png
    ./images/male0068.png
    ./images/male0069.png
    ./images/male0070.png
    ./images/male0071.png
    ./images/male0072.png
    ./images/male0073.png
    ./images/male0074.png
    ./images/male0075.png
    ./images/male0076.png
    ./images/male0077.png
    ./images/male0078.png
    ./images/male0079.png
    ./images/male0080.png
    ./images/male0081.png
    ./images/male0082.png
    ./images/male0083.png
    ./images/male0084.png
    ./images/male0085.png
    ./images/male0086.png
    ./images/male0087.png
    ./images/male0088.png
    ./images/male0089.png
    ./images/male0090.png
    ./images/male0091.png
    ./images/male0092.png
    ./images/male0093.png
    ./images/male0094.png
    ./images/male0095.png
    ./images/male0096.png
    ./images/male0097.png
    ./images/male0098.png
    ./images/male0099.png
    ./images/male0100.png
    ./images/male0101.png
    ./images/male0102.png
    ./images/male0103.png
    ./images/male0104.png
    ./images/male0105.png
    ./images/male0106.png
    ./images/male0107.png
    ./images/male0108.png
    ./images/male0109.png
    ./images/male0110.png
    ./images/male0111.png
    ./images/male0112.png
    ./images/male0113.png
    ./images/male0114.png
    ./images/male0115.png
    ./images/male0116.png
    ./images/male0117.png
    ./images/male0118.png
    ./images/male0119.png
    ./images/male0120.png
    ./images/male0121.png
    ./images/male0122.png
    ./images/male0123.png
    ./images/male0124.png
    ./images/male0125.png
    ./images/male0126.png
    ./images/male0127.png
    ./images/male0128.png
    ./images/male0129.png
    ./images/male0130.png
    ./images/male0131.png
    ./images/male0132.png
    ./images/male0133.png
    ./images/male0134.png
    ./images/male0135.png
    ./images/male0136.png
    ./images/male0137.png
    ./images/male0138.png
    ./images/male0139.png
    ./images/male0140.png
    ./images/male0141.png
    ./images/male0142.png
    ./images/male0143.png
    ./images/male0144.png
    ./images/male0145.png
    ./images/male0146.png
    ./images/male0147.png
    ./images/male0148.png
    ./images/male0149.png
    ./images/male0150.png
    ./images/male0151.png
    ./images/male0152.png
    ./images/male0153.png
    ./images/male0154.png
    ./images/male0155.png
    ./images/male0156.png
    ./images/male0157.png
    ./images/male0158.png
    ./images/male0159.png
    ./images/male0160.png
    ./images/male0161.png
    ./images/male0162.png
    ./images/male0163.png
    ./images/male0164.png
    ./images/male0165.png
    ./images/male0166.png
    ./images/male0167.png
    ./images/male0168.png
    ./images/male0169.png
    ./images/male0170.png
    ./images/male0171.png
    ./images/male0172.png
    ./images/male0173.png
    ./images/male0174.png
    ./images/male0175.png
    ./images/male0176.png
    ./images/male0177.png
    ./images/male0178.png
    ./images/male0179.png
    ./images/male0180.png
    ./images/male0181.png
    ./images/male0182.png
    ./images/male0183.png
    ./images/male0184.png
    ./images/male0185.png
    ./images/male0186.png
    ./images/male0187.png
    ./images/male0188.png
    ./images/male0189.png
    ./images/male0190.png
    ./images/male0191.png
    ./images/male0192.png
    ./images/male0193.png
    ./images/male0194.png
    ./images/male0195.png
    ./images/male0196.png
    ./images/male0197.png
    ./images/male0198.png
    ./images/male0199.png
    ./images/male0200.png
    ./images/male0201.png
    ./images/male0202.png
    ./images/male0203.png
    ./images/male0204.png
    ./images/male0205.png
    ./images/male0206.png
    ./images/male0207.png
    ./images/male0208.png
    ./images/male0209.png
    ./images/male0210.png
    ./images/male0211.png
    ./images/male0212.png
    ./images/male0213.png
    ./images/male0214.png
    ./images/male0215.png
    ./images/male0216.png
    ./images/male0217.png
    ./images/male0218.png
    ./images/male0219.png
    ./images/male0220.png
    ./images/male0221.png
    ./images/male0222.png
    ./images/male0223.png
    ./images/male0224.png
    ./images/male0225.png
    ./images/male0226.png
    ./images/male0227.png
    ./images/male0228.png
    ./images/male0229.png
    ./images/male0230.png
    ./images/male0231.png
    ./images/male0232.png
    ./images/male0233.png
    ./images/male0234.png
    ./images/male0235.png
    ./images/male0236.png
    ./images/male0237.png
    ./images/male0238.png
    ./images/male0239.png
    ./images/male0240.png
    ./images/male0241.png
    ./images/male0242.png
    ./images/male0243.png
    ./images/male0244.png
    ./images/male0245.png
    ./images/male0246.png
    ./images/male0247.png
    ./images/male0248.png
    ./images/male0249.png
    ./images/male0250.png
    ./images/male0251.png
    ./images/male0252.png
    ./images/male0253.png
    ./images/male0254.png
    ./images/male0255.png
    ./images/male0256.png
    ./images/male0257.png
    ./images/male0258.png
    ./images/male0259.png
    ./images/male0260.png
    ./images/male0261.png
    ./images/male0262.png
    ./images/male0263.png
    ./images/male0264.png
    ./images/male0265.png
    ./images/male0266.png
    ./images/male0267.png
    ./images/male0268.png
    ./images/male0269.png
    ./images/male0270.png
    ./images/male0271.png
    ./images/male0272.png
    ./images/male0273.png
    ./images/male0274.png
    ./images/male0275.png
    ./images/male0276.png
    ./images/male0277.png
    ./images/male0278.png
    ./images/male0279.png
    ./images/male0280.png
    ./images/male0281.png
    ./images/male0282.png
    ./images/male0283.png
    ./images/male0284.png
    ./images/male0285.png
    ./images/male0286.png
    ./images/male0287.png
    ./images/male0288.png
    ./images/male0289.png
    ./images/male0290.png
    ./images/male0291.png
    ./images/male0292.png
    ./images/male0293.png
    ./images/male0294.png
    ./images/male0295.png
    ./images/male0296.png
    ./images/male0297.png
    ./images/male0298.png
    ./images/male0299.png
    ./images/male0300.png
 `;
  return data.split("\n")[index];
}

const frameCount = 300;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page1>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page1>canvas",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});

gsap.to("#page2", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});
gsap.to("#page3", {
  scrollTrigger: {
    trigger: `#page3`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});
gsap.to("#page4", {
  scrollTrigger: {
    trigger: `#page4`,
    start: `top top`,
    end: `bottom top`,
    pin: true,
    scroller: `#main`,
  },
});

var cursor = document.querySelector(".outer-cursor");
var cursorinner = document.querySelector(".inner-cursor");
var a = document.querySelectorAll("a");

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + "px";
  cursorinner.style.top = y + "px";
});

document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
  cursorinner.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
  cursorinner.classList.remove("cursorinnerhover");
});

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursorinner.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursorinner.classList.remove("hover");
  });
});