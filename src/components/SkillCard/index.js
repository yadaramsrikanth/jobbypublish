import './index.css'

const SkillCard = props => {
  const {eachSkillcard} = props
  const {skillImageUrl, skillname} = eachSkillcard
  return (
    <>
      
      <li className="list-item-skill">
        <img src={skillImageUrl} alt={skillname} className="skills-image" />
        <p className="skillname-heading">{skillname}</p>
      </li>
    </>
  )
}

export default SkillCard
