import type { Locale } from '../i18n/locale';
import { trainerProfiles } from './trainers';
import { trainerProfilesNl } from './trainers.nl';
import { equipmentProducts } from './equipment';
import { equipmentProductsNl } from './equipment.nl';
import { workoutDetails } from './workoutDetails';
import { workoutDetailsNl } from './workoutDetails.nl';

export const trainersFor = (locale: Locale) => (locale === 'nl' ? trainerProfilesNl : trainerProfiles);

export const equipmentFor = (locale: Locale) => (locale === 'nl' ? equipmentProductsNl : equipmentProducts);

export const workoutDetailsFor = (locale: Locale) => (locale === 'nl' ? workoutDetailsNl : workoutDetails);
