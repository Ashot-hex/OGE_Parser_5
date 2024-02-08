import { Semestre } from '../../Model/Types/Grades/Elements/Semestre'
import { IGradeDisplay } from '../../Model/Interfaces/IGradeDisplay'

export class ConsoleGradeDisplay implements IGradeDisplay {
  public DisplayGrades(semester: Semestre): void {
    semester.UEList.forEach((ue) => console.log(ue.Average?.toFixed(2)))
  }
}
