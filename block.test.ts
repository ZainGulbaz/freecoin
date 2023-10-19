import Block from "./block";
import { genesisBlockData } from "./config";


describe("Block",()=>{
    let timestamp:number=new Date().getTime();
    let hash:string="a-hash";
    let lastHash:string="last hash";
    let data:string[]=["hash1","hash2"];
    const block= new Block({timestamp,hash,lastHash,data});

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

        it("Mined Block has valid hash",()=>{
            expect(minedBlock.hash).toEqual(Block.mineBlock(prevBlock,data).hash);
        })



       
    })
})


export {}