

import './styles.scss'

const Fab = ({ children, size, ...props }) => {

  return (
    <button { ...props } className="button-fab" style={{ 
      width: `${size}px`, 
      height: `${size}px`,
    }}>
      { children }
    </button>
  )
}

export default Fab 