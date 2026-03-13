export interface FAQ {
  question: string;
  answer: string;
}

export const FAQS: Record<string, FAQ[]> = {
  home: [
    {
      question: 'Do I need my own bow to use an archery range?',
      answer:
        'No — most archery ranges offer equipment rental including bows and arrows, so you can shoot without bringing your own gear. Check the range listing for rental availability before visiting.',
    },
    {
      question: 'How much does it cost to shoot at an archery range?',
      answer:
        'Lane or field fees typically run $10–$25 per session. Many ranges also offer monthly or annual memberships for frequent shooters. Equipment rental, lessons, and pro shop services are usually priced separately.',
    },
    {
      question: 'What is the difference between indoor and outdoor archery ranges?',
      answer:
        'Indoor ranges are climate-controlled, typically limited to 20 yards, and open year-round. Outdoor ranges offer longer distances, 3D animal target courses, and a more natural setting — but may be seasonal depending on the region.',
    },
    {
      question: 'Can complete beginners use archery ranges?',
      answer:
        'Yes. Most ranges welcome beginners and many offer introductory lessons, loaner equipment, and staff guidance to help you shoot safely. Look for ranges tagged with "Lessons" or "Walk-in Welcome" in our directory.',
    },
  ],

  'with-pro-shop': [
    {
      question: 'What does an archery pro shop offer?',
      answer:
        'An archery pro shop sells bows, arrows, sights, rests, and accessories, and provides hands-on services like bow tuning, arrow cutting, and custom fitting. Many also handle repairs and trade-ins.',
    },
    {
      question: 'Can I get my bow tuned at an archery pro shop?',
      answer:
        'Yes. Pro shop technicians can paper-tune and walk-back-tune your bow, adjust draw length and draw weight, set your rest and nocking point, and optimize your setup for accurate arrow flight.',
    },
    {
      question: 'Do archery pro shops buy used bows?',
      answer:
        'Many pro shops accept used bow trade-ins or purchases, though policies vary by shop. Bring your bow in for an in-person evaluation — value depends on brand, condition, and current demand.',
    },
  ],

  'with-3d-course': [
    {
      question: 'What is a 3D archery course?',
      answer:
        'A 3D archery course places life-size foam animal targets at varied distances through wooded or field terrain. Archers shoot from marked stakes at unknown yardages, scoring by hitting rings on each target — simulating a real hunting scenario.',
    },
    {
      question: 'Is 3D archery good practice for bowhunters?',
      answer:
        'Yes — 3D archery is one of the best ways to prepare for bowhunting. It trains judgment of distance, angled shots, and shot placement on animal-shaped targets in realistic outdoor conditions.',
    },
    {
      question: 'What equipment do I need for a 3D archery course?',
      answer:
        'A compound or recurve bow, arrows rated for your draw weight, and a quiver are all you need to get started. Most 3D courses are open to both sighted and instinctive shooters.',
    },
  ],

  'with-lessons': [
    {
      question: 'How long does it take to learn archery?',
      answer:
        'Most beginners can hit a full-size target consistently after one or two lessons. Building solid form and reliable accuracy at longer distances typically takes a few months of regular practice.',
    },
    {
      question: 'What age can you start archery lessons?',
      answer:
        'Many ranges offer youth programs for children as young as 6–8 years old. Equipment is available in youth sizes, and certified instructors are trained to work with young beginners safely.',
    },
    {
      question: 'Are archery lessons worth it for beginners?',
      answer:
        'Yes. Learning proper form from a certified instructor from the start is far easier than correcting ingrained bad habits later. Most ranges offer affordable group or private lessons — check listings for details.',
    },
  ],
};
