import React from 'react';

export default function Header() {
  return (
    <section className="text-center pt-8 flex flex-col items-center justify-center text-primary source-sans relative">
      <img src="/images/flower.svg" alt="bg" width="200" height="200" className="absolute top-[-100px] left-[-250px] w-[200px] h-[200px] z-[-1] hidden md:block" />
      <img src="/images/logo.svg" alt="Logo de The Design Society" width="400" height="200" className="w-2/3 md:w-1/3 mx-auto" />
      <div className="my-24 md:my-48 max-w-xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 bowlby">Un cercle pas si fermé de designers très ouverts.</h1>
        <p className="text-base md:text-lg text-gray-70">
          <strong>The Design Society</strong>, c'est tout nouveau, tout frais : une communauté lyonnaise née de l'envie de rassembler celles et ceux qui font le design aujourd'hui — et qui imaginent celui de demain.
        </p>
        <div className="flex justify-center space-x-6 py-4">
          <a href="https://thedesignsociety.eventbrite.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-accent transition-colors">
            <svg height="24px" width="24px" viewBox="0 0 1000 1213.9"><g><path d="M917 814.9L515.3 501.7c-6.7-5.1.2-15.4 7.5-11.3l156.9 87.9c71.1 39.9 161 16.8 204.1-52.4 45.4-73 21.4-169.1-53.2-212.2L600.4 180.6c-7.3-4.3-1.9-15.3 6-12.2l105.8 42.3c.2.1 2.7 1 3.7 1.3 11.2 3.9 23.3 6.1 35.9 6.1 57.4 0 104.5-45.4 108.6-99.4C865.5 48.9 812 0 748.2 0h-489c-62.8 0-115.5 51.3-114.7 113.9.4 33.3 15.3 63 38.7 83.4 17.6 15.3 76.9 62.8 105.1 85.3 5 4 2.2 12.1-4.3 12.1h-97.9C83.2 295.3 0 378.9 0 482c0 52.1 21.3 99.2 55.6 133.1l566.6 538.5c40.1 37.4 93.9 60.3 153.1 60.3 124.1 0 224.7-100.6 224.7-224.7 0-70.3-32.4-133.1-83-174.3z" fill="currentColor"></path></g></svg>
          </a>
          <a href="https://www.instagram.com/thedesignsociety_lyon/" className="text-2xl hover:text-accent transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill='currentColor'/></svg>
          </a>
          <a href="https://www.linkedin.com/company/the-design-society-lyon/" className="text-2xl hover:text-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" fill='currentColor'/></svg>
          </a>
        </div>
      </div>
    </section>
  );
} 