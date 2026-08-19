import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { FaArrowRight, FaArrowDown, FaApple, FaGooglePlay } from 'react-icons/fa';

// Archetype PNG icons (v2 High-Res)
import AnchorIcon from '../../assets/icons/01_The_Anchor.png';
import VaultIcon from '../../assets/icons/02_The_Vault.png';
import RealOneIcon from '../../assets/icons/03_The_Real_One.png';
import DeepOneIcon from '../../assets/icons/04_The_Deep_One.png';
import EmpathIcon from '../../assets/icons/05_The_Empath.png';
import SecureOneIcon from '../../assets/icons/06_The_Secure_One.png';
import SafeSpaceIcon from '../../assets/icons/07_The_Safe_Space.png';
import RockIcon from '../../assets/icons/08_The_Rock.png';
import SparkIcon from '../../assets/icons/09_The_Spark.png';

// App Assets
import OfficialLogo from '../../assets/icons/m8zee_logo_official.png';
import SparkleStar from '../../assets/icons/Mask group (1).png';
import DividerLine from '../../assets/icons/Line 6.png';

// 90 unique answers mapped to behaviors and scores
const behaviorMapppedAnswers = {
  q1: {
    1: "I’m learning how to be more consistent for my friends — every day’s a chance to show up.",
    2: "I try to support my friends and get better at being there when it counts.",
    3: "I’m building my habits to be a steady friend people can lean on.",
    4: "I make an effort to be there for my friends, even if I’m still figuring it out.",
    5: "I show up when it matters and keep improving my friend game.",
    6: "I’m a reliable presence and keep my friends in mind.",
    7: "Friends know they can count on me when they need support.",
    8: "I consistently encourage and back up my friends.",
    9: "I stand by my friends through ups and downs, helping them feel supported.",
    10: "I’m someone my friends trust to be there and lift them up whenever they need me."
  },
  q2: {
    1: "I’m working on being someone friends can open up to safely.",
    2: "I try to earn friends’ trust and listen when they share.",
    3: "I’m growing in being a friend who’s safe to confide in.",
    4: "I make an effort to be someone friends can lean on with personal stuff.",
    5: "I’m dependable when friends share what’s important to them.",
    6: "People feel comfortable sharing with me most of the time.",
    7: "I create a safe space for friends to open up.",
    8: "Friends know they can trust me with what’s on their mind.",
    9: "I’m someone people confide in because they feel safe and heard.",
    10: "People always feel safe sharing with me, knowing I truly listen and care."
  },
  q3: {
    1: "I’m learning how to share my thoughts in kind ways.",
    2: "I try to be honest without hurting friends’ feelings.",
    3: "I’m growing in offering honesty that actually helps.",
    4: "I sometimes share my thoughts in gentle ways that strengthen friendships.",
    5: "I communicate in ways that support my friends and connections.",
    6: "My honesty is thoughtful and nurturing to friendships.",
    7: "I share truth in ways that deepen understanding and trust.",
    8: "I offer honesty that strengthens relationships.",
    9: "I communicate openly while considering my friends’ feelings.",
    10: "I deliver honesty that encourages growth and builds strong, lasting friendships."
  },
  q4: {
    1: "I’m working on being more present when friends are talking.",
    2: "I try to focus and really hear what my friends say.",
    3: "I’m getting better at giving my full attention when it matters.",
    4: "I make an effort to really listen and understand.",
    5: "I listen actively and care about understanding my friends.",
    6: "Friends feel heard when they talk to me.",
    7: "I’m thoughtful and attentive when friends share with me.",
    8: "I focus fully on friends to truly understand them.",
    9: "Friends feel seen and understood because I give them my attention.",
    10: "I’m fully present and listen with both heart and mind."
  },
  q5: {
    1: "I’m learning to notice what my friends are feeling.",
    2: "I try to tune in to how friends are doing emotionally.",
    3: "I’m getting better at picking up on my friends’ moods.",
    4: "I make an effort to check in on how they feel.",
    5: "I notice and care about my friends’ emotions.",
    6: "I respond thoughtfully to how friends are feeling.",
    7: "I’m aware and considerate of my friends’ emotions.",
    8: "Friends feel I notice and value how they’re feeling.",
    9: "I understand and care about my friends’ emotional states.",
    10: "I’m highly attuned to my friends’ feelings and respond with care."
  },
  q6: {
    1: "I’m learning to give friends the space and respect they need.",
    2: "I try to honour friends’ boundaries when I can.",
    3: "I’m growing in understanding and respecting limits.",
    4: "I make an effort to be mindful of friends’ needs.",
    5: "I respect boundaries most of the time.",
    6: "I make sure friends feel comfortable and respected.",
    7: "I consistently honour friends’ space and choices.",
    8: "I adapt to and respect friends’ personal limits.",
    9: "I’m thoughtful and considerate about friends’ boundaries.",
    10: "I fully respect and honour friends’ choices, values, and space."
  },
  q7: {
    1: "I’m learning to embrace my friends as they are.",
    2: "I try to accept friends even when we’re different.",
    3: "I’m growing in letting friends feel comfortable being themselves.",
    4: "I make an effort to accept and appreciate friends’ uniqueness.",
    5: "Friends feel I value them as they are.",
    6: "I welcome friends’ differences and celebrate them.",
    7: "I create a space where friends feel accepted.",
    8: "Friends feel fully themselves when they’re around me.",
    9: "I celebrate friends’ individuality and differences.",
    10: "Everyone feels fully accepted and valued when they’re with me."
  },
  q8: {
    1: "I’m learning to follow through more consistently.",
    2: "I try to be there when friends need me.",
    3: "I’m working on showing up in key moments.",
    4: "I make an effort to be reliable for important things.",
    5: "I usually follow through when it counts.",
    6: "Friends can count on me to be there.",
    7: "I consistently honour my commitments to friends.",
    8: "I’m someone friends can rely on in key moments.",
    9: "Friends trust me to show up when it matters most.",
    10: "I always follow through and am fully present when my friends need me."
  },
  q9: {
    1: "I’m learning to bring more joy to my friends.",
    2: "I try to make friends smile and feel good.",
    3: "I add small moments of positivity when I can.",
    4: "I’m growing in spreading warmth and fun.",
    5: "I bring positivity most of the time.",
    6: "Friends enjoy my presence and energy.",
    7: "I lift moods and make friends feel good around me.",
    8: "My energy brings lightness and warmth to friendships.",
    9: "I consistently bring joy and fun into my friends’ lives.",
    10: "I radiate positive energy, making friendships brighter and happier."
  }
};

