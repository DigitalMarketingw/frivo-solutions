
import React from 'react';

export const WorldMapBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 500"
        className="w-full h-full object-cover"
        fill="currentColor"
      >
        {/* Simplified world map paths */}
        <path d="M158 206c-1 3-3 4-6 3-2-1-3-3-2-5 1-3 3-4 6-3 2 1 3 3 2 5z" className="text-primary" />
        <path d="M400 180c-15 2-30 8-42 18-8 7-14 16-18 26-3 8-4 17-2 25 2 9 7 17 14 23 12 10 28 15 43 13 8-1 15-4 21-9 6-5 10-12 12-19 2-8 2-16-1-24-3-8-8-15-15-20-7-5-15-8-24-8-3 0-6 0-9 1z" className="text-primary" />
        <path d="M200 220c-8 0-15 3-20 8-5 5-8 12-8 19 0 7 3 14 8 19 5 5 12 8 19 8 8 0 15-3 20-8 5-5 8-12 8-19 0-7-3-14-8-19-5-5-12-8-19-8z" className="text-primary" />
        <path d="M600 160c-20 5-35 20-40 40-2 10-1 20 4 29 5 9 13 16 23 20 10 4 21 4 31 1 10-3 19-9 25-17 6-8 9-18 8-28-1-10-5-19-12-26-7-7-16-12-26-14-4-1-9-1-13-1z" className="text-primary" />
        <path d="M750 200c-12 2-22 10-27 21-3 7-4 15-2 22 2 7 6 13 12 17 6 4 13 6 20 6 7 0 14-2 20-6 6-4 10-10 12-17 2-7 1-15-2-22-3-7-8-13-15-17-7-4-15-5-22-4z" className="text-primary" />
        <path d="M300 280c-10 1-19 6-25 14-4 5-6 11-6 17 0 6 2 12 6 17 6 8 15 13 25 14 10 1 20-2 27-9 4-4 7-9 8-15 1-6 0-12-2-17-4-10-12-18-22-21-3-1-7-1-11 0z" className="text-primary" />
        <path d="M500 300c-15 3-27 15-30 30-1 8 0 16 4 23 4 7 10 12 18 15 8 3 17 3 25 0 8-3 14-8 18-15 4-7 5-15 4-23-1-8-4-15-9-21-5-6-12-10-20-12-3-1-7-1-10 0z" className="text-primary" />
      </svg>
    </div>
  );
};
