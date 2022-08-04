import React, {useEffect, useState} from 'react';
import './App.css';

const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=6db0e186&';

function App() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const handleInput = (e) => {
    setQuery(e.target.value);
  }

  const getMovieList = () => {
    fetch(`${apiUrl}s=${query}`)
      .then(res => res.json())
      .then(res => {
        if (res.Response === 'False') {
          setError(res.Error);
          setRows([]);
          setTotal(0);
        } else if (res.Response === 'True') {
          setRows(res.Search);
          setTotal(res.totalResults);
          setError('');
        }
      })
      .catch(e => {
        setError('Network error');
        setTotal(0);
      })
  }

  useEffect(() => {
    if (query.length > 0) {
      getMovieList();
    }
  }, [query])

  return (
    <div className="App">
      <div className="search-bar">
        <input type="text" value={query}  onChange={handleInput} placeholder='Search movie...' />
      </div>

      {total > 0 && <div className="total">
        Total results: {total}
      </div>}

      <div className="list">
        {rows && rows.map((item, index) => (
          <div key={index} className="list-item">
            <img src={item.Poster} width="100px" alt=""/>
            <div className="data">
              <h3 className="title">{item.Title}</h3>
              <div>Type: {item.Type}</div>
              <div>Year: {item.Year}</div>
              <div>imdbID: {item.imdbID}</div>
            </div>
          </div>
        ))}
      </div>

      {error && <div className="error">
        Error: {error}
      </div>}
    </div>
  );
}

export default App;
