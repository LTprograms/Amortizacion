export default function Error({children}) {
    return (
        <div className="bg-red-300 text-red-700 border-red-700 text-center w-full border p-3 font-black">
            {children}
        </div>
    );
}