

import './styles.scss'


const Skill = ({ skill, onClick }) => {
  return <p onClick={ onClick } className="skill primary">{ skill }</p>
}


export default Skill