import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {onlineUser} from "../../api.js";

export default function Sidebar() {
    const { userId } = useParams();
    const [users, setUsers] = useState([]);

    const getOnlineUser = () => {
        onlineUser()
            .then(res => setUsers(res.data.filter(x => x.id === userId)))
            .catch(res => {});
    }

    useEffect(() => {
        getOnlineUser();
    }, []);
    return (
        <div className="container basis-1/5">
            <h1>
                <i className="text-black ti ti-wifi"></i>
                Online User
            </h1>

            <ul className="mt-1">
                {users.length !== 0 ? users.map((user) => <li key={user.id}>{user.name}</li>) : <p className="text-gray-500">No one is online...</p>}
            </ul>
        </div>
    );
}