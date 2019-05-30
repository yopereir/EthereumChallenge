const Token = artifacts.require("Token");
const Contribution = artifacts.require("Contribution");
let donationAmount = 5;
let _startTime=100;
let _endTime=1999999999;
let ethToTokenRate=3;

contract("Testing", async ()=> {
    before(async ()=>{
        let t = await Token.new(_startTime,_endTime);
        let c = await Contribution.new(t.address,ethToTokenRate);
    });
    describe("Testing during valid timeframe", ()=>{
        it("Event- DonationMade by account[0]", async () => {
            let result = await c.donate(donationAmount);
            assert.equal(result.logs[0].event, 'DonationMade');
        });
        it("Get donation by account[0] address",async ()=>{
            let result = await c.getDonationByAddress(accounts[0]);
            assert.equal(result.words[0], donationAmount);
        });
    });
    describe("Change timeframe", async ()=>{
        it("TimeChanged to 100-101", async ()=>{
            let result = await t.changeTimeframe(100,101);
            assert.equal(result.logs[0].event,'TimeChanged')
        });
    });
    describe("Testing during Invalid timeframe", async () => {
        it("Event- DonationMade InvalidTime", async () => {
            assert.throws(c.donate(donationAmount));
        });
        it("Get donation made by account[0] address during invalid timeframe",async ()=>{
            let result = await c.getDonationByAddress(accounts[0]);
            assert.equal(result.words[0], donationAmount);
        });
    });
});