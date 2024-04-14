const { apiresponse } = require("../utils/apiresponse");

const restrict = (role) => {
  return (request, response, next) => {
    if (request.user_roles == role) {
      next();
    } else {
     
     response.json(apiresponse(400, "You are not allowed to delete this item."));
    }
  };
};

module.exports = restrict;