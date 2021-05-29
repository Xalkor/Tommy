let blocks = [];
let msgs = [
  "Happy Birthday Tommy!",
  "I love you!",
  "You're so cool!!!"
];
let index = 0;
let msg = msgs[index];
let tommy;

function preload() {
  tommy = loadImage("untitled (4).png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let t = 0;

function draw() {
  const N = msg.length;
  
  colorMode(RGB);
  background(51);
  
  if(blocks.length < N) {

    let p = easeBounce(t);
    colorMode(HSB, 360, 100, 100);
    //fill(blocks.length/N*360, 100, 100);
    //rect(0, p*(height-((blocks.length+1)*height/N)), width, height/N);
    tint(blocks.length/N*360, 100, 100);
    image(
      tommy.get(0, tommy.height-((blocks.length+1)*tommy.height/N), tommy.width, tommy.height/N),
      width/3, p*(height-((blocks.length+1)*height/N)), width-(2*width/3), height/N
    );
    textAlign(CENTER, CENTER);
    textSize(32);
    fill((blocks.length/N*360+180)%360, 100, 100);
    text(msg[N-1-blocks.length], width/2, p*(height-((blocks.length+1)*height/N-(height/N/2))));

    t += 1/map(easeBounce(blocks.length/N), 0, 1, 32, 4);

    if(t >= 1) {
      t = 0;
      blocks.push({
        x:width/3-1,
        y:height-((blocks.length+1)*height/N)-1,
        tx:width/2,
        ty:height-((blocks.length+1)*height/N)+height/N/2,
        w:width-(2*width/3)+1,
        h:height/N+1,
        img:tommy.get(0, tommy.height-((blocks.length+1)*tommy.height/N), tommy.width, tommy.height/N),
        c1:color(blocks.length/N*360, 100, 100),
        c2:color((blocks.length/N*360+180)%360, 100, 100),
        t:msg[N-1-blocks.length]
      })
    }
  } else {
    let p = easeCube(t);
    
    for(let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      block.x += (i%2==0?-1:1) * p*width/2;
      block.tx += (i%2==0?-1:1) * p*width/2;
    }
    
    t += 1/64;
    
    if(t >= 1) {
      t = 0;
      blocks = [];
      index++;
      if(index >= msgs.length) index = 0;
      msg = msgs[index];
    }
  }
  for(let block of blocks) {
    //fill(block.c1);
    //rect(block.x, block.y, block.w, block.h);
    tint(block.c1);
    image(block.img,block.x, block.y, block.w, block.h)
    fill(block.c2);
    text(block.t, block.tx, block.ty);
  }
}

function easeCube(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

function easeBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
      return n1 * x * x;
  } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
