/******************************************************************************
 *
 * Topic routes - Holds all routes that begin with /topic
 * 
 * render    | *   '/*'        | goes to backbone app
 * 
 *****************************************************************************/

module.exports.render = function(){
  return function(req, res){
    console.log('\nHttp Method:   * \nRoute:         /* \nAction:        Goes to backbone app');
    res.render('index');
  }
};
