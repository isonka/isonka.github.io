// Dutch equipment from the PT7 Academy API, written by the build (scripts/site-content.js, not committed), in the same
// order as `equipmentProducts`; the fetch script checks slugs and dates, the rest follows the API's shapes
import equipment from './generated/equipment.nl.json' with { type: 'json' };
import type { EquipmentProduct } from './equipment.ts';

export const equipmentProductsNl = equipment as EquipmentProduct[];
