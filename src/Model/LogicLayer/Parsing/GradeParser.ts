import { GradeCoefficientPair } from '../../Types/Grades/Elements/GradeCoefficientPair'
import { Parser } from './Parser'
import { StringParser } from './StringParser'
import { ViewParser } from './ViewParser'

/**
 * Classe permettant de parser la page
 */
export class GradeParser extends Parser {
  //#region Singleton
  private constructor() {
    super()
  }

  private static instance: GradeParser
  /**Retourne l'instance du Parser de la page */
  public static get Instance(): GradeParser {
    return this.instance || (this.instance = new this())
  }

  /**Remet a zero les données connu sur la page, utile quand on change de semestre */
  public static Reset() {
    this.instance = new this()
  }
  //#endregion Singleton

  private GetResources(ue: number): HTMLElement[] {
    return this.GetRawRessources(ue)
  }
  private GetSections(ue: number, res: number): HTMLElement[] {
    return Array.from(
      this.GetResources(ue)[res]?.querySelectorAll(this.SECTION_SELECTOR) ?? [],
    ).filter((p) => p.querySelector('sub')) as HTMLElement[]
  }
  public GetGrades(ue: number, res: number, sect: number): GradeCoefficientPair[] {
    return StringParser.GetNotesFromSectionInnerText(
      this.GetSections(ue, res)[sect]?.textContent ?? '',
    )
  }

  //#endregion Properties

  //#region Coefficient Methods
  public RessourceCount(ue: number): number {
    return this.GetResources(ue).length
  }
  public SectionCount(ue: number, res: number): number {
    return this.GetSections(ue, res).length
  }
  public SaeIndex(ue: number): number {
    let rawRessources = this.GetRawRessources(ue, this.RESSOURCE_AND_POLES_SELECTOR)
    let poleSaeEl: HTMLElement = ViewParser.Instance.GetPoleSaeElement(ue).querySelector(
      'td',
    ) as HTMLElement

    return rawRessources.indexOf(poleSaeEl) - 1
  }

  public UECoefficient(ue: number): number {
    let rawCoeff: string =
      this.Tables[ue]?.querySelector(this.UE_COEFFICENT_SELECTOR)?.textContent ?? ''

    return StringParser.ClearCoefficient(rawCoeff)
  }
  public RessourceCoefficient(ue: number, res: number): number {
    let rawCoeff: string =
      this.GetResources(ue)[res]?.querySelector(this.RESSOURCE_COEFFICENT_SELECTOR)?.textContent ??
      ''

    return StringParser.ClearCoefficient(rawCoeff)
  }
  public SectionCoefficient(ue: number, res: number, sect: number): number {
    let rawCoeff: string =
      this.GetSections(ue, res)[sect]?.querySelector(this.SECTION_COEFFICENT_SELECTOR)
        ?.textContent ?? ''

    return StringParser.ClearCoefficient(rawCoeff)
  }

  public UEName(ue: number): string {
    return (
      this.Tables[ue]
        ?.querySelector(this.UE_NAME_SELECTOR)
        ?.childNodes[0].textContent?.replace(/\n */g, '') ?? ''
    )
  }
  //#endregion Coefficient Methods
}
