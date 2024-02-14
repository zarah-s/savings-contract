import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Savings", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Savings = await ethers.getContractFactory("Savings");
    const savings = await Savings.deploy();

    return { savings, owner, otherAccount };
  }

  describe("Deposit", function () {
    it("Check if increment balance", async function () {
      const { savings, owner } = await loadFixture(deployContract);
      await savings.deposit({ value: 1 });
      const checkSavings = await savings.checkSavings(owner);
      expect(checkSavings).eq(1)

    });


  });


  describe("Withdraw", function () {
    it("Check if decrement balance on withdraw", async function () {
      const { savings, owner } = await loadFixture(deployContract);
      await savings.deposit({ value: 1 });
      await savings.withdraw();
      const checkSavings = await savings.checkSavings(owner);
      expect(checkSavings).eq(0)

    });


  });



  describe("send out saving", function () {
    it("Check if transfer is successful", async function () {
      const { savings, owner } = await loadFixture(deployContract);
      const mockAddress = "0x42AcD393442A1021f01C796A23901F3852e89Ff3";
      await savings.deposit({ value: 2 });
      await savings.sendOutSaving(mockAddress, 1);
      const checkSavings = await savings.checkSavings(owner);
      expect(checkSavings).eq(1)

    });


  });

});
