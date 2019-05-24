const Token = artifacts.require("Token");

module.exports = function(deployer) {
  deployer.deploy(Token,100,1999999999);
};