const getShortName = (qId) => {
  switch (qId) {
    case 'q1': return 'Supportive';
    case 'q2': return 'Trustworthy';
    case 'q3': return 'Honest';
    case 'q4': return 'Present Listener';
    case 'q5': return 'Emotionally Aware';
    case 'q6': return 'Respectful';
    case 'q7': return 'Accepting';
    case 'q8': return 'Shows Up';
    case 'q9': return 'Positive Energy';
    default: return '';
  }
};

// Top Brand Header
const BrandHeader = () => (
  <div className="final-brand-header">
    <img src={OfficialLogo} alt="m8zee" className="final-brand-logo" />
    <div className="final-brand-tagline">
      <span>SEE YOURSELF. </span>
      <span className="tagline-purple">GROW </span>
      <span>YOUR FRIENDSHIPS.</span>
    </div>
  </div>
);

// Sparkle Checkmark Badge
const DoneCheckBadge = () => (
  <div className="done-badge-wrapper">
    <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="checkGrad" x1="20" y1="20" x2="92" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="haloGrad" x1="0" y1="0" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.3" />
        </linearGradient>
        <filter id="badgeShadow" x="16" y="16" width="80" height="80" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#7C3AED" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Outer soft ambient halo */}
      <circle cx="56" cy="56" r="50" fill="url(#haloGrad)" />

      {/* Decorative dashed orbit ring */}
      <circle cx="56" cy="56" r="44" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.8" />

      {/* Main vibrant gradient badge circle */}
      <circle cx="56" cy="56" r="32" fill="url(#checkGrad)" filter="url(#badgeShadow)" />

      {/* Inner subtle rim highlight */}
      <circle cx="56" cy="56" r="30.5" stroke="#C4B5FD" strokeWidth="1.2" opacity="0.6" fill="none" />

      {/* Bold, rounded crisp white checkmark */}
      <path
        d="M45 56.5L52.5 64L67 47.5"
        stroke="#FFFFFF"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dynamic celebratory sparkles & diamonds */}
      <path d="M88 28L89.8 21.5L91.6 28L98 29.8L91.6 31.6L89.8 38L88 31.6L81.5 29.8L88 28Z" fill="#7C3AED" />
      <path d="M22 32L23.2 27L24.4 32L29.5 33.2L24.4 34.4L23.2 39.5L22 34.4L17 33.2L22 32Z" fill="#A855F7" />
      <path d="M86 78L87.2 73L88.4 78L93.5 79.2L88.4 80.4L87.2 85.5L86 80.4L81 79.2L86 78Z" fill="#8B5CF6" />
      <path d="M19 75L20 71L21 75L25 76L21 77L20 81L19 77L15 76L19 75Z" fill="#C084FC" />

      {/* Tiny floating particle bubbles */}
      <circle cx="36" cy="18" r="2.2" fill="#7C3AED" />
      <circle cx="74" cy="18" r="1.8" fill="#A855F7" />
      <circle cx="14" cy="53" r="2" fill="#C084FC" />
      <circle cx="98" cy="55" r="2.2" fill="#7C3AED" />
      <circle cx="72" cy="94" r="1.8" fill="#A855F7" />
      <circle cx="40" cy="95" r="2.2" fill="#8B5CF6" />
    </svg>
  </div>
);

