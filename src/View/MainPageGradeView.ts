import { GradeParser } from '../Model/LogicLayer/Parsing/GradeParser'
import { ViewParser } from '../Model/LogicLayer/Parsing/ViewParser'
import { UEDetails } from '../Model/Types/Grades/UEDetails'
import { DOMElementBuilder } from './DOMElementBuilder'

export class MainPageGradeView {
  /**
   * Constructeur
   * @param table Tableau des resultats
   * @param saeIndex Index de la SAE
   */
  public constructor(tableIndex: number) {
    this.index = tableIndex
  }
  //#region Properties
  private index: number
  private get Index(): number {
    return this.index
  }

  private readonly CELL_INSERTION_INDEX = 1
  //#endregion Properties
  /**
   * Ajoute les resultats a la page
   * @param detailedUEResult Resultats
   */
  public AddGradeResultToPage(detailedUEResult: UEDetails): void {
    this.AddGlobalUEResult(detailedUEResult.UEResult)
    this.AddGlobalCCResult(detailedUEResult.CCResult)
    this.AddGlobalSAEResult(detailedUEResult.SAEResult)
    this.AddAllCCResults(detailedUEResult.AllCCResults)
    this.AddAllSAEResults(detailedUEResult.AllSAEResults)
  }

  private AddAllSAEResults(results: number[]) {
    const saeElements: HTMLTableRowElement[] = ViewParser.Instance.GetSAEGradeElements(
      this.index,
    ) as HTMLTableRowElement[]
    for (let i = 0; i < results.length; i++) {
      this.AddCell(saeElements[i], results[i])
    }
  }
  private AddAllCCResults(results: number[]) {
    const ccElements: HTMLTableRowElement[] = ViewParser.Instance.GetCCGradeElements(
      this.index,
    ) as HTMLTableRowElement[]
    for (let i = 0; i < results.length; i++) {
      this.AddCell(ccElements[i], results[i])
    }
  }
  private AddGlobalSAEResult(saeResult: number) {
    let saeEl: HTMLTableRowElement = ViewParser.Instance.GetPoleSaeElement(
      this.index,
    ) as HTMLTableRowElement
    this.AddCell(saeEl, saeResult)
  }
  private AddGlobalCCResult(ccResult: number) {
    let ccEl: HTMLTableRowElement = ViewParser.Instance.GetPoleCCElement(
      this.index,
    ) as HTMLTableRowElement
    this.AddCell(ccEl, ccResult)
  }
  private AddGlobalUEResult(ueResult: number) {
    let ueEl: HTMLTableRowElement = ViewParser.Instance.GetUEElement(
      this.index,
    ) as HTMLTableRowElement
    this.AddCell(ueEl, ueResult)
  }

  private AddCell(element: HTMLTableRowElement, result: number) {
    element.insertCell(this.CELL_INSERTION_INDEX).outerHTML =
      DOMElementBuilder.CreateResultCell(result).outerHTML
  }
}
