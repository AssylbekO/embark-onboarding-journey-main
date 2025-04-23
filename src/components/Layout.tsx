
import React, { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-quest-neutral">
          <p>© {new Date().getFullYear()} Onboarding Quest. All rights reserved.</p>
          <p className="mt-1">Powered by Company XYZ</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
