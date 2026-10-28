export const enHealthcare = {
  seo: {
    title: 'Pilates for Rehabilitation Amsterdam | PT7 Pilates',
    description:
      'For physiotherapists and GPs: refer clients to PT7 for post-rehab Pilates and functional training. Small groups (max 5) and privates at Museumplein.',
    keywords:
      'physiotherapist referral Amsterdam, Pilates post-rehab, fysiotherapeut doorverwijzing, beweegprogramma Amsterdam, Pilates fysiotherapie',
    ogDescription:
      'Partner with PT7. Refer your clients for post-rehab Pilates and functional training. Small groups, expert instructors.',
    analyticsTitle: 'For Healthcare Providers - PT7 Pilates Amsterdam',
  },
  service: {
    name: 'Pilates for Rehabilitation Amsterdam',
    description:
      'Post-rehab Pilates and functional training for referred clients at Museumplein. Small groups max 5 and private sessions with certified instructors, coordinated with physiotherapists and GPs.',
    offerPrivate: 'Post-rehab private session',
    offerGroup: 'Small group rehabilitation training',
  },
  breadcrumb: 'For Healthcare Providers',
  hero: {
    title: 'Pilates for Rehabilitation Amsterdam',
    subtitle: 'Refer Your Clients to PT7',
    description:
      "Partner with Amsterdam's boutique Pilates and fitness studio. We offer a trusted destination for your clients after rehabilitation, Pilates, functional training, and small-group sessions designed to support long-term recovery and strength.",
  },
  why: {
    title: 'Why Pilates for Rehabilitation',
    intro:
      'Pilates is widely used in rehabilitation because it supports the goals you set in treatment: controlled movement, core stability, and progressive strength without high impact.',
    controlledTitle: 'Controlled, Low-Impact Movement',
    controlledText:
      'Pilates equipment provides resistance through springs, allowing clients to load tissues gradually and safely. Movement is guided and adjustable, ideal for post-surgery, chronic back pain, or joint limitations.',
    coreTitle: 'Core Stability & Posture',
    coreText:
      'Pilates targets deep stabilisers and alignment. This supports spinal health, reduces compensatory patterns, and builds the foundation for functional movement, directly reinforcing what you work on in treatment.',
    awarenessTitle: 'Body Awareness & Proprioception',
    awarenessText:
      'Clients learn to sense and control movement more precisely. This improves movement quality and reduces re-injury risk, especially after discharge when they return to daily and sporting activities.',
  },
  who: {
    title: 'Who We Work With',
    physioTag: 'Fysiotherapeuten',
    physioTitle: 'Physiotherapists',
    physioText:
      'Post-rehab clients ready for movement and strength. Equipment Pilates and functional training complement your treatment plan.',
    gpTag: 'Huisartsen',
    gpTitle: 'General Practitioners',
    gpText:
      'Patients needing structured exercise for chronic conditions, mobility, or general fitness. We can work with your recommendations.',
    specialistTag: 'Specialisten',
    specialistTitle: 'Medical Specialists',
    specialistText:
      'Post-surgery, post-injury, or ongoing care. Small groups (max 5) and private sessions allow for tailored modifications.',
  },
  how: {
    title: 'How Referrals Work',
    step1Title: 'You refer your client',
    step1Text: "Send us the client's name and a brief note (e.g. post-LBP, post-ACL, chronic back). Email or WhatsApp.",
    step2Title: 'We schedule an intro',
    step2Text:
      'We contact the client to arrange a private or small-group session. We take into account any limitations you share.',
    step3Title: 'Client continues training',
    step3Text:
      'Pilates and functional training support ongoing strength, mobility, and recovery. We can provide feedback when you request it.',
  },
  offer: {
    title: 'What We Offer Your Clients',
    equipmentTitle: 'Equipment Pilates',
    equipmentText:
      'Spring-based resistance allows gradual, controlled loading, ideal for post-rehab. Builds core stability, posture, and flexibility. Every exercise can be modified for injuries and limitations.',
    functionalTitle: 'Functional Training',
    functionalText: 'Strength training with Nike equipment. Builds stability and functional capacity. Can be adapted for post-rehab.',
    groupsTitle: 'Small Groups',
    groupsText: 'Maximum 5 participants per class. Personalized attention and safe progression.',
    privateTitle: 'Private Sessions',
    privateText: 'One-on-one training for clients who need more control or individual programming.',
  },
  benefits: {
    title: 'Benefits for You',
    goals: 'Pilates reinforces your treatment goals, controlled movement, core stability, progressive loading',
    destination: 'A trusted destination for clients after discharge',
    continuity: 'Continuity of care, clients stay active and reduce relapse risk',
    simple: 'Simple referral process, no paperwork, just a quick message',
    professional: 'Professional studio with qualified instructors and 15+ years experience',
  },
  cta: {
    title: 'Start Referring',
    text: "Email or WhatsApp with your client's name and a brief note. We'll take it from there.",
    email: 'Email Referral',
    emailSubject: 'Referral - Healthcare Provider',
    whatsappText: "Hi, I'd like to refer a client to PT7.",
    note: '{{address}} (Museumplein, Oud-Zuid)',
  },
  related: {
    title: 'Related Service Pages',
    reformer: 'Reformer Pilates',
    elif: 'Elif Arzu Ogan profile',
    goknur: 'Göknur Dipli profile',
    back: '← Back to PT7',
  },
} as const;

export type EnHealthcare = typeof enHealthcare;
