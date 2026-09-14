/**
 * Face-dominant object-position for instructor portraits.
 *
 * Photo brief (P1-1 — replace assets when reshoot lands):
 * - Aspect: match grid cards (~24/34) and circular crop; leave headroom for circle.
 * - Subject: face fills ~40–60% of frame; torso optional; neon PT7 logo secondary or absent.
 * - Distance: consistent across team (same distance to camera).
 * - Avoid: mid-garment crop, logo brighter than face, selfie vs torso mix.
 * Until then, tune focus points so the face stays centered in circular crops.
 */
export const PHOTO_FOCUS: Record<string, string> = {
  elif: '42% 18%',
  gokben: '48% 18%',
  goknur: '50% 16%',
  gulce: '58% 16%',
  lal: '50% 18%',
  nisan: '48% 16%',
  kelly: '45% 18%',
  gamze: '50% 18%',
};
