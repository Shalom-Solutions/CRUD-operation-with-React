import React, { useState } from 'react';

const DisplayPost = () => {
  const [formValue, setFormValue] = useState({inputValue:'', bodyValue: '', suggestionValue:''})
//   const [inputValue, setInputValue] = useState('');
//   const [bodyValue, setBodyValue] = useState('');
//   const [suggestionValue, setSuggestionValue] = useState('');
  const [postData, setPostData] = useState([]);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleBodyChange = (event) => {
//     setBodyValue(event.target.value);
//   };

//   const handleSuggestionChange = (event) => {
//     setSuggestionValue(event.target.value);
//   };

const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormValue({...formValue, [name]:value})
}

const handlePostRequest = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: formValue.inputValue, body: formValue.bodyValue, suggestion: formValue.suggestionValue}),
    };
    fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPostData(prevData => [...prevData, data]);
        setFormValue({inputValue:'', bodyValue: '', suggestionValue:''})
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
    <div>
    <form >
    <input type="text" id="title" name="inputValue" value={formValue.inputValue} onChange={handleInputChange} />

    <textarea id="body" name="bodyValue" value={formValue.bodyValue} onChange={handleInputChange}></textarea>

    <input type="text" id="suggestion" name="suggestionValue" value={formValue.suggestionValue} onChange={handleInputChange} />


      <button onClick={handlePostRequest}>Post</button>
    </form>
 

      <PostTable data={postData} />
    </div>
  );
};

export default DisplayPost;