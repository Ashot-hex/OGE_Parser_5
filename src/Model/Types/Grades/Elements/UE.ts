import { UEDetails } from '../UEDetails'
import { Element } from '../Element'
import { Ressource } from './Ressource'

/** Represente une UE */
export class UE extends Element {
  private saeIndex: number
  private name: string

  /**Nom de l'UE */
  public get Name(): string {
    return this.name
  }
  /**Index de la premiere ressource du SAE */
  public get SAEIndex(): number {
    return this.saeIndex != -1 ? this.saeIndex : this.Ressources.length
  }
  /**Liste des ressources de l'UE */
  private get Ressources(): Ressource[] {
    return this.subElements as Ressource[]
  }
  /**Liste des ressources du pôle CC*/
  private get CCRessources(): Ressource[] {
    let ccRessources: Ressource[] = []

    //n est la limite des ressources CC
    let n: number = Math.min(this.SAEIndex, this.Ressources.length)
    for (let i = 0; i < n; i++) {
      ccRessources.push(this.Ressources[i])
    }

    return ccRessources
  }
  /**Liste des ressources du pôle SAE */
  private get SAERessources(): Ressource[] {
    let saeRessources: Ressource[] = []
    //SAEIndex est l'index de la premiere ressource SAE
    let begining: number = this.SAEIndex

    if (begining > -1) {
      for (let i = begining; i < this.Ressources.length; i++) {
        saeRessources.push(this.Ressources[i])
      }
    }

    return saeRessources
  }
  /**Moyenne globale du pôle CC*/
  private get GetGlobalCCAverage(): number {
    return this.GetAverage(this.CCRessources)
  }
  /**Moyenne globale du pôle SAE */
  private get GetGlobalSAEAverage(): number {
    return this.GetAverage(this.SAERessources)
  }
  /**Moyenne de chaque ressources du pôle CC */
  private get GetCCAverages(): number[] {
    return this.GetAverageList(this.CCRessources)
  }
  /**Moyenne de chaque ressources du pôle SAE */
  private get GetSAEAverages(): number[] {
    return this.GetAverageList(this.SAERessources)
  }

  private GetAverageList(ressources: Ressource[]): number[] {
    return ressources.map((res) => {
      return res.Average
    }) as number[]
  }

  /** Resultats detaillés de l'UE */
  public get Details(): UEDetails {
    return {
      Name: this.Name,
      UEResult: this.Average,
      CCResult: this.GetGlobalCCAverage,
      SAEResult: this.GetGlobalSAEAverage,
      AllCCResults: this.GetCCAverages,
      AllSAEResults: this.GetSAEAverages,
    } as UEDetails
  }

  /**
   * Constructeur par defaut d'une UE
   * @param coefficient Coefficient de l'UE
   * @param ressources Ressources de l'UE
   */
  constructor(coefficient: number, ressources: Ressource[], saeIndex: number, name: string = '') {
    super(coefficient, ressources)
    this.saeIndex = saeIndex
    this.name = name
  }
}
