import assets from '../../assets/assets'
import { useState } from 'react'

const CheckBox = ({ onClick }) => {
  const [checked, setChecked] = useState(false)
  return (
    <div
      className={`checkbox ${checked ? 'checkbox-green' : 'checkbox-white'}`}
      onClick={() => {
        setChecked(!checked)
        onClick()
      }}
    >
      {checked && <img src={assets.icons.check} alt='Checked' />}
    </div>
  )
}

export default CheckBox
