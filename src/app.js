Math.clamp=function(a,b,c){
    a = Math.min(a,c);
    a = Math.max(a,b);
    return a;
};
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var HelloWorldLayer = cc.Layer.extend({
    slingRadius: {
        min: 0,
        max: 80
    },
    slingAngle: {
        min: Math.radians(250),
        max: Math.radians(295)
    },

    //------------------------------------------------------------------
    //
    // Audio
    //
    //------------------------------------------------------------------
    playMusic: function () {
        cc.audioEngine.playMusic(res.themeSong, false);
    },

    pauseMusic: function () {
        cc.audioEngine.pauseMusic();
    },

    resumeMusic: function () {
        cc.audioEngine.resumeMusic();
    },

    rewindMusic: function () {
        cc.audioEngine.rewindMusic();
    },

    increaseMusicVolume: function () {
        cc.audioEngine.setMusicVolume(cc.audioEngine.getMusicVolume() + 0.1);
    },

    decreaseMusicVolume: function () {
        cc.audioEngine.setMusicVolume(cc.audioEngine.getMusicVolume() - 0.1);
    },


    //------------------------------------------------------------------
    //
    // Physics
    //
    //------------------------------------------------------------------
    initPhysics:function() {
        //initiate space
        this.space = new cp.Space();

        //setup the  Gravity
        this.space.gravity = cp.v(0, -800); //Earth gravity
        this.space.iterations = 30;
        this.space.sleepTimeThreshold = Infinity;
        this.space.collisionSlop = Infinity;
    },

    update:function (dt) {
        this.space.step(dt);
        // this.space.eachShape(function(shape){
        //     var pos = shape.body.p;
        //     shape.sprite && shape.sprite.setPosition(pos.x, pos.y);
        //     //no need to set rotation for this case, for all sprites are round
        // });
    },

    addPhysicsCircle: function(sprite) {

        return sprite;
    },

    addPhysicsBox: function(width, height, posX, posY) {
        var mass=1;

        this.phBodyBox = this.space.addBody(new cp.Body(mass, cp.momentForBox(mass, width, height)));
        this.phBodyBox.setPos(cc.p(posX, posY));

        var phShape = this.space.addShape(new cp.BoxShape(this.phBodyBox, width, height));
        phShape.setFriction(2);
        phShape.setElasticity(0);
        phShape.setCollisionType(1);

        return phShape;
    },

    setupDebugNode : function(){
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this.addChild( this._debugNode );
    },

    addCollisionCallBack:function(){
        this.space.addCollisionHandler(0, 1, function(){
            cc.log('Box and Circle colliding !');
            return true;
        }, null, null, null);
    },

    addGround: function() {
        var WALLS_WIDTH = 5;
        var WALLS_ELASTICITY = 0.5;
        var WALLS_FRICTION = 1;

        var bottomWall = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 80), new cp.v(cc.winSize.width, 80), WALLS_WIDTH);
        bottomWall.setElasticity(WALLS_ELASTICITY);
        bottomWall.setFriction(WALLS_FRICTION);
        this.space.addStaticShape(bottomWall);
    },


    //------------------------------------------------------------------
    //
    // Constructor
    //
    //------------------------------------------------------------------
    ctor:function () {
        this._super();
        var size = cc.winSize;

        // Setting up game label
        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 1);

        this.initPhysics();
        this._createRedBird();

        // Setting up game sprites
        this.background = new cc.Sprite(res.Fondo3_jpg);
        this.background.setPosition(size.width / 2, size.height / 2);
        this.background.setScale(0.45,0.45);
        this.addChild(this.background, 0);

        this.impulsor1 = new cc.Sprite(res.impulsor2);
        this.impulsor1.setPosition(210,135);
        this.impulsor1.setScale(0.5,0.5);

        this.addChild(this.impulsor1,1);

        this.impulsor2 = new cc.Sprite(res.impulsor1);
        this.impulsor2.setPosition(200,155);
        this.impulsor2.setScale(0.5,0.5);
        this.addChild(this.impulsor2,2);

//        this.wood1 = new cc.Sprite(res.madera1);
//        this.wood1.setPosition(705,100);
//        this.wood1.setScale(0.3, 0.3);
//        this.addChild(this.wood1, 2);

//        this.wood2 = new cc.Sprite(res.madera2);
//        this.wood2.setPosition(720,118);
//        this.wood2.setScale(0.3, 0.4);
//        this.wood2.setRotation(90);
//        this.addChild(this.wood2, 2);

//        this.wood3 = new cc.Sprite(res.madera2);
//        this.wood3.setPosition(780,118);
//        this.wood3.setScale(0.3, 0.4);
//        this.wood3.setRotation(90);
//        this.addChild(this.wood3, 2);

//        this.wood4 = new cc.Sprite(res.madera2);
//        this.wood4.setPosition(840,118);
//        this.wood4.setScale(0.3, 0.4);
//        this.wood4.setRotation(90);
//        this.addChild(this.wood4, 2);

//        this.wood5 = new cc.Sprite(res.madera1);
//        this.wood5.setPosition(856,100);
//        this.wood5.setScale(0.3, 0.3);
//        this.addChild(this.wood5, 2);

//        this.wood6 = new cc.Sprite(res.madera2);
//        this.wood6.setPosition(780,152);
//        this.wood6.setScale(0.65, 0.4);
//        this.addChild(this.wood6, 2);

