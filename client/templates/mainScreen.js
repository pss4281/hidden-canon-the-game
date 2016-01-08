Template.mainScreen.events({
});

Template.mainScreen.onRendered(function(){
  var r = Raphael("main-canvas", 600, 600);

  // Custom Attribute
  r.customAttributes.arc = function (value, total, R) {
    var alpha = 360 / total * value,
      a = (90 - alpha) * Math.PI / 180,
      x = 300 + R * Math.cos(a),
      y = 300 - R * Math.sin(a);
    var path;
    path = [["M", 300, 300 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
    return {path: path};
  };


  function createArc(params={}){
    var arc = r.path().attr({
      stroke: params.color,
      "stroke-width": params.width,
      arc: [90, 360, params.R ]
    });

    return arc;
  }

  var center = [300, 300];

  var arc = createArc({
    R: 200,
    width: 30,
    color: "#ccc"
  });

  var arcAnim = Raphael.animation({transform: "r360 300 300"}, 1500).repeat(Infinity);
  arc.animate(arcAnim);


  var canonCircle = r.circle(300, 300, 10);

  var canonPointer = r.path(`M290,290 L300,280 L310,290`); // canon sight in a form of triangle
  var canonPointerAnim = Raphael.animation({transform: "r-360 300 300"}, 2500).repeat(Infinity);
  canonPointer.animate(canonPointerAnim);


  function shoot(angle){
    var bullet = canonCircle.clone();
    var a = (90 - angle) * Math.PI / 180;
    var moveTo = {
      y: -1 * Math.sin(a) * 600,
      x: Math.cos(a) * 600
    }
    bullet.animate({transform: [`T${ moveTo.x },${ moveTo.y }`]}, "500", ">")
  }


  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      var angleMatch = canonPointer.transform().match(/r([-0-9\.]{1,})\,/);
      var angle = (angleMatch == null) ? "0" : angleMatch[1];
      shoot(angle);
    }
  })

});
