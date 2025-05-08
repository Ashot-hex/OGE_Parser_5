import {SectionToken, SectionTokenType} from ".";

export default class SectionScanner {
  private _text: string
  private _firstMatch: boolean
  private _readAhead?: SectionToken
  private readonly _matchers: Matcher[]

  public constructor(text: string) {
    this._text = text
    this._firstMatch = true

    this._matchers = [
      new StringMatcher('[', SectionTokenType.OPENING_BRACKET),
      new StringMatcher(']', SectionTokenType.CLOSING_BRACKET),
      new StringMatcher('(', SectionTokenType.OPENING_PARENTHESIS),
      new StringMatcher(')', SectionTokenType.CLOSING_PARENTHESIS),
      new RegexMatcher(/^\d+\.\d+/, SectionTokenType.NUMBER),
      new StringMatcher('/', SectionTokenType.SLASH),
      new RegexMatcher(/^[^\[]+/, SectionTokenType.SECTION_NAME, true),
      new RegexMatcher(/^\s+/, SectionTokenType.SPACE),
      new RegexMatcher(/\./, SectionTokenType.UNKNOWN),
    ]
  }

  private static skipToken(tokenType: SectionTokenType):boolean {
    return tokenType == SectionTokenType.SPACE || tokenType == SectionTokenType.UNKNOWN
  }

  private readAnyToken() : SectionToken | undefined {
    let longestMatch = undefined
    for (const matcher of this._matchers) {
      const match = matcher.match(this._text, this._firstMatch)
      if (match.length > 0 && (longestMatch === undefined || match.length > longestMatch.length)) {
        longestMatch = match
      }
    }

    if (longestMatch !== undefined) {
      this._text = this._text.slice(longestMatch.length)
      this._firstMatch = false
    }
    return longestMatch?.token
  }

  private readToken() : SectionToken | undefined {
    let token

    do {
      token = this.readAnyToken()
    } while (token !== undefined && SectionScanner.skipToken(token.type))

    return token
  }

  public peek(): SectionToken {
    if (this._readAhead === undefined) this._readAhead = this.readToken()
    if (this._readAhead === undefined) throw new Error("End of text reached")
    return this._readAhead
  }

  public get remaining(): boolean {
    if (this._readAhead === undefined) this._readAhead = this.readToken()
    return this._readAhead !== undefined
  }

  public take(): SectionToken {
    let token = this._readAhead
    this._readAhead = undefined

    if (token === undefined) token = this.readToken()
    if (token === undefined) throw new Error("End of text reached")

    return token
  }
}

interface Matcher {
  match(text: string, start: boolean): Match
}

interface Match {
  length: number
  token?: SectionToken
}

class StringMatcher implements Matcher {
  private readonly _pattern: string
  private readonly _tokenType: SectionTokenType

  public constructor(pattern: string, tokenType: SectionTokenType) {
    this._pattern = pattern
    this._tokenType = tokenType
  }

  public match(text: string): Match {
    let match: Match = {length: 0}

    if (text.startsWith(this._pattern)) {
      match.length = this._pattern.length
      match.token = {type: this._tokenType, text: this._pattern}
    }

    return match
  }
}

class RegexMatcher implements Matcher {
  private readonly _pattern: RegExp
  private readonly _lineStartAnchor: boolean
  private readonly _tokenType: SectionTokenType

  public constructor(pattern: RegExp, tokenType: SectionTokenType, lineStartAnchor: boolean = false) {
    this._pattern = pattern
    this._lineStartAnchor = lineStartAnchor
    this._tokenType = tokenType
  }

  public match(text: string, start: boolean): Match {
    let match: Match = {length: 0}

    if (!this._lineStartAnchor || start) {
      const regexMatch = text.match(this._pattern)
      if (regexMatch !== null) {
        match.length = regexMatch[0].length
        match.token = {type: this._tokenType, text: regexMatch[0]}
      }
    }

    return match
  }
}