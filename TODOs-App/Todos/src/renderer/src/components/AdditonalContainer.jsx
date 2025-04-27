import { useUsers } from "../contexts/usersContext";

function AdditionalContainer() {
    const {users} = useUsers();

    return (
        <div className="display-box additional-box">
            <div className="api-info">
                <h3>API Information</h3>
                <p>Fetched from: <a>https://jsonplaceholder.typicode.com/todos</a></p>
            </div>
            <div>
                <h3>Users Information</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {users.map((user) => (
                        <li key={user.id} className="list-element">
                            <span className="user-id">User ID: {user.id}</span>
                            <span className="user-name">{user.username} - {user.age} years old</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdditionalContainer;