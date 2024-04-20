import { getServerSession } from "next-auth";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Center } from "@repo/ui/center";

async function getP2pTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });
    return txns.map((t: any) => ({
        time: t.timestamp,
        amount: t.amount,
        toUserId: t.toUserId
    }));

}

export default async function () {

    const transactions = await getP2pTransactions();

    return <div className="w-full">
        <div className="h-[90vh] flex flex-col gap-4">
            <div className="text-4xl text-[#6a51a6] pt-8  font-bold">p2p Transactions</div>
            <Center>
           <div className="flex gap-4">
           <div>
                <SendCard />
            </div>
            <div>
                <P2pTransactions transactions={transactions} />
            </div>
           </div>
           </Center>
        </div>
    </div>
}   