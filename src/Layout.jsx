import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import ChatBox from "./Components/ChatBox/ChatBox.jsx";

export default function Layout() {
    return (
        <div className="container flex bg-gray-300 p-3 rounded-xl shadow-lg mx-auto mt-4">
            <Sidebar />
            <ChatBox />
        </div>
    );
}