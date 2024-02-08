import { StoredSemester } from '../Types/Storage/StoredSemester'

/** Interface des classes gerant le stockage des notes*/
export interface ISemesterStorage {
  /** Retourne le semestre traité */
  GetSemester(): Promise<StoredSemester | undefined>
  /** Retourne le semestre correspondant dans le stockage */
  GetCorrespondingSemester(): Promise<StoredSemester | undefined>
  /**
   * Sauvegarde un semestre dans le stockage
   */
  Save(): Promise<void>
  /**
   * Efface tous les semestres sauvegardés
   */
  Clear(): Promise<void>
}
