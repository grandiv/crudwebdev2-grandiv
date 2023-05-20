// Button dibuat component karena bakal dipakai berulang kali di page utama
// clsx adalah library untuk membuat class lebih fleksibel, bisa menggabungkan class

import clsx from 'clsx';
// di dalam btnType diberi default typenya yaitu Add, kalau mau ganti tinggal diubah aja
export default function Button({type="Add", className, onClick = () => {}}){ // Kasih parameter className supaya bisa ngasih className lain selain yang ada di fungsi btnType
    const btnType = (type) => {
        if (type == "Add")
            return "bg-blue-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-blue-500 active:bg-blue-600 px-[14px] py-[5px]";
        if (type == "Edit")
            return "bg-yellow-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-yellow-500 active:bg-yellow-600 px-[14px] py-[5px]";
        if (type == "Done?")
            return "bg-gray-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-gray-500 active:bg-gray-600 px-[14px] py-[5px]";
        if (type == "Done")
            return "bg-green-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-green-500 active:bg-green-600 px-[14px] py-[5px]";
        if (type == "Delete")
            return "bg-red-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-red-500 active:bg-red-600 px-[14px] py-[5px]";
        if (type == "Delete All")
            return "bg-red-400 rounded-lg transition-all ease-in-out duration-300 hover:bg-red-500 active:bg-red-600 px-[14px] py-[5px] mt-[15px]";
    }

    return (
        <>
            <button className={clsx(btnType(type), className)} onClick={onClick}> {/* untuk memanggil fungsi*/}
                {type}
            </button>
        </>
    )
}