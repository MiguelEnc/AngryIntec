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
        
        this.playMusic();
        
        // Refresh button
        var refreshMenu = new cc.Sprite(res.menu_refresh);
        refreshMenu.setPosition(50, size.height - 50);
        refreshMenu.setScale(1,1);
        this.addChild(refreshMenu, 2);

        // Refresh label
        var refreshLabel = new cc.LabelTTF("Press SPACE to restart", "Arial", 18);
        refreshLabel.setPosition(180, size.height - 50);
        this.addChild(refreshLabel, 1);

        // Initializing physics objects
        this.initPhysics();
        this.setupDebugNode();
        this.addGround();

        // Setting up game label
        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height - 50);
        this.addChild(helloLabel, 1);

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

        this.enemy1 = this._createEnemy(cc.p(750, 106));
        this.enemy2 = this._createEnemy(cc.p(815, 105));
        this.enemy3 = this._createEnemy(cc.p(780, 175));

        this.addChild(this.enemy1);
        this.addChild(this.enemy2);
        this.addChild(this.enemy3);

        // Setting up bird's load animation
        var action = cc.Spawn.create(cc.RotateBy.create(1.5, 360), cc.JumpTo.create(1.5, cc.p(205, 175), 100, 1));
        this.redBird.runAction(action);

        this.addCollisionCallBack();
        this.scheduleUpdate();

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
                var j = cp.v.mult(r, cp.v.len(r)/2);
                self.space.addBody(bird.body);
                bird.body.applyImpulse(j, cp.v(0,0));
            }
        });
        
        // Adding touchListener to background
        cc.eventManager.addListener(touchListener, this.background);
        
        // Key listener
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event){
                
                var juego = event.getCurrentTarget();
                
                if(keyCode === 32 ){   //SPACE pressed
                    console.log("SPACE");
                    juego.ctor();
                    juego.playMusic();
                }
                
            }
        }, this);
        
        // Schedule function to rewind music
        //this.schedule(this.rewindMusic, 90);
        
        return true;
    },
    _createRedBird: function () {
        this.redBirdStartPos = cc.p(205, 175);
        this.redBird = new cc.PhysicsSprite(res.RedBird_png);

        var width = this.redBird.width*.1;
        var height = this.redBird.height*.1;
        var pos = cc.p(150,150);
        var mass = 3;

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
