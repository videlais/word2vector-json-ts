export function getNormalize(a) {
    const magnitude = a.magnitude();
    const vector = a.getDimensions();
    if (magnitude === 0) {
        throw new Error('Cannot normalize a zero vector.');
    }
    return vector.map((val) => val / magnitude);
}
//# sourceMappingURL=getNormalize.js.map