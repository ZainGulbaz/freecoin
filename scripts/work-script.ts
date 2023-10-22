import Block from "../block";
import { BlockChain } from "../blockchain";

let blockchain = new BlockChain();
let average:number[]=[];

for (let i=0; i<1000 ;i ++)
{
     const prevBlock=blockchain.chain.slice(-1)[0];
     const prevTimestamp=prevBlock.timestamp;

     blockchain.addBlock([`data ${i}`]);

     const nextBlock=blockchain.chain.slice(-1)[0];
     const nextTimestamp=nextBlock.timestamp;

     average.push(nextTimestamp-prevTimestamp);

     console.log(average.reduce((total,element)=>total+element)/(average.length),Block.difficulty,nextTimestamp-prevTimestamp);
}

export {};