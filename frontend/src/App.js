import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import IssuePage from './components/IssuePage';
import Login from './components/Login';
import NavigationBar from './components/Navbar';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/issues' element={<IssuePage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    );
}

export default App;