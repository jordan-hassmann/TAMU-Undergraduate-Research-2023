

import OpportunityLink from '../../Components/OpportunityLink';
import Skill from '../../Components/Skill';

// antd
import { Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Styles
import './styles.scss'


const { Search } = Input;





const HomePage = () => {

  const onSearch = () => {}

  return (
    <div className="home-page">
      
      <div className="opportunity-drawer">
        <div className="search">
          <Search placeholder="Search" onSearch={onSearch} />
        </div>
        <div className="opportunities">
          <OpportunityLink />
          <OpportunityLink />
          <OpportunityLink />
        </div>
      </div>

      <div className="opportunity-details">
        <div className="card">


          <div className="header">
            <h3 className='header-title'>Machine learning for predicting glucose trajectories</h3>
            <button className="apply">
              <span>Apply</span>
              <FontAwesomeIcon icon='file-signature' />
            </button>
            <p className="subtitle">Irina Gaynanova  —  DeBakey Executive Research Leadership Program</p>
            <div className="options">
              <button className="message">
                <span>Message</span>
                <FontAwesomeIcon icon='message' />
              </button>

              <FontAwesomeIcon className='star' icon='star' size='2x' />
            </div>
          </div>


          <div className="content">

            <div className="section">
              <h4>Description</h4>
              <p className="text">
                Data from wearable devices, such as continuous 
                glucose monitors (CGM), activity trackers, ambulatory 
                blood pressure monitors, and sleep EEG monitors, 
                are increasingly common. This wealth of data has 
                the potential to improve health outcomes and improve 
                the management of various chronic diseases, e.g. diabetes. 
                The purpose of this project is to develop software and 
                statistical/machine learning methods to facilitate 
                analyses of such data in the context of diabetes 
                research.
              </p>
            </div>

            <div className='section'>
              <h4>Required Skills</h4>
              <div className="skills">
                <Skill />
                <Skill />
                <Skill />
                <Skill />
              </div>
            </div>

            <div className="section">
              <h4>Preferred Skills</h4>
              <div className="skills">
                <Skill />
                <Skill />
                <Skill />
                <Skill />
              </div>
            </div>

            <div className="section">
              <h4>Job Details</h4>
              <div className="highlights">
                <p>Duration: </p>
                <p>Fall 2022 - Unset</p>
                <p>Paid: </p>
                <p>Unpaid</p>
                <p>Spots: </p>
                <p>4 Available Spots</p>
              </div>

              <p className="job-details">
                Lorem ipsum dolor sit, amet consectetur adipisicing 
                elit. Quod maxime praesentium doloremque doloribus 
                exercitationem placeat veritatis maiores molestias 
                delectus illo ex suscipit velit earum, dolor 
                reprehenderit provident, corrupti soluta optio 
                architecto mollitia nemo, pariatur consequatur 
                obcaecati itaque! Officia, molestiae repudiandae.
              </p>
            </div>
          </div>

          







          
        </div>
      </div>  

    </div>
  )
}

export default HomePage