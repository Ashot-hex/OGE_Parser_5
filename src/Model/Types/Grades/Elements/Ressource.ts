import { Element } from '../Element'
import { Section } from './Section'

/** Represente une Ressource */
export class Ressource extends Element {
  /**
   * Constructeur par defaut d'une Ressource
   * @param coefficient Coefficient de la ressource
   * @param sections Sections de la ressource
   */
  constructor(coefficient: number, sections: Section[]) {
    super(coefficient, sections)
  }
}
