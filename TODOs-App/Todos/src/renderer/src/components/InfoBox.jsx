import { useState } from "react";
import { useApp } from "../contexts/appContext";

function InfoBox() {
    const [isEnglish, setIsEnglish] = useState(true); // true ==> english
    const {handleHomeMode} = useApp();

    const handleCloseMenu = () => {
        handleHomeMode();
    };

    const handleLanguage = () => {
        if (isEnglish) {setIsEnglish(false);}
        else if (!isEnglish) {setIsEnglish(true);}
    };

    return (
        <div className="info-box">
            {isEnglish && <>
                <h2>About the application</h2>
                <p>This application is about managing todos and tasks</p>
                <h3>Base functionality</h3>
                <p>In the 'Fetch' section there are some basic functions like completing and uncompleting tasks, filtering by user, sorting by
                completion date (ascending and descending), sorting by title (alpabeticaly, ascending and 
                descending).
                </p>
                <h3>Addition functionality</h3>
                <p>In the 'File' section of the application there are some addition functions, like, creating custom tasks
                creating and opening '.json' files, saving to '.json' files and loading tasks (todos) from them. Auto save is availabe
                on opening new file, creating new file and exiting the page and application.
                </p>
            </>}
            {!isEnglish && <>
                <h2>Относно апликацията</h2>
                <p>Тази апликация е за управление на задачи</p>
                <h3>Основна функционалност</h3>
                <p>В раздела „Извличане“ има някои основни функции, като завършване и незавършване на задачи, филтриране по потребител, сортиране по
                дата на завършване (възходящо и низходящо), сортиране по заглавие (по азбучен ред, възходящо и низходящо ред).
                </p>
                <h3>Допълнителна функционалност</h3>
                <p>В раздела „Файл“ на приложението има някои допълнителни функции, като например създаване на персонализирани задачи.
                Създаване и отваряне на файлове „.json“, записване във файлове „.json“ и зареждане на задачи (todos) от тях. Налично е автоматично записване
                при отваряне на нов файл, създаване на нов файл и излизане от страницата и приложението.
                </p>
            </>}    
            <button onClick={() => handleLanguage()}>Language</button>
            <button className="exit-app" onClick={() => handleCloseMenu()}>Close</button>
        </div>
    );
}

export default InfoBox;