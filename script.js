// module aliases
function start(){
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 550, 80, 80);
var boxB = Bodies.rectangle(550, 550, 80, 80);


var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

var wall  = Bodies.rectangle(50, 200, 60, 810, { isStatic: true });
boxA.friction = 0;
boxB.friction = 0;
ground.friction = 0;
wall.friction = 0;
boxB.frictionAir = 0;
boxA.frictionAir = 0;
ground.frictionAir = 0;
wall.frictionAir = 0;
boxB.frictionStatic = 0;
boxA.frictionStatic = 0;
ground.frictionStatic = 0;
wall.frictionStatic = 0;

Body.setMass(boxA, 1)
Body.setMass(boxB, 1)
boxA.restitution = 1;
boxB.restitution = 1;
wall.restitution = 1;
ground.restitution = 1;
Body.setVelocity(boxB, {x:-3, y:0})

// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, wall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

}
