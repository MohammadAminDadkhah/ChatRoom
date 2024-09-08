import {useEffect, useRef, useState} from "react";
import {getUserDetail, getUserMessage, login, sendUserMessage} from "../../api.js";

export default function ChatBox() {
    const [first, setFirst] = useState(0);
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const bottomScroll = useRef(null);

    const getMessage = () => {
        getUserMessage()
            .then(res => setMessages(res.data["chats"]));
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const text = e.target.children[0].value;
        e.target.children[0].value = null;
        sendUserMessage({
            text,
        })
            .then(res => getMessage())
    }

    const userDetails = () => {
        getUserDetail()
            .then(res => setUserId(res.data.id))
    };

    const refreshMessage = () => {
       return  setInterval(() => {
            getMessage();
        }, 2000);
    }

    const scrollHandler = () => {
        bottomScroll.current?.scrollIntoView({ behavior: 'smooth' });
        document.getElementById("scrollBtn").classList.add("hidden");
    }

    const newMessageHandler = (e) => {
        console.log(window.scrollY)
        if ( e.clientY >=  document.getElementById('chat').offsetHeight-150) {
            document.getElementById("scrollBtn").classList.add("hidden");
        }
    }

    useEffect(() => {
        if (first < 2)
           return  setFirst(x => x + 1);

        if (userId !== messages.at(-1).userId) {
            document.getElementById("scrollBtn").classList.remove("hidden");
        } else {
            bottomScroll.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    useEffect(() => {
        const timer = refreshMessage();
        userDetails();
        getMessage();

        return ()=>{
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className="relative basis-4/5 flex flex-col gap-4">
            <button className="hidden absolute bottom-20 right-10 bg-light-primary p-2 text-white rounded opacity-75" onClick={(e) => scrollHandler(e)} id='scrollBtn'>new message</button>
            {messages.length === 0 ? <div className="h-[42rem] w-auto bg-gray-50 rounded-xl flex items-center justify-center">
                <p>There isn't any message</p>
            </div> : <div className="h-[42rem] p-3 bg-gray-50 rounded-xl flex flex-col items-stretch overflow-auto ltr" id="chat" onMouseMove={newMessageHandler}>{
                messages.map((user, index) =>
                    user.userId !== userId ?
                        <p className="bg-gray-500 p-1 px-5 text-white rounded w-fit self-start mb-2" key={index}>{user.text}</p>
                        :
                        <p className="bg-emerald-400 p-1 px-5 rounded text-white w-fit self-end mb-2" key={index}>{user.text}</p>
                )
            }<div ref={bottomScroll}></div></div>}
            <form onSubmit={(e) => sendMessage(e)} className='flex w-full'>
                <input
                    required
                    className="basis-11/12 rounded-s-xl p-2"
                    placeholder="Enter your message"
                    type="text"
                />
                <button className="p-1 bg-light-primary basis-1/12 rounded-e-xl">send</button>
            </form>
        </div>
    );
}