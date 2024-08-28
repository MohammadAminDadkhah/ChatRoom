import {useParams} from "react-router-dom";

export default function ChatBox() {
    const {userId} = useParams();

    const sendMessage = (e) => {
        e.preventDefault();

    }

    return (
        <div className="basis-4/5 flex flex-col gap-4">
            <h1>All Chats</h1>
            <div className="py-48 bg-gray-50 rounded-xl">chats</div>
            <form onSubmit={sendMessage} className='flex w-full'>
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