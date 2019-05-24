const Token = artifacts.require("Token");
const Contribution = artifacts.require("Contribution");
let donationAmount = 5;
let _startTime=100;
let _endTime=101;

contract("Testing", async ()=> {
    describe("Testing during valid timeframe", async ()=>{
    describe("Contribution Contract",()=>{
    describe("donate()",()=>{
        it("Event- DonationMade", async () => {
            let c = await Contribution.deployed();
            let result = await c.donate(donationAmount);
            let acquired = result.logs[0].event;
            assert.equal(acquired, 'DonationMade');
        });
    });
    describe("getDonationByAddress()",()=>{
        it("Default address",async ()=>{
            let c = await Contribution.deployed();
            let result = await c.getDonationByAddress('0x34d570ddbcd404472c510f8978ac00cf9ca6dadb');
            assert.equal(result.words[0], donationAmount);
        });
    });
    });
    });

    describe("Change timeframe", async ()=>{
        it("TimeChanged", async ()=>{
            let t = await Token.deployed();
            let result = await t.changeTimeframe(_startTime,_endTime);
            let acquired = result.logs[0].event;
            assert.equal(acquired,'TimeChanged')
        });
    });
    describe("Testing during Invalid timeframe", async () => {
        describe("Contribution Contract",()=>{
        describe("donate()",()=>{
            it("Event- DonationMade InvalidTime", async () => {
                let c = await Contribution.deployed();
                let result = await c.donate(donationAmount);
                let acquired = result.logs[0].event;
                assert.throws(acquired);
            });
        });
        describe("getDonationByAddress() InvalidTime",()=>{
            it("Default address",async ()=>{
                let c = await Contribution.deployed();
                let result = await c.getDonationByAddress('0x34d570ddbcd404472c510f8978ac00cf9ca6dadb');
                assert.equal(result.words[0], donationAmount);
            });
        });
        });
    });
});

