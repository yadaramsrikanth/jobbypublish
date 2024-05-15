import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="information-container">
      <h1 className="home-page-heading">
        Find The Job That <br />
        Fits Your Life
      </h1>
      <p className="home-paga-para">
        Millions of people are searching for jobs,salary, <br />
        information,company reviews. Find the job that fits your
        <br /> abilities and potential.
      </p>
      <Link to="/jobs" className="link-item">
        <button type="button" className="find-jobs-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
