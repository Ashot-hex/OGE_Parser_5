import { YearDetails } from '../Types/Grades/YearDetails'

export interface IYearlyAverage {
  /** Vrai si on a besoin de demander a l'utilisateur de charger le semestre correspondant */
  get NeedToAskToLoadCorrespondingSemester(): boolean
  /** Récupère les moyennes des UE de l'année en cours */
  get YearlyAverages(): number[]
  /** Retourne vrai si l'utilisateur passe a l'année superieure, faux dans le cas contraire */
  get IsPassing(): boolean
  /** Retourne vrai si l'utilisateur valide son année, faux dans le cas contraire */
  get IsValidating(): boolean
  /** Retourne l'intitulé de l'année, le plus souvent [Filiere] + [Année] */
  get YearName(): string
  /** Retourne un objet contenant les détails de l'année */
  ToYearDetails(): YearDetails
}
