import {FcRating} from 'react-icons/fc'
import {ImLocation2} from 'react-icons/im'
import {IoFileTrayFullOutline} from 'react-icons/io5'

import './index.css'

const SimilarJobCard = props => {
  const {eachSimilarJob} = props
  const {
    similarCompanyLogoUrl,
    similarCompanyEmploymentType,
    similarJobDescription,
    location,
    rating,
    title,
  } = eachSimilarJob
  return (
    <li className="similar-job-container">
      <div className="company-simple-rating-container">
        <img
          src={similarCompanyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo-image"
        />
        <div className="employement-rating-container">
          <h1 className="employmentType">{title}</h1>
          <div className="rating-count-container">
            <FcRating className="rating" />
            <p className="rating-count">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description">Description</h1>
      <p className="job-description">{similarJobDescription}</p>
      <div className="salary-location-container">
        <div className="location-employement-container">
          <div className="location-container">
            <ImLocation2 className="location" />
            <p className="location-name">{location}</p>
          </div>
          <div className="location-container">
            <IoFileTrayFullOutline className="location" />
            <p className="location-name">{similarCompanyEmploymentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobCard
