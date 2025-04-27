import React, { createContext, useContext} from "react";

const UsersContext = createContext();

export function UsersProvider({children}) {

    const userNames = ['Marin Ivanov', 'Stoyan Vladimirov', 'Ivan Sotirov',
         'Martin Staykov', 'Georgi Hristov', 'Ivayla Ivanova', 'Petko Donchev', 'Plamen Kirilov', 'Nedyalko Velkov', 'Rumen Nikov'];

    const users = userNames.map((name, index) => ({
        id: index + 1,
        username: name,
        age: Math.floor(Math.random() * 30) + 20 
      }));

    const value = {users};

    console.log(users);

    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    );
}

export function useUsers() {
    return useContext(UsersContext);
}