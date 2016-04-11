
var HelloWorldLayer = cc.Layer.extend({
    background:null,
    redBird:null,
    blueBird:null,
    impulsor1:null,
    impulsor2:null,
    yellowBird:null,
    wood1:null,
    wood2:null,
    wood3:null,
    wood4:null,
    wood5:null,
    wood6:null,
    wood7:null,
    wood8:null,
    wood9:null,
    wood10:null,
    wood11:null,
    enemy1: null,
    enemy2: null,
    enemy3: null,
    
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 1);

        this.background = new cc.Sprite(res.Fondo3_jpg);
        this.background.setPosition(size.width / 2, size.height / 2);
        this.background.setScale(0.45,0.45);
        this.addChild(this.background, 0);
        
        this.redBird = new cc.Sprite(res.RedBird_png);
        this.redBird.setPosition(150,105);
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
        
        this.wood1 = new cc.Sprite(res.madera1);
        this.wood1.setPosition(705,100);
        this.wood1.setScale(0.3, 0.3);
        this.addChild(this.wood1, 2);
        
        this.wood2 = new cc.Sprite(res.madera2);
        this.wood2.setPosition(720,118);
        this.wood2.setScale(0.3, 0.4);
        this.wood2.setRotation(90);
        this.addChild(this.wood2, 2);
        
        this.wood3 = new cc.Sprite(res.madera2);
        this.wood3.setPosition(780,118);
        this.wood3.setScale(0.3, 0.4);
        this.wood3.setRotation(90);
        this.addChild(this.wood3, 2);
        
        this.wood4 = new cc.Sprite(res.madera2);
        this.wood4.setPosition(840,118);
        this.wood4.setScale(0.3, 0.4);
        this.wood4.setRotation(90);
        this.addChild(this.wood4, 2);
        
        this.wood5 = new cc.Sprite(res.madera1);
        this.wood5.setPosition(856,100);
        this.wood5.setScale(0.3, 0.3);
        this.addChild(this.wood5, 2);
        
        this.wood6 = new cc.Sprite(res.madera2);
        this.wood6.setPosition(780,152);
        this.wood6.setScale(0.65, 0.4);
        this.addChild(this.wood6, 2);
        
        this.wood7 = new cc.Sprite(res.madera2);
        this.wood7.setPosition(750,185);
        this.wood7.setScale(0.3, 0.4);
        this.wood7.setRotation(90);
        this.addChild(this.wood7, 2);
        
        this.wood8 = new cc.Sprite(res.madera2);
        this.wood8.setPosition(810,185);
        this.wood8.setScale(0.3, 0.4);
        this.wood8.setRotation(90);
        this.addChild(this.wood8, 2);
        
        this.wood9 = new cc.Sprite(res.madera2);
        this.wood9.setPosition(780,220);
        this.wood9.setScale(0.35, 0.4);
        this.addChild(this.wood9, 2);
        
        this.wood10 = new cc.Sprite(res.madera1);
        this.wood10.setPosition(735,167);
        this.wood10.setScale(0.3, 0.3);
        this.addChild(this.wood10, 2);
        
        this.wood11 = new cc.Sprite(res.madera1);
        this.wood11.setPosition(825,167);
        this.wood11.setScale(0.3, 0.3);
        this.addChild(this.wood11, 2);
        
        this.enemy1 = new cc.Sprite(res.enemigo);
        this.enemy1.setPosition(750, 106);
        this.enemy1.setScale(0.25, 0.25);
        this.addChild(this.enemy1, 2);
        
        this.enemy2 = new cc.Sprite(res.enemigo);
        this.enemy2.setPosition(815, 105);
        this.enemy2.setScale(0.25, 0.25);
        this.addChild(this.enemy2, 2);
        
        this.enemy3 = new cc.Sprite(res.enemigo);
        this.enemy3.setPosition(780, 175);
        this.enemy3.setScale(0.25, 0.25);
        this.addChild(this.enemy3, 2);
        
        var action = cc.Spawn.create(cc.RotateBy.create(1.5, 360), cc.JumpTo.create(1.5, cc.p(205, 175), 100, 1));
        this.redBird.runAction(action);
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

