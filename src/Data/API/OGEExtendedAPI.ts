import { IAPIConnector } from '../../Model/Interfaces/IAPIConnector'

export class OGEExtendedAPI implements IAPIConnector {
  GetCoefficient(filiere: string, path: number[]): number {
    throw new Error('Method not implemented.')
  }
  PostCoefficient(coefficient: number, filiere: string, path: number[]): void {
    throw new Error('Method not implemented.')
  }
  GetRank(userId: number, filiere: string, path: number[]): number {
    throw new Error('Method not implemented.')
  }
  GetFieldSize(filiere: string, path: number[]): number {
    throw new Error('Method not implemented.')
  }
  PostRank(userId: number, rank: number, filiere: string, path: number[]): void {
    throw new Error('Method not implemented.')
  }
}
