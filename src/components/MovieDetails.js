import React from "react";
import '../App.css';

const MovieDetails = ({data}) => {
  if (!data) return <div className="list-item list-item-full"></div>;

  const {Poster, Ratings, Title, ...props} = data;

  return <div className="list-item list-item-full">
    <img src={Poster} width="200px" alt=""/>
    {props && <div className="data">
      <h3 className="title">{Title}</h3>
      {Object.keys(props).map(key => (
        <div key={key}><b>{key}:</b> {typeof props[key] === 'string' && props[key]}</div>
      ))}
    </div>}
  </div>
}

export default MovieDetails;
