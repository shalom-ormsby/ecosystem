import type { HeaderNavLink } from '@ecosystem/design-system';

export const ecosystemNavigation: HeaderNavLink[] = [
  {
    label: 'Work',
    children: [
      { label: 'Portfolio (Case Studies)', href: 'https://www.shalomormsby.com/case-studies' },
      { label: 'Resume', href: 'https://www.shalomormsby.com/resume.pdf' },
    ],
  },
  {
    label: 'Play',
    children: [
      { label: 'Creative Sandbox', href: 'https://ecosystem-creative-powerup.vercel.app/' },
      { label: 'Love Is the Way', href: 'https://shalomormsby.substack.com/' },
      { label: 'Poetry', href: 'https://www.shalomormsby.com/poetry' },
      { label: 'Art in Space', href: 'https://www.shalomormsby.com/art-in-space' },
    ],
  },
  {
    label: 'Tools',
    active: true, // Studio is active
    children: [
      { label: 'Sage Design Studio', href: 'https://studio.shalomormsby.com', active: true },
      { label: 'Cosmograph', href: 'https://www.shalomormsby.com/cosmograph' },
      { label: 'Sage Stocks', href: 'https://www.shalomormsby.com/sage-stocks' },
      { label: 'SageOS', href: 'https://www.shalomormsby.com/sageos' },
    ],
  },
];
