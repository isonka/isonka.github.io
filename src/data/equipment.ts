export interface EquipmentImage {
  src: string;
  alt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EquipmentSpec {
  label: string;
  value: string;
}

export interface EquipmentProduct {
  slug: string;
  name: string;
  price: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  images: EquipmentImage[];
  shortDesc: string;
  features: string[];
  description: string;
  specs: EquipmentSpec[];
  faq: FAQItem[];
}

const commonFAQ: FAQItem[] = [
  {
    question: 'How can I order this equipment?',
    answer: 'You can contact us directly via email or phone to place your order or request more information about our Pilates equipment.',
  },
  {
    question: 'What is the delivery time and method?',
    answer: 'Delivery time is typically 3-8 weeks depending on stock and your location. Delivery can be arranged to your door throughout the Netherlands.',
  },
  {
    question: 'Is there a warranty?',
    answer: 'All our equipment comes with a 2-year warranty covering manufacturing defects and materials.',
  },
  {
    question: 'Can I return it after purchase?',
    answer: 'Returns are not possible for this product after purchase, as each product is made to order.',
  },
];

export const equipmentProducts: EquipmentProduct[] = [
  {
    slug: 'reformer',
    name: 'Pilates Reformer',
    price: '€2,200',
    seo: {
      title: 'Pilates Reformer - PT Studio 7 Amsterdam',
      description: 'Professional-grade Pilates Reformer for sale. Solid beech wood frame, smooth-gliding carriage, complete with accessories. Studio-quality equipment available in Amsterdam.',
      keywords: 'Pilates Reformer for sale, professional Pilates equipment, reformer Amsterdam, studio equipment, Pilates apparatus',
    },
    images: [
      { src: '/assets/images/reformer_1.png', alt: 'Pilates Reformer - Full side view' },
      { src: '/assets/images/reformer_2.png', alt: 'Pilates Reformer - Reverse angle' },
      { src: '/assets/images/reformer_3.png', alt: 'Pilates Reformer - Leg springs exercise' },
      { src: '/assets/images/reformer_4.png', alt: 'Pilates Reformer - Side plank exercise' },
      { src: '/assets/images/reformer_5.png', alt: 'Pilates Reformer - Strap detail' },
      { src: '/assets/images/reformer_6.png', alt: 'Pilates Reformer - Shoulder blocks detail' },
    ],
    shortDesc: 'The classic Pilates Reformer for all levels. Smooth, silent, and built for a lifetime of movement.',
    features: [
      'Solid beech wood frame',
      'Adjustable footbar and headrest',
      'Smooth-gliding carriage with precision wheels',
      'Complete set of springs and straps',
      'Comfortable, easy-to-clean upholstery',
      'Includes jump board and box for added versatility',
      'Dimensions: 240 x 69 x 35 cm',
      'Weight: approx. 125 kg',
    ],
    description: 'The Pilates Reformer is the most popular piece of Pilates equipment, ideal for both group classes and private sessions. It offers a wide range of exercises for strength, flexibility, and rehabilitation. Built from premium materials for durability and comfort.',
    specs: [
      { label: 'Frame', value: 'Solid beech wood' },
      { label: 'Carriage', value: 'High-quality, smooth-glide system' },
      { label: 'Footbar', value: 'Adjustable, multiple positions' },
      { label: 'Headrest', value: 'Adjustable, padded' },
      { label: 'Upholstery', value: 'Comfortable, easy to clean' },
      { label: 'Springs', value: 'Full set included' },
      { label: 'Straps', value: 'Durable, adjustable' },
      { label: 'Dimensions', value: '240 x 69 x 35 cm' },
      { label: 'Accessories', value: 'Box, jump board, straps' },
      { label: 'Warranty', value: '2 years on frame and moving parts' },
    ],
    faq: [
      ...commonFAQ.slice(0, 1),
      {
        question: 'Is installation included?',
        answer: 'We do not arrange installation, but the equipment is delivered with clear instructions and can be assembled by two people.',
      },
      commonFAQ[1],
      {
        question: 'Can I try the Reformer before buying?',
        answer: 'Yes! You are welcome to visit our Amsterdam studio to try the Reformer and get expert advice.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  {
    slug: 'tower-reformer',
    name: 'Tower Reformer',
    price: '€2,500',
    seo: {
      title: 'Tower Reformer - PT Studio 7 Amsterdam',
      description: 'Professional-grade Tower Reformer combining reformer and tower for expanded exercise options. Studio-quality Pilates equipment available in Amsterdam.',
      keywords: 'Tower Reformer for sale, Pilates tower, professional Pilates equipment, reformer with tower, Amsterdam',
    },
    images: [
      { src: '/assets/images/tower_reformer_1.png', alt: 'Tower Reformer - Full side view' },
      { src: '/assets/images/tower_reformer_2.png', alt: 'Tower Reformer - Back extension exercise' },
      { src: '/assets/images/tower_reformer_3.png', alt: 'Tower Reformer - Side stretch exercise' },
      { src: '/assets/images/tower_reformer_4.png', alt: 'Tower Reformer - Tower folded position' },
      { src: '/assets/images/tower_reformer_5.png', alt: 'Tower Reformer - Tower and spring detail' },
      { src: '/assets/images/tower_reformer_6.png', alt: 'Tower Reformer - Carriage detail' },
    ],
    shortDesc: 'Professional-grade reformer with integrated tower for expanded exercise options and versatility.',
    features: [
      'Solid beech wood frame',
      'Integrated tower with overhead bars',
      'Adjustable footbar and headrest',
      'Smooth-gliding carriage with precision wheels',
      'Extended spring system for vertical resistance',
      'Complete set of springs, straps, and cables',
      'Comfortable, easy-to-clean upholstery',
      'Includes jump board and box',
      'Dimensions: 240 x 69 x 200 cm (with tower)',
      'Weight: approx. 150 kg',
    ],
    description: 'The Tower Reformer combines the functionality of a classic reformer with the versatility of a tower, offering the widest range of Pilates exercises in one unit. Perfect for studios looking to maximize space efficiency while providing comprehensive training options.',
    specs: [
      { label: 'Frame', value: 'Solid beech wood' },
      { label: 'Tower', value: 'Integrated vertical frame with overhead bars' },
      { label: 'Carriage', value: 'High-quality, smooth-glide system' },
      { label: 'Springs', value: 'Full reformer set plus tower springs' },
      { label: 'Cables', value: 'Professional-grade tower cables' },
      { label: 'Dimensions', value: '240 x 69 x 200 cm' },
      { label: 'Accessories', value: 'Box, jump board, straps, push-through bar' },
      { label: 'Warranty', value: '2 years on frame and moving parts' },
    ],
    faq: [
      ...commonFAQ.slice(0, 1),
      {
        question: 'Is installation included?',
        answer: 'We do not arrange installation, but the equipment is delivered with clear instructions and can be assembled by two people.',
      },
      commonFAQ[1],
      {
        question: 'What ceiling height is required?',
        answer: 'We recommend a minimum ceiling height of 220cm for comfortable use of the tower features.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  {
    slug: 'cadillac',
    name: 'Combo Cadillac',
    price: '€3,000',
    seo: {
      title: 'Combo Cadillac - PT Studio 7 Amsterdam',
      description: 'Professional Pilates Cadillac for sale. The ultimate apparatus for endless exercise possibilities. Studio-grade equipment available in Amsterdam.',
      keywords: 'Pilates Cadillac for sale, Trapeze Table, professional Pilates equipment, Cadillac Amsterdam',
    },
    images: [
      { src: '/assets/images/cadillac_1.png', alt: 'Combo Cadillac - Full side view' },
      { src: '/assets/images/cadillac_2.png', alt: 'Combo Cadillac - Seated exercise' },
      { src: '/assets/images/cadillac_3.png', alt: 'Combo Cadillac - Front angle view' },
      { src: '/assets/images/cadillac_4.png', alt: 'Combo Cadillac - Inversion exercise' },
      { src: '/assets/images/cadillac_5.png', alt: 'Combo Cadillac - Included accessories' },
      { src: '/assets/images/cadillac_6.png', alt: 'Combo Cadillac - Leg springs exercise' },
    ],
    shortDesc: 'The ultimate Pilates Cadillac for endless exercise possibilities. Perfect for advanced training and rehabilitation.',
    features: [
      'Solid beech wood frame with overhead canopy',
      'Four corner towers with spring attachments',
      'Push-through bar and trapeze',
      'Roll-down bar and leg springs',
      'Full set of springs, straps, and cables',
      'Comfortable padded mat surface',
      'Safety roll-off bar',
      'Dimensions: 210 x 120 x 210 cm',
      'Weight: approx. 180 kg',
    ],
    description: 'The Cadillac (also known as the Trapeze Table) is the most versatile piece of Pilates equipment, offering over 100 different exercises. It\'s ideal for rehabilitation, advanced training, and therapeutic work. The overhead frame provides unique movement possibilities not found on any other apparatus.',
    specs: [
      { label: 'Frame', value: 'Solid beech wood with overhead canopy' },
      { label: 'Mat Surface', value: 'Comfortable, padded, easy to clean' },
      { label: 'Springs', value: 'Complete set for all attachment points' },
      { label: 'Bars', value: 'Push-through bar, trapeze bar, roll-down bar' },
      { label: 'Accessories', value: 'Leg springs, arm springs, safety bar' },
      { label: 'Dimensions', value: '210 x 120 x 210 cm' },
      { label: 'Warranty', value: '2 years on frame and moving parts' },
    ],
    faq: [
      ...commonFAQ.slice(0, 1),
      {
        question: 'Is installation included?',
        answer: 'We do not arrange installation, but the equipment is delivered with clear instructions and requires assembly.',
      },
      commonFAQ[1],
      {
        question: 'What space is needed for the Cadillac?',
        answer: 'We recommend at least 3m x 2.5m of floor space and a minimum ceiling height of 230cm for safe use.',
      },
      ...commonFAQ.slice(2),
    ],
  },
  {
    slug: 'wunda-chair',
    name: 'Wunda Chair',
    price: '€1,000',
    seo: {
      title: 'Wunda Chair - PT Studio 7 Amsterdam',
      description: 'Professional Pilates Wunda Chair for sale. Versatile equipment for challenging workouts in compact space. Studio-grade quality available in Amsterdam.',
      keywords: 'Wunda Chair for sale, Pilates chair, professional Pilates equipment, compact Pilates, Amsterdam',
    },
    images: [
      { src: '/assets/images/wunda_chair_1.png', alt: 'Wunda Chair - Side view' },
      { src: '/assets/images/wunda_chair_2.png', alt: 'Wunda Chair - Front view' },
      { src: '/assets/images/wunda_chair_3.png', alt: 'Wunda Chair - Exercise demonstration' },
      { src: '/assets/images/wunda_chair_4.png', alt: 'Wunda Chair - Standing exercise' },
    ],
    shortDesc: 'The Wunda Chair is a classic Pilates apparatus designed for a wide range of exercises that improve strength, balance, and stability. Its compact design makes it ideal for both home and studio use.',
    features: [
      'Solid wood construction',
      'Adjustable spring resistance (4 springs)',
      'Comfortable pedal with non-slip surface',
      'Split pedal option for unilateral work',
      'Durable upholstery',
      'Compact footprint',
      'Dimensions: 63 x 56 x 63 cm',
      'Weight: approx. 35 kg',
    ],
    description: 'The Wunda Chair offers over 75 exercises in a compact design. It\'s excellent for building strength, improving balance, and developing functional movement patterns. Perfect for studios with limited space or home users seeking a professional-grade apparatus.',
    specs: [
      { label: 'Frame', value: 'Solid wood construction' },
      { label: 'Springs', value: '4 adjustable springs' },
      { label: 'Pedal', value: 'Non-slip surface, split option' },
      { label: 'Upholstery', value: 'Professional-grade, easy to clean' },
      { label: 'Dimensions', value: '63 x 56 x 63 cm' },
      { label: 'Warranty', value: '2 years on frame and moving parts' },
    ],
    faq: [
      ...commonFAQ.slice(0, 1),
      {
        question: 'Is installation included?',
        answer: 'The Wunda Chair arrives fully assembled and ready to use. No installation required.',
      },
      {
        question: 'How much space do I need?',
        answer: 'The Wunda Chair has a small footprint (63 x 56 cm). We recommend at least 2m x 2m of space for comfortable use.',
      },
      commonFAQ[1],
      ...commonFAQ.slice(2),
    ],
  },
  {
    slug: 'ladder-barrel',
    name: 'Ladder Barrel',
    price: '€1,000',
    seo: {
      title: 'Ladder Barrel - PT Studio 7 Amsterdam',
      description: 'Professional Pilates Ladder Barrel for sale. Perfect for stretching, spinal extension, and core strengthening. Studio-quality equipment in Amsterdam.',
      keywords: 'Ladder Barrel for sale, Pilates barrel, spine corrector, professional Pilates equipment, Amsterdam',
    },
    images: [
      { src: '/assets/images/ladder_barrel_1.png', alt: 'Ladder Barrel - Side view' },
      { src: '/assets/images/ladder_barrel_2.png', alt: 'Ladder Barrel - Angle view' },
      { src: '/assets/images/ladder_barrel_3.png', alt: 'Ladder Barrel - Front view' },
      { src: '/assets/images/ladder_barrel_4.png', alt: 'Ladder Barrel - Exercise demonstration' },
      { src: '/assets/images/ladder_barrel_5.png', alt: 'Ladder Barrel - Detail view' },
      { src: '/assets/images/ladder_barrel_6.png', alt: 'Ladder Barrel - Close-up detail' },
    ],
    shortDesc: 'The Ladder Barrel is a classic Pilates apparatus designed to support a wide variety of stretching, strengthening, and flexibility exercises.',
    features: [
      'Solid wood construction',
      'Adjustable barrel position with ladder',
      'Smooth curved barrel surface',
      'Non-slip rungs',
      'Comfortable upholstery',
      'Heavy-duty construction',
      'Dimensions: 90 x 75 x 90 cm',
      'Weight: approx. 40 kg',
    ],
    description: 'The Ladder Barrel is essential for spinal extension work and deep stretching. Its unique design supports the body in a way that promotes proper alignment while performing challenging exercises. Excellent for rehabilitation, flexibility training, and core strengthening.',
    specs: [
      { label: 'Frame', value: 'Solid wood construction' },
      { label: 'Barrel', value: 'Smooth curved surface with padding' },
      { label: 'Ladder', value: 'Adjustable position, non-slip rungs' },
      { label: 'Upholstery', value: 'Professional-grade, easy to clean' },
      { label: 'Dimensions', value: '90 x 75 x 90 cm' },
      { label: 'Warranty', value: '2 years on frame and moving parts' },
    ],
    faq: [
      ...commonFAQ.slice(0, 1),
      {
        question: 'Is installation included?',
        answer: 'The Ladder Barrel is delivered assembled and ready to use. No installation required.',
      },
      {
        question: 'What space is needed?',
        answer: 'The Ladder Barrel requires approximately 1.5m x 1.5m of floor space for safe use.',
      },
      commonFAQ[1],
      ...commonFAQ.slice(2),
    ],
  },
];
