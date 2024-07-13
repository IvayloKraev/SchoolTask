import {PrismaClient} from "@prisma/client";
import {INewMessage} from "../models/message.model";

export namespace dbHandler {
    let prisma: PrismaClient;

    export function init(){
        prisma = new PrismaClient();
    }

    export async function addMessage(newMessage: INewMessage) {
        return prisma.message.create({
            data: {
                text: newMessage.text,
                authorUsername: newMessage.authorUsername,
                timestamp: (new Date()).toISOString()
            }
        });
    }

    export function getAllMessages(){
        return prisma.message.findMany({
            distinct: "id"
        })
    }
}