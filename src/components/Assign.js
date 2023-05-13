import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Assign = () => {
  const [formValue, setFormValue] = useState({ userid: '', title: '', body: '' });
  const [postValue, setPostValue] = useState([]);
  const [editId, setEditId] = useState([]);
  const [refresh, setRefresh] = useState(0);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!formValue.id || !formValue.title || !formValue.body) {
        alert('Please fill in all fields');
        return;
      }
    axios.post('https://jsonplaceholder.typicode.com/posts', formValue)
    .then(res =>  {setPostValue([...postValue, res.data]) // add current formValue to postValue array
                  setFormValue({ id: '', title: '', body: '' })
                })
    .catch(err => console.log(err));
  };

  const handleUpdate = (e) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editId}`, formValue)
    .then(res => {setFormValue({ id: '', title: '', body: '' })
        setRefresh(refresh + 1);
    })
    .catch(err => console.log(err));
  };

  const handleDelete = (index) => {
    const newData = postValue.filter((item, i)=> i !== index)
    setPostValue(newData)
  }

  const handleEdit = (editIDNotState) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${editIDNotState}`)
    .then((res) => setFormValue(res.data))
    .catch((err) => console.log('Error :::', err))

  } 

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => setPostValue(res.data))
    .catch((err) => console.log('Error :::', err))
  }, [refresh] )

  const PostTable = ({ postValue }) => (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>UserId</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {postValue.map((item, index) => (
          <tr key={index}>
            <td>{item.userid}</td>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>
                <button class="btn btn-warning" onClick={(e) => {
                    handleEdit(item.id)
                    setEditId(item.id)
                }  }>
                    Edit
                </button>{'   '}
                <button class="btn btn-danger" onClick={(e) => handleDelete(index) }>
                    Delete
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="container">
        <form onSubmit={submitForm}>
          <div className="mb-3">
            <label className="form-label">UserId</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              name="userid"
              value={formValue.id}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputTitle1"
              aria-describedby="emailHelp"
              name="title"
              value={formValue.title}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Body</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="body"
              value={formValue.body}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="submit" className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </form>

        <PostTable postValue={postValue} />
      </div>
    </>
  );
};

export default Assign;
