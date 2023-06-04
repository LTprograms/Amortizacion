import { useState, useEffect } from 'react';
import Input from './components/Input';
import Error from './components/Error';
import Row from './components/Row';
import LastRow from './components/LastRow';
import { getFutureDate, getDaysDifference, getDateFromString } from './helpers/dates';
import { getTED, getTEM } from "./helpers/calc";

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
      setMsgError("LLenar todos los campos");
      setObjArray([]);
      return;
    }
    if (Number(payDay)<1 || Number(payDay)>31) {
      setError(true);
      setMsgError("Dias de pago entre 1 y 31");
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
      aux.ted = getTED(Number(tea));
      aux.cuote = (Number(amount))*(Math.pow((1+getTEM(Number(tea))), Number(period))) * (getTEM(Number(tea))) / ((Math.pow((1+getTEM(Number(tea))), Number(period))) - 1) + Number(comision);
      aux.amount = i==0?Number(amount):(x[i-1].obj.amount - x[i-1].obj.amortizacion);
      aux.interest = Number(aux.amount) * getTEM(Number(tea));
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

  return (
    <div className='lg:flex'>
      {/** inputs */}
      <div className='bg-blue-500 md:w-full lg:w-1/3 p-5'> 
        {/** titles */}
        <p className='text-white font-black text-3xl text-center'>
          Tabla de Amortización
        </p>  
        <form action="" className='p-5'
        onSubmit={handleSubmit}>

          <Input type="text" id="amount"
          placeholder="Importe a solicitar"
          lb="Préstamo" 
          val={amount}
          setter={setAmount}
          />

          <Input type="date" id="date"
          lb="Fecha" 
          val={date}
          setter={setDate}
          />
          
          <Input type="text" id="rate"
          lb="TEA" 
          placeholder="Tasa Efectiva Anual"
          val={tea}
          setter={setTea}
          />

          <Input type="text" id="period"
          lb="Periodo" 
          placeholder="Duración total en meses"
          val={period}
          setter={setPeriod}
          />

          <Input type="text" id="comision"
          lb="Comisiones" 
          placeholder="Comisiones"
          val={comision}
          setter={setComision}
          />
          
          <Input type="text" id="payDay"
          lb="Día de pago" 
          placeholder="Días de pago"
          val={payDay}
          setter={setPayDay}
          />

          <input type="submit" value="Calcular" 
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
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Periodo</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Vencimiento</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Dias</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Amortizacion</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Interés</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Comisiones</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Cuota</th>
              <th className="px-4 py-2 bg-gray-200 text-gray-700">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {objArray.map((ob) => {
              if (Object.keys(ob.obj).length != 0) {
                return <Row obj={ob.obj} index={ob.key+1} key={ob.key}/>;
              }  
              return <></>
            })}
            {!isError && 
            <LastRow obj={totalObj}/>}                               
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
