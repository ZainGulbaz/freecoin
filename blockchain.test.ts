import Block from "./block";
import { BlockChain } from "./blockchain";

describe("Blockchain",()=>{

    let blockchain:BlockChain;
    let newChain:BlockChain;
    let originalChain:BlockChain;
    
    beforeEach(()=>{
        blockchain= new BlockChain();

        newChain= new BlockChain();
        originalChain= new BlockChain();
     });
    
    it("Blockchain has the chain as instance of the array",()=>{
        expect(blockchain.chain instanceof Array).toBeTruthy();
    });

    it("Blockchain has the genesis block",()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("Blockchain adds the block at the end of the chain",()=>{
        
        const data=["Dummy Data"];
        blockchain.addBlock(data);
        expect(data).toEqual(blockchain.chain.slice(-1)[0]["data"]);

    });

    describe("isValidChain()",()=>{

        describe("The first block is not a genesis block",()=>{

            it("returns false",()=>{

                blockchain.chain=[{timestamp:2,data:[],lastHash:"aaa",hash:"0x000000",nonce:0}]
                  
                expect(blockchain.isValidChain()).toBeFalsy();
                  
            })

        });

            describe("The last block is invalid",()=>{
    
                 it("returns false",()=>{

                    blockchain= new BlockChain();

                    blockchain.addBlock(["new block added"]);
    
                    let lastBlock= blockchain.chain.slice(-1)[0]["hash"]="tempered last hash";

                    expect(blockchain.isValidChain()).toBeFalsy();
                 });

            });

            describe("One of the block is invalid",()=>{

                it("returns false",()=>{

                    blockchain= new BlockChain();

                    blockchain.addBlock(["block-1"]);
                    blockchain.addBlock(["block-2"]);
                    blockchain.addBlock(["block-3"]);
    
                    blockchain.chain[1]["data"]=["tempered block"];
                     
                    expect(blockchain.isValidChain()).toBeFalsy();
                });
            });

            describe("The blockchain is a valid chain",()=>{

                    blockchain= new BlockChain();

                    blockchain.addBlock(["block-1"]);
                    blockchain.addBlock(["block-2"]);
                    blockchain.addBlock(["block-3"]);

                it("return true",()=>{
                    expect(blockchain.isValidChain()).toBeTruthy();
                });

            });

        describe("The chain contains a block with jump difficulty",()=>{
           it("returns false",()=>{
              blockchain.addBlock(["block-1"]);
              blockchain.addBlock(["block-2"]);
              Block.difficulty=10;

              expect(blockchain.isValidChain()).toBeFalsy();
           })
        });

    })

    describe("replaceChain()",()=>{

        let mockConsole:jest.Func;
        let mockError:jest.Func;
        beforeEach(()=>{             
            mockConsole=jest.fn();
            mockError=jest.fn();

            global.console.log=mockConsole;
            global.console.error=mockError;
        });

        it("The chain is shorter than the original chain",()=>{
            originalChain.addBlock(["block-1"]);
            originalChain.addBlock(["block-2"]);
            originalChain.addBlock(["block-3"]);

            newChain.addBlock(["block-2"]);
            newChain.addBlock(["block-3"]);

            originalChain.replaceChain(newChain);

            let result= expect(originalChain.chain).not.toEqual(newChain.chain);
            
        });

        describe("the chain is longer than the original chain", () => {

            it("not a valid chain",()=>{

                originalChain.addBlock(["block-1"]);
                originalChain.addBlock(["block-2"]);
                originalChain.addBlock(["block-3"]);
    
                newChain.addBlock(["block-2"]);
                newChain.addBlock(["block-3"]);
                newChain.addBlock(["block-3"]);
                newChain.addBlock(["block-4"]);
                
                newChain.chain[1]["data"]=["block-32"];
    
                originalChain.replaceChain(newChain);

                expect(originalChain.chain).not.toEqual(newChain.chain);

            });

            it("is a valid chain",()=>{

                originalChain.addBlock(["block-1"]);
                originalChain.addBlock(["block-2"]);
                originalChain.addBlock(["block-3"]);
    
                newChain=originalChain;
                newChain.addBlock(["block-4"]);
                
                originalChain.replaceChain(newChain);

                expect(originalChain.chain).toEqual(newChain.chain);
                

            });
    


        })

    })
})