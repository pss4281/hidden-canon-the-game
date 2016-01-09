Level1 = class Level1 extends BaseLevel{

  createArc(params={}){
    var arc = this.game.r.path().attr({
      stroke: params.color,
      "stroke-width": params.width,
      arc: [90, 360, params.R ]
    });
    return arc;
  }



  setup(){
    this.game.r.customAttributes.arc = function (value, total, R) {
      var alpha = 360 / total * value,
        a = (90 - alpha) * Math.PI / 180,
        x = 300 + R * Math.cos(a),
        y = 300 - R * Math.sin(a);
      var path;
      path = [["M", 300, 300 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
      return {path: path};
    };


    var arc = this.createArc({
      R: 200,
      width: 30,
      color: "#ccc"
    });
    var arcAnim = Raphael.animation({transform: "r360 300 300"}, 1500).repeat(Infinity);
    arc.animate(arcAnim);
  }

}
