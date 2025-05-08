import {SectionScanner, SectionTokenType as TT} from ".";
import {Section} from "../../../Types/Grades/Elements/Section";
import {GradeCoefficientPair} from "../../../Types/Grades/Elements/GradeCoefficientPair";
import {Note} from "../../../Types/Grades/Elements/Note";

export default class SectionParser {
  private _scanner: SectionScanner;

  private constructor(scanner: SectionScanner) {
    this._scanner = scanner;
  }

  // SECTION_NAME OPENING_BRACKET grade* CLOSING_BRACKET coefficient
  private parseSection(): Section {
    let tok
    let grades = []
    let coefficient = 1

    if (this._scanner.remaining && this._scanner.take().type === TT.SECTION_NAME) {
    }

    while (this._scanner.remaining && this._scanner.take().type !== TT.OPENING_BRACKET) {
    }

    while (this._scanner.remaining && this._scanner.peek().type !== TT.CLOSING_BRACKET) {
      let maybeGrade = this.parseGrade()
      if (maybeGrade !== undefined) {
        grades.push(maybeGrade)
      } else {
        this._scanner.take()
      }
    }

    if (this._scanner.remaining) {
      this._scanner.take() // consume the closing bracket

      coefficient = this.parseCoefficient()
    }

    return new Section(coefficient, grades.map(gcp => new Note(gcp)))
  }

  // NUMBER SLASH NUMBER coefficient
  private parseGrade(): GradeCoefficientPair | undefined {
    let grade = undefined

    if (this._scanner.remaining && this._scanner.peek().type === TT.NUMBER) {
      let numerator = parseFloat(this._scanner.take().text)

      if (this._scanner.remaining && this._scanner.peek().type === TT.SLASH) {
        this._scanner.take()

        let denominator = 20
        if (this._scanner.remaining && this._scanner.peek().type === TT.NUMBER) {
          denominator = parseFloat(this._scanner.take().text)
        }

        let coefficient = 1
        if (this._scanner.remaining && this._scanner.peek().type === TT.OPENING_PARENTHESIS) {
          coefficient = this.parseCoefficient()
        }

        grade = {grade: numerator/denominator * 20, coefficient}
      }
    }

    return grade
  }

  // OPENING_PARENTHESIS NUMBER CLOSING_PARENTHESIS
  private parseCoefficient(): number {
    let coefficient = 1

    if (this._scanner.remaining && this._scanner.take().type === TT.OPENING_PARENTHESIS) {
      if (this._scanner.remaining && this._scanner.peek().type === TT.NUMBER) {
        coefficient = parseFloat(this._scanner.take().text)
      }

      if (this._scanner.remaining && this._scanner.peek().type === TT.CLOSING_PARENTHESIS) {
        this._scanner.take()
      }
    }

    return coefficient
  }

  public static parseSection(sectionText: string): Section {
    let instance = new SectionParser(new SectionScanner(sectionText))
    return instance.parseSection()
  }
}