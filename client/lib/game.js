Game = class Game{
  run(level){
    new level(this);
  }

  constructor(){
    this.r = Raphael("main-canvas", 600, 600);
    this.center = [300, 300];
    this._initCanon();
  }


  shoot(angle){
    var bullet = this.canonCircle.clone();
    var a = (90 - angle) * Math.PI / 180;
    var moveTo = {
      y: -1 * Math.sin(a) * 600,
      x: Math.cos(a) * 600
    }
    bullet.animate({transform: [`T${ moveTo.x },${ moveTo.y }`]}, "500", ">")
  }

  getRotationAngle(obj){
    var angleMatch = obj.transform().match(/r([-0-9\.]{1,})\,/);
    return (angleMatch == null) ? "0" : angleMatch[1];
  }

  _initCanon(){
    this.canonCircle  = this.r.circle(300, 300, 10);
    this.canonPointer = this.r.path(`M290,290 L300,280 L310,290`); // canon sight in a form of triangle
    var canonPointerAnim = Raphael.animation({transform: "r-360 300 300"}, 2500).repeat(Infinity);
    this.canonPointer.animate(canonPointerAnim);

    var self = this;

    $(window).keypress(function (e) {
      if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault()
        var angle = self.getRotationAngle(self.canonPointer)
        self.shoot(angle);
      }
    })
  }


}
