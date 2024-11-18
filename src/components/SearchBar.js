import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState('Web');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/search', {
        query,
        type: option,  
        max_results: 10,
      });

      const results = response.data.results;
      navigate('/results', { state: { results } });
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Failed to fetch results. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for resources"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={option} onChange={(e) => setOption(e.target.value)}>
        <option value="Web">Web</option>
        <option value="Video">Video</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
