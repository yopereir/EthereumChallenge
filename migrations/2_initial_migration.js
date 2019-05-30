const Token = artifacts.require("Token");
const Contribution = artifacts.require("Contribution");
const startTime=100;
const endTime=1999999999;
const ethToTokenRate=3;

module.exports = function(deployer) {
  deployer.deploy(Token,startTime,endTime).then(function(){
    return deployer.deploy(Contribution,Token.address,ethToTokenRate);
  });
};
