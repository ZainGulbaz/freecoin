import Block from "./block";
import createHash from "./crypto.hash";
import { BlockDifficulty, BlockType } from "./types";
import Strings  from "./utils/Strings";

export class  BlockChain{
    chain:Block[];
    blockDifficulty:BlockDifficulty;

    constructor(){
        this.chain=[Block.genesis()];
        this.blockDifficulty={[Block.genesis()["hash"]]:Block.difficulty}        
    }

    addBlock(data:BlockType["data"]){
        const minedBlock= Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(minedBlock);
        this.blockDifficulty[minedBlock.hash]=Block.difficulty;
    }

    isValidChain(){

        if(JSON.stringify(this.chain[0])!==JSON.stringify(Block.genesis())) return false;

        for(let i=1; i<this.chain.length; i++) 
        {
            let currentBlock=this.chain[i];
            let previousBlock=this.chain[i-1];

            const currentDifficulty=this.blockDifficulty[currentBlock.hash] || 0;
            const previousDifficulty=this.blockDifficulty[previousBlock.hash]||0;

            let createdHash=createHash(currentBlock.data,previousBlock.hash);

            if(createdHash!==currentBlock.hash) return false;
            else if(Math.abs(currentDifficulty-previousDifficulty)!==1) return false

        }
        return true;

    }

    replaceChain(newChain:BlockChain)
    {
          if(newChain.chain.length<this.chain.length) {
            console.error(Strings.blockchain.errors.shorter_invalid_chain);
            return;
          };

          if(!newChain.isValidChain()) {
            console.error(Strings.blockchain.errors.invalid_chain);
            return;
          }
          
          this.chain=newChain.chain;

    }

}