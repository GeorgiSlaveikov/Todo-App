function ManagerBox() {
    return (
        <div className="manage-box">
                <input className="input-search-bar"/>
                <select className="select-dropdown">
                    <option>Title (asc)</option>
                    <option>Title (dec)</option>
                </select>
                <input className="input-search-bar"/>
                <select className="select-dropdown">
                    <option>Date (asc)</option>
                    <option>Date (dec)</option>
                </select>
            </div>
    );
}

export default ManagerBox;