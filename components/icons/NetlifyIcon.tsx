import React from 'react';

export const NetlifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    color="#00c7b7"
  >
    <path d="M5.5 16.5-1.9 9.1A2 2 0 0 1 .5 6h15a2 2 0 0 1 1.9 3.1L9.5 22a2 2 0 0 1-3.8-.1L2 14.6" />
    <path d="m15.5 11.5 5.9-7.4A2 2 0 0 1 23.5 1h-15a2 2 0 0 0-1.9 3.1L13.5 17a2 2 0 0 0 3.8-.1l3.6-7.4" />
  </svg>
);
