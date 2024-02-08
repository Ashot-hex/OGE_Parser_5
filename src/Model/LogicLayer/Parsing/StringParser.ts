import { GradeCoefficientPair } from '../../Types/Grades/Elements/GradeCoefficientPair'

/**
 * Manager du format des titres
 * @remarks Utilisé pour normaliser le format des differents string utilisés dans le programme, surtout pour la partie IHM
 */
export class StringParser {
  //#region Constantes
  private static readonly VALID_GRADE_FORMAT: RegExp = new RegExp(/\d+\.*\d*\/\d+\.*\d*/g)
  private static readonly GRADE_SPLIT_CHAR: string = '/'
  private static readonly STANDARDIZED_SCORE_BASE: number = 20
  //#endregion Constantes

  /**
   * Nettoie le coefficient d'une section
   * @param coefficientText Texte à nettoyer, sous forme de string (ex: "(10.50)")
   * @returns Coefficient nettoyé sous forme de number
   */
  public static ClearCoefficient(coefficientText: string): number {
    let coef: number = 0
    if (coefficientText) {
      // if (coefficientText.includes("(")) coefficientText = coefficientText.slice(coefficientText.lastIndexOf('('), -1);
      coefficientText = coefficientText.replace('(', '')
      coefficientText = coefficientText.replace(')', '')

      coef = Number(coefficientText)
    }
    return coef
  }

  /**
   * Récupère les notes d'une section avec leur coefficient
   * @param sectionText Texte de la section à analyser
   * @returns Tableau d'objets contenant les notes et leur coefficient
   */
  public static GetNotesFromSectionInnerText(sectionText: string): GradeCoefficientPair[] {
    let pairs: GradeCoefficientPair[] = []
    if (sectionText != '') {
      sectionText = sectionText.slice(sectionText.indexOf('[') + 2, sectionText.indexOf(']') - 1)
      pairs = this.GetGradeCoefficientPairs(sectionText)
    }
    return pairs
  }

  /**
   * Récupère les notes d'une section avec leur coefficient
   * @param sectionText Texte de la section à analyser
   * @returns Tableau d'objets contenant les notes et leur coefficient
   */
  private static GetGradeCoefficientPairs(sectionText: string): GradeCoefficientPair[] {
    sectionText = sectionText.replace(/\s/g, '')
    let notes: string[] = sectionText.split(')')
    notes.pop()

    let pairs: GradeCoefficientPair[] = []
    notes.forEach((n) => {
      let split = n.split('(')
      if (split.length == 1) split.push('-1')
      pairs.push({
        grade: this.NormalizeGrade(split[0]),
        coefficient: this.ClearCoefficient(split[1]),
      })
    })

    return pairs
  }

  /**
   * Normalise une note
   * @param baseGrade Note à normaliser (ex: "10/20" ou "5/10")
   * @returns Note normalisée en etant rapporté à 20
   */
  private static NormalizeGrade(baseGrade: string): number {
    let normalizedGrade: number = 0
    // if (!this.VALID_GRADE_FORMAT.test(baseGrade))
    {
      let split: string[] = baseGrade.split(this.GRADE_SPLIT_CHAR)
      //Si la note donnée est sous un format valide elle aura forcément 2 éléments
      //Le premier est la note, le second est la base de la note
      normalizedGrade = (Number(split[0]) / Number(split[1])) * this.STANDARDIZED_SCORE_BASE
    }

    return normalizedGrade
  }
}
