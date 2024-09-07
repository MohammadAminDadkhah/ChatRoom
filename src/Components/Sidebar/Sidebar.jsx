import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserDetail, onlineUser} from "../../api.js";

export default function Sidebar() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);

    const getOnlineUser = () => {
        onlineUser()
            .then(res => setUsers(res.data.filter(user => user.id !== userId)))
            .catch(res => {});
    }

    const userDetails = () => {
        getUserDetail()
            .then(res => setUserId(res.data.id))
    };

    useEffect(() => {
        const timer = checkOnlineUser();
        userDetails();
        getOnlineUser();

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const checkOnlineUser = () => {
        return  setInterval(() => {
            getOnlineUser();
            clearInterval(interval);
        }, 30000);
    }

    return (
        <div className="container basis-1/5">
            <h1>
                <i className="text-black ti ti-wifi"></i>
                Online User
            </h1>

            <ul className="mt-1">
                {users.length !== 0 ? users.map((user) => <li key={user.id}>{user.id !== userId ? user.name : null}</li>) : <p className="text-gray-500">No one is online...</p>}
            </ul>
        </div>
    );
}