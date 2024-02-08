/** Resultats detaillés d'une UE */
export type UEDetails = {
  /** Nom de l'UE */
  Name: string
  /** Moyenne de l'UE */
  UEResult: number
  /** Moyenne global du pôle CC de l'UE */
  CCResult: number
  /** Moyenne global du pôle SAE de l'UE */
  SAEResult: number
  /** Moyenne de chaque ressources du pôle CC de l'UE */
  AllCCResults: number[]
  /** Moyenne de chaque ressources du pôle SAE de l'UE */
  AllSAEResults: number[]
}
