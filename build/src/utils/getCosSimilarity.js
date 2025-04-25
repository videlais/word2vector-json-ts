export function getCosSimilarity(f1, f2) {
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
    return Math.abs(f1Array.reduce(function (sum, a, idx) {
        var _a;
        return sum + a * ((_a = f2Array[idx]) !== null && _a !== void 0 ? _a : 0);
    }, 0) / (Number(f1.magnitude()) * Number(f2.magnitude())));
}
//# sourceMappingURL=getCosSimilarity.js.map