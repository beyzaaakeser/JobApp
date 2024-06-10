import React from 'react'

const AutoInput = ({label,name}) => {
  return (
    <div>
        <label htmlFor={label}>{label}</label>
        <input type="text" id={label} name='' required/>
    </div>
  )
}

export default AutoInput