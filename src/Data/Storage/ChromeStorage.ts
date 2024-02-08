import { ISemesterStorage } from '../../Model/Interfaces/ISemesterStorage'
import { SemesterNames } from '../../Model/LogicLayer/Parsing/SemesterNames'
import { Semestre } from '../../Model/Types/Grades/Elements/Semestre'
import { StoredSemester } from '../../Model/Types/Storage/StoredSemester'

/** Classe gérant le stockage des notes dans le chrome.storage.local */
export class ChromeStorage implements ISemesterStorage {
  public constructor(semester: StoredSemester | undefined = undefined) {
    this.semester = semester
  }
  //#region Attributs
  private readonly STORAGE_KEY = 'oge-parser-semester'
  private semester: StoredSemester | undefined
  //#endregion Attributs

  //#region Properties
  private get Storage(): typeof chrome.storage.local {
    return chrome.storage.local
  }
  private get SemesterKey(): string {
    return SemesterNames.CurrentSemestre
  }
  private get CorrespondingSemesterKey(): string {
    return SemesterNames.CorrespondingSemester
  }
  //#endregion Properties

  //#region ISemesterStorage implementation
  async GetSemester(): Promise<StoredSemester | undefined> {
    return this.semester ?? (await this.Load())[this.SemesterKey]
  }
  async GetCorrespondingSemester(): Promise<StoredSemester | undefined> {
    return (await this.Load())[this.CorrespondingSemesterKey]
  }
  async Save(): Promise<void> {
    if (!!this.semester) {
      let currentSave = await this.Load()
      currentSave[this.SemesterKey] = this.semester

      let storage: any = {}
      storage[this.STORAGE_KEY] = currentSave
      this.Storage.set(storage)
    }
  }
  async Clear(): Promise<void> {
    this.Storage.clear()
    console.log('cleared storage')
  }
  //#endregion ISemesterStorage implementation

  //#region Methods
  private async Load(): Promise<{ [id: string]: StoredSemester }> {
    let storage = (await this.Storage.get([this.STORAGE_KEY])) ?? {}
    return storage[this.STORAGE_KEY] ?? {}
  }
  //#endregion Methods
}
