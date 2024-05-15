import './index.css'

const JobsFilter = props => {
  const onChangeEmployment = event => {
    const {onChangeEmploymentType} = props
    onChangeEmploymentType(event.target.value)
  }

  const onChangeSalaryRanges = event => {
    const {onChangeSalaryChange} = props
    onChangeSalaryChange(event.target.value)
  }
  const renderUnorderedEmploymentType = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachEmploymentType => (
      <li className="employment-type-list-item">
        <input
          type="checkbox"
          id={eachEmploymentType.label}
          value={eachEmploymentType.employmentTypeId}
          onChange={onChangeEmployment}
        />
        <label className="label-element" htmlFor={eachEmploymentType.label}>
          {eachEmploymentType.label}
        </label>
      </li>
    ))
  }

  const renderEmploymentTypeList = () => (
    <>
      <h1 className="employment-type-heading">Type of Employment</h1>
      <ul className="employment-type-list-container">
        {renderUnorderedEmploymentType()}
      </ul>
    </>
  )

  const renderUnorderedSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachsalaryitem => (
      <li className="employment-type-list-item">
        <input
          type="radio"
          id={eachsalaryitem.label}
          name="salaryName"
          value={eachsalaryitem.salaryRangeId}
          onChange={onChangeSalaryRanges}
        />
        <label className="label-element" htmlFor={eachsalaryitem.label}>
          {eachsalaryitem.label}
        </label>
      </li>
    ))
  }

  const renderSalaryTypeList = () => (
    <>
      <h1 className="employment-type-heading">Salary Range</h1>
      <ul className="employment-type-list-container">
        {renderUnorderedSalaryRangeList()}
      </ul>
    </>
  )

  return (
    <div>
      <hr className="horizontal-line" />
      {renderEmploymentTypeList()}
      <hr className="horizontal-line" />
      {renderSalaryTypeList()}
    </div>
  )
}

export default JobsFilter
