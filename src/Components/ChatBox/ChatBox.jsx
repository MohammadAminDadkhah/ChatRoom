import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserMessage, login, sendUserMessage} from "../../api.js";

export default function ChatBox() {
    const { userId } = useParams();

    const [messages, setMessages] = useState([]);

    const getMessage = () => {
            getUserMessage()
                .then(res => setMessages(res.data.chats));
    }

    const sendMessage = (e) => {
        e.preventDefault();
        const text = e.target.children[0].value;
        sendUserMessage({
            userId,
            text,
        })
    }

    useEffect(() => {
        getMessage();
    }, []);

    return (
        <div className="basis-4/5 flex flex-col gap-4">
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
            <div className="py-48 bg-gray-50 rounded-xl">chats</div>
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