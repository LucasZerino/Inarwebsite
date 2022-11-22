import { prisma } from "../services/prisma";

export const createUser = async ( data ) => {
    const user = await prisma.user.create({
        data: {
            ...data
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
    return user;
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
    return users;
}

export const getUniqueUser = async ( id ) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
    return user;
}

export const updateUser = async ( id, data ) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            ...data
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
    return user;
}

export const deleteUser = async ( id ) => {
    const user = await prisma.user.delete({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
        }
    });
    return user;
}