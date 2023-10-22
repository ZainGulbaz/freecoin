import { MINE_RATE, genesisBlockData ,INITIAL_DIFFICULTY} from "./config";
import { BlockType } from "./types";
import createHash from "./crypto.hash";

class Block{

    timestamp:number;
    data:string[];
    hash:string;
    lastHash:string;
    nonce:number;
    static difficulty=INITIAL_DIFFICULTY;
    

    constructor({timestamp,  data, hash, lastHash,nonce}:BlockType)
    { 
        this.timestamp=timestamp;
        this.data=data;
        this.hash=hash;
        this.lastHash=lastHash; 
        this.nonce=nonce;
    }
    
    static genesis(){
        return new this(genesisBlockData);
    }
    static mineBlock(prevBlock:Block,data:BlockType["data"]):Block{
       
       let nonce=0, minedBlock:Block;
       do{
         minedBlock= new this({timestamp:Date.now(),hash:createHash(data,prevBlock.hash,nonce,Date.now()),lastHash:prevBlock.hash,data,nonce});
         nonce++;
       }
       while(minedBlock.hash.substring(0,this.difficulty)!=="0".repeat(this.difficulty));
       
       this.adjustDifficulty(minedBlock,prevBlock);

       return minedBlock;
    }

    static adjustDifficulty(currBlock:Block,prevBlock:Block){
        if(currBlock.timestamp-prevBlock.timestamp> MINE_RATE)this.difficulty-=1;
        else if(currBlock.timestamp-prevBlock.timestamp < MINE_RATE) this.difficulty+=1;
        
        if(this.difficulty==0) this.difficulty=1;
    }
}

export default Block;