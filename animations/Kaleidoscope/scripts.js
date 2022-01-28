const random_rgb = () => {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return {
    r: r,
    g: g,
    b: b
  }
};

function random_color(num) {
  let aux = []
  for (let i = 0; i < num; i++) {
    aux.push(random_rgb())
  }
  return aux;
};

class Configs {
  static colors = random_color(5);
  static mirrors = Math.ceil(Math.random() * 6);

  static angle = Math.PI / Configs.mirrors;
}

class Particle {

  constructor() {

  }

}

class Canvas {
  static ctx;
  static width;
  static height;
  static colors = random_color(7);
  static mouse = {
    x: null,
    y: null,
    last: {
      x: null,
      y: null
    },
    pressed: false
  }

  constructor() {
    let canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');

    // if (window.innerWidth <= window.innerHeight) {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerWidth;
    // } else {
    //   canvas.width = window.innerHeight;
    //   canvas.height = window.innerHeight;
    // }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Canvas.width = canvas.width;
    Canvas.height = canvas.height;

    this.animationRequest;
    this.i = 0;

    Canvas.ctx.translate(Canvas.width / 2, Canvas.height / 2)
  }

  startEvents() {
    window.addEventListener('mousemove', function (event) {
      Canvas.mouse.last.x = Canvas.mouse.x;
      Canvas.mouse.last.y = Canvas.mouse.y;
      Canvas.mouse.x = event.x;
      Canvas.mouse.y = event.y;
    });

    document.body.onmousedown = function () {
      Canvas.mouse.pressed = true
      if(Canvas.mouse.x != null){
        document.querySelector('h1').remove()
      }
    }
    document.body.onmouseup = function () {
      Canvas.mouse.pressed = false
    }

  }

  animation() {
    if (Canvas.mouse.pressed) {

      let mx = Canvas.mouse.x - Canvas.width / 2;
      let my = Canvas.mouse.y - Canvas.height / 2;
      let pmx = Canvas.mouse.last.x - Canvas.width / 2;
      let pmy = Canvas.mouse.last.y - Canvas.height / 2;

      let color = Canvas.colors[this.i];
      console.log(this.i)

      let distance = Math.sqrt(Math.pow((Canvas.mouse.x - Canvas.width / 2), 2) + Math.pow((Canvas.mouse.y - Canvas.height / 2), 2)) / Canvas.width

      for (let i = 0; i < Configs.mirrors; i++) {
        Canvas.ctx.beginPath();
        Canvas.ctx.rotate(Configs.angle)
        Canvas.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
        Canvas.ctx.lineWidth = distance * 3 + 1;
        Canvas.ctx.moveTo(mx, my);
        Canvas.ctx.lineTo(pmx, pmy);
        Canvas.ctx.stroke()




        Canvas.ctx.save();
        Canvas.ctx.scale(1, -1);
        Canvas.ctx.moveTo(mx, my);
        Canvas.ctx.lineTo(pmx, pmy);

        Canvas.ctx.stroke()
        Canvas.ctx.restore();
        Canvas.ctx.closePath();

      }

      (this.i == Configs.colors.length - 1) ? this.i = 0: this.i++;
    }


    this.animationRequest = requestAnimationFrame(this.animation.bind(this))
  }

}

window.onload = function () {
  let canvas = new Canvas();
  canvas.startEvents();
  canvas.animation();


}