import jwt from 'jsonwebtoken';
import config from'../config/config';
import logging from "../config/logging";
import IUser from "../interfaces/user";

const NAMESPACE = 'Auth';

export function signJWT(user:IUser, callback:(error:Error | null, token:string | null)=>void):void {
    var timeSinchEpoch = new Date().getTime;
    var expirationTime = timeSinchEpoch() + Number(config.server.token.expireTime) * 100000;
    logging.info(NAMESPACE,`Sign token for ${user.username}`)

    try{

    }catch(error){

    }







    }
