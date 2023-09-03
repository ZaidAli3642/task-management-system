import { useState } from 'react'

const useFilter = fields => {
  const [filters, setFilters] = useState(fields)
  const [filterIds, setFilterIds] = useState(fields)

  const onChangeFilter = ({ target: { value, key, checked } }) => {
    if (checked) {
      setFilters(prevState => ({ ...prevState, [key]: [...filters[key], value] }))
      setFilterIds(prevState => ({ ...prevState, [key]: [...filterIds[key], value.id] }))
    } else {
      const newFilters = filters[key].filter(field => field.id !== value.id)
      const newFilterIds = filterIds[key].filter(field => field !== value.id)

      setFilters(prevState => ({ ...prevState, [key]: [...newFilters] }))
      setFilterIds(prevState => ({ ...prevState, [key]: [...newFilterIds] }))
    }
  }

  return [filters, filterIds, onChangeFilter]
}

export default useFilter
