export default function Input({
    type, id, lb, placeholder, setter, val
}) {    
    return (
        <div className="mb-4">
            <label htmlFor={id}
            className="block pb-1 mb-1 text-xl border-b-2 text-white border-b-white"
            >
                {lb}:
            </label>
            <input type={type} 
            placeholder={placeholder}
            id={id}
            className="px-2 py-1 rounded-md w-full text-xl outline-blue-200"
            onChange={e => {                
                setter(e.target.value)
            }}
            value={val}
            /> 
        </div>
    );
}