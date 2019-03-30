// module aliases


function start(){

  var x = document.getElementById("myAudio");

  function playAudio() {
    x.play();
  }
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Runner = Matter.Runner;

// create an engine
var engine = Engine.create();
engine.timing.timeScale = 1

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 550, 120, 120, {inertia: Infinity, restitution: 0.99});
var boxB = Bodies.rectangle(550, 550, 120, 120, {inertia: Infinity, restitution: 0.99});


var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var wall  = Bodies.rectangle(50, 200, 60, 810, {inertia: Infinity, isStatic: true });
boxA.friction = 0;
boxB.friction = 0;
ground.friction = 0;
wall.friction = 0;
boxB.frictionAir = 0;
boxA.frictionAir = 0;
ground.frictionAir = 0;
wall.frictionAir = 0;
boxB.frictionStatic = 1;
boxA.frictionStatic = 1;
boxA.collisionFilter.group = -1;
boxB.collisionFilter.group = -1;
wall.collisionFilter.group = -1;
ground.frictionStatic = 1;
wall.frictionStatic = 1;
ground.restitution = 0;
var count = 0;
Body.setMass(boxA,1);
var digits = prompt("Enter digits of pi: ", 1)
Body.setMass(boxB,Math.pow(100,digits-1));
Body.setVelocity(boxB, {x:-2/digits, y:0})
var flag = true;
Matter.Events.on(engine, 'beforeTick', function() {
        var boxa = JSON.parse(JSON.stringify(boxA.position.x));
        var boxb = JSON.parse(JSON.stringify(boxB.position.x));
        var boxav = JSON.parse(JSON.stringify(boxA.velocity));
        var boxbv = JSON.parse(JSON.stringify(boxB.velocity));
        var collisionTwoBoxes = Matter.SAT.collides(boxA, boxB);
        var collisionBoxWall = Matter.SAT.collides(boxA,wall);

        if(collisionBoxWall.collided){
          Body.setPosition(boxA, {x:boxa,y:boxA.position.y})
          Body.setVelocity(boxA, {x:boxav.x * -1, y:0});
          count++;
          playAudio();
          document.getElementById("count").innerHTML = count;
        }
        if(collisionTwoBoxes.collided){
          // Body.setPosition(boxA, {x:boxa,y:boxA.position.y})
          //Body.setPosition(boxB, {x:boxb+.5,y:boxB.position.y})
          var test = ((2*boxA.mass*boxav.x + boxB.mass*boxbv.x - boxA.mass*boxbv.x))/(boxA.mass+boxB.mass)
          Body.setVelocity(boxA, {x:((2*boxB.mass*boxbv.x + boxA.mass*boxav.x - boxB.mass*boxav.x)/(boxA.mass+boxB.mass)),y:0})
          if (flag){
            console.log(boxB.velocity)
            console.log(boxav.x)
            console.log(boxbv.x)
            console.log(((2*boxA.mass*boxav.x + boxB.mass*boxbv.x - boxA.mass*boxbv.x) /(boxA.mass+boxB.mass)))
          }
          Body.setVelocity(boxB, {x:((2*boxA.mass*boxav.x + boxB.mass*boxbv.x - boxA.mass*boxbv.x) /(boxA.mass+boxB.mass)),y:0})
          if (flag){

            console.log(boxB.velocity)
            flag = false;
          }
          count++;
          playAudio();
          document.getElementById("count").innerHTML = count;
        }

});
// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, wall]);

// run the engine
runner = Matter.Runner.create({delta:1000/30})
Runner.start(runner,engine);

// run the renderer
Render.run(render);

}
