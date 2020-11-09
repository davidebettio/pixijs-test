let Application = PIXI.Application;
let loader = PIXI.Loader.shared;
let resources = PIXI.Loader.shared.resources;
let Sprite = PIXI.Sprite;
let paddle;
let animationState;

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
}

let app = new Application({ 
  width: 800,
  height: 600,
  antialias: true,
  transparent: true,
  resolution: 1,
  forceCanvas: true,
});
document.body.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

loader
  .add("img/paddle.png")
  .load(texturesLoaded);

function texturesLoaded() {
    // set initial animation stage
    state = animationPartOne;

    // get image resource
    paddle = new Sprite(resources["img/paddle.png"].texture);
    
    // anchor point
    paddle.anchor.set(0.5, 0.5);
    
    // start position
    paddle.position.set(paddle.width, paddle.height);
    
    // add to stage and manage ticker
    app.stage.addChild(paddle);
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

function animationPartOne() {
  paddle.vx = 2;
  paddle.x += paddle.vx;
  if(paddle.x >= (app.renderer.view.width - paddle.width)) {
    state = animationPartTwo;
  }
}

function animationPartTwo() {
  paddle.rotation += 0.05;
  if(paddle.rotation >= Math.radians(90)) {
    state = animationFinished;
  }
}

function animationFinished() {}