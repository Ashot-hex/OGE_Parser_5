import { MainPageView } from '../MainPageView'
import { GradeParser } from '../../Model/LogicLayer/Parsing/GradeParser'
import { Semestre } from '../../Model/Types/Grades/Elements/Semestre'
import { IGradeDisplay } from '../../Model/Interfaces/IGradeDisplay'
import { ViewParser } from '../../Model/LogicLayer/Parsing/ViewParser'

export class MainPageGradeDisplay implements IGradeDisplay {
  public DisplayGrades(semester: Semestre): void {
    if (!ViewParser.Instance.AreGradesShown) {
      MainPageView.AddGradeResultsToPage(semester)
    }
  }
}
