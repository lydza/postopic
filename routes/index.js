module.exports.render = function(){
  return function(req, res){
    console.log('Route: /');
    res.render('index');
  }
};
