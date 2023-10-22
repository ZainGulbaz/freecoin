import { BlockType } from "./types";
export const INITIAL_DIFFICULTY=0;
export const MINE_RATE=1000;

export const genesisBlockData:BlockType={
    timestamp:new Date().getTime(),
    hash:"0x00000000000000",
    lastHash:"",
    data:["genesis-block"],
    difficulty:1,
    nonce:INITIAL_DIFFICULTY
};