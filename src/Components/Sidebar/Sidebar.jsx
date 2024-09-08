import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserDetail, logout, onlineUser} from "../../api.js";

export default function Sidebar() {
    const navigate = useNavigate();
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

    const checkOnlineUser = () => {
        return  setInterval(() => {
            getOnlineUser();
        }, 30000);
    }

    const logoutHandler = () => {
        logout()
            .then(res => navigate('/'));
    }

    useEffect(() => {
        const timer = checkOnlineUser();
        userDetails();
        getOnlineUser();

        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className="relative container basis-1/5">
            <div>
                <h1>
                    <i className="text-black ti ti-wifi"></i>
                    Online Users
                </h1>

                <ul className="mt-1">
                    {users.length !== 0 ? users.map((user) => <li key={user.id}>{user.id !== userId ? user.name : null}</li>) :
                        <li className="text-gray-500">No one is online...</li>}
                </ul>
            </div>

            <button className="absolute bottom-0 bg-gray-900 text-white p-1 px-3 rounded w-fit" onClick={logoutHandler}>Logout</button>
        </div>
    );
}