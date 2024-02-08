import { ViewParser } from '../Model/LogicLayer/Parsing/ViewParser'
import { Semestre } from '../Model/Types/Grades/Elements/Semestre'
import { UE } from '../Model/Types/Grades/Elements/UE'
import { MainPageGradeView } from './MainPageGradeView'

/** Classe de la vue de la page principale */
export class MainPageView {
  /**
   * Ajoute les resultats a la page
   * @param semester Semestre
   */
  public static AddGradeResultsToPage(semester: Semestre) {
    let n: number = Math.min(semester.UEList.length, ViewParser.Instance.UECount)
    for (let i = 0; i < n; i++) {
      new MainPageGradeView(i).AddGradeResultToPage(semester.UEList[i].Details)
    }
  }
}
