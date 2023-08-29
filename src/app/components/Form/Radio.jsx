const Radio = ({ label, radioContainerStyles }) => {
  return (
    <div className='radio' style={radioContainerStyles}>
      <input id='radio-1' name='radio' type='radio' />
      <label htmlFor='radio-1' className='radio-label'>
        {label}
      </label>
    </div>
  )
}

export default Radio
