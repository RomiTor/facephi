import React from 'react';
import { RootProvider } from './context/provider';
import { SelphiContainer } from './component/SelphiContainer';


const App = () => {

  
  return (

    <div id="biometric">

      <RootProvider>
        <SelphiContainer />
      </RootProvider>
    </div>
  );
}

export {App};
