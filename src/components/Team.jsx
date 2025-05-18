import React from 'react';

const members = [
  { 
    name: 'Samuel Boulery', 
    role: 'System Designer',
    image: 'https://zivarhyllnumdxwutskw.supabase.co/storage/v1/object/public/images/team/sam.webp',
    linkedin: 'https://www.linkedin.com/in/samuel-boulery/'
  },
  { 
    name: 'Daniela Moncada', 
    role: 'UX/UI Designer',
    image: 'https://zivarhyllnumdxwutskw.supabase.co/storage/v1/object/public/images/team/dani.webp',
    linkedin: 'https://www.linkedin.com/in/daniela-moncada-alvarez/'
  },
  { 
    name: 'Floriane Julliard', 
    role: 'System Designer',
    image: 'https://zivarhyllnumdxwutskw.supabase.co/storage/v1/object/public/images/team/flo.webp',
    linkedin: 'https://www.linkedin.com/in/floriane-julliard/'
  },
  { 
    name: 'Loic Pelletier', 
    role: 'Lead Product Designer',
    image: 'https://zivarhyllnumdxwutskw.supabase.co/storage/v1/object/public/images/team/loic.webp',
    linkedin: 'https://www.linkedin.com/in/loicpelletier/'
  },
  { 
    name: 'Léa Maurin', 
    role: 'UX/UI Designer',
    image: 'https://zivarhyllnumdxwutskw.supabase.co/storage/v1/object/public/images/team/lea.webp',
    linkedin: 'https://www.linkedin.com/in/l%C3%A9a-maurin-b90061a4/'
  }
];

export default function Team() {
  return (
    <section className="mt-16 md:mt-32 text-primary source-sans py-8 flex flex-col items-center relative px-4">
      <h2 className="text-2xl md:text-4xl bowlby mb-4 relative"><img src="/images/the.svg" alt="the" width="52" height="52" className="w-[2.75rem] md:w-[3.25rem] absolute top-0 md:left-0 left-[4px] -translate-x-1/2 -translate-y-1/2" />Dream Team</h2>
      <img src="/images/omg.svg" alt="omg" width="300" height="100" className="w-1/2 absolute top-[-60px] left-[-190px] z-[-1] hidden md:block" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
        {members.map((m) => (
          <li key={m.name} className="border bg-white border-primary border-4 p-3 shadow-[0.75rem_0.75rem_0_0_#252740]">
            <div className="w-full mx-auto mb-4">
              <img 
                src={m.image} 
                alt={m.name}
                width="200" height="200"
                className="w-full aspect-square object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{m.name}</h3>
            <p className="text-gray-600">{m.role}</p>
            <a 
              href={m.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-2 px-4 py-2 bg-primary text-white hover:bg-black transition-colors"
            >
              Profil LinkedIn
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}