import { Semestre } from '../Types/Grades/Elements/Semestre'

export interface IGradeDisplay {
  DisplayGrades(semester: Semestre): void
}
