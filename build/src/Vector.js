export class Vector {
    constructor(dimensions) {
        this.dimensions = dimensions;
    }
    getDimensions() {
        return this.dimensions;
    }
    setDimensions(dimensions) {
        this.dimensions = dimensions;
    }
    magnitude() {
        return Math.sqrt(this.dimensions.reduce((sum, dim) => sum + Math.pow(dim, 2), 0));
    }
    add(vector) {
        if (this.dimensions.length !== vector.getDimensions().length) {
            throw new Error('Vectors must have the same number of dimensions');
        }
        const newDimensions = this.dimensions.map((dim, i) => { var _a; return dim + ((_a = vector.getDimensions()[i]) !== null && _a !== void 0 ? _a : 0); });
        return new Vector(newDimensions);
    }
    subtract(vector) {
        if (this.dimensions.length !== vector.getDimensions().length) {
            throw new Error('Vectors must have the same number of dimensions');
        }
        const newDimensions = this.dimensions.map((dim, i) => { var _a; return dim - ((_a = vector.getDimensions()[i]) !== null && _a !== void 0 ? _a : 0); });
        return new Vector(newDimensions);
    }
    dotProduct(vector) {
        if (this.dimensions.length !== vector.getDimensions().length) {
            throw new Error('Vectors must have the same number of dimensions');
        }
        return this.dimensions.reduce((sum, dim, i) => { var _a; return sum + dim * ((_a = vector.getDimensions()[i]) !== null && _a !== void 0 ? _a : 0); }, 0);
    }
    toString() {
        return `[${this.dimensions.join(', ')}]`;
    }
}
//# sourceMappingURL=Vector.js.map