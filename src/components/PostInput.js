import React, { useState } from 'react';

const PostInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');
  const [suggestionValue, setSuggestionValue] = useState('');

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
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" value={inputValue} onChange={handleInputChange} />

      <label htmlFor="body">Body:</label>
      <textarea id="body" value={bodyValue} onChange={handleBodyChange}></textarea>

      <label htmlFor="suggestion">Suggestion:</label>
      <input type="text" id="suggestion" value={suggestionValue} onChange={handleSuggestionChange} />

      <button onClick={handlePostRequest}>Post</button>
    </div>
  );
};

export default PostInput;
