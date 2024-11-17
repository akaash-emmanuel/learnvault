import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import GeometricBackground from '../components/GeometricBackground';

const SearchContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.h2`
  color: var(--accent);
  font-size: 2rem;
  text-align: center;
`;

const Search = () => {
  const location = useLocation();
  const query = location.state?.query || '';

  return (
    <SearchContainer>
      <GeometricBackground />
      <Title>Search Results</Title>
    </SearchContainer>
  );
};

export default Search;
