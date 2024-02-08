import { ListenerMessage } from './ListenerMessage'

export type AnswersDict = { [key: string]: () => ListenerMessage }
