import React, {useEffect, useState} from 'react';
import './App.css';
import Modal from "./components/Modal";
import Timer from "./components/Timer";

const apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=6db0e186&';

function App() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleNext = () => {
    if (currentIndex < rows.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const showItem = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  }

  useEffect(() => {
    if (query.length > 0) {
      getMovieList();
    }
  }, [query])

  return (
    <div className="App">
      <div className='row header'>
        <div className="center">Time: <Timer /></div>

        <div className="search-bar">
          <input type="text" value={query}  onChange={handleInput} placeholder='Search movie...' />
        </div>

        <div className="center">
          {total > 0 && <div>
            Total results: <b>{total}</b>
          </div>}
        </div>
      </div>

      <div className="list">
        {rows && rows.map((item, index) => (
          <div key={index} className="list-item" onClick={() => showItem(index)}>
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

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
      >
        {currentIndex >= 0 && rows[currentIndex] && (
          <div className="row">
            {currentIndex > 0
              ? <div className="arrow" onClick={handlePrev}>&lt;</div>
              : <div className="arrow-empty" />
            }

            <div className="list-item list-item-full">
              <img src={rows[currentIndex].Poster} width="200px" alt=""/>
              <div className="data">
                <h3 className="title">{rows[currentIndex].Title}</h3>
                <div>Type: {rows[currentIndex].Type}</div>
                <div>Year: {rows[currentIndex].Year}</div>
                <div>imdbID: {rows[currentIndex].imdbID}</div>
              </div>
            </div>

              {currentIndex < rows.length - 1
                ? <div className="arrow" onClick={handleNext}>&gt;</div>
                : <div className="arrow-empty" />
              }
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
