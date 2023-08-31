const Radio = ({ label, radioContainerStyles, name, id, defaultChecked, onChange, checked }) => {
  return (
    <div className='radio' style={radioContainerStyles}>
      <input id={id} name={name} type='radio' defaultChecked={defaultChecked} checked={checked} onChange={e => onChange(e.target.checked)} />
      <label htmlFor={id} className='radio-label'>
        {label}
      </label>
    </div>
  )
}

export default Radio
