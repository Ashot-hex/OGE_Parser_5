import { Semestre } from '../../Model/Types/Grades/Elements/Semestre'
import { IGradeDisplay } from '../../Model/Interfaces/IGradeDisplay'

export class DebugGradeDisplay implements IGradeDisplay {
  public DisplayGrades(semester: Semestre): void {
    semester.UEList.forEach((ue) =>
      console.log(Object.keys(ue).forEach((key) => console.log(key, typeof key, (ue as any)[key]))),
    )
  }
}
