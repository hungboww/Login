import {Request, Response, NextFunction} from 'express';
import logging from "../config/logging";
import {Connect, Query} from "../config/mysql";
import bcryptjs from 'bcryptjs'
import {signJWT} from "../functions/signJWT";
import IUser from "../interfaces/user";
const NAMESPACE = 'User'

const sampleHealthCheck = (req:Request,res:Response, next:NextFunction) =>{
    logging.info(NAMESPACE,`Samples health check route calles`);

    return res.status(200).json({
        message:'pong'
    })

}

export async function getUser(req:Request,res:Response, next:NextFunction){
    logging.info(NAMESPACE,`Samples health check route calles`);
    let query = 'SELECT * FROM  users';
    Connect()
        .then(connection =>{
            Query(connection,query)
                .then(results=>{
                    return res.status(200).json({
                        results
                    })
                })
                .catch(error=>{
            logging.error(NAMESPACE,error.message,error);
            return res.status(500).json({
                message:error.message,error})


        })
                .finally(() =>{connection.end()}

                )
        .catch(error=>{
            logging.error(NAMESPACE,error.message,error);
            return res.status(500).json({
                message:error.message,error})
        })
})}
export function validateToken(req:Request,res:Response, next:Function) {
    logging.info(NAMESPACE,'Token validated')
    return res.status(200).json({
        message:'Authorization'})
}

export  function register(req:Request,res:Response, next:Function){
    let {id,name,password,email} = req.body();
    bcryptjs.hash(password,10,(hashError, hash)=>{
    if(hashError)
    {
        return res.status(500).json({
            message: hashError.message,
            error: hashError
        });

    }
            let query=`INSERT INTO users(id,name,password,email) VALUES ("${id}","${name}","${hash}","email")`;
Connect()
    .then(connection =>{
        Query(connection,query)
            .then((result)=>{
                // @ts-ignore
                logging.info(NAMESPACE,`User ID ${result.insertId} inserted`)
                return res.status(201).json(result)
            })
            .catch((error)=>{
                logging.error(NAMESPACE,error.message,error);
                return res.status(500).json({
                    message:error.message,error})
            });
    })
    .catch(error=>{
        logging.error(NAMESPACE,error.message,error);
        return res.status(500).json({message:error.message,error})
    })
    })
}
export function login(req:Request,res:Response,next:Function){
    let{name, password} = req.body;
    let query = `SELECT * FROM users WHERE name = '${name}'`;
    Connect()
    .then(connection =>{
        Query(connection,query)
            .then((result)=>{
                // @ts-ignore
                logging.info(NAMESPACE,`User ID ${result.insertId} inserted`)
                return res.status(201).json(result)
            })
            .catch((error)=>{
                logging.error(NAMESPACE,error.message,error);
                return res.status(500).json({
                    message:error.message,error})
            });
    })
    .catch(error=>{
        logging.error(NAMESPACE,error.message,error);
        return res.status(500).json({message:error.message,error})
    })
}

