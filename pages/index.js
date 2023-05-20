import Button from "@/components/Button";
import { useState } from "react";

export default function Beranda() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]); /*pakai array karena bakal nyimpen leih dari satu value*/
  const [edit, setEdit] = useState(false); /*false supaya tombol defaultnya "Add"*/
  const [deadline, setDeadline] = useState("");
  const [done, setDone] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault(); /*biar ga refresh*/

    if (title=="" || desc=="") {
      alert("Judul dan Deskripsi tidak boleh kosong")
      return;
    } //kalau judul dan deskripsi kosong, bakal muncul alert

    // id todos berdasarkan waktu submit (time stamp)
    setTodos([...todos, {id: Date.now(), title, desc, deadline}]) /*ketika submit, akan memanggil fungsi handleSubmit, bakal ngeset todos menjadi todo2 yang sudah ada + todo yang baru yang terdiri atas id utk spesifikasi, title, dan desc*/
    setTitle(""); /*setelah submit supaya kosong*/
    setDesc(""); /*setelah submit supaya kosong*/
    setDeadline(""); /*setelah submit supaya kosong*/

    if(edit){ /*supaya saat disubmit atau diedit, tombolnya jadi "Add" dan ada opsi "Edit" lagi*/
      setEdit(false)
    }
    if(done) {
      setDone(false)
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
    todos.map((todo) => {
      if (todo.id == id) {
        setDone(true)  /*saat tombol "Done?" diklik, maka tombolnya berubah jadi "Done"*/
      }
    })
  }  
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id = id)) /*filter untuk hanya menampilkan data yang idnya ga sama dengan id yang mau dihapus*/
  }

  const handleDeleteAll = () => {
    setTodos([]) /*hapus semua array, karena delete all bakal menghapus semua data*/
  }

  return (
    <>
      <head>
        <title>To-Do App | Grandiv</title>
      </head>

      <div className="flex flex-col items-center justify-center m-[30px]">
        <h1 className="text-[30px] text-center font-bold">To Dos dan Tugas</h1>
        <form onSubmit = {handleSubmit} className="flex flex-col items-start justify-center gap-[14px] mt-[15px]"> {/*pake form biar yg di dalam form bisa disubmit*/}
          <div className="flex flex-row items-start justify-center gap-[47px]">
            <h4 className="text-[20px]">Judul</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px]"
              onChange={(e) => {setTitle(e.target.value)}} 
              value = {title} //saat kita menulis sesuatu maka itu akan masuk ke state title //supaya setelah disubmit value nya jadi kosong
              id = "title"
            />
          </div>
          <div className="flex flex-row items-start justify-center gap-[14px]">
            <h4 className="text-[20px]">Deskripsi</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px]"
            onChange = {(e) => {setDesc(e.target.value)}}
            value = {desc} //saat kita menulis sesuatu maka itu akan masuk ke state desc //supaya setelah disubmit value nya jadi kosong
            id = "desc"
            />
          </div>
          <div className="flex flex-row items-start justify-center gap-[14px]">
            <h4 className="text-[20px]">Deadline</h4>
            <input type="text" className="ring-[2px] ring-inset ring-cyan-500 p-[5px] rounded-lg ml-[33px]"
            onChange = {(e) => {setDeadline(e.target.value)}}
            value = {deadline}
            id = "deadline"
            />
          </div>
          <Button type={edit ? "Edit":"Add"} className="mx-auto mt-[2px]"/> {/*Nambah classname mx-auto dan mt dari clsx*/} {/*boolean edit supaya saat ngedit tombolnya "Edit" bukan "Add"*/}
        </form>

        {/* Ini untuk nampilin hasil submit */}
        {/* pakai mapping karena hasil submitnya lebih dari satu, perlua multiple cards */}
        {todos.map((todo) => (
        <div key={todo.id} className="flex flex-row items-start justify-between w-[500px] bg-slate-300 rounded-xl py-[10px] px-[20px] mt-[15px]">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[20px]">{todo.title}</h1> {/*todo karena mappingnya namanya todo*/}
            <h1 className="text-[16px]">{todo.desc}</h1>
            <h1 className="text-[20px] text-red-600">{todo.deadline}</h1>
          </div>
          <div className="flex flex-row items-start justify-start gap-[10px]">
            {edit ? "" : <Button type="Edit" onClick={()=> handleEdit(todo.id)}/>}
            <Button type="Delete" onClick={()=> handleDelete(todo.id)}/>
            <Button type={done ? "Done" : "Done?"} onClick={()=> handleDone(todo.id)}/>
          </div>
        </div>
        ))}
        {todos.length == 0 ? "" : <Button type="Delete All" onClick={()=> handleDeleteAll()}/>} {/*kalau todosnya kosong (artinya arraynya 0), maka tombol delete all ga muncul, kalau ada isinya, tombol delete all muncul*/}
      </div>
    </>
  )
}