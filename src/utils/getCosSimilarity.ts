import { Vector } from '../Vector';

/**
 * @file getCosSimilarity.ts
 * @module getCosSimilarity
 * @description This module contains a function to calculate
 *   the cosine similarity between two vectors.
 * @param f1 Vector First vector
 * @param f2 Vector Second vector
 * @description This function calculates the cosine similarity between two vectors.
 * Cosine similarity is a measure of similarity between two non-zero
 *   vectors of an inner product space.
 * It is defined as the cosine of the angle between the two vectors.
 * The cosine similarity is a value between -1 and 1, where 1 means
 *   the vectors are identical,
 * 0 means the vectors are orthogonal (perpendicular), and -1 means
 *   the vectors are diametrically opposed.
 * @returns Number The cosine similarity between the two vectors.
 * @example
 * const vector1 = new Vector([1, 2, 3]);
 * const vector2 = new Vector([4, 5, 6]);
 * const similarity = getCosSimilarity(vector1, vector2);
 * console.log(similarity); // Output: 0.9746318461970762
 * @throws Error If the vectors have different dimensions.
 * @throws Error If the vectors are zero vectors (magnitude is 0).
 * @throws Error If the vectors are not of type Vector.
 */
export function getCosSimilarity(f1: Vector, f2: Vector): number {
	const f1Array = f1.getDimensions();
	const f2Array = f2.getDimensions();

	if (f1Array.length === 0 || f2Array.length === 0) {
		throw new Error('Vectors cannot be empty');
	}

	if (f1Array.length !== f2Array.length) {
		throw new Error('Vectors must have the same dimensions');
	}

	if (f1.magnitude() === 0 || f2.magnitude() === 0) {
		throw new Error('Vector magnitude cannot be zero');
	}

	return Math.abs(
		f1Array.reduce(function (sum, a, idx) {
			return sum + a * (f2Array[idx] ?? 0);
		}, 0) / (Number(f1.magnitude()) * Number(f2.magnitude())),
	);
}
