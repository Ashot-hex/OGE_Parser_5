import { Element } from '../Types/Grades/Element'

/** Interface de Parser d'élément */
export interface IElementParser {
  CreateElement(htmlElement: HTMLElement): Element
}
