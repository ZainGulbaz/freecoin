import createHash from "./crypto.hash";

describe("Test Crypto function",()=>{
 
    it("creates a valid hash",()=>{
      const hash="2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae";
      expect(createHash("foo")).toEqual(hash);
    });

    it("creates a hash irespective of arguments order",()=>{
        expect(createHash("one","two","three")).toEqual(createHash("three","two","one"));
    })


});