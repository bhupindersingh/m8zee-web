import React, { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

// New Archetype PNG icons from Desktop's 9images folder
import AnchorIcon from '../../assets/icons/the anchor.png';
import DeepOneIcon from '../../assets/icons/the deep one.png';
import EmpathIcon from '../../assets/icons/the empath.png';
import RealOneIcon from '../../assets/icons/the mirror.png';
import RockIcon from '../../assets/icons/the rock.png';
import SafeSpaceIcon from '../../assets/icons/the safe.png';
import SecureOneIcon from '../../assets/icons/the secure.png';
import SparkIcon from '../../assets/icons/the spark.png';
import VaultIcon from '../../assets/icons/the vault.png';

// App Logo
import M8zeeLogo from '../../assets/icons/m8zee_logo.png';
import PurpleChevron from '../../assets/icons/purple_chevron.png';
import SparkleStar from '../../assets/icons/Mask group (1).png';
import DividerLine from '../../assets/icons/Line 6.png';

// 90 unique answers mapped to behaviors and scores
const behaviorMapppedAnswers = {
  q1: { // Steady Support
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
  q2: { // Trustworthy
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
  q3: { // Honest
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
  q4: { // Present Listener
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
  q5: { // Emotionally Aware
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
  q6: { // Respects Boundaries
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
  q7: { // Accepting
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
  q8: { // Shows Up
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
  q9: { // Positive Energy
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

const Certificate = ({ results, questions, userName }) => {
  const { scores = {}, userScores = {}, topCategory, archetype, percentage } = results;
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

  const topStrengths = [...questions]
    .sort((a, b) => (userScores[b.id] || 0) - (userScores[a.id] || 0))
    .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
    .slice(0, 3);

  const handleDownload = async () => {
    if (certificateRef.current === null) return;
    try {
      const dataUrl = await toPng(certificateRef.current, { cacheBust: true, pixelRatio: 2 });
      download(dataUrl, `friendship-certificate-${archetype.toLowerCase().replace(/\s+/g, '-')}.png`);
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Friendship Style',
          text: `I discovered my friendship profile with M8ZEE. It turns out I am ${archetype}!`,
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

  return (
    <div className="quiz-wrapper">
      <div className="certificate-container">
        
        {/* Certificate Card (Rendered for downloading as PNG) */}
        <div className="cert-card" ref={certificateRef} style={{ background: '#ffffff', border: '1px solid #F3F4F6' }}>
          
          {/* Logo Header Row */}
          <div className="cert-header-logo-row">
            <img src={DividerLine} className="cert-divider-line-img" alt="" />
            <img src={M8zeeLogo} className="cert-header-logo" alt="M8ZEE Logo" />
            <img src={DividerLine} className="cert-divider-line-img right-line" alt="" />
          </div>

          {/* Subtitle */}
          <p className="cert-subtitle-text">
            I discovered my friendship<br />
            profile with <strong>M8ZEE.</strong><br />
            It turns out I am...
          </p>

          {/* Large Gem Icon */}
          <img 
            src={getArchetypeIcon(archetype)} 
            alt={archetype} 
            className="cert-archetype-gem" 
          />

          {/* Archetype Title */}
          <h3 className="cert-archetype-title">{archetype}</h3>

          {/* Sparkle Divider */}
          <div className="cert-title-divider">
            <img src={DividerLine} className="cert-divider-line-img" alt="" />
            <img src={SparkleStar} className="cert-divider-star-img" alt="Sparkle Star" />
            <img src={DividerLine} className="cert-divider-line-img right-line" alt="" />
          </div>

          {/* Friendship Index Card */}
          <div className="friendship-index-card">
            <div className="index-label">Friendship index</div>
            <div className="index-divider" />
            <div className="index-value">{percentage}%</div>
          </div>

          {/* Dynamic Personalized Paragraph */}
          {getRevampedParagraph()}

        </div>

        {/* Action Buttons: High-fidelity interactive cards */}
        <button className="interactive-card-btn share-btn" onClick={handleShare}>
          <img src={M8zeeLogo} className="btn-logo" alt="Share" />
          <div className="btn-divider" />
          <div className="btn-text">
            <div className="btn-text-top">I discovered my friendship profile</div>
            <div className="btn-text-bottom">Now discover yours</div>
          </div>
          <img src={PurpleChevron} className="btn-chevron-img" alt="" />
        </button>

        <button className="interactive-card-btn download-btn" onClick={handleDownload}>
          <img src={M8zeeLogo} className="btn-logo" alt="Download" />
          <div className="btn-divider" />
          <div className="btn-text">
            <div className="btn-text-top">Download my certificate</div>
            <div className="btn-text-bottom">Save as image</div>
          </div>
          <img src={PurpleChevron} className="btn-chevron-img" alt="" />
        </button>

      </div>
    </div>
  );
};

export default Certificate;
