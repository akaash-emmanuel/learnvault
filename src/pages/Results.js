import React from 'react';
import { useLocation } from 'react-router-dom';
import './Results.css';

const Results = () => {
    const location = useLocation();
    const { query, option } = location.state || {};

    // Mock results (replace with backend integration later)
    const mockResults = [
        { id: 1, title: 'Sample Result 1' },
        { id: 2, title: 'Sample Result 2' },
        { id: 3, title: 'Sample Result 3' },
        { id: 4, title: 'Sample Result 4' },
    ];

    return (
        <div className="results-container">
            <h3 className="results-prompt">
                Results for "{query}" in "{option}":
            </h3>
            <div className="results-list">
                {mockResults.map((result) => (
                    <div key={result.id} className="result-rectangle">
                        {result.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;
