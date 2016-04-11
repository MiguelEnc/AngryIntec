
var HelloWorldLayer = cc.Layer.extend({
    background:null,
    redBird:null,
    blueBird:null,
    impulsor1:null,
    impulsor2:null,
    yellowBird:null,
    
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
        
//        this.blueBird = new cc.Sprite(res.BLueBird_png);
//        this.blueBird.setPosition(110,105);
//        this.blueBird.setScale(0.2,0.2);
//        this.addChild(this.blueBird, 1);
//        
//        this.yellowBird = new cc.Sprite(res.YellowBird_png);
//        this.yellowBird.setPosition(70,105);
//        this.yellowBird.setScale(0.2,0.2);
//        this.addChild(this.yellowBird, 1);
        
        this.impulsor1 = new cc.Sprite(res.impulsor2);
        this.impulsor1.setPosition(210,135);
        this.impulsor1.setScale(0.5,0.5);
        this.addChild(this.impulsor1,1);
        
        this.impulsor2 = new cc.Sprite(res.impulsor1);
        this.impulsor2.setPosition(200,155);
        this.impulsor2.setScale(0.5,0.5);
        this.addChild(this.impulsor2,2);
        
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

