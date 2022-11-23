import { prisma } from "../services/prisma";

export const createPost = async ( data ) => {
    const post = await prisma.post.create({
        data: {
            ...data
        },
    });
    return post;
}

export const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        
    });
    return posts;
}

export const getPostByUser = async ( id ) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: id,
        }
    })
    return posts;
}

export const getUniquePost = async ( id ) => {
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
    });
    return post;
}

export const updatePost = async ( id, data ) => {
    const post = await prisma.post.update({
        where: {
            id,
        },
        data: {
            ...data
        },
    });
    return post;
}

export const deletePost = async ( id ) => {
    const post = await prisma.post.delete({
        where: {
            id,
        },
    });
    return post;
}