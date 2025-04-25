import { getNormalize } from '../src/utils/getNormalize';
import { Vector } from '../src/Vector';
describe('getNormalize', () => {
    it('should normalize a non-zero vector correctly', () => {
        const vector = new Vector([3, 4]);
        const result = getNormalize(vector);
        expect(result).toStrictEqual([0.6, 0.8]);
    });
    it('should throw an error when normalizing a zero vector', () => {
        const vector = new Vector([0, 0]);
        expect(() => getNormalize(vector)).toThrow();
    });
    it('should normalize a vector with negative components', () => {
        const vector = new Vector([-3, -4]);
        const result = getNormalize(vector);
        expect(result).toStrictEqual([-0.6, -0.8]);
    });
    it('should normalize a vector with floating-point components', () => {
        const vector = new Vector([1.5, 2.5]);
        const magnitude = Math.sqrt(Math.pow(1.5, 2) + Math.pow(2.5, 2));
        const result = getNormalize(vector);
        expect(result).toStrictEqual([1.5 / magnitude, 2.5 / magnitude]);
    });
    it('should normalize a high-dimensional vector', () => {
        const vector = new Vector([1, 2, 3, 4]);
        const magnitude = Math.sqrt(Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(3, 2) + Math.pow(4, 2));
        const result = getNormalize(vector);
        expect(result).toStrictEqual([
            1 / magnitude,
            2 / magnitude,
            3 / magnitude,
            4 / magnitude,
        ]);
    });
});
//# sourceMappingURL=getNormalize.test.js.map