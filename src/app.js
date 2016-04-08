
var HelloWorldLayer = cc.Layer.extend({
    fondo:null,
    redBird:null,
    blueBird:null,
    impulsor:null,
    
    ctor:function () {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("Angry INTEC", "Arial", 38);
        helloLabel.setPosition(size.width / 2, size.height / 2 + 200);
        this.addChild(helloLabel, 1);

        this.fondo = new cc.Sprite(res.Fondo3_jpg);
        this.fondo.setPosition(size.width / 2, size.height / 2);
        this.fondo.setScale(0.45,0.45);
        this.addChild(this.fondo, 0);
        
        this.redBird = new cc.Sprite(res.RedBird_png);
        this.redBird.setPosition(150,105);
        this.redBird.setScale(0.2,0.2);
        this.addChild(this.redBird, 1);
        
        this.blueBird = new cc.Sprite(res.BLueBird_png);
        this.blueBird.setPosition(110,105);
        this.blueBird.setScale(0.2,0.2);
        this.addChild(this.blueBird, 1);
        
        this.impulsor = new cc.Sprite(res.impulsor_png);
        this.impulsor.setPosition(210,135);
        this.impulsor.setScale(0.5,0.5);
        this.addChild(this.impulsor,1);
        
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

