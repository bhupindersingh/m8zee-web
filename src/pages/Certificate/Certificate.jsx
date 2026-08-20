import { FaApple, FaGooglePlay, FaArrowRight } from 'react-icons/fa';
// Commented out unused imports for certificate preview
// import AnchorIcon from '../../assets/icons/01_The_Anchor.png';
// import VaultIcon from '../../assets/icons/02_The_Vault.png';
// import RealOneIcon from '../../assets/icons/03_The_Real_One.png';
// import DeepOneIcon from '../../assets/icons/04_The_Deep_One.png';
// import EmpathIcon from '../../assets/icons/05_The_Empath.png';
// import SecureOneIcon from '../../assets/icons/06_The_Secure_One.png';
// import SafeSpaceIcon from '../../assets/icons/07_The_Safe_Space.png';
// import RockIcon from '../../assets/icons/08_The_Rock.png';
// import SparkIcon from '../../assets/icons/09_The_Spark.png';
// import SparkleStar from '../../assets/icons/Mask group (1).png';
// import DividerLine from '../../assets/icons/Line 6.png';
// import html2canvas from 'html2canvas';

// Assets
import OfficialLogo from '../../assets/icons/m8zee_logo_official.png';
import '../../App.css';

/* ==========================================================================
   COMMENTED OUT CERTIFICATE DATA & LOGIC (PRESERVED FOR FUTURE USE)
   ==========================================================================

// 90 unique answers mapped to behaviors and scores
const behaviorMapppedAnswers = {
  q1: {
    1: "Your friends feel you’re still developing how consistently you show up for them.",
    2: "Your friends see you making an effort to support them and be there when it counts.",
    3: "Your friends see you becoming a steadier source of support.",
    4: "Your friends feel you make an effort to be there for them.",
    5: "Your friends experience you as someone who shows up when it matters.",
    6: "Your friends see you as a reliable presence who keeps them in mind.",
    7: "Your friends know they can count on you when they need support.",
    8: "Your friends consistently experience your encouragement and support.",
    9: "Your friends feel you stand by them through the ups and downs.",
    10: "Your friends see you as someone they can truly rely on to be there and lift them up."
  },
  q2: {
    1: "Your friends feel you’re still developing the trust that helps them open up.",
    2: "Your friends see you making an effort to listen and earn their trust.",
    3: "Your friends are beginning to experience you as someone they can confide in.",
    4: "Your friends feel you make an effort to be someone they can share personal things with.",
    5: "Your friends generally feel comfortable sharing what matters to them with you.",
    6: "Your friends feel comfortable opening up to you.",
    7: "Your friends experience you as someone who creates a safe space to talk.",
    8: "Your friends know they can trust you with what’s on their mind.",
    9: "Your friends see you as someone they can confide in and feel heard by.",
    10: "Your friends feel completely safe opening up to you, knowing you’ll listen and care."
  },
  q3: {
    1: "Your friends feel you’re still developing how you share your thoughts with care.",
    2: "Your friends see you learning to be honest while considering their feelings.",
    3: "Your friends are beginning to experience your honesty as helpful and considerate.",
    4: "Your friends feel you make an effort to share your thoughts in a thoughtful way.",
    5: "Your friends sometimes experience your honesty as gentle and supportive.",
    6: "Your friends generally experience your honesty as supportive of the friendship.",
    7: "Your friends see your honesty as thoughtful and considerate.",
    8: "Your friends feel your honesty helps deepen understanding and trust.",
    9: "Your friends experience your honesty as something that strengthens the friendship.",
    10: "Your friends see you as someone who communicates openly and honestly while genuinely considering their feelings."
  },
  q4: {
    1: "Your friends feel you’re still developing how present you are when they’re talking.",
    2: "Your friends see you making an effort to focus and hear what they’re saying.",
    3: "Your friends are beginning to experience more of your attention when it matters.",
    4: "Your friends feel you make an effort to listen and understand them.",
    5: "Your friends experience you as someone who listens with genuine interest.",
    6: "Your friends generally feel heard when they talk to you.",
    7: "Your friends experience you as thoughtful and attentive when they share.",
    8: "Your friends feel you give them your full attention and try to understand.",
    9: "Your friends feel genuinely seen and understood when they talk to you.",
    10: "Your friends experience you as fully present, listening with both care and understanding."
  },
  q5: {
    1: "Your friends feel you’re still developing how much you notice what they’re feeling.",
    2: "Your friends see you making an effort to tune in to how they’re doing emotionally.",
    3: "Your friends are beginning to feel that you pick up on their moods and emotions.",
    4: "Your friends feel you make an effort to notice and check in on how they feel.",
    5: "Your friends generally feel that you notice and care about their emotions.",
    6: "Your friends experience you as thoughtful about how they’re feeling.",
    7: "Your friends see you as emotionally aware and considerate.",
    8: "Your friends feel you notice and value how they’re feeling.",
    9: "Your friends experience you as someone who understands and cares about their emotional state.",
    10: "Your friends see you as highly attuned to their feelings and consistently responsive with care."
  },
  q6: {
    1: "Your friends feel you’re still developing how consistently you respect their boundaries.",
    2: "Your friends see you making an effort to respect their need for space and personal limits.",
    3: "Your friends are beginning to experience greater respect for their boundaries from you.",
    4: "Your friends feel you make an effort to be mindful of their individual needs.",
    5: "Your friends generally feel their boundaries are respected by you.",
    6: "Your friends feel comfortable and respected around you.",
    7: "Your friends experience you as someone who consistently respects their space and choices.",
    8: "Your friends feel you understand and respect their personal limits.",
    9: "Your friends see you as thoughtful and considerate about their boundaries.",
    10: "Your friends feel you fully respect their choices, values, boundaries and personal space."
  },
  q7: {
    1: "Your friends feel you’re still developing how fully accepted they feel around you.",
    2: "Your friends see you making an effort to accept them even when you’re different.",
    3: "Your friends are beginning to feel more comfortable being themselves around you.",
    4: "Your friends feel you make an effort to appreciate what makes them different.",
    5: "Your friends generally feel valued by you for who they are.",
    6: "Your friends feel their differences are welcomed and appreciated by you.",
    7: "Your friends experience you as someone who creates a space where they can feel accepted.",
    8: "Your friends feel comfortable being fully themselves around you.",
    9: "Your friends feel their individuality is genuinely celebrated by you.",
    10: "Your friends feel completely accepted, valued and free to be themselves around you."
  },
  q8: {
    1: "Your friends feel you’re still developing how consistently you follow through.",
    2: "Your friends see you making an effort to be there when they need you.",
    3: "Your friends are beginning to see you show up more in the moments that matter.",
    4: "Your friends feel you make an effort to be reliable for important things.",
    5: "Your friends generally experience you as someone who follows through when it counts.",
    6: "Your friends feel they can count on you to be there.",
    7: "Your friends experience you as someone who consistently honours your commitments.",
    8: "Your friends see you as someone they can rely on in important moments.",
    9: "Your friends trust you to show up when it matters most.",
    10: "Your friends see you as someone who consistently follows through and is there when they need you."
  },
  q9: {
    1: "Your friends feel you’re still developing how much positive energy you bring to the friendship.",
    2: "Your friends see you making an effort to bring enjoyment and positivity.",
    3: "Your friends experience small moments of positivity and warmth from you.",
    4: "Your friends are beginning to experience more warmth and enjoyment in your company.",
    5: "Your friends generally experience you as a positive presence.",
    6: "Your friends enjoy your company and the energy you bring.",
    7: "Your friends feel you lift their mood and make them feel good around you.",
    8: "Your friends experience your energy as bringing lightness and warmth to the friendship.",
    9: "Your friends consistently experience you as someone who brings joy and positive energy.",
    10: "Your friends see you as an exceptionally positive presence who makes their friendships feel brighter and happier."
  }
};

const getShortName = (qId) => {
  switch (qId) {
    case 'q1': return 'Steady Support';
    case 'q2': return 'Trustworthy';
    case 'q3': return 'Kindly Honest';
    case 'q4': return 'Present Listener';
    case 'q5': return 'Emotionally Aware';
    case 'q6': return 'Respects Boundaries';
    case 'q7': return 'Accepting';
    case 'q8': return 'Shows Up';
    case 'q9': return 'Positive Energy';
    default: return '';
  }
};

const getArchetypeIcon = (archetype) => {
  switch (archetype) {
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

const getArchetypeDescription = (archetype) => {
  switch (archetype) {
    case 'The Anchor':
      return "Stability is your superpower. In a busy, unpredictable world, you're the friend who keeps everyone grounded. People trust your consistency and lean on your steady presence.";
    case 'The Vault':
      return "Discretion is your gift. You hold secrets like treasures and create unmatched trust. Friends know that what is shared with you stays with you, forever.";
    case 'The Real One':
      return "Authenticity is your badge of honor. You speak the truth with care and live genuinely. Friends treasure your honesty because they know it always comes from a good place.";
    case 'The Deep One':
      return "Connection is your focus. You listen to what is said and unsaid. Friends feel genuinely heard, understood, and validated in your presence.";
    case 'The Empath':
      return "Understanding is your nature. You sense emotions before words are spoken. Friends feel safe, held, and emotionally supported in your warmth.";
    case 'The Secure One':
      return "Acceptance is your foundation. You embrace friends without conditions, honoring their freedom and individuality with complete security.";
    case 'The Safe Space':
      return "Peace is your aura. You welcome flaws and create a sanctuary where friends can take off their armor and simply be themselves.";
    case 'The Rock':
      return "Consistency is your brand. You follow through. You mean what you say. In a world of maybes, you're certain.";
    case 'The Spark':
      return "Joy is your specialty. You bring light into dark rooms and turn ordinary moments into memories. Your presence lifts spirits effortlessly.";
    default:
      return "A steadfast, reliable companion whose presence makes every friendship richer, deeper, and more meaningful.";
  }
};
========================================================================== */

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

      {/* Celebratory sparkles & diamonds */}
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

