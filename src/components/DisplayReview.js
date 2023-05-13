import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const DisplayPost = () => {
  const [inputValue, setInputValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [suggestionValue, setSuggestionValue] = useState('');
  const [postData, setPostData] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBodyValue(event.target.value);
  };

  const handleSuggestionChange = (event) => {
    setSuggestionValue(event.target.value);
  };

  const handlePostRequest = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputValue, body: bodyValue, suggestion: suggestionValue }),
    };
    fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPostData(prevData => [...prevData, data]);
        setInputValue('');
        setBodyValue('');
        setSuggestionValue('');
      })
      .catch(error => console.error(error));
  };

  const PostTable = ({ data }) => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Suggestion</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>{item.suggestion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" id="title" value={inputValue} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea className="form-control" id="body" value={bodyValue} onChange={handleBodyChange}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="suggestion">Suggestion:</label>
          <input type="text" className="form-control" id="suggestion" value={suggestionValue} onChange={handleSuggestionChange} />
        </div>

        <button type="button" className="btn btn-primary" onClick={handlePostRequest}>Post</button>
      </form>

      <PostTable data={postData} />
    </div>
  );
};

export default DisplayPost;
