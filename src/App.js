import './App.css';
import Person from "./ClassComponent/Person";
import FormF from "./FunctionComponent/FormF";
import Animal from "./FunctionComponent/Animal";
import {Routes, Route} from "react-router-dom";
import Navbar from "./Common/Navbar";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path={"/"} element={<Animal></Animal>}></Route>
                <Route path={"/form/:id"} element={<FormF></FormF>}></Route>
                <Route path={"/person"} element={<Person></Person>}></Route>
            </Routes>
        </>
    );
}

export default App;