// Feature Icons
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
    <rect x="13.7" y="11" width="4.5" height="15.5" rx="1.2" stroke="#7C3AED" strokeWidth="1.8" fill="#F3E8FF" />
    <rect x="21.5" y="6" width="4.5" height="20.5" rx="1.2" stroke="#7C3AED" strokeWidth="1.8" fill="#F3E8FF" />
    <path d="M4 28.5H28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// App Store Badges
const AppStoreBadge = () => (
  <a
    href="https://apps.apple.com/app/m8zee/id6739818817"
    target="_blank"
    rel="noopener noreferrer"
    className="store-pill-btn"
  >
    <FaApple className="store-pill-icon" />
    <div className="store-pill-text">
      <span className="store-pill-sub">Download on the</span>
      <span className="store-pill-main">App Store</span>
    </div>
  </a>
);

const GooglePlayBadge = () => (
  <a
    href="https://play.google.com/store/apps/details?id=com.m8zee"
    target="_blank"
    rel="noopener noreferrer"
    className="store-pill-btn"
  >
    <FaGooglePlay className="store-pill-icon" />
    <div className="store-pill-text">
      <span className="store-pill-sub">GET IT ON</span>
      <span className="store-pill-main">Google Play</span>
    </div>
  </a>
);

const Certificate = ({ senderName = 'your friend' }) => {
  const displaySender = senderName === 'your friend' ? 'your friend' : senderName;

  /* ==========================================================================
     COMMENTED OUT CERTIFICATE LOGIC & DOWNLOAD HANDLERS (PRESERVED)
     ==========================================================================
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const archetype = results?.archetype || 'The Rock';
  const percentage = results?.percentage || 88;
  const userScores = results?.userScores || {};
  const topStrengths = results?.topStrengths || [];

  const handleDownload = async () => {
    if (!certificateRef.current || downloading) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#f3e8ff',
        ignoreElements: (element) => element.classList.contains('download-btn-exclude')
      });
      const link = document.createElement('a');
      link.download = `M8ZEE_Friendship_Certificate_${archetype.replace(/\\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Error downloading certificate:", err);
    } finally {
      setDownloading(false);
    }
  };
  ========================================================================== */

  const handleDiscoverClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(userAgent) && !window.MSStream;

    if (isIOS) {
      window.open('https://apps.apple.com/app/m8zee/id6739818817', '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://play.google.com/store/apps/details?id=com.m8zee', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="final-screen-wrapper">

      {/* 1. Brand Logo & Tagline Header */}
      <BrandHeader />
      <div className="final-top-border" />

      <div className="final-screen-content">

        {/* 2. "THANKS – YOU'RE DONE! 💜" Header */}
        <h1 className="final-done-heading">
          <span>THANKS – YOU’RE DONE!</span>
          <svg width="24" height="22" viewBox="0 0 24 22" fill="#7C3AED" className="final-heading-heart" aria-label="Purple Heart">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </h1>

        {/* 3. Celebratory Sparkle Checkmark Badge */}
        <DoneCheckBadge />

        {/* 4. Anonymous Confirmation Box */}
        <div className="final-anonymous-block">
          <p className="final-anonymous-main">
            Your answers have been anonymously added to <strong>{displaySender}’s</strong> Friendship Profile.
          </p>
          <p className="final-anonymous-sub">
            Your individual answers will never be shown to {displaySender}. They’re combined with feedback from other friends to reveal the bigger picture.
          </p>
        </div>

        {/* 5. "NOW, WHAT KIND OF FRIEND ARE YOU?" Promo Card */}
        <div className="final-promo-card">
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
            onClick={handleDiscoverClick}
          >
            <span>DISCOVER MY FRIENDSHIP STYLE</span>
            <FaArrowRight className="final-arrow-icon" />
          </button>

          <p className="promo-free-text">Free to try.</p>
        </div>

        {/* 6. "Get m8zee" Store Badges */}
        <div id="get-app-section" className="final-get-app-section">
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
