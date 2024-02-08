import { Element } from '../Element'
import { Note } from './Note'

/** Represente une Section */
export class Section extends Element {
  /**
   * Constructeur par defaut d'une Section
   * @param coefficient Coefficient de la section
   * @param notes Liste des notes de la section
   */
  constructor(coefficient: number, notes: Note[]) {
    super(coefficient, notes)
  }
}
