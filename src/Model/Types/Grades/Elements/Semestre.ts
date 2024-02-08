import { GradeParser } from '../../../LogicLayer/Parsing/GradeParser'
import { SemesterNames } from '../../../LogicLayer/Parsing/SemesterNames'
import { StoredSemester } from '../../Storage/StoredSemester'
import { Element } from '../Element'
import { UEDetails } from '../UEDetails'
import { UE } from './UE'

/** Represente un Semestre */
export class Semestre extends Element {
  /**Liste des UE du semestre */
  public get UEList(): UE[] {
    return this.subElements as UE[]
  }
  /**
   * Constructeur par defaut d'un Semestre
   * @param ueList Liste des UE du semestre
   */
  public constructor(ueList: UE[]) {
    super(1, ueList)
  }

  /**
   * Retourne le semestre sous forme d'objet de type StoredSemester
   * @returns Un objet de type StoredSemester
   */
  public ToStoredSemester(): StoredSemester {
    let ueAverages: number[] = []
    this.UEList.forEach((c) => {
      ueAverages.push(c.Average ?? 0)
    })

    let storedSemester: StoredSemester = {
      Name: SemesterNames.CurrentSemestre,
      Averages: ueAverages,
      Date: -1, //(PageParser.Instance.AreGradesShown) ? -1 : Math.floor(Date.now() / 1000)
    }

    return storedSemester
  }
}
