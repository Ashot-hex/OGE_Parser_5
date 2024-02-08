import { ISemesterStorage } from '../../Interfaces/ISemesterStorage'
import { IYearlyAverage } from '../../Interfaces/IYearlyAverage'
import { YearDetails } from '../../Types/Grades/YearDetails'
import { StoredSemester } from '../../Types/Storage/StoredSemester'
import { GradeParser } from '../Parsing/GradeParser'
import { SemesterNames } from '../Parsing/SemesterNames'
import { SemesterLoading } from './SemesterLoading'

export class YearlyAverage implements IYearlyAverage {
  //#region Private
  private storage: ISemesterStorage
  private currentSemester: StoredSemester | undefined
  private correspondingSemester: StoredSemester | undefined

  //#region Constantes
  private readonly PASSING_GRADE: number = 8
  private readonly VALIDATING_GRADE: number = 10
  //#endregion Constantes

  //#endregion Private

  /**
   * Constructeur par defaut
   * @param storage Classe permettant de charger les semestres
   */
  public constructor(storage: ISemesterStorage) {
    this.storage = storage
    //Chargement asynchrone des semestres
    this.storage
      .GetSemester()
      .then((s) => (this.currentSemester = s))
      .then(() => console.log('this.currentSemester', this.currentSemester))
    this.storage
      .GetCorrespondingSemester()
      .then((s) => (this.correspondingSemester = s))
      .then(() => console.log('this.correspondingSemester', this.correspondingSemester))
  }

  public get NeedToAskToLoadCorrespondingSemester(): boolean {
    return this.correspondingSemester == undefined && SemesterNames.CorrespondingSemesterAvailable
  }

  public get YearName(): string {
    return SemesterNames.CurrentYearName
  }

  public get YearlyAverages(): number[] {
    this.storage.GetSemester()
    if (!this.currentSemester) console.error('this.currentSemester is undefined')

    let found = false
    for (let i = 0; i < 500; i++)
      setTimeout(() => {
        if (!found && this.currentSemester) {
          found = true
          console.log('found in', i * 1 + 1, 'ms')
        }
      }, 1)

    let yearlyAverages: number[] = this.currentSemester?.Averages ?? []
    let count = Math.min(
      yearlyAverages.length, // <=> this.currentSemester?.Averages.length ?? 0
      this.correspondingSemester?.Averages.length ?? 0,
    )

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        yearlyAverages[i] = this.correspondingSemester!.Averages[i]
      }
    }

    return yearlyAverages
  }

  public get IsPassing(): boolean {
    //Retourne vrai si toutes les moyennes des UE sont superieures ou egales a 8
    return this.YearlyAverages.every((average) => average >= this.PASSING_GRADE)
  }

  public get IsValidating(): boolean {
    //Retourne vrai si toutes les moyennes des UE sont superieures ou egales a 10
    return this.YearlyAverages.every((average) => average >= this.VALIDATING_GRADE)
  }

  public ToYearDetails(): YearDetails {
    return {
      YearName: this.YearName,
      YearlyAverages: this.YearlyAverages,
      IsPassing: this.IsPassing,
      IsValidating: this.IsValidating,
      NeedToAskToLoadCorrespondingSemester: this.NeedToAskToLoadCorrespondingSemester,
    }
  }
}
