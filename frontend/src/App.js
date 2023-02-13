import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute.js'

import Home from './views/Home';
import IssuePage from './views/IssuePage';
import Login from './views/Login';
import NavigationBar from './components/Navbar';
import Register from './views/Register';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer.js';


function App() {
    return (
        <Router>
            <AuthProvider>
            <NavigationBar />
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/issues' element={<PrivateRoute/>}>
                    <Route path='/issues' element={<IssuePage/>}/>
                </Route>
                
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
            <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;