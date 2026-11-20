// Dutch trainer profiles from the PT7 Academy API, written by the build (scripts/site-content.js, not committed), in the
// same order as `trainerProfiles`; the fetch script checks slugs and dates, the rest follows the API's shapes
import trainers from './generated/trainers.nl.json' with { type: 'json' };
import type { TrainerProfile } from './trainers.ts';

export const trainerProfilesNl = trainers as TrainerProfile[];
