import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='*' element={<h1>404 Not found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }

