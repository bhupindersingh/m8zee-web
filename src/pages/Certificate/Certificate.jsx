import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { ReactSVG } from 'react-svg';
import { CheckIcon } from '../../assets/icons/CheckIcon'; // Updated path
import BadgeIcon from '../../assets/icons/badge_icon.svg'; // Updated path
import { ShareIcon } from '../../assets/icons/ShareIcon'; // Updated path
import { InstagramIcon } from '../../assets/icons/InstagramIcon'; // Updated path
import { DownloadIcon } from '../../assets/icons/DownloadIcon'; // Updated path
import { SparkleIcon } from '../../assets/icons/SparkleIcon'; // Updated path
import StarsIcon from '../../assets/icons/stars_icon.svg'; // Updated path
import FramelineIcon from '../../assets/icons/frameline_icon.svg'; // Updated path
import BulbIcon from '../../assets/icons/bulb_icon_small.png'; // Updated path
import RockIcon from '../../assets/icons/rock_icon.svg';
import SparkIcon from '../../assets/icons/spark_icon copy.png'; // New icon
import DeepOneIcon from '../../assets/icons/deep_icon (1).png'; // New icon
import ListCheckmarkIcon from '../../assets/icons/list_checkmark_icon.png'; // Updated path
import Font from '../../components/Font'; // Updated path (still in components)
import { GoArrowRight } from "react-icons/go";

const Certificate = ({ results, questions, userName }) => {
  const { scores = {}, topCategory, archetype, percentage } = results;
  const certificateRef = useRef(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const frameRate = 60;
    const totalFrames = (duration / 1000) * frameRate;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedScore(Math.floor(easeProgress * results.totalScore));
      setAnimatedPercentage(easeProgress * percentage);

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setAnimatedScore(results.totalScore);
        setAnimatedPercentage(percentage);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [results.totalScore, percentage]);

  const getArchetypeIcon = (name) => {
    switch (name) {
      case 'The Rock': return RockIcon;
      case 'The Spark': return SparkIcon;
      case 'The Deep One': return DeepOneIcon;
      default: return RockIcon;
    }
  };

  const getArchetypeDescription = (name) => {
    switch (name) {
      case 'The Rock': return "Reliable and steady — friends know you show up when it matters.";
      case 'The Spark': return "Energetic and social — you bring life and excitement to every gathering.";
      case 'The Deep One': return "Empathetic and connected — you value meaningful, soul-level friendship.";
      default: return "";
    }
  };

  const topStrengths = [...questions]
    .sort((a, b) => (scores[b.cluster] || 0) - (scores[a.cluster] || 0))
    .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
    .slice(0, 3);

  const handleDownload = async () => {
    if (certificateRef.current === null) return;
    try {
      const dataUrl = await toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 });
      download(dataUrl, `friendship-certificate-${archetype.toLowerCase()}.png`);
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Friendship Style',
          text: `I am ${archetype}! Check out my friendship profile.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="certificate-container">
        <div className="certificate-header">
          <div className="medal-stars-container">
            <img src={StarsIcon} alt="" className="stars-icon stars-left" />
            <img src={StarsIcon} alt="" className="stars-icon stars-right" />
            <div className="medal-icon">
              <ReactSVG src={BadgeIcon} />
            </div>
          </div>
          <Font as="h1" className="cert-title" weight="800">YOUR CERTIFICATE IS<br />READY</Font>
        </div>

        <div className="cert-card" ref={certificateRef}>
          <div className="cert-card-divider">
            <div className="divider-line" />
            <Font className="divider-label" weight="500" color="#111111">Certificate</Font>
            <div className="divider-line" />
          </div>

          <div className="user-info">
            <Font as="h2" className="user-name" weight="800">{userName}</Font>
            <Font as="p" className="user-tagline" color="#6B7280">Your friendship style — revealed in seconds.</Font>
          </div>

          <div className="divider" />

          <div className="archetype-section">
            <img 
              src={getArchetypeIcon(archetype)} 
              alt="" 
              className={`archetype-main-icon ${archetype.toLowerCase().replace(/\s+/g, '-')}`} 
            />
            <Font as="p" className="style-label" weight="700" color="#6B7280">YOUR FRIENDSHIP STYLE</Font>
            <Font as="h3" className="archetype-name" weight="800">{archetype}</Font>
            <Font as="p" className="archetype-description">
              {getArchetypeDescription(archetype)}
            </Font>
          </div>

          <div className="score-section">
            <img src={FramelineIcon} alt="" className="frameline" />
            <Font as="h4" className="section-title" weight="700">Friendship Behaviour Score</Font>

            <div className="score-circle-container">
              <div
                className="score-circle"
                style={{
                  background: `conic-gradient(#B775DA 0% ${animatedPercentage}%, #F3F4F6 ${animatedPercentage + 0.5}% 100%)`
                }}
              >
                <div className="score-circle-inner">
                  <span className="score-value-small">
                    <Font className="inner-score-num" weight="800" color="#111111">{animatedScore}</Font>
                    <Font className="inner-score-total" weight="500" color="#9CA3AF">/90</Font>
                  </span>
                </div>
              </div>
            </div>

            <div className="score-display">
              <Font className="score-main" weight="800" color="#B775DA">{animatedScore}</Font>
              <Font className="score-total" weight="700" color="#B775DA" style={{ opacity: 0.5 }}>/ 90</Font>
            </div>

            <Font as="p" className="score-context" color="#4B5563" size="14px">
              Shows up <Font weight="700" color="#111111">regularly</Font> in Your Behaviour
            </Font>
            <img src={FramelineIcon} alt="" className="frameline" />
          </div>

          <div className="strengths-section">
            <Font as="h4" className="strengths-title" weight="700">
              <span className="star-icon">★</span> Your 3 Top Friendship Strengths <span className="star-icon">★</span>
            </Font>
            <div className="strengths-list">
              {topStrengths.map((s, i) => {
                const itemStyles = [
                  { bg: 'linear-gradient(180deg, rgba(183, 117, 218, 0.13) 0%, rgba(183, 117, 218, 0.12) 100%)', border: '#E0E7FF' },
                  { bg: 'rgba(183, 117, 218, 0.08)', border: '#DCFCE7' },
                  { bg: '#F9F5FF', border: '#F4EBFF' }
                ];
                const style = itemStyles[i % itemStyles.length];
                return (
                  <div key={i} className="strength-item" style={{ background: style.bg, border: `1px solid ${style.border}` }}>
                    <div className="check-box">
                      <img src={ListCheckmarkIcon} alt="" className="list-check-img" />
                    </div>
                    <div className="strength-text">
                      <Font className="strength-main-title" weight="700">{s.title}</Font>
                      {s.title.includes('Shows Up') && (
                        <>
                          <Font className="strength-subtitle" weight="500" color="#B775DA">One of my defining strengths</Font>
                          <Font className="strength-desc" size="13px" color="#6B7280">Friends can usually rely on you when it matters.</Font>
                        </>
                      )}
                      {s.title.includes('Steady') && (
                        <>
                          <Font className="strength-subtitle" weight="500" color="#B775DA">Always there for others</Font>
                          <Font className="strength-desc" size="13px" color="#6B7280">You provide a calm, consistent presence that makes others feel safe.</Font>
                        </>
                      )}
                      {s.title.includes('Trustworthy') && (
                        <>
                          <Font className="strength-subtitle" weight="500" color="#B775DA">Shows up strongly</Font>
                          <Font className="strength-desc" size="13px" color="#6B7280">You are a reliable confidant that your friends can always count on.</Font>
                        </>
                      )}
                      {!s.title.includes('Shows Up') && !s.title.includes('Steady') && !s.title.includes('Trustworthy') && (
                        <>
                          <Font className="strength-subtitle" weight="500" color="#B775DA">A valued trait</Font>
                          <Font className="strength-desc" size="13px" color="#6B7280">A key part of your friendship style that your friends truly value.</Font>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="action-bar">
          <button className="action-icon-btn" onClick={handleShare}>
            <ShareIcon />
          </button>
          <button className="action-icon-btn" onClick={() => window.open('https://instagram.com', '_blank')}>
            <InstagramIcon />
          </button>
          <button className="action-icon-btn" onClick={handleDownload}>
            <DownloadIcon />
          </button>
        </div>

        <div className="blueprint-upsell">
          <div className="upsell-content">
            <div className="upsell-icon-container">
              <img src={BulbIcon} alt="Blueprint" className="upsell-img" width={10} height={10} />
            </div>
            <div className="upsell-text">
              <Font as="p" className="upsell-title" weight="800" size="18px" color="black">Unlock your full friendship blueprint</Font>
              <Font as="p" className="upsell-sub" size="14px" color="rgba(0, 0, 0, 0.7)">Discover deeper insights, hidden strengths, and how your friends truly experience you.</Font>
              <div className='view-button-container'>
                <Font weight="600" color="#B775DA" size="12px" >View Blueprint</Font>
                <GoArrowRight color='#B775DA' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
