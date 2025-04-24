import { useState } from "react";

function Button({prompt, btnType, btnAction}) {
    return (
        <button className={`btn ${btnType}`} onClick={() => btnAction()}>{prompt}</button>
    );
}

export default Button;