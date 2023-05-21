import Button from "@/components/Button";
import { useState } from "react";

export default function Beranda() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]); /*pakai array karena bakal nyimpen leih dari satu value*/
  const [edit, setEdit] = useState(false); /*false supaya tombol defaultnya "Add"*/
  const [deadline, setDeadline] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault(); /*biar ga refresh*/

    if (title=="" || desc=="") {
      alert("Judul dan Deskripsi tidak boleh kosong")
      return;
    } //kalau judul dan deskripsi kosong, bakal muncul alert

    // id todos berdasarkan waktu submit (time stamp)
    setTodos([...todos, {id: Date.now(), title, desc, deadline, done: false}]) /*ketika submit, akan memanggil fungsi handleSubmit, bakal ngeset todos menjadi todo2 yang sudah ada + todo yang baru yang terdiri atas id utk spesifikasi, title, dan desc*/
    setTitle(""); /*setelah submit supaya kosong*/
    setDesc(""); /*setelah submit supaya kosong*/
    setDeadline(""); /*setelah submit supaya kosong*/
    

    if(edit){ /*supaya saat disubmit atau diedit, tombolnya jadi "Add" dan ada opsi "Edit" lagi*/
      setEdit(false)
    }
  };

  const handleEdit = (id) => { /*pembedanya berdasarkan id, jadi id untuk nentuin id mana yang mau diedit*/
    setEdit(true) /*saat diedit tombolnya berubah jadi "Edit"*/
    todos.map((todo) => {
      if (todo.id == id) {
        setTitle(todo.title) /*saat suatu id diedit, maka id tersebut akan dipindah ke value input text, jadi bisa diedit*/
        setDesc(todo.desc) /*saat suatu id diedit, maka id tersebut akan dipindah ke value input text, jadi bisa diedit*/
        setDeadline(todo.deadline) /*saat suatu id diedit, maka id tersebut akan dipindah ke value input text, jadi bisa diedit*/
        setTodos(todos.filter((todo) => todo.id != id)) /*filter untuk menampilkan data yang idnya ga sama dengan id yang mau diedit*/
      }
    })
  }

  const handleDone = (id) => {
      setTodos(
        todos.map((todo) => {
          if(todo.id == id) {
            return {...todo, done: !todo.done};
          }
          return todo;
        })
      );
    };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id != id)) /*filter untuk hanya menampilkan data yang idnya ga sama dengan id yang mau dihapus*/
  } 

  const handleDeleteAll = () => {
    setTodos([]) /*hapus semua array, karena delete all bakal menghapus semua data*/
  }

  return (
    <>
      <head>
        <title>To-Do App | Grandiv</title>
      </head>

      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900">
        <h1 className="text-[30px] text-center font-bold text-sky-900 w-[500px] bg-gradient-to-r from-sky-500 via-teal-150 to-sky-500 rounded-xl" >To Dos dan Tugas</h1>
        <form onSubmit = {handleSubmit} className="flex flex-col text-center mb-5 w-[500px] items-start justify-center grid justify-items-stretch bg-cover bg-gradient-to-r from-sky-500 via-sky-400 to-sky-500 rounded-xl gap-[14px] mt-[15px]"> {/*pake form biar yg di dalam form bisa disubmit*/}
          <div className="flex flex-row items-start justify-center gap-[97px]">
            <h4 className="text-[20px] my-3 text-sky-900 font-bold">Judul</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px] my-3"
              onChange={(e) => {setTitle(e.target.value)}} 
              value = {title} //saat kita menulis sesuatu maka itu akan masuk ke state title //supaya setelah disubmit value nya jadi kosong
              id = "title"
            />
          </div>
          <div className="flex flex-row items-start justify-center gap-[62px]">
            <h4 className="text-[20px] my-2 text-sky-900 font-bold">Deskripsi</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px] my-2"
            onChange = {(e) => {setDesc(e.target.value)}}
            value = {desc} //saat kita menulis sesuatu maka itu akan masuk ke state desc //supaya setelah disubmit value nya jadi kosong
            id = "desc"
            />
          </div>
          <div className="flex flex-row items-start justify-center gap-[64px]">
            <h4 className="text-[20px] my-2 text-sky-900 font-bold">Deadline</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px] my-2"
            onChange = {(e) => {setDeadline(e.target.value)}}
            value = {deadline}
            id = "deadline"
            />
          </div>
          <Button type={edit ? "Edit":"Add"} className="mx-auto mt-[2px] my-3"/> {/*Nambah classname mx-auto dan mt dari clsx*/} {/*boolean edit supaya saat ngedit tombolnya "Edit" bukan "Add"*/}
        </form>

        {/* Ini untuk nampilin hasil submit */}
        {/* pakai mapping karena hasil submitnya lebih dari satu, perlua multiple cards */}
        {todos.map((todo) => (
        <div key={todo.id} className="flex flex-row items-start justify-between w-[500px] mb-3 bg-sky-300 rounded-xl py-[10px] px-[20px] mt-[15px]">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[20px]">{todo.title}</h1> {/*todo karena mappingnya namanya todo*/}
            <h1 className="text-[16px]">{todo.desc}</h1>
            <h1 className="text-[20px] text-sky-900 font-bold">{todo.deadline}</h1>
          </div> 
          <div className="flex flex-row items-start justify-start gap-[10px]">
            {edit ? "" : <Button type="Edit" onClick={()=> handleEdit(todo.id)}/>}
            <Button type="Delete" onClick={()=> handleDelete(todo.id)}/>                
            <Button type={todo.done ? "Done" : "Done?"} onClick={()=> handleDone(todo.id)}/> {/*kalau todo.done true, maka tombolnya jadi "Done", kalau false, tombolnya jadi "Done?"*/}          
          </div>
        </div>
        ))}
        {todos.length == 0 ? "" : <Button type="Delete All" className="mx-auto mt-[2px] mb-3" onClick={()=> handleDeleteAll()}/>} {/*kalau todosnya kosong (artinya arraynya 0), maka tombol delete all ga muncul, kalau ada isinya, tombol delete all muncul*/}
      </div>
    </>
  )
}