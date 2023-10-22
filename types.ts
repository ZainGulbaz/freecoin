export type BlockType = {
 readonly timestamp: number;
  readonly data: string[];
  readonly hash: string;
  readonly lastHash: string;
  readonly nonce:number;
  readonly difficulty?:number;
};

export type BlockDifficulty={
  [key:BlockType["hash"]]:BlockType["difficulty"]
}
