import { Vector } from '../Vector.ts';

/**
 * Normalizes a vector.
 * The normalization process involves dividing each component of
 *   the vector by its magnitude.
 * This results in a unit vector that points in the same direction
 *   as the original vector.
 * @param a - The vector to be normalized.
 * @returns A new array representing the normalized vector.
 * @throws Error if the vector is zero (magnitude is 0).
 */
export function getNormalize(a: Vector): number[] {
	const magnitude = a.magnitude();
	const vector = a.getDimensions();

	// Check if the vector is zero
	if (magnitude === 0) {
		throw new Error('Cannot normalize a zero vector.');
	}

	// Normalize the vector.
	// Divide each component by the magnitude.
	// This will give us a unit vector in the same direction.
	return vector.map((val) => val / magnitude);
}
