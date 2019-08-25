const camelize = require('camelcase-keys');

//combine all parsed into params and create scopes for middleware chain
function combineParsed(req, res) {
  //incoming params
  req.params = Object.assign(req.params, req.body, req.query);
  req.params = camelize(req.params);

  //message to be sent
  req.message = ""
  
  //objs to be sent at the end of the chain
  req.payload = {};

  //data passed on between the middleware
  req.scope = {
    verified: {} //contains meta about verification middleware
  };
}

export default combineParsed;
