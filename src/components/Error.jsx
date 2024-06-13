import React from 'react'

const Error = () => {
  return (
    <div className='error'>
      <p>Sorry, an error occurred while accessing the data</p>
      <p className='text'>message</p>
      <button className='button'><span>Try Again</span></button>
    </div>
  )
}

export default Error