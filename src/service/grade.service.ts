import { Leaf } from "../model/tree";

const GRADE_DIVISOR_NORM = 20;

/**
 * Service for grades.
 */
export class GradeService {
    public createLeaf(value: string, divisor: string, coefficient: string): Leaf {
        const valueNum = parseFloat(value);
        const divisorNum = parseFloat(divisor.slice(1));
        const coefficientNum = parseFloat(coefficient.slice(1, -1));

        if (isNaN(valueNum) || isNaN(divisorNum) || isNaN(coefficientNum)) {
            throw new Error("Invalid grade data");
        }

        return {
            value: this.normalizeGrade(valueNum, divisorNum),
            coefficient: coefficientNum
        } as Leaf;
    }
    /**
     * Default constructor.
     */
    constructor() {}

    /**
     * Normalize a grade.
     * @param grade Initial grade to normalize
     * @param divisor Initial divisor of the grade
     * 
     * @returns The normalized grade
     */
    public normalizeGrade(grade: number, divisor: number): number {
        return (grade * GRADE_DIVISOR_NORM) / divisor;
    }
}