//        this.wood7 = new cc.Sprite(res.madera2);
//        this.wood7.setPosition(750,185);
//        this.wood7.setScale(0.3, 0.4);
//        this.wood7.setRotation(90);
//        this.addChild(this.wood7, 2);

//        this.wood8 = new cc.Sprite(res.madera2);
//        this.wood8.setPosition(810,185);
//        this.wood8.setScale(0.3, 0.4);
//        this.wood8.setRotation(90);
//        this.addChild(this.wood8, 2);

//        this.wood9 = new cc.Sprite(res.madera2);
//        this.wood9.setPosition(780,220);
//        this.wood9.setScale(0.35, 0.4);
//        this.addChild(this.wood9, 2);

//        this.wood10 = new cc.Sprite(res.madera1);
//        this.wood10.setPosition(735,167);
//        this.wood10.setScale(0.3, 0.3);
//        this.addChild(this.wood10, 2);

//        this.wood11 = new cc.Sprite(res.madera1);
//        this.wood11.setPosition(825,167);
//        this.wood11.setScale(0.3, 0.3);
//        this.addChild(this.wood11, 2);

        this.enemy1 = this._createEnemy(cc.p(750, 106));
        this.enemy2 = this._createEnemy(cc.p(815, 105));
        this.enemy3 = this._createEnemy(cc.p(780, 175));

        this.addChild(this.enemy1);
        this.addChild(this.enemy2);
        this.addChild(this.enemy3);

        // Setting up bird's load animation
        var action = cc.Spawn.create(cc.RotateBy.create(1.5, 360), cc.JumpTo.create(1.5, cc.p(205, 175), 100, 1));
        this.redBird.runAction(action);

        // Initializing physics objects
        this.setupDebugNode();
        this.addGround();

        this.addPhysicsBox(24, 24, 705, 98);
        this.addPhysicsBox(24, 24, 855, 98);
        this.addPhysicsBox(24, 24, 735, 165);
        this.addPhysicsBox(24, 24, 825, 165);
        this.addPhysicsBox(24, 24, 780, 250);
        this.addPhysicsBox(5, 60, 720, 115);
        this.addPhysicsBox(5, 60, 780, 115);
        this.addPhysicsBox(5, 60, 840, 115);
        this.addPhysicsBox(5, 60, 750, 179);
        this.addPhysicsBox(5, 60, 810, 179);
        this.addPhysicsBox(70, 5, 780, 210);
        this.addPhysicsBox(127, 5, 780, 147);

        this.addCollisionCallBack();
        this.scheduleUpdate();

        this.playMusic();
        this.decreaseMusicVolume();

        var self = this;
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: false,
            onTouchesBegan: function (touch, evt) {

            },
            onTouchesMoved: function (touch, evt) {

                var currPoint = touch[0].getLocation();
                var vector = cc.pSub(currPoint, self.redBirdStartPos);
                var radius = cc.pLength(vector);
                var angle = cc.pToAngle(vector);


                angle = angle < 0 ? (Math.PI * 2) + angle : angle;
                radius = Math.clamp(radius, self.slingRadius.min, self.slingRadius.max);
                if (angle <= self.slingAngle.max && angle >= self.slingAngle.min) {
                    radius = self.slingRadius.min;
                }

                self.redBird.setPosition(
                    cc.pAdd(self.redBirdStartPos,
                        cc.p(radius * Math.cos(angle), radius * Math.sin(angle))
                    )
                );
            },
            onTouchesEnded: function (touches, event) {
                var bird = self.addPhysicsCircle(self.redBird);
                var r = cp.v.sub(self.redBirdStartPos, bird.getPosition());
                var j = cp.v.mult(r, cp.v.len(r)/5);
                self.space.addBody(bird.body);
                bird.body.applyImpulse(j, cp.v(0,0));
            }
        });
        cc.eventManager.addListener(touchListener, this.background);
        this.schedule(this.rewindMusic, 90);
        return true;
    },
    _createRedBird: function () {
        this.redBirdStartPos = cc.p(205, 175);
        this.redBird = new cc.PhysicsSprite(res.RedBird_png);

        var width = this.redBird.width*.1;
        var height = this.redBird.height*.1;
        var pos = cc.p(150,150);
        var mass = 1.5;

        var bodyCircle = new cp.Body(mass,
                         cp.momentForCircle(mass,0,height*0.2*width*0.2, pos));
        bodyCircle.setPos(pos);
        var shape = this.space.addShape(new cp.CircleShape(bodyCircle, width, cc.p(0, 0)));
        shape.setFriction(1);
        shape.setElasticity(1);
        shape.setCollisionType(0);

        this.redBird.body = bodyCircle;
        this.redBird.setPosition(cc.p(150,150));
        this.redBird.setScale(0.2,0.2);
        this.addChild(this.redBird, 2);
    },
    _createEnemy: function (p) {
        var enemy = new cc.PhysicsSprite(res.enemigo);

        var width = enemy.width*.1;
        var height = enemy.height*.1;
        var mass = 1.5;

        var bodyCircle = this.space.addBody(new cp.Body(mass,
                         cp.momentForCircle(mass,0,height*0.2*width*0.2, p)));
        bodyCircle.setPos(p);

        enemy.body = bodyCircle;

        var shape = this.space.addShape(new cp.CircleShape(bodyCircle, width, cc.p(0, 0)));
        shape.setFriction(1);
        shape.setElasticity(1);
        shape.setCollisionType(0);

        enemy.setPosition(p);
        enemy.setScale(0.25, 0.25);
        return enemy;
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
