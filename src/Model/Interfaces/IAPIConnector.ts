export interface IAPIConnector {
  /**
   * Recupere le coefficient d'une matiere
   * @param path Chemin vers la matiere (Semestre, UE, Matiere)
   * @param filiere Filiere demandée
   */
  GetCoefficient(filiere: string, path: number[]): number
  /**
   * Envoie le coefficient d'une matiere
   * @param coefficient Coefficient de la matiere
   * @param filiere Filiere de la matiere
   * @param path chemin vers la matiere (Semestre, UE, Matiere)
   */
  PostCoefficient(coefficient: number, filiere: string, path: number[]): void
  /**
   * Recupere le classement d'un utilisateur
   * @param userId Id de l'utilisateur
   */
  GetRank(userId: number, filiere: string, path: number[]): number
  /**
   * Recupere la taille d'un champ (classement)
   * @param filiere Filiere demandée
   * @param path Chemin vers le champ
   */
  GetFieldSize(filiere: string, path: number[]): number
  /**
   * Envoie le classement d'un utilisateur
   * @param userId Id de l'utilisateur
   * @param rank classement de l'utilisateur
   * @param filiere filiere de l'utilisateur
   * @param path chemin vers le champ
   */
  PostRank(userId: number, rank: number, filiere: string, path: number[]): void
}