// Heart Divider Line
const HeartDivider = () => (
  <div className="final-heart-divider">
    <div className="final-divider-line" />
    <svg width="15" height="14" viewBox="0 0 24 22" fill="#7C3AED" className="final-heart-icon">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <div className="final-divider-line" />
  </div>
);

// Feature Icons (Polished reference design)
const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="18" r="10.5" stroke="#7C3AED" strokeWidth="2" />
    <path d="M16 13V18L19.5 20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.5V7" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12.5 3.5H19.5" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M24 9.5L25.8 7.7" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UserHeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="9.5" r="4.5" stroke="#7C3AED" strokeWidth="2" />
    <path d="M8 26.5C8 21.8 11.5 18 16 18C20.5 18 24 21.8 24 26.5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 23.8C16 23.8 13.2 22.2 13.2 20.6C13.2 19.5 14.1 18.8 15 19.2C15.6 19.5 16 20 16 20C16 20 16.4 19.5 17 19.2C17.9 18.8 18.8 19.5 18.8 20.6C18.8 22.2 16 23.8 16 23.8Z" fill="#7C3AED" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="17" width="4.5" height="9.5" rx="1.2" stroke="#7C3AED" strokeWidth="1.8" fill="#F3E8FF" />
    <rect x="13.75" y="11.5" width="4.5" height="15" rx="1.2" stroke="#7C3AED" strokeWidth="1.8" fill="#F3E8FF" />
    <rect x="21.5" y="6" width="4.5" height="20.5" rx="1.2" stroke="#7C3AED" strokeWidth="1.8" fill="#F3E8FF" />
  </svg>
);

// App Store Badge (High-res vector)
const AppStoreBadge = () => (
  <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="store-pill-btn">
    <FaApple className="store-pill-icon" />
    <div className="store-pill-text">
      <span className="store-pill-sub">Download on the</span>
      <span className="store-pill-main">App Store</span>
    </div>
  </a>
);

// Google Play Store Badge (High-res vector)
const GooglePlayBadge = () => (
  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="store-pill-btn">
    <FaGooglePlay className="store-pill-icon" />
    <div className="store-pill-text">
      <span className="store-pill-sub">GET IT ON</span>
      <span className="store-pill-main">Google Play</span>
    </div>
  </a>
);

