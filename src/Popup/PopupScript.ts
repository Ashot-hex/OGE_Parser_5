import { Messages } from '../Model/Enum/Messages'
import { Actions } from '../Model/LogicLayer/Communication/Actions'
import { ListenerMessage } from '../Model/Types/Communication/ListenerMessage'
import { Popup } from './Popup'

chrome.runtime.onMessage.addListener((message: ListenerMessage) => {
  Actions.Actions[message.content](message.params)
})

Popup.ReloadButton.addEventListener('click', () => {
  Popup.ClearResultsDiv()
  Popup.SendMessageToContentScript(Messages.GetYearDetails)
})
