import { postValidation } from "../validations/post.validation";
import { createPost, getAllPosts, getPostByUser, updatePost, deletePost } from "../repositorys/post.respository";


export const createpost = async ( req, res ) => {
    try{
        await postValidation.validate(req.body);
        const post = await createPost( req.body );
        res.status( 200 ).send( post );
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