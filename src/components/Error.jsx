import React from 'react'

const Error = ({message,retry}) => {
  return (
    <div className='error'>
      <h1>!</h1>
      <p>Sorry, an error occurred while accessing the data</p>
      <p className='text'>{message}</p>
      <button onClick={retry} className='button'><span>Try Again</span></button>
    </div>
  )
}

export default Error