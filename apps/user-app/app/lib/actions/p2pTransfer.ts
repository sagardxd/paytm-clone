"use server";

import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';

export async function p2pTransactions(number: string, amount: number) : Promise<any>{

    const session = await getServerSession(authOptions);
    const from = session.user.id;
    if (!session?.user || !from) {
        return {
            message: "Unauthorized user"
        }
    }




    
    const toUser = await prisma.user.findFirst({
        where: {
            number: number
        }
    });

    // if the user does not exsist
    if (!toUser) {
        return {
            message: "user not found"
        }
    }

    await prisma.$transaction(async (tx) => {

        //locking in db so no two transaction can run together of a simple user
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findFirst({
            where: { userId: Number(from) }
        })

        //checking if from exsists and have balance in their account to update it
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error("Insufficient Balance");
        }

        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } }
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } }
        });

        //udating the p2p table
        await tx.p2pTransfer.create({
            data: {
                amount: amount,
                timestamp: new Date(),
                fromUserId:fromBalance.id,
                toUserId: toUser.id,
            }
        })
    })

}
