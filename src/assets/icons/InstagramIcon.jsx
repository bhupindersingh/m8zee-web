import React from 'react';

export const InstagramIcon = (props) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="instaGradient" x1="30" y1="0" x2="30" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#B775DA"/>
        <stop offset="1" stopColor="#E9A4E5"/>
      </linearGradient>
    </defs>
    <circle cx="30" cy="30" r="30" fill="url(#instaGradient)"/>
    <rect x="20" y="20" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
    <circle cx="30" cy="30" r="4" stroke="white" strokeWidth="2"/>
    <circle cx="36" cy="24" r="1" fill="white"/>
  </svg>
);
