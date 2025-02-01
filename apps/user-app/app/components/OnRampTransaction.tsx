/* eslint-disable react/jsx-key */
import { Card } from "@repo/ui/card"

export const OnRampTransaction=({
    transactions
}:{
    transactions:{
        time: Date,
        amount:number,
        status:string,
        provider:string
    }[]
})=>{
    if(!transactions.length){
        return <Card title="Recent Transaction">
            <div className="text-center pb-8 pt-8">
            No transactions found 
            </div>
        </Card>
    }return<Card title="Recent Transaction">
        <div className="pt-2">
            {transactions.map(t=><div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Recieved INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    +Rs {t.amount/100}
                </div>
            </div>)}

        </div>
    </Card>
}