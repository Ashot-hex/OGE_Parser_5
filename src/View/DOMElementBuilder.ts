import { YearDetails } from '../Model/Types/Grades/YearDetails'

/** Classe creant les elements HTML pour les resultats*/
export class DOMElementBuilder {
  /**
   * Ajoute un element HTML pour un resultat
   * @param grade Note
   * @param isTD Est un element TD, sinon TH
   * @returns Element HTML
   */
  public static CreateResultCell(grade: number): HTMLTableCellElement {
    let gradeType: string = 'R'
    let child: HTMLTableCellElement = this.CreateTableCell(this.Format(grade), [
      gradeType,
      this.GetGradeColor(grade),
    ])

    return child
  }

  private static CreateTableCell(
    value: number | string,
    classesToAdd: string[],
  ): HTMLTableCellElement {
    let child: HTMLTableCellElement
    child = document.createElement('td')

    let innerHTML: string = '&nbsp;N/A&nbsp;'
    if (typeof value === 'number') {
      if (value && value >= 0) innerHTML = value.toFixed(2)
    } else {
      innerHTML = value
    }

    child.innerHTML = innerHTML

    this.AddClasses(child, classesToAdd)

    return child
  }

  private static AddClasses(child: HTMLElement, classesToAdd: string[]): void {
    classesToAdd.forEach((type) => {
      child.classList.add(type)
    })
  }

  public static CreateWarningMessage(message: string): HTMLElement {
    let el: HTMLElement = document.createElement('td')
    el.innerText = message

    this.AddClasses(el, ['warning'])

    return el
  }

  public static CreateTableHeader(yearName: string): HTMLTableSectionElement {
    let header: HTMLTableSectionElement = document.createElement('thead')
    let row: HTMLTableRowElement = document.createElement('tr')
    let yearNameCell: HTMLTableCellElement = document.createElement('th')
    yearNameCell.innerHTML = yearName
    yearNameCell.colSpan = 2
    row.appendChild(yearNameCell)
    header.appendChild(row)

    return header
  }
  public static CreateTableBody(yearDetails: YearDetails): HTMLTableSectionElement {
    let body: HTMLTableSectionElement = document.createElement('tbody')
    for (let i = 0; i < yearDetails.YearlyAverages.length; i++) {
      let row: HTMLTableRowElement = document.createElement('tr')
      let average: number = yearDetails.YearlyAverages[i]

      let ueCell: HTMLTableCellElement = this.CreateTableCell('UE ' + (i + 1), [])
      let averageCell: HTMLTableCellElement = this.CreateTableCell(average, [
        'R',
        this.GetGradeColor(average),
      ])
      row.appendChild(ueCell)
      row.appendChild(averageCell)
      body.appendChild(row)
    }

    return body
  }

  //Si les notes peuvent etre oranges (entre 8 inclu et 10 exclu)
  private static readonly CAN_BE_ORANGE = true
  private static GetGradeColor(grade: number): string {
    let color: string = 'Green'
    if (isNaN(grade)) {
      color = 'Black'
    } else if (grade < 10) {
      if (this.CAN_BE_ORANGE && grade >= 8) color = 'Orange'
      else color = 'Red'
    }

    return color
  }

  private static Format(grade: number): string {
    return grade?.toFixed(2) ?? 'NaN'
  }
}
