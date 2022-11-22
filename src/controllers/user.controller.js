import bcrypy from 'bcrypt'
import { userValidation } from '../validations/user.validation';
import { createUser, getAllUsers, getUniqueUser, updateUser, deleteUser } from "../repositorys/user.respository";


export const create = async ( req, res ) => {
    try{
        await userValidation.validate(req.body);
        const hashPassword = req.body.password;
        req.body.password = hashPassword;
        const user = await createUser( req.body );
        res.status( 200 ).send( user );
    } catch (e){
        res.status(400).send(e);
    }
};

export const getusers = async ( req, res ) => {
    try{
        const users = await getAllUsers();
        res.status( 200 ).send( users );
    }catch (e){
        res.status(400).send(e);
    }	
}

export const getuserById = async ( req, res ) => {
    try{
        const user = await getUniqueUser( Number(req.params.id) );
        res.status( 200 ).send( user );
    }catch (e){
        res.status(400).send(e);
    }
}

export const updateUsr = async (req, res) => {
    try {
        const user = await updateUser(Number(req.params.id), req.body);
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const removeUsr = async (req, res) => {
    try {
        await deleteUser(Number(req.params.id));
        res.status(200).send({ message: "Usuário deletado" });
    } catch (e) {
        res.status(400).send(e);
    }
}