export interface BenefitCard {
  title: string;
  description: string;
}

export interface ForWhomCard {
  heading: string;
  description: string;
}

export interface ClassOption {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  linkTo?: string;
  linkLabel?: string;
  featured?: boolean;
  featuredBadge?: string;
  healcodeHtml?: string;
}

export interface TrainerCard {
  slug: string;
  name: string;
  cert: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EquipmentGalleryItem {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WorkoutDetailData {
  slug: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  breadcrumbName: string;
  hero: {
    image: string;
    title: string;
    tagline: string;
    ctaLabel: string;
    ctaTo: string;
    usePosterHero?: boolean;
  };
  announcementBanner?: {
    label: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  intro: {
    title: string;
    lead: string;
  };
  equipmentGallery?: {
    title: string;
    items: EquipmentGalleryItem[];
  };
  benefits: {
    title: string;
    cards: BenefitCard[];
  };
  forWhom: {
    title: string;
    cards: ForWhomCard[];
  };
  classOptions: {
    title: string;
    cards: ClassOption[];
  };
  equipmentShowcase?: {
    title: string;
    subtitle: string;
    heading: string;
    description: string;
    features: string[];
    linkTo: string;
    linkLabel: string;
  };
  trainers: {
    title: string;
    cards: TrainerCard[];
  };
  faq: FaqItem[];
  finalCta: {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryTo: string;
  };
  extraCss?: string;
}

const elifCard: TrainerCard = {
  slug: 'elif',
  name: 'Elif Arzu Ogan',
  cert: '',
  description: '15+ years experience',
  image: '/assets/images/elif.webp',
  imageAlt: 'Elif Arzu Ogan',
};

const goknurCard: TrainerCard = {
  slug: 'goknur',
  name: 'Göknur Dipli',
  cert: '',
  description: '12+ years experience',
  image: '/assets/images/goknur.webp',
  imageAlt: 'Göknur Dipli',
};

export const workoutDetails: WorkoutDetailData[] = [
  {
    slug: 'reformer-pilates',
    seo: {
      title: 'Reformer Pilates Amsterdam Museumplein | PT Studio 7',
      description: 'Expert Reformer Pilates classes in Amsterdam at Museumplein. Small group classes (max 5) & private sessions. Strengthen core, improve flexibility, perfect posture. Book now!',
      keywords: 'Reformer Pilates Amsterdam, Pilates Museumplein, Reformer classes Amsterdam, core strength training, flexibility training Amsterdam, posture correction, small group Pilates, Reformer Pilates lessen, buikspieren training Amsterdam, houding verbeteren',
      canonical: 'https://www.pt7.nl/workouts/reformer-pilates',
      ogTitle: 'Reformer Pilates Amsterdam | PT Studio 7 Museumplein',
      ogDescription: 'Premium Reformer Pilates studio at Museumplein. Small groups (max 5), expert instructors. Build core strength, flexibility & perfect posture.',
      ogImage: '/assets/images/reformer_1.png',
    },
    breadcrumbName: 'Reformer Pilates',
    hero: {
      image: '/assets/images/reformer_1.webp',
      title: 'Reformer Pilates',
      tagline: 'Full-body workout focusing on core strength, flexibility, and posture',
      ctaLabel: 'Book a Class',
      ctaTo: '/schedule',
    },
    intro: {
      title: 'Transform Your Body with Reformer Pilates',
      lead: 'Reformer Pilates is a dynamic, full-body workout that uses specialized equipment to create resistance and support. At PT Studio 7, our expert instructors guide you through controlled, precise movements that strengthen your core, improve flexibility, and enhance your overall body awareness.',
    },
    benefits: {
      title: 'Why Choose Reformer Pilates?',
      cards: [
        { title: 'Core Strength', description: 'Build deep core stability and strength that supports your entire body, improving balance and preventing injury.' },
        { title: 'Flexibility', description: 'Increase your range of motion and flexibility through controlled stretching and lengthening movements.' },
        { title: 'Posture Perfection', description: 'Correct imbalances and improve alignment for better posture in everyday life and reduced back pain.' },
        { title: 'Full-Body Toning', description: 'Target every muscle group with precision for a balanced, toned physique without bulk.' },
        { title: 'Mind-Body Connection', description: 'Develop body awareness and mindful movement through focused, intentional exercises.' },
        { title: 'Low Impact', description: 'Safe for all fitness levels and ages, with minimal stress on joints while building strength.' },
      ],
    },
    forWhom: {
      title: 'Perfect For',
      cards: [
        { heading: 'Beginners', description: 'New to Pilates? Our instructors provide modifications and guidance to help you master the basics safely.' },
        { heading: 'Athletes', description: 'Enhance your performance with improved core strength, flexibility, and injury prevention.' },
        { heading: 'Pregnant Women', description: 'Safe prenatal training in private sessions to maintain strength and prepare for childbirth.' },
        { heading: 'Injury Recovery', description: 'Low-impact rehabilitation that rebuilds strength and mobility under expert supervision.' },
        { heading: 'Active Aging', description: 'Prevent muscle loss and maintain strength, mobility, balance, and independence with gentle yet effective exercises.' },
        { heading: 'Desk Workers', description: 'Combat sitting-related issues with posture correction and back-strengthening exercises.' },
      ],
    },
    classOptions: {
      title: 'Class Options',
      cards: [
        {
          title: 'Small Group Classes',
          subtitle: 'Maximum 5 People',
          description: 'Experience Reformer Pilates in an intimate group setting with personalized attention. Perfect for those who enjoy the energy of working out with others.',
          features: ['45-minute sessions', 'From €28 per class', 'All fitness levels welcome', 'Energizing group atmosphere'],
          linkTo: '/pricing',
          linkLabel: 'View Group Pricing',
        },
        {
          title: 'Private Classes',
          subtitle: 'One-on-One',
          description: 'Get 100% of your instructor\'s attention with fully customized workouts tailored to your goals, injuries, or specific needs.',
          features: ['45-minute personalized sessions', 'From €70 per class', 'Fully customized program', 'Flexible scheduling'],
          linkTo: '/pricing',
          linkLabel: 'View Private Pricing',
          featured: true,
          featuredBadge: 'Most Personal',
        },
      ],
    },
    equipmentShowcase: {
      title: 'Our Reformer Equipment',
      subtitle: 'We use professional-grade Reformer Pilates equipment that provides smooth, adjustable resistance for optimal results.',
      heading: 'Premium Reformer Machines',
      description: 'Our studio features state-of-the-art Reformer machines with:',
      features: [
        '✓ Adjustable spring resistance for all fitness levels',
        '✓ Smooth gliding carriage for precise movements',
        '✓ Comfortable padding and ergonomic design',
        '✓ Multiple straps and bars for exercise variety',
        '✓ Regularly maintained for safety and performance',
      ],
      linkTo: '/equipment/reformer',
      linkLabel: 'Learn More About Our Equipment →',
    },
    trainers: {
      title: 'Meet Your Expert Instructors',
      cards: [
        { ...elifCard, cert: 'Senior Polestar Pilates Instructor', description: '15+ years experience, specializing in injury recovery and spinal health', imageAlt: 'Elif Arzu Ogan - Reformer Pilates Instructor' },
        { slug: 'gokben', name: 'Gökben Öztekin', cert: 'Basi Pilates Instructor', description: 'Pilates Instructor', image: '/assets/images/gokben.webp', imageAlt: 'Gökben Öztekin - Basi Pilates Instructor' },
        { ...goknurCard, cert: 'Senior Polestar Pilates Instructor', description: '12+ years experience in Reformer Pilates and strength training', imageAlt: 'Göknur Dipli - Reformer Pilates Instructor' },
      ],
    },
    faq: [
      { question: 'Do I need Pilates experience?', answer: 'No! We welcome complete beginners. Our instructors provide modifications and guidance for all fitness levels.' },
      { question: 'What should I wear?', answer: 'Wear comfortable, fitted athletic clothing that allows you to move freely. Avoid loose clothing that might get caught in the equipment. Grip socks are recommended (available for purchase at our studio).' },
      { question: 'How often should I practice Reformer Pilates?', answer: 'For best results, we recommend 2-3 sessions per week. Consistency is key to seeing improvements in strength, flexibility, and posture.' },
      { question: 'Can I do Reformer Pilates if I have injuries?', answer: 'Yes! Reformer Pilates is excellent for rehabilitation. Please inform your instructor about any injuries before class so they can provide appropriate modifications.' },
      { question: 'How is Reformer Pilates different from mat Pilates?', answer: 'Reformer Pilates uses specialized equipment with springs for resistance, offering more variety, support, and challenge. It\'s excellent for beginners and advanced practitioners alike.' },
    ],
    finalCta: {
      title: 'Ready to Transform Your Body?',
      subtitle: 'Join us for a Reformer Pilates class at our premium Museumplein location',
      primaryLabel: 'Book Your Class',
      primaryTo: '/schedule',
      secondaryLabel: 'View Pricing',
      secondaryTo: '/pricing',
    },
  },
  {
    slug: 'trx',
    seo: {
      title: 'TRX Suspension Training Amsterdam | PT Studio 7 Museumplein',
      description: 'Professional TRX suspension training in Amsterdam at Museumplein. Build strength, balance & functional fitness. Small group classes & private sessions. Expert trainers!',
      keywords: 'TRX training Amsterdam, suspension training Amsterdam, TRX Museumplein, functional fitness Amsterdam, strength training, balance training, TRX classes',
      canonical: 'https://www.pt7.nl/workouts/trx',
      ogTitle: 'TRX Suspension Training Amsterdam | PT Studio 7',
      ogDescription: 'Expert TRX suspension training at Museumplein. Build total body strength, balance & functional fitness in small groups (max 5).',
      ogImage: '/assets/images/trx.jpg',
    },
    breadcrumbName: 'TRX Training',
    hero: {
      image: '/assets/images/trx.webp',
      title: 'TRX Suspension Training',
      tagline: 'Suspension training for strength, balance, and functional fitness',
      ctaLabel: 'Book a Class',
      ctaTo: '/schedule',
    },
    intro: {
      title: 'Master Your Body Weight with TRX',
      lead: 'TRX Suspension Training leverages gravity and your body weight to build strength, balance, flexibility, and core stability simultaneously. Used by elite athletes and military forces, TRX delivers a challenging, scalable workout that\'s perfect for everyone from beginners to advanced fitness enthusiasts.',
    },
    benefits: {
      title: 'Benefits of TRX Training',
      cards: [
        { title: 'Total Body Workout', description: 'Engage multiple muscle groups simultaneously for efficient, effective full-body conditioning.' },
        { title: 'Core Engagement', description: 'Every exercise activates your core, building deep stabilizing strength and balance.' },
        { title: 'Scalable Intensity', description: 'Easily adjust difficulty by changing your body angle - perfect for all fitness levels.' },
        { title: 'Functional Strength', description: 'Build practical strength that translates to everyday movements and sports performance.' },
        { title: 'Flexibility & Mobility', description: 'Improve range of motion and joint stability through dynamic movements.' },
        { title: 'Fat Burning', description: 'High-intensity workouts torch calories and boost metabolism for hours after training.' },
      ],
    },
    forWhom: {
      title: 'Perfect For',
      cards: [
        { heading: 'Strength Seekers', description: 'Build lean muscle and functional power without heavy weights or machines.' },
        { heading: 'Athletes', description: 'Enhance sports performance with explosive power, balance, and injury prevention.' },
        { heading: 'Time-Efficient Trainers', description: 'Get a complete workout in 45 minutes with no wasted time switching equipment.' },
        { heading: 'Beginners', description: 'Start at your level and progress safely with easily adjustable intensity.' },
        { heading: 'Goal-Oriented', description: 'Whether fat loss, muscle gain, or athletic performance - TRX delivers results.' },
        { heading: 'Mind-Body Enthusiasts', description: 'Combine strength with mindful movement and body awareness.' },
      ],
    },
    classOptions: {
      title: 'Training Options',
      cards: [
        {
          title: 'Couple TRX Training',
          subtitle: 'Train with Your Partner',
          description: 'Work out together with your partner in a motivating environment while receiving personalized coaching for both of you.',
          features: ['45-minute sessions', 'From €40-50 per person', 'Share the experience', 'Motivate each other'],
          linkTo: '/pricing',
          linkLabel: 'View Couple Pricing',
        },
        {
          title: 'Private TRX Training',
          subtitle: 'One-on-One',
          description: 'Get individualized programming designed for your specific goals, fitness level, and any limitations.',
          features: ['45-minute private sessions', 'From €70 per class', 'Custom workout design', 'Flexible scheduling'],
          linkTo: '/pricing',
          linkLabel: 'View Private Pricing',
          featured: true,
          featuredBadge: 'Most Personal',
        },
      ],
    },
    trainers: {
      title: 'Expert TRX Instructors',
      cards: [
        { ...elifCard, cert: 'Certified TRX Instructor', description: '15+ years functional training experience, TRX certified expert', imageAlt: 'Elif Arzu Ogan - TRX Instructor' },
        { ...goknurCard, cert: 'TRX & Strength Training Instructor', description: '12+ years experience in suspension training and functional fitness', imageAlt: 'Göknur Dipli - TRX Instructor' },
      ],
    },
    faq: [
      { question: 'Is TRX suitable for beginners?', answer: 'Absolutely! TRX is incredibly scalable. By simply adjusting your body angle, we can make exercises easier or harder. Our instructors will guide you to find the right intensity.' },
      { question: 'Will I build muscle with TRX?', answer: 'Yes! TRX builds lean, functional muscle through body weight resistance. You\'ll develop strength, definition, and improved muscle endurance.' },
      { question: 'What fitness level do I need for TRX?', answer: 'TRX is highly adaptable and can be scaled for any fitness level. By simply adjusting your body angle, we can make exercises easier or more challenging to match your athletic abilities.' },
      { question: 'What should I wear?', answer: 'Wear comfortable athletic clothing that allows full range of motion. Athletic shoes are required for TRX training.' },
      { question: 'How many times per week should I do TRX?', answer: '2-3 times per week is ideal for building strength and seeing results, with rest days in between for recovery.' },
    ],
    finalCta: {
      title: 'Ready to Experience TRX?',
      subtitle: 'Discover the power of suspension training at PT Studio 7',
      primaryLabel: 'Book Your Session',
      primaryTo: '/schedule',
      secondaryLabel: 'View Pricing',
      secondaryTo: '/pricing',
    },
  },
  {
    slug: 'functional-training',
    seo: {
      title: 'Nike Strength Training Amsterdam | PT Studio 7 Museumplein',
      description: 'Premium Nike Strength Training in Amsterdam at Museumplein. Olympic barbell, half rack, Nike dumbbells. Build real-world strength with expert personal training!',
      keywords: 'Nike strength training Amsterdam, olympic lifting Amsterdam, personal training Museumplein, barbell training Amsterdam, functional fitness Amsterdam, Nike gym equipment',
      canonical: 'https://www.pt7.nl/workouts/functional-training',
      ogTitle: 'Nike Strength Training Amsterdam | PT Studio 7',
      ogDescription: 'Premium Nike Strength equipment. Olympic barbell training with expert coaches at our boutique Museumplein studio.',
      ogImage: '/assets/images/nike_strength_studio.jpg',
    },
    breadcrumbName: 'Nike Strength Training',
    hero: {
      image: '/assets/images/nike_strength_studio.webp',
      title: 'Nike Strength Training',
      tagline: 'Premium equipment. Expert coaching. Real results.',
      ctaLabel: 'Book a Session',
      ctaTo: '/schedule',
    },
    intro: {
      title: 'Premium Nike Strength Equipment',
      lead: 'Experience strength training with professional-grade Nike equipment — including our Nike Strength Half Rack, Olympic barbell, recycled Nike Grind weight plates, and premium hex dumbbells. Combined with expert coaching, you\'ll build real-world strength, stability, and mobility that translates directly to your daily life.',
    },
    equipmentGallery: {
      title: 'Our Nike Strength Equipment',
      items: [
        { image: '/assets/images/nike_strength_studio.webp', imageAlt: 'Nike Strength Half Rack with Olympic barbell', title: 'Nike Strength Half Rack', description: 'Professional half rack for squats, bench press, and Olympic lifting' },
        { image: '/assets/images/nike_grind_plates.webp', imageAlt: 'Nike Grind recycled weight plates', title: 'Nike Grind Weight Plates', description: 'Sustainable plates made from recycled Nike materials' },
        { image: '/assets/images/nike_dumbbell.webp', imageAlt: 'Nike hex dumbbells', title: 'Nike Hex Dumbbells', description: 'Full range of premium dumbbells for all strength levels' },
      ],
    },
    benefits: {
      title: 'Why Strength Training?',
      cards: [
        { title: 'Real-World Strength', description: 'Build practical strength that helps you lift, carry, push, and pull in everyday life.' },
        { title: 'Injury Prevention', description: 'Strengthen stabilizing muscles and improve movement patterns to reduce injury risk.' },
        { title: 'Better Balance', description: 'Multi-directional movements enhance balance, coordination, and body control.' },
        { title: 'Muscle Building', description: 'Develop lean, functional muscle mass that improves your metabolism and physique.' },
        { title: 'Core Stability', description: 'Every exercise engages your core for improved posture and spinal health.' },
        { title: 'Progressive Results', description: 'Track your progress with measurable improvements in strength and performance.' },
      ],
    },
    forWhom: {
      title: 'Perfect For',
      cards: [
        { heading: 'Strength Goals', description: 'Build muscle, increase power, and get stronger in functional, practical ways.' },
        { heading: 'Sports Performance', description: 'Enhance athletic ability with movements that directly translate to your sport.' },
        { heading: 'Active Lifestyle', description: 'Prepare your body for hiking, running, sports, and outdoor adventures.' },
        { heading: 'Healthy Aging', description: 'Prevent muscle loss and maintain strength, independence, and quality of life with functional training.' },
        { heading: 'Back Pain Relief', description: 'Strengthen your posterior chain and core to alleviate chronic back pain.' },
        { heading: 'Weight Loss', description: 'Burn calories efficiently while building muscle that boosts your metabolism.' },
      ],
    },
    classOptions: {
      title: 'Training Options',
      cards: [
        {
          title: 'Couple Training',
          subtitle: 'Train with Your Partner',
          description: 'Work out together with your partner while receiving personalized coaching and form corrections for both of you.',
          features: ['45-minute sessions', 'From €40-50 per person', 'Share the journey', 'Motivate each other'],
          linkTo: '/pricing',
          linkLabel: 'View Couple Pricing',
        },
        {
          title: 'Personal Training',
          subtitle: 'One-on-One',
          description: 'Get a completely personalized program designed around your goals, injuries, and fitness level.',
          features: ['45-minute private sessions', 'From €70 per class', 'Custom program design', 'Focused attention'],
          linkTo: '/pricing',
          linkLabel: 'View Private Pricing',
          featured: true,
          featuredBadge: 'Fully Customized',
        },
      ],
    },
    trainers: {
      title: 'Your Strength Training Instructors',
      cards: [
        { ...elifCard, cert: 'Strength Training Instructor', description: '15+ years experience in strength training and functional movement', imageAlt: 'Elif Arzu Ogan - Strength Training Instructor' },
        { ...goknurCard, cert: 'Strength Training Instructor', description: 'Certified coach with 12+ years in fitness and strength training', imageAlt: 'Göknur Dipli - Comprehensive Pilates, Strength Training, Prenatal Pilates Instructor' },
      ],
    },
    faq: [
      { question: 'What\'s the difference between strength training and regular gym workouts?', answer: 'Our strength training focuses on multi-joint, compound movements that mimic real-life activities, rather than isolating individual muscles on machines. This builds practical, usable strength.' },
      { question: 'Do I need weight training experience?', answer: 'No! We teach proper form from scratch and start with appropriate weights for your level. In couple or private sessions, you\'ll receive personalized attention to master each movement safely.' },
      { question: 'Will I get bulky?', answer: 'No. Functional training builds lean, athletic muscle. The type of training we do creates strength and definition without excessive bulk.' },
      { question: 'Can strength training help with weight loss?', answer: 'Absolutely! Building muscle increases your resting metabolism, and strength training workouts burn significant calories both during and after exercise.' },
      { question: 'Is this suitable for older adults?', answer: 'Yes! Strength training is one of the best ways to maintain independence as you age. We modify exercises to match your abilities and gradually build strength safely.' },
    ],
    finalCta: {
      title: 'Start Building Real-World Strength',
      subtitle: 'Experience strength training at PT Studio 7 Museumplein',
      primaryLabel: 'Book Your Session',
      primaryTo: '/schedule',
      secondaryLabel: 'View Pricing',
      secondaryTo: '/pricing',
    },
  },
  {
    slug: 'cardio',
    seo: {
      title: 'Cardio Training Amsterdam | PT Studio 7 Museumplein',
      description: 'High-intensity cardio workouts in Amsterdam at Museumplein. Boost endurance, burn fat, improve heart health. Small group HIIT classes & personal training!',
      keywords: 'cardio training Amsterdam, HIIT Amsterdam, fat burning workout, endurance training Museumplein, cardio classes Amsterdam, heart health fitness',
      canonical: 'https://www.pt7.nl/workouts/cardio',
      ogTitle: 'Cardio Training Amsterdam | PT Studio 7',
      ogDescription: 'High-energy cardio workouts to burn calories and build endurance. Small groups (max 5) at Museumplein.',
      ogImage: '/assets/images/cardio.jpg',
    },
    breadcrumbName: 'Cardio Training',
    hero: {
      image: '/assets/images/cardio.webp',
      title: 'Cardio Training',
      tagline: 'High-intensity cardio workouts to boost endurance and burn calories',
      ctaLabel: 'Book a Session',
      ctaTo: '/schedule',
    },
    intro: {
      title: 'Transform Your Cardiovascular Fitness',
      lead: 'Our cardio training combines high-intensity interval training (HIIT), metabolic conditioning, and endurance work to maximize calorie burn, boost cardiovascular health, and improve your overall fitness. Get ready to sweat, challenge yourself, and see real results!',
    },
    benefits: {
      title: 'Benefits of Cardio Training',
      cards: [
        { title: 'Fat Burning', description: 'Torch calories during and after your workout with the afterburn effect of high-intensity training.' },
        { title: 'Heart Health', description: 'Strengthen your cardiovascular system, lower blood pressure, and reduce heart disease risk.' },
        { title: 'Increased Energy', description: 'Boost your stamina and energy levels for better performance in daily activities.' },
        { title: 'Mental Clarity', description: 'Release endorphins, reduce stress, and improve mood and cognitive function.' },
        { title: 'Endurance Building', description: 'Improve your ability to sustain physical activity for longer periods without fatigue.' },
        { title: 'Time Efficient', description: 'HIIT workouts deliver maximum results in minimal time - perfect for busy schedules.' },
      ],
    },
    forWhom: {
      title: 'Perfect For',
      cards: [
        { heading: 'Weight Loss Goals', description: 'Maximize calorie burn and fat loss with high-intensity metabolic training.' },
        { heading: 'Endurance Athletes', description: 'Build cardiovascular capacity for running, cycling, or sports performance.' },
        { heading: 'Busy Professionals', description: 'Get an effective workout in 45 minutes that fits your schedule.' },
        { heading: 'Heart Health', description: 'Improve cardiovascular health and reduce risk of heart disease.' },
        { heading: 'Energy Boost', description: 'Increase daily energy levels and combat fatigue with regular cardio training.' },
        { heading: 'Stress Relief', description: 'Release endorphins and reduce stress through high-energy exercise.' },
      ],
    },
    classOptions: {
      title: 'Training Options',
      cards: [
        {
          title: 'Couple Cardio Training',
          subtitle: 'Train with Your Partner',
          description: 'Push each other to new limits while getting personalized coaching and motivation for both of you.',
          features: ['45-minute high-energy sessions', 'From €40-50 per person', 'All fitness levels', 'Motivate each other'],
          linkTo: '/pricing',
          linkLabel: 'View Couple Pricing',
        },
        {
          title: 'Private Cardio Training',
          subtitle: 'One-on-One',
          description: 'Get a personalized cardio program designed for your fitness level, goals, and any health considerations.',
          features: ['45-minute private sessions', 'From €70 per class', 'Custom intensity levels', 'Your pace, your goals'],
          linkTo: '/pricing',
          linkLabel: 'View Private Pricing',
          featured: true,
          featuredBadge: 'Tailored Intensity',
        },
      ],
    },
    trainers: {
      title: 'Your Cardio Training Coaches',
      cards: [
        { ...elifCard, cert: 'Cardio & HIIT Instructor', description: '15+ years experience in high-intensity training and cardio conditioning', imageAlt: 'Elif Arzu Ogan - Cardio Instructor' },
        { ...goknurCard, cert: 'Metabolic Conditioning Instructor', description: '12+ years experience in cardio training and endurance coaching', imageAlt: 'Göknur Dipli - Cardio Coach' },
      ],
    },
    faq: [
      { question: 'Is cardio training right for beginners?', answer: 'Yes! We modify intensity and exercises to match your current fitness level. You\'ll start where you are and progress at your own pace.' },
      { question: 'How many calories will I burn?', answer: 'Depending on intensity and your body, you can burn 300-600 calories per 45-minute session, plus additional calories from the afterburn effect.' },
      { question: 'Will I lose muscle with cardio training?', answer: 'No! Our cardio workouts include resistance exercises and are designed to preserve muscle while burning fat. We recommend combining cardio with strength training for best results.' },
      { question: 'What if I have joint issues?', answer: 'We offer low-impact modifications for all exercises. Inform your instructor about any concerns, and they\'ll provide alternatives that protect your joints.' },
      { question: 'How often should I do cardio?', answer: 'For general health, 2-3 times per week is excellent. For weight loss goals, 3-5 sessions per week combined with proper nutrition works best.' },
    ],
    finalCta: {
      title: 'Ready to Boost Your Endurance?',
      subtitle: 'Join our high-energy cardio classes at PT Studio 7',
      primaryLabel: 'Book Your Session',
      primaryTo: '/schedule',
      secondaryLabel: 'View Pricing',
      secondaryTo: '/pricing',
    },
  },
];
