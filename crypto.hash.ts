import {createHash as generateHash} from "crypto";

export default function createHash(...args:any[]){
    const hash= generateHash("sha256");

    hash.update(args.sort().join(" "));

    return hash.digest("hex");

}