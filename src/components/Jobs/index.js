import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import UserProfile from '../UserProfile'
import JobsCard from '../JobsCard'
import JobsFilter from '../JobsFilter'

import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    employmentId: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getTotalJobsList()
  }

  onClickRetryJobsList = () => {
    this.getTotalJobsList()
  }

  getTotalJobsList = async () => {
    const {searchInput, employmentId, salaryRange} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${salaryRange}&search=${searchInput}`
    const jobsOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const jobsResponse = await fetch(jobsUrl, jobsOptions)

    if (jobsResponse.ok) {
      const jobsdata = await jobsResponse.json()
      console.log(jobsdata)

      const updatedJobsData = jobsdata.jobs.map(eachJobData => ({
        companyLogoUrl: eachJobData.company_logo_url,
        employmentType: eachJobData.employment_type,
        id: eachJobData.id,
        jobDescription: eachJobData.job_description,
        location: eachJobData.location,
        packagePerAnnum: eachJobData.package_per_annum,
        rating: eachJobData.rating,
        title: eachJobData.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsListFailureView = () => (
    <div className="failureview-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-headeing">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you looking far.
      </p>
      <button
        type="button"
        className="failure-retry-button"
        onClick={this.onClickRetryJobsList}
      >
        Retry
      </button>
    </div>
  )

  renderJobsListLoadingView = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsListSuccessView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0
    return showJobsList ? (
      <ul className="unordered-container">
        {jobsList.map(eachjobDetails => (
          <JobsCard eachjobDetails={eachjobDetails} key={eachjobDetails.id} />
        ))}
      </ul>
    ) : (
      <div className="not-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs.Try other filters
        </p>
      </div>
    )
  }

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsListFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobsListLoadingView()
      default:
        return 'Failure'
    }
  }

  onSearchJob = event => {
    this.setState({searchInput: event.target.value})
    console.log(event.target.value)
  }

  onClickSearchJob = () => {
    this.getTotalJobsList()
  }

  onChangeEmploymentType = employmentId => {
    this.setState({employmentId}, this.getTotalJobsList)
  }
  onChangeSalaryChange = salaryRange => {
    this.setState({salaryRange}, this.getTotalJobsList)
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filters-container">
            <UserProfile />
            <JobsFilter
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalaryChange={this.onChangeSalaryChange}
            />
          </div>
          <div className="job-list-container">
            <div className="seacrh-button-container">
              <input
                type="search"
                placeholder="Search"
                className="seacrh-element"
                onChange={this.onSearchJob}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchJob}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
