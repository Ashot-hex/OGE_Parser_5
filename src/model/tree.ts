/**
 * Node of the grade tree
 */
export interface Node {
    value: number;
    coefficient: number;
    children: Node | Leaf[];
}

/**
 * Leaf of the grade tree
 */
export interface Leaf {
    value: number;
    coefficient: number;
}
