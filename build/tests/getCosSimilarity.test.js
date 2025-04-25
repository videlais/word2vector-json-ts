import { Vector } from '../src/Vector';
import { getCosSimilarity } from '../src/utils/getCosSimilarity';
describe('getCosSimilarity', () => {
    it('should calculate cosine similarity for two valid vectors', () => {
        const vector1 = new Vector([1, 2, 3]);
        const vector2 = new Vector([4, 5, 6]);
        const similarity = getCosSimilarity(vector1, vector2);
        expect(similarity.toFixed(10)).toBe((0.9746318462).toFixed(10));
    });
    it('should return 1 for identical vectors', () => {
        const vector1 = new Vector([1, 2, 3]);
        const vector2 = new Vector([1, 2, 3]);
        const similarity = getCosSimilarity(vector1, vector2);
        expect(similarity).toBe(1);
    });
    it('should return 0 for orthogonal vectors', () => {
        const vector1 = new Vector([1, 0]);
        const vector2 = new Vector([0, 1]);
        const similarity = getCosSimilarity(vector1, vector2);
        expect(similarity).toBe(0);
    });
    describe('Errors', () => {
        it('should throw an error if first vector has a different dimension than second', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([4, 5]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
        it('should throw an error if second vector has a different dimension than first', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([4, 5]);
            expect(() => getCosSimilarity(vector2, vector1)).toThrow();
        });
        it('should throw an error if the first of the vectors is a zero vector', () => {
            const vector1 = new Vector([0, 0, 0]);
            const vector2 = new Vector([1, 2, 3]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
        it('should throw an error if the second of the vectors is a zero vector', () => {
            const vector1 = new Vector([0, 0, 0]);
            const vector2 = new Vector([1, 2, 3]);
            expect(() => getCosSimilarity(vector2, vector1)).toThrow();
        });
        it('should throw an error if inputs are not of type Vector', () => {
            const vector1 = [1, 2, 3];
            const vector2 = new Vector([4, 5, 6]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
        it('should throw an error if vectors are empty', () => {
            const vector1 = new Vector([]);
            const vector2 = new Vector([]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
        it('should throw an error if the first vector has a magnitude of 0', () => {
            const vector1 = new Vector([0, 0, 0]);
            const vector2 = new Vector([1, 2, 3]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
        it('should throw an error if the second vector has a magnitude of 0', () => {
            const vector1 = new Vector([1, 2, 3]);
            const vector2 = new Vector([0, 0, 0]);
            expect(() => getCosSimilarity(vector1, vector2)).toThrow();
        });
    });
});
//# sourceMappingURL=getCosSimilarity.test.js.map