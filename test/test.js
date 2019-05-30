const Token = artifacts.require("Token");
const Contribution = artifacts.require("Contribution");
let donationAmount = 5;
let _startTime=100;
let _endTime=1999999999;
let ethToTokenRate=3;

contract("Testing", async ()=> {
    let t = await Token.new(_startTime,_endTime);
    let c = await Contribution.new(t.address,ethToTokenRate);
    describe("Testing during valid timeframe", async ()=>{
    describe("Contribution Contract",()=>{
    describe("donate()",()=>{
        it("Event- DonationMade", async () => {
            let result = await c.donate(donationAmount);
            assert.equal(result.logs[0].event, 'DonationMade');
        });
    });
    describe("getDonationByAddress()",()=>{
        it("Default address",async ()=>{
            let result = await c.getDonationByAddress(accounts[0]);
            assert.equal(result.words[0], donationAmount);
        });
    });
    });
    });

    describe("Change timeframe", async ()=>{
        it("TimeChanged to 100-101", async ()=>{
            let result = await t.changeTimeframe(100,101);
            assert.equal(result.logs[0].event,'TimeChanged')
        });
    });
    describe("Testing during Invalid timeframe", async () => {
        describe("Contribution Contract",()=>{
        describe("donate()",()=>{
            it("Event- DonationMade InvalidTime", async () => {
                assert.throws(c.donate(donationAmount));
            });
        });
        describe("getDonationByAddress() InvalidTime",()=>{
            it("Default address",async ()=>{
                let result = await c.getDonationByAddress(accounts[0]);
                assert.equal(result.words[0], donationAmount);
            });
        });
        });
    });
});

