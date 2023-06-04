import { useState } from "react";
// import { getTED } from "../helpers/calc";
export default function LastRow({obj}) {
    const {
        amount, comision, cuote, amortizacion,
        interest
    } = obj;   
    //const ted = getTED(Number(tea));
    return (
        <tr>
            <td colSpan={3} className="px-4 py-2 border-b border-gray-200">Total</td>            
            <td className="px-4 py-2 border-b border-gray-200">{Number(amortizacion).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(interest).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(comision).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Number(cuote).toFixed(2)}</td>
            <td className="px-4 py-2 border-b border-gray-200">{Math.abs(Number(amount)).toFixed(2)}</td>
        </tr>  
    );
}