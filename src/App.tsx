import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Casino from "./pages/Casino";
import LiveCasino from "./pages/LiveCasino";
function App() {
  const [playerdata,setPlayerData]=useState<any>({})
  useEffect(() => {
   const apicall=()=>{
       axios.get('https://dev-gateway.7mojos.com/api/lobby/player?playerToken=Player777&operatorToken=654be709f71140f7aa65dcd8cede80d4&currency=USD&type=any').
       then((res : any)=>setPlayerData(res.data))
   }
   apicall()
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Header playerdata={playerdata}/>
        <Routes>
          <Route path="/" element={<LiveCasino />} />
          <Route path="/casino" element={<Casino />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
