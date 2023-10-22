import {createHash as generateHash} from "crypto";
var hexToBinary = require('hex-to-binary');

export default function createHash(...args:any[]){
    const hash= generateHash("sha256");

    hash.update(args.sort().join(" "));
    
    let finalHash=hash.digest("hex")

    return hexToBinary(finalHash);

}