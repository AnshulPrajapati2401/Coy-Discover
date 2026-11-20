'use client';

import React from 'react';

interface MobileShellProps {
  children: React.ReactNode;
}

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-center items-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-[430px] min-h-dvh sm:min-h-[844px] sm:max-h-[920px] bg-white sm:rounded-[36px] border-0 sm:border-[3px] border-black shadow-none sm:shadow-[8px_8px_0px_#000000] flex flex-col relative overflow-hidden transition-all">
        {children}
      </div>
    </div>
  );
};
