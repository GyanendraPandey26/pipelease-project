import React from 'react';
import { BUSINESS_NAME } from '../constants';

interface LogoProps {
  variant?: 'dark' | 'light';
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const LogoMark: React.FC<{ sizeClass?: string; fillDark?: boolean }> = ({
  sizeClass = 'w-9 h-9',
  fillDark = false,
}) => {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} shrink-0`}
      aria-hidden="true"
    >
      <rect
        width="44"
        height="44"
        rx="12"
        fill={fillDark ? '#18181B' : '#FFB020'}
      />
      {/* Stylized plumbing pipe P mark with clean pipe elbows */}
      <path
        d="M14 32V14C14 12.8954 14.8954 12 16 12H24C27.866 12 31 15.134 31 19C31 22.866 27.866 26 24 26H19V32"
        stroke={fillDark ? '#FFB020' : '#18181B'}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="23.5"
        cy="19"
        r="2"
        fill={fillDark ? '#FFB020' : '#18181B'}
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  iconOnly = false,
  size = 'md',
  className = '',
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#18181B]';

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark
        sizeClass={size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'}
        fillDark={variant === 'light'}
      />
      {!iconOnly && (
        <span
          className={`font-heading font-bold tracking-tight text-xl sm:text-2xl ${textColor}`}
        >
          {BUSINESS_NAME}
        </span>
      )}
    </div>
  );
};
