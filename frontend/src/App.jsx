
import { useState,useEffect } from "react"
import io from 'socket.io-client'

const socket = io("http://localhost:3000")

const App = () => {

  const[messages, setMessages] = useState('')
  const[chat,setChat] = useState([])
  const[name,setname] = useState('')
  console.log(chat)
  const[showNameAlert, setShowNameAlert] = useState(true);

  console.log(chat)

  const sendChat = (e)=>{
    e.preventDefault()
    console.log(name,messages)
    socket.emit("chat",{name:name, messages:messages})
    setMessages('')
  }

  useEffect(()=>{
    socket.on("join", (name) => {
      console.log(`joined name is ${name}`)
      setChat([...chat, { name: '.', messages: `${name} joined the chat` }]);
    });

    socket.on("chat",(data)=>{
      // console.log(data)
      setChat([...chat,data])
    });

  },[chat])

  const handleSetName = ()=>{
    const enteredName = prompt('Enter your name');
      setname(enteredName);
      setShowNameAlert(false)
      socket.emit("join",enteredName)
  }

  useEffect(()=>{
     if(showNameAlert) {
      handleSetName();
    }
  },[])

  return (
    <div className='text-[#ECECEC] w-full min-h-screen flex justify-center'>
        <form className=" fixed w-full bottom-0 mt-6 px-10 mx-auto w-3/4 text-center" onSubmit={sendChat} action="">
          <div className="flex flex-col gap-2">
            <input type="text" className="p-3 px-5 bg-[#212121] border w-full text-white rounded-[10px]" name='chat' placeholder='write a message ...' value={messages} onChange={(e)=>setMessages(e.target.value)} />
            <span className="mb-2 text-[12px]">create room by clicking on this <button className="text-green-500 cursor-pointer text-[13px] underline italic"> createRoom</button></span>
          </div>
          {/* <button onSubmit={sendChat} className="w-full py-1 border rounded-[10px] mt-4" type="submit">Send</button> */}
        </form>
        <div className="flex w-[1000px] p-5 px-[200px] flex-col gap-[1px]">
         {
          chat.map((item,index)=>{
            return(
              <div key={index} className="text-white rounded-[10px]">
               <div className="flex flex-row gap-6">
                <span className="italic text-green-500">{item.name.charAt(0).toUpperCase()+item.name.slice(1)} - </span>
                <span>{item.messages}</span>
               </div>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default App