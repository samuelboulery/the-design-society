import React, { useState, useEffect } from 'react';

const SUBJECT_TYPES = [
  { value: 'speaker', label: 'Proposer un speaker' },
  { value: 'idea', label: 'Proposer une idée' },
  { value: 'place', label: 'Proposer un lieu' },
  { value: 'partnership', label: 'Proposer un partenariat' },
  { value: 'other', label: 'Autre' }
];

// Configuration du rate limiting
const RATE_LIMIT = {
  maxRequests: 3,
  timeWindow: 3600000, // 1 heure en millisecondes
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    subjectType: '',
    message: '',
    contact: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [requestCount, setRequestCount] = useState(0);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [isHuman, setIsHuman] = useState(false);

  // Nettoyer le rate limiting toutes les heures
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastRequestTime > RATE_LIMIT.timeWindow) {
        setRequestCount(0);
      }
    }, RATE_LIMIT.timeWindow);

    return () => clearInterval(interval);
  }, [lastRequestTime]);

  // Validation des entrées
  const validateInput = (input) => {
    // Supprimer les caractères potentiellement dangereux
    return input.replace(/[<>]/g, '');
  };

  const validateContact = (contact) => {
    // Vérifier que le contact n'est pas vide et a une longueur raisonnable
    if (!contact || contact.length < 3 || contact.length > 200) {
      return false;
    }

    // Vérifier que le contact ne contient pas de caractères dangereux
    const dangerousChars = /[<>{}[\]\\]/;
    if (dangerousChars.test(contact)) {
      return false;
    }

    // Vérifier si c'est un numéro de téléphone
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    const isPhone = phoneRegex.test(contact.replace(/\s+/g, ''));

    // Vérifier si c'est un autre type de contact (email, site web, etc.)
    const hasSpecialChar = /[@./]/.test(contact);

    return isPhone || hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification du rate limiting
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT.timeWindow && requestCount >= RATE_LIMIT.maxRequests) {
      setStatus({ 
        type: 'error', 
        message: `Trop de tentatives. Merci de réessayer dans ${Math.ceil((RATE_LIMIT.timeWindow - (now - lastRequestTime)) / 60000)} minutes.` 
      });
      return;
    }

    // Validation de l'humanité
    if (!isHuman) {
      setStatus({ type: 'error', message: 'Veuillez confirmer que vous n\'êtes pas un robot.' });
      return;
    }

    // Validation des entrées
    const sanitizedMessage = validateInput(formData.message);
    if (!validateContact(formData.contact)) {
      setStatus({ 
        type: 'error', 
        message: 'Veuillez fournir un moyen de contact valide (email, téléphone, site web, réseau social, etc.).' 
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL;
      const webhookPath = new URL(webhookUrl).pathname;

      const response = await fetch(`/api/slack${webhookPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `*Nouveau message de contact*\n\n*Type:* ${SUBJECT_TYPES.find(t => t.value === formData.subjectType)?.label}\n*Message:* ${sanitizedMessage}\n*Contact:* ${formData.contact}`
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de l\'envoi');

      // Mise à jour du rate limiting
      setRequestCount(prev => prev + 1);
      setLastRequestTime(now);

      setStatus({ type: 'success', message: 'Youpii ! Ton message est parti !' });
      setFormData({ subjectType: '', message: '', contact: '' });
      setIsHuman(false);
    } catch (error) {
      console.error('Erreur:', error);
      setStatus({ type: 'error', message: 'Oh oh, une erreur est survenue ! Essaye à nouveau.' });
    }
  };

  return (
    <section className="py-8  mt-48 text-primary source-sans">
      <h2 className="text-4xl bowlby mb-4 text-center">Envie de papoter ?</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="subjectType" className="block text-sm font-medium text-gray-700 mb-1">
            Le sujet de ton message
          </label>
          <select
            id="subjectType"
            value={formData.subjectType}
            onChange={(e) => setFormData({ ...formData, subjectType: e.target.value })}
            className="w-full p-2 border border-primary border-2 focus:border-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          >
            <option value="">Sélectionne une option</option>
            {SUBJECT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Ton super message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: validateInput(e.target.value) })}
            className="w-full p-2 border border-primary border-2 focus:border-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows="4"
            required
            maxLength={1000}
          />
        </div>

        <div className="relative">
          <label htmlFor="Ton contact" className="block text-sm font-medium text-gray-700 mb-1">
            Ton contact
          </label>
          <input
            type="text"
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-2 border border-primary border-2 focus:border-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
            placeholder="Email, téléphone, site web, réseau social, etc."
          />
          <p className="mt-1 text-sm text-gray-500">
            Ex : bruce@wayne.com, +33612345678, @batman
          </p>
          <img src="/images/star.svg" alt="star" className="absolute top-[-40px] right-[-75px] z-[-1] w-1/4" />
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="isHuman" className="relative flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              id="isHuman"
              checked={isHuman}
              onChange={(e) => setIsHuman(e.target.checked)}
              className="peer absolute opacity-0 w-0 h-0"
            />
            <span className="h-6 w-6 flex items-center justify-center border-2 border-primary bg-white peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/20 transition-all duration-150 rounded-none">
              {isHuman && (
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="ml-2 text-sm text-primary">Je confirme que je ne suis pas un vilain robot</span>
          </label>
        </div>

        {status.message && (
          <div className={`p-3 ${
            status.type === 'error' ? 'bg-red-100 text-red-700' :
            status.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {status.message}
          </div>
        )}

        <button
          type="submit"
          className={`self-start inline-block mt-4 px-6 py-2 ${
            status.type === 'loading' || !isHuman
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-black'
          } text-white transition-colors`}
          disabled={status.type === 'loading' || !isHuman}
          title={
            status.type === 'loading'
              ? 'Envoi en cours, veuillez patienter...'
              : !isHuman
              ? 'Du dois d\'abords confirmer que tu n\'es pas un robot'
              : ''
          }
        >
          {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer mon message'}
        </button>
      </form>
    </section>
  );
} 