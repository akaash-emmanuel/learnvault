import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { query } = location.state || {}; 

    if (!query) {
        return <div>Error: No search query provided. Please go back to the Home page.</div>;
    }

    const handleOptionSelect = async (option) => {
        console.log('Option selected:', option);
        try {
            const response = await fetch('http://localhost:5000/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    query: query, 
                    type: option,  
                    max_results: 10  
                }),
            });

            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error('Failed to fetch results from backend.');
            }

            const data = await response.json();
            console.log('Response Data:', data);

            if (data && data.results) {
                navigate('/results', { state: { query, option, results: data.results } });
            } else {
                alert('No results found');
            }
        } catch (error) {
            console.error('Error fetching results:', error);
            alert('Failed to fetch results. Please try again.');
        }
    };

    return (
        <div className="categories-container">
            <div className="prompt-container">
                <h3>Pick method of study</h3>
            </div>
            <div className="button-container">
                <button onClick={() => handleOptionSelect('visual')}>Video</button>
                <button onClick={() => handleOptionSelect('web')}>Web</button>
            </div>
        </div>
    );
};

export default Categories;
