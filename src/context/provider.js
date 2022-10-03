import React, {useState} from "react";
import { createContext } from "react";

export const RootContext = createContext({})

const RootProvider = ({children}) => {
    const [activeView, setActiveView] = useState("SelphId");

    return (
        <RootContext.Provider
            value={{ activeView, setActiveView }}
        >
            {children}
        </RootContext.Provider>
    )

}

export { RootProvider };
