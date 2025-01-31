"use client"

import {useBalance} from '@repo/store/useBalance'
const BalanceCard = () => {
    const balance= useBalance()
    return (
        <div>
            hi there { balance}
        </div>
    );
}

export default BalanceCard;