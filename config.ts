import { BlockType } from "./types";

export const genesisBlockData:BlockType={
    timestamp:new Date().getTime(),
    hash:"0x00000000000000",
    lastHash:"",
    data:[] 
};