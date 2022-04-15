// import jwt from 'jsonwebtoken';
import config from'../config/config';
import logging from "../config/logging";
import {IUser} from "../interfaces/user";
const jwt = require('jsonwebtoken')
const NAMESPACE = 'Auth';

export function signJWT(users:IUser, callback:(error:Error | null, token:string | null)=>void):void {
    //the floor() function rounds a number down and returns an integer
    var timeSinchEpoch = new Date();
    var timeSet = timeSinchEpoch.getTime.bind(timeSinchEpoch)
    var expirationTime = timeSet() + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    logging.info(NAMESPACE,`Sign token for ${users.name}`)

try {
        jwt.sign(
            {
                name: users.name
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error?:any, token?:any) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                                        console.log("test1")

                    callback(null, token);
                }
            }
        );
    } catch (error) {
       logging.error(NAMESPACE,`error`)
    }
};

// export default signJWT;
