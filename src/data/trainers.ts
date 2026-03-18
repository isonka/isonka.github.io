export interface TrainerProfile {
  slug: string;
  name: string;
  displayName: string;
  title: string;
  heroTitle: string;
  tier: 'master' | 'senior' | 'junior';
  image: string;
  languages: string[];
  specialties: string[];
  available: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  structuredData: {
    jobTitle: string;
    description: string;
  };
  bio: string[];
  qualifications: string[];
  ctaText: string;
}

export const trainerProfiles: TrainerProfile[] = [
  {
    slug: 'elif',
    name: 'Elif Arzu Ogan',
    displayName: 'Elif Arzu Ogan',
    title: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates',
    heroTitle: 'Owner & Head Instructor',
    tier: 'master',
    image: '/assets/images/elif.webp',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'TRX', 'Strength Training'],
    available: true,
    seo: {
      title: 'Elif Arzu Ogan - Comprehensive Pilates, Strength Training, Prenatal Pilates Instructor | PT Studio 7',
      description: 'Meet Elif Arzu Ogan, expert Pilates and functional training instructor at PT Studio 7 Amsterdam. Book your personalized session today.',
      keywords: 'Elif Arzu Ogan, Pilates instructor Amsterdam, functional training, PT Studio 7, Pilates leraar Amsterdam',
    },
    structuredData: {
      jobTitle: 'Owner & Head Pilates Instructor',
      description: 'Founder and head instructor of PT Studio 7 with over 15 years of experience. Senior Polestar Pilates Instructor, TRX & Strength Training Instructor.',
    },
    bio: [
      'Elif is the founder and head instructor of PT Studio 7, which she established in 2010. Since founding the studio, she has continued her career as both an instructor and business owner. With over 15 years of experience, she is a Senior Polestar Pilates Instructor, PMA-registered instructor (Pilates Method Alliance), Miha BodyTec EMS Advance Trainer, and TRX & Strength Training Instructor. Elif holds a bachelor\'s degree in Business Administration from Hacettepe University. She started her sports career with athletics, continued with swimming, and played basketball in various clubs. She is passionate about helping clients reach their goals through personalized, attentive training and a holistic approach to health and fitness.',
    ],
    qualifications: [
      'Senior Polestar Pilates Instructor',
      'PMA-Registered Pilates Teacher — Pilates Method Alliance (ITTAP accreditation in progress)',
      'Miha BodyTec EMS Advance Trainer',
      'TRX & Strength Training Instructor',
      '15+ years of experience in Pilates instruction',
      'Specializes in individualized programs for all ages and fitness levels',
      'Pilates for scoliosis and spinal disorders – Polestar Pilates, Online',
      'Pilates during and post pregnancy workshop – Polestar Pilates, Online',
      'Polestar Pilates Certified Pilates Trainer – Polestar Pilates, İstanbul',
      'The science of healthy spine movement – Polestar Pilates with Brent Anderson, İstanbul',
      'Pilates for low back care – Polestar Pilates and Brent Anderson, İstanbul',
      '4dpro Bungee Fitness Trainer – 4dpro Bungee Fitness, İzmir',
      'Miha bodytec Advance EMS Trainer – Miha bodytec, İstanbul',
      'Reformer Pilates Trainer – Seam Academy, İstanbul',
      'Pliometric Training and muscle contraction workshop – Seam Academy, İstanbul',
      'Kinesis Trainer – Technogym Wellness Institute, İstanbul',
      'Pilates during pregnancy workshop – Pilatesystem, Ankara',
      'Pilates Instructor – Turkish Gymnastic Federation, İzmir',
      'Zumba basic trainer – Zumba, İstanbul',
      'TRX Suspension Training Trainer – TRX, İstanbul',
      'Wellness Trainer – Turkish Sport for Everyone Federation, İzmir',
    ],
    ctaText: 'Book a session with Elif and experience personalized training at its finest.',
  },
  {
    slug: 'gokben',
    name: 'Gökben Öztekin',
    displayName: 'Gokben Oztekin',
    title: 'Comprehensive Pilates',
    heroTitle: 'Comprehensive Pilates',
    tier: 'senior',
    image: '/assets/images/gokben.webp',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'Mat Pilates', 'Prenatal Pilates'],
    available: true,
    seo: {
      title: 'Gökben Öztekin - Pilates Instructor | PT Studio 7',
      description: 'Meet Gökben Öztekin, expert Reformer Pilates instructor at PT Studio 7 Amsterdam. Specializing in precise technique and mindful movement.',
      keywords: 'Gökben Öztekin, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7, Pilates leraar Amsterdam',
    },
    structuredData: {
      jobTitle: 'Basi Pilates Instructor',
      description: 'Expert Reformer Pilates instructor specializing in precise technique and mindful movement at PT Studio 7 Amsterdam.',
    },
    bio: [
      'Gokben is a certified Basi Pilates Instructor with a passion for helping clients improve their strength, flexibility, and overall well-being. She creates a welcoming and motivating environment for everyone.',
    ],
    qualifications: [
      'Basi Pilates Instructor',
      'Specializes in Pilates for all ages and abilities',
      'Focuses on mindful movement and personal growth',
    ],
    ctaText: 'Book a session with Gökben and experience the art of Reformer Pilates.',
  },
  {
    slug: 'goknur',
    name: 'Göknur Dipli',
    displayName: 'Goknur Dipli',
    title: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates',
    heroTitle: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates',
    tier: 'senior',
    image: '/assets/images/goknur.webp',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'Mat Pilates', 'Rehabilitation'],
    available: true,
    seo: {
      title: 'Göknur Dipli - Comprehensive Pilates, Strength Training, Prenatal Pilates Instructor | PT Studio 7',
      description: 'Meet Göknur Dipli, expert Pilates and functional training instructor at PT Studio 7 Amsterdam. Holistic approach to fitness and wellness.',
      keywords: 'Göknur Dipli, Pilates instructor Amsterdam, PT Studio 7, Pilates leraar Amsterdam, personal trainer',
    },
    structuredData: {
      jobTitle: 'Comprehensive Pilates & Strength Training Instructor',
      description: 'Expert Pilates and strength training instructor with a holistic approach to fitness and wellness at PT Studio 7 Amsterdam.',
    },
    bio: [
      'Goknur is a Senior Polestar Pilates Instructor and Miha BodyTec EMS Advance Trainer. She brings a wealth of experience in functional training and is dedicated to helping clients achieve their best through expert guidance and motivation. She graduated in 2016 from Balıkesir University, Department of Physical Education and Sports, majoring in Coaching.',
    ],
    qualifications: [
      'Senior Polestar Pilates Instructor',
      'Miha BodyTec EMS Advance Trainer',
      'TRX & Strength Training Instructor',
      '12+ years of experience in Pilates instruction',
      'Specializes in individualized programs for all ages and fitness levels',
      'Polestar Pilates Certified Pilates Trainer – Polestar Pilates, İstanbul',
      'The science of healthy spine movement – Polestar Pilates with Brent Anderson, İstanbul',
      'Pilates for low back care – Polestar Pilates and Brent Anderson, İstanbul',
      '4dpro Bungee Fitness Trainer – 4dpro Bungee Fitness, İzmir',
      'Miha bodytec Advance EMS Trainer – Miha bodytec, İstanbul',
      'Reformer Pilates Trainer – Seam Academy, İstanbul',
      'Pliometric Training and muscle contraction workshop – Seam Academy, İstanbul',
      'Pilates during pregnancy workshop – Pilatesystem, Ankara',
      'Pilates Instructor – Turkish Gymnastic Federation, İzmir',
      'Zumba basic trainer – Zumba, İstanbul',
      '3rd Level Fitness Trainer Certificate',
    ],
    ctaText: 'Book a session with Göknur for a complete approach to fitness and nutrition.',
  },
  {
    slug: 'gulce',
    name: 'Gülce',
    displayName: 'Gülce',
    title: 'Reformer Pilates',
    heroTitle: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/gulce.webp',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates'],
    available: true,
    seo: {
      title: 'Gülce - Pilates Instructor | PT Studio 7',
      description: 'Meet Gülce, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Passionate about sharing strength, balance, and joy through Pilates.',
      keywords: 'Gülce, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7, Pilates leraar',
    },
    structuredData: {
      jobTitle: 'Reformer Pilates Instructor',
      description: 'Certified Reformer Pilates instructor passionate about sharing strength, balance, and joy through Pilates at PT Studio 7 Amsterdam.',
    },
    bio: [
      'Gülce has been practicing Pilates since she started college and has explored a wide range of teaching methods and movement approaches throughout her journey. Her experience spans Turkey, Germany, and the Netherlands, where she has both practiced and studied Pilates in diverse studio environments.',
      'She has been a happy and dedicated student at PT7 Studio for the past four years, and is now even happier to join the elite team of instructors. Gülce is passionate about sharing the same sense of strength, balance, and joy that Pilates has brought into her own life, and looks forward to bringing that happiness to her students.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer Pilates Instructor Course',
      'International Pilates experience across Turkey, Germany, and the Netherlands',
      'Specializes in Reformer Pilates',
      'Focus on strength, balance, and mindful movement',
    ],
    ctaText: 'Book a session with Gülce and experience the joy of Reformer Pilates.',
  },
  {
    slug: 'lal',
    name: 'Lal',
    displayName: 'Lal',
    title: 'Reformer Pilates',
    heroTitle: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/lal.webp',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates'],
    available: true,
    seo: {
      title: 'Lal - Pilates Instructor | PT Studio 7',
      description: 'Meet Lal, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Visual artist and creative technologist bringing mindful movement to her teaching.',
      keywords: 'Lal, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7, Pilates leraar',
    },
    structuredData: {
      jobTitle: 'Reformer Pilates Instructor',
      description: 'Certified Reformer Pilates instructor, visual artist and creative technologist bringing mindful movement to her teaching at PT Studio 7 Amsterdam.',
    },
    bio: [
      'Lal began practicing Pilates in 2022, building on a lifelong relationship with movement as an active spirit. Growing up in Istanbul, she was drawn to group sports like football and volleyball, later developing a strong interest in gym training and personal conditioning.',
      'Alongside her Pilates journey, Lal works professionally as a visual artist and creative technologist, a field that involves long hours of standing and physically demanding installation work. Pilates first helped her resolve the physical strain caused by this work, and over time became an essential practice for building strength, resilience, and body awareness. She chose to become an instructor to practice movements mindfully and share her knowledge with others.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer Pilates Instructor Course',
      'Background in team sports (football, volleyball)',
      'Professional visual artist and creative technologist',
      'Specializes in Reformer Pilates',
      'Focus on building strength, resilience, and body awareness',
    ],
    ctaText: 'Book a session with Lal and discover mindful movement through Pilates.',
  },
  {
    slug: 'nisan',
    name: 'Nisan',
    displayName: 'Nisan',
    title: 'Reformer Pilates',
    heroTitle: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/nisan.webp',
    languages: ['English', 'Turkish', 'Dutch'],
    specialties: ['Reformer Pilates'],
    available: true,
    seo: {
      title: 'Nisan - Pilates Instructor | PT Studio 7',
      description: 'Meet Nisan, certified Reformer Pilates instructor at PT Studio 7 Amsterdam. Dutch-speaking instructor passionate about mindful movement.',
      keywords: 'Nisan, Reformer Pilates, Pilates instructor Amsterdam, PT Studio 7, Nederlands sprekende Pilates instructeur, Pilates leraar',
    },
    structuredData: {
      jobTitle: 'Reformer Pilates Instructor',
      description: 'Dutch-speaking certified Reformer Pilates instructor passionate about mindful movement and helping people feel good in their bodies at PT Studio 7 Amsterdam.',
    },
    bio: [
      'Nisan is a newly certified Pilates instructor who is passionate about mindful movement and helping people feel good in their bodies. Her approach focuses on building strength, mobility, and balance in ways that support a high quality of life and long-term wellbeing.',
    ],
    qualifications: [
      'PT 7 Academy Comprehensive Reformer Pilates Instructor Course',
      'Specializes in Reformer Pilates',
      'Focus on mindful movement and wellbeing',
      'Emphasis on building strength, mobility, and balance',
    ],
    ctaText: 'Book a session with Nisan and experience mindful movement at its finest.',
  },
];
