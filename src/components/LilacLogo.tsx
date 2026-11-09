import React from 'react';

export const LilacFlower: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-[30px] h-[30px]',
  color = '#9773c1',
}) => {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 48 48"
      aria-hidden="true"
      style={{ color }}
    >
      <g fill="currentColor">
        <ellipse cx="24" cy="13" rx="7" ry="12" />
        <ellipse cx="24" cy="13" rx="7" ry="12" transform="rotate(72 24 24)" />
        <ellipse cx="24" cy="13" rx="7" ry="12" transform="rotate(144 24 24)" />
        <ellipse cx="24" cy="13" rx="7" ry="12" transform="rotate(216 24 24)" />
        <ellipse cx="24" cy="13" rx="7" ry="12" transform="rotate(288 24 24)" />
      </g>
      <circle cx="24" cy="24" r="4" fill="#faf9f6" />
    </svg>
  );
};

export const LilacBrandMark: React.FC<{
  className?: string;
  flowerClass?: string;
  isFooter?: boolean;
}> = ({
  className = '',
  flowerClass = 'w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]',
  isFooter = false,
}) => {
  return (
    <span
      className={`brand inline-flex items-center gap-[9px] font-sans font-bold text-[#1d1d1f] tracking-[-0.05em] select-none whitespace-nowrap ${
        isFooter ? 'text-[17px]' : 'text-[25px] sm:text-[26px]'
      } ${className}`}
    >
      <LilacFlower className={isFooter ? 'w-[30px] h-[30px]' : flowerClass} />
      <span>
        <span>LILAC</span>
        {/* S도 검정색으로 */}
        <span className="text-[#1d1d1f]">S</span>
        <span
          className={`font-medium tracking-normal text-[#626269] ${
            isFooter ? 'text-[13px] sm:text-[14px]' : 'text-[16px]'
          }`}
        >
          {' '}
          LAB
        </span>
      </span>
    </span>
  );
};
