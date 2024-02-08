import { ListenerMessage } from '../Types/Communication/ListenerMessage'

/** Paire d'action et de réponse */
export interface IActionAnswerPair {
  /** Message de l'action */
  get Message(): string
  /** Action à effectuer */
  Action(params: any): void
  /** Réponse à renvoyer */
  Answer(): ListenerMessage
}
