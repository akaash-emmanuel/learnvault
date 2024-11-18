import React from 'react';
import { useLocation } from 'react-router-dom';
import '/Users/akaashrayipudi/learnvault/src/pages/Results.css'; 

const Results = () => {
  const location = useLocation();
  const { results } = location.state || {}; 

  if (!results) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="results-container">
      <h2 className="results-prompt">Search Results</h2>

      {/* Render Web Results if they exist */}
      {results.web && results.web.length > 0 && (
        <div className="results-list">
          <h3 className="results-heading">Reading</h3>
          {results.web.map((page, index) => (
            <div key={index} className="result-rectangle">
              <h4 className="result-title">{page.title}</h4>
              <a href={page.url} target="_blank" rel="noopener noreferrer" className="result-link">
                Visit Page
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Render Video Results if they exist */}
      {results.visual && results.visual.length > 0 && (
        <div className="results-list">
          <h3 className="results-heading">Video Results</h3>
          {results.visual.map((video, index) => (
            <div key={index} className="result-rectangle">
              <h4 className="result-title">{video.title}</h4>
              <p className="result-description">{video.description}</p>
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="result-link">
                Watch Video
              </a>
            </div>
          ))}
        </div>
      )}

      {/* If no results in either category */}
      {(results.web && results.web.length === 0) && (results.visual && results.visual.length === 0) && (
        <div className="no-results">No results found for your query.</div>
      )}
    </div>
  );
};

export default Results;
