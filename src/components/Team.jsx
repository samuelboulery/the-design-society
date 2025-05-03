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
    <section className="mt-16 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">L'équipe</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {members.map((m) => (
          <li key={m.name} className="text-center p-4 border rounded-lg">
            <div className="w-full h-32 mx-auto mb-4 rounded-md overflow-hidden">
              <img 
                src={m.image} 
                alt={m.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-medium">{m.name}</h3>
            <p className="text-gray-600">{m.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}