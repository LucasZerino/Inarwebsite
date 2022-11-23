import { postValidation } from "../validations/post.validation";
import { createPost, getAllPosts, getPostByUser, updatePost, deletePost, getUniquePost } from "../repositorys/post.respository";


export const createpost = async ( req, res ) => {
    try{
        await postValidation.validate(req.body);
        const post = await createPost( req.body );
        res.status( 200 ).send( post );
    } catch (e){
        res.status(400).send(e);
    }
};

export const getpost = async ( req, res ) => {
    try{
        const posts = await getAllPosts();
        res.status( 200 ).send( posts );
    }catch (e){
        res.status(400).send(e);
    }	
}

export const getpostUser = async ( req, res ) => {
    try{
        const post = await getPostByUser( Number(req.params.id) );
        res.status( 200 ).send( post );
    }catch (e){
        res.status(400).send(e);
    }
}

export const getPostById = async ( req, res ) => {
    try{
        const post = await getUniquePost( Number(req.params.id) );
        res.status( 200 ).send( post );
    }catch (e){
        res.status(400).send(e);
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await updatePost(Number(req.params.id), req.body);
        res.status(200).send(post);
    } catch (e) {
        res.status(400).send(e);
    }
}

export const removePost = async (req, res) => {
    try {
        await deletePost(Number(req.params.id));
        res.status(200).send({ message: "Post deletado" });
    } catch (e) {
        res.status(400).send(e);
    }
}