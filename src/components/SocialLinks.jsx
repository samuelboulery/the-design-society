import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function SocialLinks() {
  return (
    <section className="flex justify-center space-x-6 py-4">
      <a href="https://thedesignsociety.eventbrite.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10zm-1-15h2v2h-2V7zm0 4h2v6h-2v-6z"/>
        </svg>
      </a>
      <a href="https://www.instagram.com/thedesignsociety_lyon/" className="text-2xl"><FaInstagram /></a>
      <a href="https://www.linkedin.com/company/the-design-society-lyon/" className="text-2xl"><FaLinkedin /></a>
    </section>
  );
}