const Certificate = ({ results, questions, userName, senderName = 'your friend' }) => {
  const navigate = useNavigate();
  const { userScores = {}, archetype = 'The Rock', percentage = 0 } = results || {};
  const certificateRef = useRef(null);

  const getArchetypeIcon = (name) => {
    switch (name) {
      case 'The Anchor': return AnchorIcon;
      case 'The Vault': return VaultIcon;
      case 'The Real One': return RealOneIcon;
      case 'The Deep One': return DeepOneIcon;
      case 'The Empath': return EmpathIcon;
      case 'The Secure One': return SecureOneIcon;
      case 'The Safe Space': return SafeSpaceIcon;
      case 'The Rock': return RockIcon;
      case 'The Spark': return SparkIcon;
      default: return RockIcon;
    }
  };

  const getArchetypeDescription = (name) => {
    switch (name) {
      case 'The Anchor':
        return "Unshakable presence. You’re the calm in the chaos. When things fall apart, you don’t. People feel steadier just knowing you’re there.";
      case 'The Vault':
        return "Safe. Solid. Discreet. You hold what matters. People open up to you because they know their truth is protected — and respected.";
      case 'The Real One':
        return "Truth, delivered with care. You don’t perform. You don’t sugarcoat. Your honesty builds stronger friendships — not fragile ones.";
      case 'The Deep One':
        return "Fully here. When someone talks, you actually listen. People feel seen around you — not just heard.";
      case 'The Empath':
        return "Emotionally fluent. You read the room without trying. You respond with care, not reaction. That’s rare.";
      case 'The Secure One':
        return "Grounded. Mature. Self-aware. You don’t overstep. You don’t cling. You understand that space strengthens connection.";
      case 'The Safe Space':
        return "Zero judgment energy. People exhale around you. You let others be fully themselves — no edits required.";
      case 'The Rock':
        return "Consistency is your brand. You follow through. You mean what you say. In a world of maybes, you’re certain.";
      case 'The Spark':
        return "Light, but never lightweight. You lift moods without forcing it. Your presence adds warmth — not noise.";
      default:
        return "";
    }
  };

  const topStrengths = questions && Array.isArray(questions)
    ? [...questions]
      .sort((a, b) => (userScores[b.id] || 0) - (userScores[a.id] || 0))
      .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
      .slice(0, 3)
    : [];

  const handleDownload = async () => {
    if (certificateRef.current === null) return;
    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        filter: (node) => {
          if (node.classList && node.classList.contains('download-btn-exclude')) {
            return false;
          }
          return true;
        }
      });
      download(dataUrl, `friendship-certificate-${archetype.toLowerCase().replace(/\s+/g, '-')}.png`);
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const getRevampedParagraph = () => {
    const archetypeDesc = getArchetypeDescription(archetype);
    const str1 = topStrengths[0] ? getShortName(topStrengths[0].id) : "";
    const str2 = topStrengths[1] ? getShortName(topStrengths[1].id) : "";

    let behaviorDesc = "";
    if (topStrengths[0]) {
      const score = userScores[topStrengths[0].id] || 0;
      behaviorDesc = behaviorMapppedAnswers[topStrengths[0].id]?.[score] || "";
    }

    const sentences = archetypeDesc.split('.');
    const firstSentence = sentences[0] + ".";
    const restDescription = archetypeDesc.substring(firstSentence.length).trim();

    return (
      <p className="cert-dynamic-paragraph">
        <strong>{firstSentence}</strong> {restDescription}{" "}
        My top friendship strengths are <strong>{str1}</strong> and <strong>{str2}</strong>.{" "}
        {behaviorDesc}
      </p>
    );
  };

  const displaySender = senderName === 'your friend' ? 'your friend' : senderName;

  return (
    <div className="final-screen-wrapper">

      {/* 1. Brand Logo & Tagline Header */}
      <BrandHeader />
      <div className="final-top-border" />

      <div className="final-screen-content">

        {/* 2. "THANKS - YOU'RE DONE!" Header */}
        <h1 className="final-done-heading">
          THANKS – YOU’RE DONE !
        </h1>

        {/* 3. Checkmark Badge with Sparkles */}
        <DoneCheckBadge />

        {/* 4. Friendship Certificate Card (Renderable & Downloadable) */}
        <div className="final-cert-wrapper" style={{ marginTop: '8px', marginBottom: '24px' }}>
          <div
            className="cert-card"
            ref={certificateRef}
            style={{
              background: '#f3e8ff',
              border: '1.5px solid #ddd6fe',
              borderRadius: '24px',
              padding: '28px 20px 28px'
            }}
          >

            <p className="cert-subtitle-text" style={{ marginTop: '4px' }}>
              I discovered my friendship<br />
              profile with <strong>M8ZEE.</strong><br />
              It turns out I am...
            </p>

            <img
              src={getArchetypeIcon(archetype)}
              alt={archetype}
              className="cert-archetype-gem"
            />

            <h3 className="cert-archetype-title">{archetype}</h3>

            <div className="cert-title-divider">
              <img src={DividerLine} className="cert-divider-line-img" alt="" />
              <img src={SparkleStar} className="cert-divider-star-img" alt="Sparkle Star" />
              <img src={DividerLine} className="cert-divider-line-img right-line" alt="" />
            </div>

            <div className="friendship-index-card">
              <div className="index-label">Friendship index</div>
              <div className="index-divider" />
              <div className="index-value">{percentage}%</div>
            </div>

            {getRevampedParagraph()}

            {/* Download Certificate Bar Button inside the card */}
            <button
              className="final-cta-pill-btn download-btn-exclude"
              style={{ marginTop: '16px', marginBottom: '0px' }}
              onClick={handleDownload}
            >
              <span>DOWNLOAD MY CERTIFICATE</span>
              <FaArrowDown className="final-arrow-icon" />
            </button>
          </div>
        </div>

        {/* 5. Anonymous Confirmation Box */}
        <div className="final-anonymous-block">
          <p className="final-anonymous-main">
            Your answers have been anonymously added to <strong>{displaySender}’s</strong> Friendship Profile.
          </p>
          <p className="final-anonymous-sub">
            Your individual answers will never be shown to {displaySender}. They’re combined with feedback from other friends to reveal the bigger picture.
          </p>
        </div>

        {/* 6. "NOW, WHAT KIND OF FRIEND ARE YOU?" Card */}
        <div className="final-promo-card" style={{ marginBottom: '28px' }}>
          <h2 className="promo-card-title">NOW, WHAT KIND OF FRIEND ARE YOU?</h2>

          <p className="promo-card-subtitle">
            You’ve just shared how you see {displaySender}.<br />
            <span className="promo-purple-text">Now discover how you see yourself.</span>
          </p>

          <div className="promo-features-grid">
            <div className="promo-feature-item">
              <div className="promo-icon-circle">
                <ClockIcon />
              </div>
              <span className="promo-feature-label">9 questions</span>
            </div>

            <div className="promo-feature-item">
              <div className="promo-icon-circle">
                <UserHeartIcon />
              </div>
              <span className="promo-feature-label">Discover your Friendship Archetype</span>
            </div>

            <div className="promo-feature-item">
              <div className="promo-icon-circle">
                <BarChartIcon />
              </div>
              <span className="promo-feature-label">Get your own Friendship Index</span>
            </div>
          </div>

          <button
            className="final-cta-pill-btn"
            onClick={() => navigate('/')}
          >
            <span>DISCOVER MY FRIENDSHIP STYLE</span>
            <FaArrowRight className="final-arrow-icon" />
          </button>

          <p className="promo-free-text">Free to try.</p>
        </div>

        {/* 9. "Get m8zee" Store Badges */}
        <div className="final-get-app-section">
          <h3 className="get-app-title">Get m8zee</h3>
          <p className="get-app-subtitle">Continue your journey anytime.</p>
          <div className="get-app-badges-row">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Certificate;
