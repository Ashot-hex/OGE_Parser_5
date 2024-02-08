import { ChromeStorage } from '../../../../Data/Storage/ChromeStorage'
import { Popup } from '../../../../Popup/Popup'
import { Messages } from '../../../Enum/Messages'
import { IActionAnswerPair } from '../../../Interfaces/IActionAnswerPair'
import { ListenerMessage } from '../../../Types/Communication/ListenerMessage'
import { YearlyAverage } from '../../Results/YearlyAverage'

export class GetYearDetailsPair implements IActionAnswerPair {
  public get Message(): string {
    return Messages.GetYearDetails
  }

  public Action(params: any): void {
    Popup.DisplayYearlyAverage(params)
  }

  public Answer(): ListenerMessage {
    let ya = new YearlyAverage(new ChromeStorage())
    return {
      content: Messages.GetYearDetails, //Why tf this.Message doesn't work?
      params: ya.ToYearDetails(),
    }
  }
}
