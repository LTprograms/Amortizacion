import { useState } from "react";
// import { getTED } from "../helpers/calc";
export default function Row({obj, index}) {
    const {
        amount, date, comision,
        days, cuote, amortizacion,
        interest
    } = obj;   
    //const ted = getTED(Number(tea));
    return (
        <tr>
            <td className="px-4 py-2 border-b border-gray-200">{index}</td>
            <td className="px-4 py-2 border-b border-gray-200">{date.toLocaleDateString()}</td>
            <td className="px-4 py-2 border-b border-gray-200">{days}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(amortizacion).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(interest).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(comision).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(cuote).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(amount).toFixed(2)}</td>
        </tr>  
    );
}