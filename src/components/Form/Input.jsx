const Input = ({ placeholder, type = 'text', name, label }) => {
  return (
    <div className='input-container'>
      {label && (
        <label className='input-label' htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className='input-box'
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
