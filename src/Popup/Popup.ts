import { Messages } from '../Model/Enum/Messages'
import { YearDetails } from '../Model/Types/Grades/YearDetails'
import { DOMElementBuilder } from '../View/DOMElementBuilder'

export class Popup {
  //#region DOM Elements
  private static readonly RELOAD_BUTTON_ID = 'reloadButton'
  private static readonly RESULTS_ID = 'results'

  public static get ReloadButton(): HTMLElement {
    return document.getElementById(this.RELOAD_BUTTON_ID)!
  }
  public static get ResultsDiv(): HTMLElement {
    return document.getElementById(this.RESULTS_ID)!
  }
  //#endregion DOM Elements

  public static ClearResultsDiv(): void {
    this.ResultsDiv.innerHTML = ''
  }
  public static AskLoadCorrespondingSemester(params: any) {
    let message: string = `Vous devez charger le semestre ${params} pour avoir la vraie moyenne à l'année.`
    this.ResultsDiv.appendChild(DOMElementBuilder.CreateWarningMessage(message))
  }
  constructor() {}
  public static DisplayYearlyAverage(yearDetails: YearDetails): void {
    this.CreateYearlyAverageTable(yearDetails)

    if (yearDetails.NeedToAskToLoadCorrespondingSemester) {
      Popup.SendMessageToContentScript(Messages.AskToLoadCorrespondingSemester)
    }
  }

  public static SendMessageToContentScript(message: string): void {
    let params = { active: true, currentWindow: true }
    chrome.tabs.query(params, (tab) => {
      chrome.tabs.sendMessage(tab[0].id!, message)
    })
  }

  public static CreateYearlyAverageTable(yearDetails: YearDetails): void {
    let table = document.createElement('table')

    table.className = 'table table-striped table-bordered'
    table.appendChild(Popup.CreateYearlyAverageTableHeader(yearDetails.YearName))
    table.appendChild(Popup.CreateYearlyAverageTableBody(yearDetails))

    this.ResultsDiv.appendChild(table)
  }

  private static CreateYearlyAverageTableHeader(yearName: string): HTMLTableSectionElement {
    return DOMElementBuilder.CreateTableHeader(yearName)
  }
  private static CreateYearlyAverageTableBody(yearDetails: YearDetails): HTMLTableSectionElement {
    return DOMElementBuilder.CreateTableBody(yearDetails)
  }
}
