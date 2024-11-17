import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { query } = location.state || {};  // Get query from Home page

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        navigate('/results', { state: { query, option } });
    };

    return (
        <div className="categories-container">
            <div className="prompt-container">
                <h3>Pick method of study</h3>
            </div>
            <div className="button-container">
                <button onClick={() => handleOptionSelect('Video')}>Video</button>
                <button onClick={() => handleOptionSelect('AudioBook')}>AudioBook</button>
                <button onClick={() => handleOptionSelect('PDF')}>PDF</button>
            </div>
        </div>
    );
};

export default Categories;
