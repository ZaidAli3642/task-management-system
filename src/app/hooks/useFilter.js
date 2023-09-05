import { useState } from 'react'

const useFilter = fields => {
  const [filters, setFilters] = useState(fields)
  const [filterIds, setFilterIds] = useState(fields)

  const onChangeFilter = ({ target: { value, key, checked, isPreviousRemove } }) => {
    if (checked) {
      let filtersValue = []
      let filtersIdsValue = []
      if (isPreviousRemove) {
        filtersValue = [value]
        filtersIdsValue = [value.id]
      } else {
        filtersValue = [...filters[key], value]
        filtersIdsValue = [...filterIds[key], value.id]
      }

      setFilters(prevState => ({ ...prevState, [key]: filtersValue }))
      setFilterIds(prevState => ({ ...prevState, [key]: filtersIdsValue }))
    } else {
      const newFilters = filters[key].filter(field => field.id !== value.id)
      const newFilterIds = filterIds[key].filter(field => field !== value.id)

      setFilters(prevState => ({ ...prevState, [key]: [...newFilters] }))
      setFilterIds(prevState => ({ ...prevState, [key]: [...newFilterIds] }))
    }
  }

  const onClearKeyValue = ({ target: { key } }) => {
    setFilters(prevState => ({ ...prevState, [key]: [] }))
    setFilterIds(prevState => ({ ...prevState, [key]: [] }))

    return true
  }

  return [filters, filterIds, onChangeFilter, onClearKeyValue]
}

export default useFilter
