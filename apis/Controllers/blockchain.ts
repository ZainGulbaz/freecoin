import { Router } from "express";
import { BlockChainService } from "../Services/blockchain";

const blockchainRouter= Router();
const routePrefix="/blockchain";

const blockchainService= new BlockChainService();

blockchainRouter.get(routePrefix,blockchainService.getBlockChain);


export default blockchainRouter;
