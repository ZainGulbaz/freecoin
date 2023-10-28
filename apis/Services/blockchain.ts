import { Response,Request } from "express";
import { CustomResponse } from "../utils/interfaces";
import zaynocoin from "../inititatechain";
import { Strings } from "../Strings";
import { STATUS_CODES } from "../utils/constants";

export class BlockChainService {

     getBlockChain(req:Request,res:Response){
        let responseJSON:CustomResponse={
            data:{},
            message:[],
            statusCode:400
        }
        try{
        let blockchain= zaynocoin.chain;
        responseJSON.data={
            blockchain
        }
        responseJSON.message.push(Strings.blockchain.success_get);
        responseJSON.statusCode=STATUS_CODES.ok;
        
    }
    catch(err){
          responseJSON.message.push(Strings.blockchain.error_get);
          responseJSON.statusCode=STATUS_CODES.bad_request;
    }
    finally{
        res.status(responseJSON.statusCode).send(responseJSON);
    }
        
     }


}