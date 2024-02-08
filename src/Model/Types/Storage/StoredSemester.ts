/**
 * Version sauvergardée d'un semestre
 */
export type StoredSemester = {
  /**Nom du semestre */
  Name: string
  /**Moyenne de chaque UE du semestre */
  Averages: number[]
  /**Date de sauvegarde du semestre, -1 si le semestre est passé */
  Date: number
}
