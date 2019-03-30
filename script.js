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
var boxA = Bodies.rectangle(400, 550, 80, 80, {inertia: Infinity, restitution: 1});
var boxB = Bodies.rectangle(550, 550, 80, 80, {inertia: Infinity, restitution: 1});


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
boxB.frictionStatic = 1;
boxA.frictionStatic = 1;
ground.frictionStatic = 1;
wall.frictionStatic = 1;
ground.restitution = 1;
Body.setVelocity(boxB, {x:-3, y:0})
var count = 0;
Matter.Events.on(engine, 'beforeTick', function() {
        var collisionTwoBoxes = Matter.SAT.collides(boxA, boxB);
        var collisionBoxWall = Matter.SAT.collides(boxA,wall);
        if(collisionBoxWall.collided || collisionTwoBoxes.collided){count++;document.getElementById("count").innerHTML = count;}
});
// add all of the bodies to the world
World.add(engine.world, [boxA, boxB, ground, wall]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

}
