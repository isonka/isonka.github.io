export const enCongrats = {
  seo: {
    title: 'Booking Confirmed - PT7 Pilates Amsterdam',
    description: 'Your class is booked! See you at PT7 Amsterdam.',
    keywords: 'PT7, booking confirmed',
    analyticsTitle: 'Booking Confirmed',
  },
  title: 'Booking Confirmed!',
  message: "You're all set! We can't wait to see you at PT7.",
  nextTitle: "What's Next?",
  next: {
    email: '✓ Check your email for booking confirmation and details',
    early: "✓ Arrive 10 minutes early if it's your first visit",
    bring: '✓ Bring water, a towel, and grip socks (or purchase at studio)',
    wear: '✓ Wear comfortable workout clothes',
  },
  locationTitle: '📍 Studio Location',
  locationNote: '(Museumplein, across from Stedelijk Museum)',
  bookAnother: 'Book Another Class',
  packages: 'View Packages',
  home: 'Back to Home',
  reviewPrompt: 'Enjoyed your experience at PT7?',
  reviewButton: 'Leave Us a Google Review',
  questions: 'Questions? Contact us at <email>info@pt7.nl</email>',
} as const;

export type EnCongrats = typeof enCongrats;
