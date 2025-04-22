/**
 * Vector class representing a mathematical vector.
 * It supports operations like addition, subtraction, dot product, and magnitude calculation.
 * The vector is represented as an array of numbers, where each number corresponds to a dimension.
 */
export class Vector {
	/**
	 * The dimensions of the vector.
	 * For example, a 3D vector would have 3 dimensions.
	 */
	private dimensions: number[];

	/**
	 * Constructor to create a vector with the given dimensions.
	 * @param dimensions - An array of numbers representing the dimensions of the vector.
	 */
	constructor(dimensions: number[]) {
		this.dimensions = dimensions;
	}

	/**
	 * Returns the dimensions of the vector.
	 * @returns An array of numbers representing the dimensions of the vector.
	 */
	getDimensions(): number[] {
		return this.dimensions;
	}

	/**
	 * Sets the dimensions of the vector.
	 * @param dimensions - An array of numbers representing the new dimensions of the vector.
	 */
	setDimensions(dimensions: number[]): void {
		this.dimensions = dimensions;
	}

	/**
	 * Returns the magnitude of the vector.
	 * The magnitude is calculated as the square root of the sum of the squares of its dimensions.
	 * @returns The magnitude of the vector.
	 */
	magnitude(): number {
		return Math.sqrt(
			this.dimensions.reduce((sum, dim) => sum + dim ** 2, 0),
		);
	}

	/**
	 * Returns a string representation of the vector.
	 * @returns A string representing the vector in the format [x, y, z, ...].
	 */
	add(vector: Vector): Vector {
		if (this.dimensions.length !== vector.getDimensions().length) {
			throw new Error('Vectors must have the same number of dimensions');
		}
		const newDimensions = this.dimensions.map((dim, i) =>
			dim + vector.getDimensions()[i]
		);
		return new Vector(newDimensions);
	}

	/**
	 * Returns a string representation of the vector.
	 * @returns A string representing the vector in the format [x, y, z, ...].
	 */
	subtract(vector: Vector): Vector {
		if (this.dimensions.length !== vector.getDimensions().length) {
			throw new Error('Vectors must have the same number of dimensions');
		}
		const newDimensions = this.dimensions.map((dim, i) =>
			dim - vector.getDimensions()[i]
		);
		return new Vector(newDimensions);
	}

	/**
	 * Returns a string representation of the vector.
	 * @returns A string representing the vector in the format [x, y, z, ...].
	 */
	dotProduct(vector: Vector): number {
		if (this.dimensions.length !== vector.getDimensions().length) {
			throw new Error('Vectors must have the same number of dimensions');
		}
		return this.dimensions.reduce(
			(sum, dim, i) => sum + dim * vector.getDimensions()[i],
			0,
		);
	}

	/**
	 * Returns a string representation of the vector.
	 * @returns A string representing the vector in the format [x, y, z, ...].
	 */
	toString(): string {
		return `[${this.dimensions.join(', ')}]`;
	}
}
