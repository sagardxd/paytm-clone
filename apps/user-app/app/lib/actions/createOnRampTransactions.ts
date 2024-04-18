"use server";

import  {getServerSession} from 'next-auth';
import { authOptions } from '../auth';
import prisma from '@repo/db/client';

export async function createOnRampTransactions(provider: string, amount: number) {

    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user.id) {
        return {
            message: "Unauthorized user"
        }}

        //onramp db query
        const token = (Math.random() *1000).toString();
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                token: token,
                amount: amount * 100, 
                startTime: new Date(),
                userId: Number(session?.user?.id)
            }
        });

        return {
            message: "done"
        }
    }
