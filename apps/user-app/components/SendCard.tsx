"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransactions } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);

    return <div className="h-[90vh]">
                <div className="text-4xl text-[#6a51a6] pt-8  font-bold">p2p Transactions</div>

        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(Number(value))
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                            await p2pTransactions(number, amount)
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}