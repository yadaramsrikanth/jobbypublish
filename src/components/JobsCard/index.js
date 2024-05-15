import {Link} from 'react-router-dom'
import {FcRating} from 'react-icons/fc'
import {ImLocation2} from 'react-icons/im'
import {IoFileTrayFullOutline} from 'react-icons/io5'

import './index.css'

const JobsCard = props => {
  const {eachjobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = eachjobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-container">
        <div className="company-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="employement-rating-container">
            <h1 className="employmentType">{title}</h1>
            <div className="rating-count-container">
              <FcRating className="rating" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>
        <div className="salary-location-container">
          <div className="location-employement-container">
            <div className="location-container">
              <ImLocation2 className="location" />
              <p className="location-name">{location}</p>
            </div>
            <div className="location-container">
              <IoFileTrayFullOutline className="location" />
              <p className="location-name">{employmentType}</p>
            </div>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
        <hr className="JobsCard-horizontal-line" />
        <h1 className="description">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsCard
