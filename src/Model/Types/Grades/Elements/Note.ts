import { Element } from '../Element'
import { GradeCoefficientPair } from './GradeCoefficientPair'

/** Represente une Note */
export class Note extends Element {
  private grade: number
  public get Average(): number {
    return this.grade
  }
  /**
   * Constructeur par defaut d'une Note
   * @param grade valeur de la note
   * @param coefficient coefficient de la note
   */
  constructor(grade: GradeCoefficientPair) {
    super(grade.coefficient, [])
    this.grade = grade.grade
  }
}
