import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Results from './pages/Results';  // Ensure Results is imported
import GeometricBackground from './components/GeometricBackground';

function App() {
    return (
        <Router>
            <Navbar />
            <GeometricBackground />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/results" element={<Results />} /> {/* Results route */}
            </Routes>
        </Router>
    );
}

export default App;
