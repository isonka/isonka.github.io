// Dutch equipment from the PT7 Academy API, written by the build (scripts/site-content.js, not committed), in the same
// order as `equipmentProducts`; shapes checked by the fetch script
import equipment from './generated/equipment.nl.json' with { type: 'json' };
import type { EquipmentProduct } from './equipment.ts';

export const equipmentProductsNl = equipment as EquipmentProduct[];
