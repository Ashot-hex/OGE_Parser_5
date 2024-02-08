import { ActionDict } from '../../Types/Communication/ActionDict'
import { AnswersDict } from '../../Types/Communication/AnswersDict'
import { IActionAnswerPair } from '../../Interfaces/IActionAnswerPair'
import { GetYearDetailsPair } from './ActionAnswerPairs/GetYearDetails'
import { AskToLoadCorrespondingSemesterPair } from './ActionAnswerPairs/AskToLoadCorrespondingSemesterPair'

/** Actions et Reponses possibles dans la communication entre le content script et le popup */
export class Actions {
  //Constructeur privé pour le singleton
  private constructor() {
    let aaPairs: IActionAnswerPair[] = []
    // Ajouter les paires d'actions/réponses ici
    aaPairs.push(new GetYearDetailsPair())
    aaPairs.push(new AskToLoadCorrespondingSemesterPair())

    //Initialisation des dictionnaires
    aaPairs.forEach((pair) => {
      this.actions[pair.Message] = pair.Action
      this.answers[pair.Message] = pair.Answer
    })
  }
  //Instance du singleton caché
  private static instance: Actions = new Actions()

  /**
   * Dictionnaire des actions possibles
   * @remarks Les clées sont les messages possibles venant de l'enum Messages
   */
  public static get Actions(): ActionDict {
    return this.instance.actions
  }
  private readonly actions: ActionDict = {}

  /**
   * Dictionnaire des actions possibles
   * @remarks Les clées sont les messages possibles venant de l'enum Messages
   */
  public static get Answers(): AnswersDict {
    return this.instance.answers
  }
  private readonly answers: AnswersDict = {}
}
