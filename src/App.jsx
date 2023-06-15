import { useState, useEffect } from 'react';
import Input from './components/Input';
import Error from './components/Error';
import Row from './components/Row';
import LastRow from './components/LastRow';
import { getFutureDate, getDaysDifference, getDateFromString } from './helpers/dates';
import { getEDR, getEMR } from "./helpers/calc";

function App() {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [tea, setTea] = useState('');
  const [period, setPeriod] = useState(''); 
  const [comision, setComision] = useState(''); 
  const [payDay, setPayDay] = useState('');
  const [obj, setObj] = useState({});
  const [isError, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const [objArray, setObjArray] = useState([]);
  const [totalObj, setTotalObj] = useState({});

  /**
   * submit event handler,
   * sets the object state,
   * obj = {amount, date, tea, period}
   * @param {Event} e 
   */
  const handleSubmit = e => {
    e.preventDefault();
    if ([amount, date, tea, period, comision, payDay].includes('')) {
      setError(true);
      setMsgError("Fill all gaps");
      setObjArray([]);
      return;
    }
    if (Number(payDay)<1 || Number(payDay)>31) {
      setError(true);
      setMsgError("Pay days must be between 1 to 31");
      setObjArray([]);
      return;
    }
    setObjArray([]);
    setObj({amount, date, tea, period, comision, payDay});  
    const x = [];
    // INCREASE DAY IN DATE
    const auxDate = new Date(date);
    auxDate.setDate(Number(payDay));
    const total = {amortizacion:0, interest:0, comision:Number(comision)*Number(period),
    cuote:0};
    // sets all array elements
    for (let i = 0; i < period; i++) {
      const aux = {};
      Object.assign(aux, obj);    
      aux.comision = comision;
      aux.date = getFutureDate(i==0 ? auxDate : x[i-1].obj.date, 1);
      aux.days = getDaysDifference(i==0?getDateFromString(date):x[i-1].obj.date, aux.date);
      aux.fsa = getDaysDifference(getDateFromString(date), getFutureDate(auxDate, period));
      aux.ted = getEDR(Number(tea));
      aux.cuote = (Number(amount))*(Math.pow((1+getEMR(Number(tea))), Number(period))) * (getEMR(Number(tea))) / ((Math.pow((1+getEMR(Number(tea))), Number(period))) - 1) + Number(comision);
      aux.amount = i==0?Number(amount):(x[i-1].obj.amount - x[i-1].obj.amortizacion);
      aux.interest = Number(aux.amount) * getEMR(Number(tea));
      // aux.interest = Number(aux.amount) * (Math.pow((1 + Number(tea)/100), Number(period)/360)-1);
      aux.amortizacion = aux.cuote - aux.interest - Number(comision);
      total.amortizacion += aux.amortizacion;
      total.interest += aux.interest;
      total.cuote += aux.cuote;
      x.push({key:i, obj:aux});        
    }
    total.amount = x[x.length-1].obj.amount - x[x.length-1].obj.amortizacion;
    setObjArray(x);  
    setTotalObj(total);
    setError(false);
  } 
  useEffect(()=>{
    setError(false);
  }, [])

  return (
    <div className='lg:flex'>
      {/** inputs */}
      <div className='bg-blue-500 md:w-full lg:w-1/3 p-5'> 
        {/** titles */}
        <p className='text-white font-black text-3xl text-center'>
          Amortization Table
        </p>  
        <form action="" className='p-5'
        onSubmit={handleSubmit}>

          <Input type="text" id="amount"
          placeholder="Requested amount"
          lb="Loan" 
          val={amount}
          setter={setAmount}
          />

          <Input type="date" id="date"
          lb="Date" 
          val={date}
          setter={setDate}
          />
          
          <Input type="text" id="rate"
          lb="EAR" 
          placeholder="Effective Anual Rate"
          val={tea}
          setter={setTea}
          />

          <Input type="text" id="period"
          lb="Period" 
          placeholder="Total duration of the mounth"
          val={period}
          setter={setPeriod}
          />

          <Input type="text" id="comision"
          lb="Comissions" 
          placeholder="Comissions"
          val={comision}
          setter={setComision}
          />
          
          <Input type="text" id="payDay"
          lb="Pay day" 
          placeholder="Pay day"
          val={payDay}
          setter={setPayDay}
          />

          <input type="submit" value="Calculate" 
          className='w-full bg-green-900 hover:bg-green-950 text-white font-black text-xl p-2 cursor-pointer transition-all rounded-md'          
          />
        </form>        
        {isError && <Error>{msgError}</Error>}
      </div>

      {/** table */}
      <div className="md:w-full lg:w-2/3 p-10">
        <table className="table-auto w-full border-collapse text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Period</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Due Date</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Days</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Amortization</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Interest</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Comissions</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Cuote</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Balance</th>
            </tr>
          </thead>
          <tbody>
            {objArray.map((ob) => {
              if (Object.keys(ob.obj).length != 0) {
                return <Row obj={ob.obj} index={ob.key+1} key={ob.key}/>;
              }  
              return <></>
            })}
            {objArray.length>0 && 
            <LastRow obj={totalObj}/>}                               
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
