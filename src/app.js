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
        var width = sprite.getBoundingBox().width;
        var height = sprite.getBoundingBox().height;
        var pos = sprite.getPosition()
        var mass = 1;

        var bodyCircle = this.space.addBody(new cp.Body(mass, cp.momentForCircle(mass,0,width*0.5, pos)));
        bodyCircle.setPos(pos);

        var shape = this.space.addShape(new cp.CircleShape(bodyCircle, width, cc.p(0, 0)));
        shape.setFriction(0);
        shape.setElasticity(1);
        shape.setCollisionType(0);

        sprite.body = bodyCircle;

        return sprite;
    },
    
    addPhysicsBox: function(filename, X, Y, scaleX, scaleY, Z, rotation) {
        //#1
        var box = cc.Sprite.create(filename);
        var mass = 1;

        //#2
        var phNode = cc.PhysicsSprite.create(filename),
            phBody = null,
            phShape = null;
        
        this.addChild(phNode, Z);
        
        var nodeSize = box.getContentSize();
        
        nodeSize.width *= scaleX;
        nodeSize.height *= scaleY;

        //#3
        var myBody = new cp.Body(mass, cp.momentForBox(mass, nodeSize.width, nodeSize.height));
        phNode.setBody(myBody   );
        if(!!rotation)
            phNode.setRotation(rotation);
        phNode.setScale(scaleX, scaleY);
        phBody = this.space.addBody(myBody);
        phBody.setPos(cc.p(X, Y));

        //#4
        var shape = new cp.BoxShape(myBody, nodeSize.width, nodeSize.height);
        shape = this.space.addShape(shape);
        shape.setFriction(0.5);
        shape.setElasticity(0.5);
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
        
        // Initializing physics objects
        this.initPhysics();
        this.setupDebugNode();
        this.addGround();

        // Setting up game label
        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 1);

        // Setting up game sprites
        this.background = new cc.Sprite(res.Fondo3_jpg);
        this.background.setPosition(size.width / 2, size.height / 2);
        this.background.setScale(0.45,0.45);
        this.addChild(this.background, 0);

        this.redBirdStartPos = cc.p(205, 175);
        this.redBird = new cc.PhysicsSprite(res.RedBird_png);
        this.redBird.body = new cp.Body(1, 1);
        this.redBird.setPosition(cc.p(150,150));
        this.redBird.setScale(0.2,0.2);
        this.addChild(this.redBird, 2);

        this.impulsor1 = new cc.Sprite(res.impulsor2);
        this.impulsor1.setPosition(210,135);
        this.impulsor1.setScale(0.5,0.5);
        this.addChild(this.impulsor1,1);

        this.impulsor2 = new cc.Sprite(res.impulsor1);
        this.impulsor2.setPosition(200,155);
        this.impulsor2.setScale(0.5,0.5);
        this.addChild(this.impulsor2,2);

        this.addPhysicsBox(res.madera1, 705, 100, 0.3, 0.3, 2);

        this.addPhysicsBox(res.madera2, 720, 118, 0.3, 0.4, 2, 90);

        this.addPhysicsBox(res.madera2, 780, 118, 0.3, 0.4, 2, 90);

        this.addPhysicsBox(res.madera2, 840, 118, 0.3, 0.4, 2, 90);

        this.addPhysicsBox(res.madera1, 856, 100, 0.3, 0.3, 2);

        this.addPhysicsBox(res.madera2, 780, 152, 0.65, 0.4, 2);

        this.addPhysicsBox(res.madera2, 750, 185, 0.3, 0.4, 2, 90);

        this.addPhysicsBox(res.madera2, 810, 185, 0.3, 0.4, 2, 90);

        this.addPhysicsBox(res.madera2, 780, 220, 0.35, 0.4, 2);

        this.addPhysicsBox(res.madera2, 735, 167, 0.3, 0.3, 2);

        this.addPhysicsBox(res.madera1, 825, 167, 0.3, 0.3, 2);

        this.addPhysicsBox(res.enemigo, 750, 106, 0.25, 0.25, 2);

        this.addPhysicsBox(res.enemigo, 815, 105, 0.25, 0.25, 2);

        this.addPhysicsBox(res.enemigo, 780, 175, 0.25, 0.25, 2);

        // Setting up bird's load animation
        var action = cc.Spawn.create(cc.RotateBy.create(1.5, 360), cc.JumpTo.create(1.5, cc.p(205, 175), 100, 1));
        this.redBird.runAction(action);

        this.addCollisionCallBack();
        this.scheduleUpdate();

        this.playMusic();
        this.decreaseMusicVolume();

        var self = this;
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: false,
            onTouchesBegan: function (touch, evt) {

                // var currPoint = touch[0].getLocation();
                // var vector = cc.pSub(self.redBirdStartPos, currPoint);
                //
                //     self.soga = new cc.Sprite(res.soga);
                //     self.soga.x = currPoint.x;
                //     self.soga.y = currPoint.y;
                //     self.soga.scaleX = 1.5;
                //     self.soga.scaleY = 2;
                //     self.soga.setAnchorPoint(cc.p(0, 0,5));
                //     self.soga.zIndex = 1;
            },
            onTouchesMoved: function (touch, evt) {

                var currPoint = touch[0].getLocation();
                var vector = cc.pSub(currPoint, self.redBirdStartPos);
                var radius = cc.pLength(vector);
                var angle = cc.pToAngle(vector);

                console.log(currPoint);
                console.log(vector);
                console.log(radius);
                console.log(angle);

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

                var updateRubber = function (rubber, to, lengthAddon, topRubber) {
                    var from = rubber.getPosition(),
                    rubberVec = cc.pSub(to, from),
                    rubberAng = cc.pToAngle(rubberVec),
                    rubberDeg = Math.degrees(rubberAng),
                    length = cc.pLength(rubberVec) + (lengthAddon || 8);

                    rubber.setRotation(-rubberDeg);
                    rubber.setScaleX(-(length / rubber.getContentSize()
                      .width));

                    if (topRubber) {
                        rubber.setScaleY(1.1 - ((0.7 / this.slingRadius.max) * length));
                        this.soga.setRotation(-rubberDeg);
                        this.soga.setPosition(
                            cc.pAdd(from, cc.p((length) * Math.cos(rubberAng), (length) * Math.sin(rubberAng)))
                        );
                    }
                }.bind(self);

                var rubberToPos = self.redBird.getPosition();
                // updateRubber(self.impulsor1, rubberToPos, 13, true);
                // updateRubber(self.impulsor2, rubberToPos, 0);
                // self.impulsor1.setScaleY(self.impulsor2.getScaleY());
            },
            onTouchesEnded: function (touches, event) {
                var bird = self.addPhysicsCircle(self.redBird);
                var r = cp.v.sub(self.redBirdStartPos, bird.getPosition());
                var j = cp.v.mult(r, cp.v.len(r)/5);
                // bird.body.setMass(5);
                bird.body.applyImpulse(j, cp.v(0,0));
            }
        });
        cc.eventManager.addListener(touchListener, this.background);
        this.schedule(this.rewindMusic, 90);
        return true;
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
