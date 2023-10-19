import { genesisBlockData } from "./config";
import { BlockType } from "./types";
import createHash from "./crypto.hash";



class Block{
    timestamp:number;
    data:string[];
    hash:string;
    lastHash:string;

    constructor({timestamp,  data, hash, lastHash}:BlockType)
    { 
        this.timestamp=timestamp;
        this.data=data;
        this.hash=hash;
        this.lastHash=lastHash;
    }
    
    static genesis(){
        return new this(genesisBlockData);
    }
    static mineBlock(prevBlock:Block,data:BlockType["data"]):Block{
        return new this({timestamp:Date.now(),hash:createHash(data,prevBlock.hash),lastHash:prevBlock.hash,data})
    }
}



export default Block;