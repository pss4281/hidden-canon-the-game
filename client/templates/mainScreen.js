Template.mainScreen.events({
});

Template.mainScreen.onRendered(function(){
  var g = new Game()
  g.run(Level1);
});
