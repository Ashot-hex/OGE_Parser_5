import { ChromeStorage } from '../../../Data/Storage/ChromeStorage'
import { StoredSemester } from '../../Types/Storage/StoredSemester'
import { SemesterNames } from '../Parsing/SemesterNames'

export class SemesterLoading {
  public constructor() {}
  private get Storage(): ChromeStorage {
    return new ChromeStorage()
  }
  public async LoadCurrentSemester(): Promise<StoredSemester | undefined> {
    return await this.Storage.GetSemester()
  }
  public async LoadCorrespondingSemester(): Promise<StoredSemester | undefined> {
    return await this.Storage.GetCorrespondingSemester()
  }
}
