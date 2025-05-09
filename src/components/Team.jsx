import React from 'react';

const members = [
  { 
    name: 'Samuel Boulery', 
    role: 'System Designer @EDF',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQHw-pZp2tABBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731875014620?e=1751500800&v=beta&t=wnr5tbwyJGZG3wGuDR2EM2ex4V8JyTMqtXQ9Kc8xVXI'
  },
  { 
    name: 'Daniela Moncada', 
    role: 'UX/UI Designer @EDF',
    image: 'https://media.licdn.com/dms/image/v2/C4D03AQEP95sz8Jp1zQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1603805161907?e=1751500800&v=beta&t=4lYBFXzGxgtcNcdhjYJ0KlEVmCISldHqcC41yHy2BPU'
  },
  { 
    name: 'Floriane Julliard', 
    role: 'System Designer @EDF',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQEsXdhKIpwWaQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1680599287273?e=1751500800&v=beta&t=398uYboy5Gp3oAxUXR-Z3Y2dyItIkD8rqV7rMiQ9Odw'
  },
  { 
    name: 'Loic Pelletier', 
    role: 'Lead Product Designer @EDF',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQGFP_-b6-8ulA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696577782501?e=1751500800&v=beta&t=Km8I4ITmPHDYcT9CezIk9HmjMMQbUMsTMpbyV7BjCbA'
  },
  { 
    name: 'Léa Maurin', 
    role: 'UX/UI Designer @EDF',
    image: 'https://media.licdn.com/dms/image/v2/C5603AQFGJA7kH-CmLg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1549475892461?e=1751500800&v=beta&t=utWX_j-ADwdDwV9o9BPvlpJyyTL6yj55rgohOLjKDa4'
  }
];

export default function Team() {
  return (
    <section className="mt-32 text-primary source-sans py-8 flex flex-col items-center relative">
      <h2 className="text-2xl bowlby text-4xl mb-4 relative"><img src="/images/the.svg" alt="the" className="w-1/8 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />Dream Team</h2>
      <img src="/images/omg.svg" alt="omg" className="w-1/2 absolute top-[-60px] left-[-190px] z-[-1]" />
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {members.map((m) => (
          <li key={m.name} className="border bg-white border-primary border-4 p-3 shadow-[0.75rem_0.75rem_0_0_#252740]">
            <div className="w-full mx-auto mb-4">
              <img 
                src={m.image} 
                alt={m.name}
                className="w-full aspect-square object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">{m.name}</h3>
            <p className="text-gray-600">{m.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}