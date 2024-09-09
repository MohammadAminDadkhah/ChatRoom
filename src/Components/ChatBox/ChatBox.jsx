import {useEffect, useRef, useState} from "react";
import {getUserDetail, getUserMessage, login, sendUserMessage} from "../../api.js";
import Delete from "./SVG/Delete.jsx";

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
    
    const deleteHandler = (messageId, messageSenderId) => {
        console.log(messageId, messageSenderId);
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
            </div> : <div className="h-[42rem] p-3 bg-gray-50 rounded-xl flex flex-col items-stretch overflow-auto ltr" id="chat">{
                messages.map((message, index) =>
                    message.userId !== userId ?
                        <div className="relative group bg-gray-500 p-1 px-5 text-white rounded w-fit self-start mb-2 items-stretch">
                            <p key={index}>{message.text}</p>
                            <div className="text-[.67rem] flex gap-1 w-full mt-1 justify-end">
                                <p>{message.user.name}</p>
                                <p>{`${new Date(message.created_at).getHours()}:${new Date(message.created_at).getMinutes()}`}</p>
                            </div>

                        </div>
                        :
                        <div className="group relative bg-emerald-400 p-1 px-5 rounded text-white w-fit self-end mb-2">
                            <p key={index}>{message.text}</p>
                            <div className="text-[.67rem] flex gap-1 w-full mt-1 justify-end" key={index}>
                                <p>{message.user.name}</p>
                                <p>{`${new Date(message.created_at).getHours()}:${new Date(message.created_at).getMinutes()}`}</p>
                                <button className="absolute -left-3 bottom-3 bg-red-700 rounded group-hover:p-1" key={index} onClick={() => deleteHandler(message.id, message.user.id)}>
                                    <Delete classes={'group-hover:block'}/>
                                </button>
                            </div>
                        </div>
                )
            }
                <div ref={bottomScroll}></div>
            </div>}
            <form onSubmit={(e) => sendMessage(e)} className='flex w-full'>
                <input
                    required
                    className="basis-11/12 rounded-s-xl p-2"
                    placeholder="Enter your message"
                    type="text"
                />
                <button className="p-1 bg-light-primary basis-1/12 rounded-e-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                        <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.55}>
                            <path strokeDasharray="2 4" strokeDashoffset={6} d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9">
                                <animate attributeName="stroke-dashoffset" dur="1.8s" repeatCount="indefinite" values="6;0"></animate>
                            </path>
                            <path strokeDasharray={32} strokeDashoffset={32} d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="1.2s" values="32;0"></animate>
                            </path>
                            <path strokeDasharray={10} strokeDashoffset={10} d="M12 8v7.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="1.5s" dur="0.6s" values="10;0"></animate>
                            </path>
                            <path strokeDasharray={6} strokeDashoffset={6} d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5">
                                <animate fill="freeze" attributeName="stroke-dashoffset" begin="2.1s" dur="0.6s" values="6;0"></animate>
                            </path>
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    );
}