import React from 'react';
import ExcitedIcon from '../assets/icons/excited_icon.svg';
import StarGroupIcon from '../assets/icons/star_group_icon.svg';

const PreparingCertificate = () => {
  return (
    <div className="quiz-wrapper">
      <div className="loading-container">
        {/* Star Groups */}
        <img src={StarGroupIcon} alt="Stars" style={{ position: 'absolute', top: '15%', left: '10%', width: '60px' }} />
        <img src={StarGroupIcon} alt="Stars" style={{ position: 'absolute', top: '25%', right: '15%', width: '80px', transform: 'rotate(15deg)' }} />
        <img src={StarGroupIcon} alt="Stars" style={{ position: 'absolute', bottom: '30%', left: '12%', width: '50px', transform: 'rotate(-10deg)' }} />
        <img src={StarGroupIcon} alt="Stars" style={{ position: 'absolute', bottom: '15%', right: '10%', width: '70px' }} />

        <div className="prep-ring-container">
          <div className="loading-ring"></div>
          <div className="prep-text">
            Submitting your answers anonymously...
          </div>
          <div className="sub-prep-text">
            Adding feedback to your friend's profile
          </div>
        </div>
        <img src={ExcitedIcon} alt="Excited" className="excited-image" />
      </div>
    </div>
  );
};

export default PreparingCertificate;
