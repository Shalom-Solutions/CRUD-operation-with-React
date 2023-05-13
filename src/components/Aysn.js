import React, { useEffect } from 'react'


const Aysn = () => {
  useEffect(() => {
    //Post request using fetch api in useEffect hook
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'REACT hook POST request example' }),
    };
    fetch('https://reqres.in/api/posts', requestOption)
    .then(response => response.json())
    .then(data => console.log(data));
  }, [])

  return (
    <div>FeaturedProducts</div>
  )
}

export default Aysn