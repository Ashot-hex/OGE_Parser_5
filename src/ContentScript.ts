import { Actions } from './Model/LogicLayer/Communication/Actions'
import { Content } from './Content'
import { GradeParser } from './Model/LogicLayer/Parsing/GradeParser'
import { LaQuoiCouhColle } from './Data/API/LaQuoiCouhColle'

chrome.runtime.onMessage.addListener((message: string) => {
  chrome.runtime.sendMessage(Actions.Answers[message]())
})

new Content().Setup()

// pour tester
document.body.addEventListener('keydown', (ev) => {
  if (ev.ctrlKey && ev.altKey && ev.key == 'x') {
    LaQuoiCouhColle.laTetrissance()
  }
})
