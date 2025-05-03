import React from 'react';

export default function About() {
  return (
    <>
      <section className="py-8">
        <p className="text-lg text-gray-70 mb-8">
            Notre ambition ? Créer un espace vivant où les designers peuvent se retrouver, s'inspirer, apprendre les un·es des autres, et faire évoluer ensemble nos pratiques.
          </p>

        <div className="flex flex-col md:flex-row gap-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700">
            Nous lançons cette aventure avec l'envie d'organiser des rencontres, des talks, des moments informels — bref, de faire du lien.
            Tu es UX, UI, DA, produit, ou simplement curieux·se de design ? Rejoins-nous, tout commence maintenant.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <img src="/images/about.png" alt="The Design Society" className="w-full rounded-lg h-auto" />
        </div>
        </div>

      </section>
    </>
  );
}