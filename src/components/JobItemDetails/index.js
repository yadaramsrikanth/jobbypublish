import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FcRating} from 'react-icons/fc'
import {ImLocation2} from 'react-icons/im'
import {IoFileTrayFullOutline} from 'react-icons/io5'
import {IoNavigateOutline} from 'react-icons/io5'

import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {apiStatus: apistatusConstants.initial, jobDetailsList: {}}

  componentDidMount() {
    this.getCompanyDetails()
  }

  onClickRetryJobDetailsUrl = () => {
    this.getCompanyDetails()
  }

  getSimilarJobsFormattedData = jobDetails => ({
    similarCompanyLogoUrl: jobDetails.company_logo_url,
    similarCompanyEmploymentType: jobDetails.employment_type,
    id: jobDetails.id,
    similarJobDescription: jobDetails.job_description,
    location: jobDetails.location,
    rating: jobDetails.rating,
    title: jobDetails.title,
  })

  getSkillsFormattedData = eachSkill => ({
    skillImageUrl: eachSkill.image_url,
    skillname: eachSkill.name,
  })

  getCompanyDetails = async () => {
    this.setState({apiStatus: apistatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const detailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const detailsOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const detaislResponse = await fetch(detailsUrl, detailsOption)

    if (detaislResponse.ok) {
      const detailsData = await detaislResponse.json()
      console.log(detailsData)
      const updatedJobsDetails = {
        companyLogoUrl: detailsData.job_details.company_logo_url,
        companyWebSiteUrl: detailsData.job_details.company_website_url,
        employmentType: detailsData.job_details.employment_type,
        jobDescription: detailsData.job_details.job_description,
        location: detailsData.job_details.location,
        packagePerAnnum: detailsData.job_details.package_per_annum,
        rating: detailsData.job_details.rating,
        title: detailsData.job_details.title,
        lifeAtCompanyDescription:
          detailsData.job_details.life_at_company.description,

        lifeAtCompanyImageUrl:
          detailsData.job_details.life_at_company.image_url,

        skills: detailsData.job_details.skills.map(eachSkills =>
          this.getSkillsFormattedData(eachSkills),
        ),
        similarJobs: detailsData.similar_jobs.map(eachSimilarJob =>
          this.getSimilarJobsFormattedData(eachSimilarJob),
        ),
      }
      this.setState({
        apiStatus: apistatusConstants.success,
        jobDetailsList: updatedJobsDetails,
      })
    } else {
      this.setState({apiStatus: apistatusConstants.failure})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetailsList} = this.state
    const {
      companyLogoUrl,
      companyWebSiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      similarJobs,
    } = jobDetailsList
    return (
      <>
        <div className="job-details-bg-container">
          <div className="company-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="JobsCard-horizontal-line" />
          <div className="description-container">
            <h1 className="description">Description</h1>
            <div className="visit-container">
              <a href={companyWebSiteUrl} className="visit">
                Visit
                <IoNavigateOutline />
              </a>
            </div>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="unordered-skills-container">
            {skills.map(eachSkillcard => (
              <SkillCard
                eachSkillcard={eachSkillcard}
                key={eachSkillcard.skillname}
              />
            ))}
          </ul>
          <h1 className="skills-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-para">{lifeAtCompanyDescription}</p>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="skills-heading-job">Similar Jobs</h1>
        <ul className="unordered-skills-container">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobCard
              eachSimilarJob={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-image"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="job-details-failure-button"
        type="button"
        onClick={this.onClickRetryJobDetailsUrl}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apistatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apistatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apistatusConstants.inProgress:
        return this.renderJobDetailsLoadingView()
      default:
        return 'Empty'
    }
  }

  render() {
    return (
      <div className="details-app-container">
        <Header />

        {this.renderJobDetailsListView()}
      </div>
    )
  }
}

export default JobItemDetails
