import Card from "./Card";

function DisplayBox({title, todos, count, statusLabel}) {
    return (
            <div className="display-box">
                <h2>{title}</h2>
                <p className="count-txt-label">{count} {statusLabel}</p>
                <div className="container-box-scroll">
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id}>
                                <Card 
                                    userId={todo.userId}
                                    id={todo.id}
                                    title={todo.title}
                                    status={todo.completed}>
                                </Card>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="botton-box-end"></div>
            </div>
    );
}

export default DisplayBox;