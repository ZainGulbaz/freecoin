import Block from "./block";
import { MINE_RATE, genesisBlockData } from "./config";


describe("Block",()=>{

    let timestamp:number=Date.now();
    let hash:string="a-hash";
    let lastHash:string="last hash";
    let data:string[]=["hash1","hash2"];
    const block= new Block({timestamp,data,lastHash,hash,nonce:0});

    beforeEach(()=>{
        Block.difficulty=2;
    })

    it("Block has a timestamp,hash,lastHash and data",()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.data).toEqual(data);
        expect(block.hash).toEqual(hash);
        expect(block.lastHash).toEqual(lastHash);
    })
    
    describe("Genesis Block",()=>{

        it("Genesis block is instance of Block",()=>{
        expect(Block.genesis() instanceof Block).toBeTruthy();
       });

       it("Genesis is a valid block",()=>{
        expect(Block.genesis()).toEqual(new Block(genesisBlockData));
       })
    });

    describe("Mined Block",()=>{

        const prevBlock=Block.genesis();
        const difficulty=Block.difficulty;
        const minedBlock=Block.mineBlock(prevBlock,data);
        
        it("Mined Block is a valid Block",()=>{
            expect(minedBlock instanceof Block).toBeTruthy();
        })
                 
        it("Mined Block has hash of prev Block",()=>{
            expect(prevBlock.hash).toEqual(minedBlock.lastHash);
        });

        it("Mined Block has timestamp",()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it("Mined block has valid hash",()=>{
    
            expect(minedBlock.hash.substring(0,difficulty)).toEqual("0".repeat(difficulty));
        });

        it("Mined block has valid nonce value",()=>{
            expect(minedBlock.nonce).toBeGreaterThan(-1);
        });

        describe("Mined block has a valid difficulty value",()=>{

            it("takes more time to mine than mine rate",()=>{

                const prevDifficultyLevel=Block.difficulty;
                const prevBlock=Block.genesis();
                prevBlock.timestamp=prevBlock.timestamp-2000;
                Block.mineBlock(prevBlock,["new-data"]);
                const presentDifficultyLevel=Block.difficulty;
                
                expect(presentDifficultyLevel).toBeLessThan(prevDifficultyLevel);

            });

            it("takes less time to mine",()=>{

                const prevDifficultyLevel=Block.difficulty;
                const prevBlock=Block.genesis();
                prevBlock.timestamp=prevBlock.timestamp+2000;
                Block.mineBlock(prevBlock,["new-data"]);
                const presentDifficultyLevel=Block.difficulty;
                
                expect(presentDifficultyLevel).toBeGreaterThan(prevDifficultyLevel);

            })
            
                
            

        });
    })

    describe("adjustDifficulty",()=>{

        it("lowers the difficulty",()=>{

            let genesisBlock={...Block.genesis()};
            let newBlock=Block.mineBlock(genesisBlock,["data-1"]);
        
            let prevDifficulty=Block.difficulty;
            genesisBlock.timestamp=genesisBlock.timestamp-2000;

            Block.adjustDifficulty(newBlock,genesisBlock);

            let newDifficulty=Block.difficulty;
            expect(newDifficulty).toBeLessThan(prevDifficulty); 

        });

        it("it increases the difficulty",()=>{

            let genesisBlock={...Block.genesis()};
            let newBlock=Block.mineBlock(genesisBlock,["data-1"]);

            let prevDifficulty=Block.difficulty;
            genesisBlock.timestamp=genesisBlock.timestamp+2000;

            Block.adjustDifficulty(newBlock,genesisBlock);

            let newDifficulty=Block.difficulty;

            expect(newDifficulty).toBeGreaterThan(prevDifficulty); 

        });

    });
})


export {}