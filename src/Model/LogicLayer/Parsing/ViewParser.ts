import { Parser } from './Parser'

export class ViewParser extends Parser {
  //#region Singleton
  private constructor() {
    super()
  }

  private static instance: ViewParser
  /**Retourne l'instance du Parser de la page */
  public static get Instance(): ViewParser {
    return this.instance || (this.instance = new this())
  }

  /**Remet a zero les données connu sur la page, utile quand on change de semestre */
  public static Reset() {
    this.instance = new this()
  }
  //#endregion Singleton

  //#region Methods
  private GetPoleElements(ue: number): HTMLElement[] {
    return this.GetRawRessources(ue, this.POLE_ELEMENT_FIRST_SELECTOR).filter((element) =>
      element.querySelector(this.POLE_ELEMENT_SECOND_SELECTOR),
    )
  }

  public GetUEElement(ue: number): HTMLElement {
    return this.Tables[ue]?.querySelector(this.UE_SELECTOR) as HTMLElement
  }

  public GetPoleCCElement(ue: number): HTMLElement {
    return this.GetPoleElements(ue)[this.POLE_CC_INDEX]
  }
  public GetPoleSaeElement(ue: number): HTMLElement {
    return this.GetPoleElements(ue)[this.POLE_SAE_INDEX]
  }

  public GetCCGradeElements(ue: number): HTMLElement[] {
    return this.GetRawRessources(ue, this.CC_RESSOURCE_SELECTOR)
  }
  public GetSAEGradeElements(ue: number): HTMLElement[] {
    return this.GetRawRessources(ue, this.SAE_RESSOURCE_SELECTOR)
  }
  //#endregion Methods
}
