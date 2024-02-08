/** Classe abstraite representant un element dans le systeme de gestion des notes de OGE */
export abstract class Element {
  /** Moyenne de l'element */
  public get Average(): number {
    return this.GetAverage(this.subElements)
  }
  /** Coefficient de l'element */
  public get Coefficient() {
    return this.coefficient
  }

  protected coefficient: number
  protected subElements: Element[]

  protected constructor(coef: number, subElements: Element[]) {
    this.coefficient = coef
    this.subElements = subElements
  }

  protected GetAverage(elements: Element[]): number {
    let actualAverage: number = NaN

    //S'il n'y a pas sous element on ne calcul rien et renvoie 0
    if (elements.length > 0) {
      let averagesSum: number = 0
      let coefficientSum: number = 0

      elements.forEach((el) => {
        const avg: number = el.Average
        if (!isNaN(avg)) {
          const coef: number = el.Coefficient

          averagesSum += avg * coef
          coefficientSum += coef
        }
      })
      actualAverage = averagesSum / coefficientSum
    }

    return actualAverage
  }
}
