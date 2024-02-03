export enum SectionTokenType {
  OPENING_BRACKET,
  CLOSING_BRACKET,
  OPENING_PARENTHESIS,
  CLOSING_PARENTHESIS,
  NUMBER,
  SLASH,
  SECTION_NAME,
  SPACE,
  UNKNOWN,
}

export interface SectionToken {
  readonly type: SectionTokenType
  readonly text: string
}