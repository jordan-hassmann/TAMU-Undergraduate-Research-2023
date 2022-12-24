import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './styles.scss'

const FilterChip = ({ filter, onClick }) => {

  return (
    <button className="filter-chip" onClick={ onClick }>
      <span>{ filter }</span>
      <FontAwesomeIcon icon='xmark' />
    </button>
  )
}

export default FilterChip