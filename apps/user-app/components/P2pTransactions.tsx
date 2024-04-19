import { Card } from "@repo/ui/card"

export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        toUserId: number
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent p2pTransactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent p2p Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                    + Rs {t.amount / 100}
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.toUserId}
                    </div>  
                </div>

            </div>)}
        </div>
    </Card>
}