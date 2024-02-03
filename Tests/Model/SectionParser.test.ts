import {
  SectionParser,
  SectionScanner,
  SectionToken,
  SectionTokenType as TT
} from "@model/LogicLayer/Parsing/SectionParser";
import {Section} from "@model/Types/Grades/Elements/Section";
import {Note} from "@model/Types/Grades/Elements/Note";

function extractAllTokens(sectionText: string): SectionToken[] {
  const scanner = new SectionScanner(sectionText)
  const array = []

  while (scanner.remaining) {
    array.push(scanner.take())
  }

  return array
}

test('The tokens produced by the scanner match the input text', () => {
  let section = "TP [ 15.00/20.0 (4.0) 16.80/20.0 (1.0 some garbage in the middle) 16.40/20.0 (1.0) ] (1.0)"
  let expectedTokens = [
    {type: TT.SECTION_NAME, text: "TP "},
    {type: TT.OPENING_BRACKET},
    {type: TT.NUMBER, text: "15.00"},
    {type: TT.SLASH},
    {type: TT.NUMBER, text: "20.0"},
    {type: TT.OPENING_PARENTHESIS},
    {type: TT.NUMBER, text: "4.0"},
    {type: TT.CLOSING_PARENTHESIS},
    {type: TT.NUMBER, text: "16.80"},
    {type: TT.SLASH},
    {type: TT.NUMBER, text: "20.0"},
    {type: TT.OPENING_PARENTHESIS},
    {type: TT.NUMBER, text: "1.0"},
    {type: TT.CLOSING_PARENTHESIS},
    {type: TT.NUMBER, text: "16.40"},
    {type: TT.SLASH},
    {type: TT.NUMBER, text: "20.0"},
    {type: TT.OPENING_PARENTHESIS},
    {type: TT.NUMBER, text: "1.0"},
    {type: TT.CLOSING_PARENTHESIS},
    {type: TT.CLOSING_BRACKET},
    {type: TT.OPENING_PARENTHESIS},
    {type: TT.NUMBER, text: "1.0"},
    {type: TT.CLOSING_PARENTHESIS},
  ]

  expect(extractAllTokens(section)).toMatchObject(expectedTokens)
})

test('Scanner remaining/peek/take behaviour', () => {
  let section = "[/] some garbage at the end"
  let scanner = new SectionScanner(section)

  // we take a peek at the next token (it's the opening bracket)
  let firstToken = scanner.peek()
  expect(firstToken).toMatchObject({type: TT.OPENING_BRACKET})
  // then we take that token
  expect(scanner.take()).toBe(firstToken)
  // there are still others tokens remaining
  expect(scanner.remaining).toBe(true)
  // we take the next one (the slash)
  expect(scanner.take()).toMatchObject({type: TT.SLASH})
  // now if we peek after taking it, we see the next one (the closing bracket)
  expect(scanner.peek()).toMatchObject({type: TT.CLOSING_BRACKET})
  // we take that last (valid) token
  scanner.take()
  // now there is nothing left (the invalid text is ignored) ...
  expect(scanner.remaining).toBe(false)
  // ... and thus these methods are invalid operations
  expect(scanner.take).toThrow()
  expect(scanner.peek).toThrow()
})

const closeTo = (expected: number, precision = 2) => ({
  asymmetricMatch: (actual: number) => Math.abs(expected - actual) < Math.pow(10, -precision) / 2
});

test('The notes found by the parser match the input text', () => {
  let sectionText = "TP [ 15.00/20.0 (4.0 16.80/20.0 (1.0 some garbage in the middle) 7.20/10.0 1.0) ] (1.0)"
  let parsedSection = SectionParser.parseSection(sectionText)

  expect(parsedSection).toMatchObject({
    coefficient: closeTo(1),
    subElements: [
      { grade: closeTo(15), coefficient: closeTo(4) },
      { grade: closeTo(16.8), coefficient: closeTo(1) },
      { grade: closeTo(14.4), coefficient: closeTo(1) },
    ]
  })
})