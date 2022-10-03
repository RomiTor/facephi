import React, { useState } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const LoadingIframe = () => <Spinner message={"Cargando Iframe"} />;

const LoadingScan = () => <Spinner message={"Cargando Scan"} />;

const onError = () => {
  console.log("onError");
};

const onProgress = (notification) => {
  console.log("onProgress notification -> ", notification);
};

const goBack = () => {
  console.log("ir a home");
};

// Function optional
const onComplete = () => {
  console.log("onComplete");
};

/* UNCOMMENT BELOW IF YOU WANT TO USE IT WITH MODAL */
// const handleTransactionReference = (tr) => {
//   console.log(tr);
// };
// const handleContinueProcess = () => {
//   console.log("Continua el proceso...");
// };

const Obj = () => {
  /* UNCOMMENT BELOW IF YOU WANT TO USE IT WITH MODAL */
  // const [scanStatus, setScanStatus] = useState("");
  // const [modalContainerVisibility, setModalContainerVisibility] =
  //   useState(false);

  return (
    <div className="container-iframe">
      "Hola"
      {/* <button onClick={() => setModalContainerVisibility(true)}>open</button> */}
    </div>
  );
};

/*{
"customer_id" : "27114587K",
"serial_number":"602525341",
"civil_registry_status":"VIGENTE" este dato viene de equifax
}*/

ReactDOM.render(<Obj />, document.getElementById("root"));
