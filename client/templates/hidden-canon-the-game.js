if (Meteor.isClient) {


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
      var arc = r.path().attr({stroke: params.color, "stroke-width": params.width}).attr({arc: [0, 60, params.R ]});
      arc.animate({arc: [90, 360, params.R]}, 0, ">"); 

      return arc;
    }

    var arc = createArc({
      R: 200,
      width: 30,
      color: "#ccc"
    });

    var anim = Raphael.animation({transform: "r360 300 300"}, 2500).repeat(Infinity);
    arc.animate(anim);

  });
}

