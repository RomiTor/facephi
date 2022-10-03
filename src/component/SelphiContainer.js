import React, { useContext } from "react";
import { RootProvider } from '../context/provider';
import { RootContext } from '../context/provider';
import { SelphId } from "./SelphId";
import { Selphi } from "./Selphi";


const SelphiContainer = () => {

    const rootContext = useContext(RootContext);
    let { activeView, setActiveView } = rootContext;

    const selectActiveView = () => {
        console.log(selectActiveView)
        if (activeView === "SelphId") {
            return (<SelphId />)
        }
        if (activeView === "Selphi") {
            return (<Selphi />)
        }
        return (
            <div> Fin del proceso </div>
        )
    };

    return (

        <div id="biometric">
            {selectActiveView()}
        </div>
    );
}

export { SelphiContainer };