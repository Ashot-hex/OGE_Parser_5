/** Classe permettant de récupérer les noms des semestres */
export class SemesterNames {
  /** Body de la page OGE*/
  private static get BodyElement(): HTMLElement {
    return document.querySelectorAll('body')[0].cloneNode(true) as HTMLElement
  }

  /** Classes du semestre actuel sur la page OGE*/
  private static readonly CURRENT_SEMESTER_CLASSES: string =
    'ui-tabmenuitem ui-state-default ui-state-active ui-corner-top'
  /** Classes de la liste des semestres sur la page OGE*/
  private static readonly SEMESTER_LIST_CLASSES: string =
    'ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
  /** Correspondances des numero de semestres*/
  private static readonly CORRESPONDING_SEMESTER_NUMBER: { [id: number]: number } = {
    1: 2,
    2: 1,
    3: 4,
    4: 3,
    5: 6,
    6: 5,
    7: 8,
    8: 7,
  }
  /** Vérifie si le semestre correspondant au semestre actuel est disponible*/
  public static get CorrespondingSemesterAvailable(): boolean {
    return this.SemestreList.includes(this.CorrespondingSemester)
  }

  /** Récupère la liste des semestres*/
  public static get SemestreList(): string[] {
    let semestreList: string[] = []
    let semestreNameUL: HTMLElement = this.BodyElement.getElementsByClassName(
      this.SEMESTER_LIST_CLASSES,
    )[0] as HTMLElement

    Array.from(semestreNameUL.children).forEach((li) => {
      semestreList.push(this.FormatSemesterName((li as HTMLElement).textContent))
    })

    return semestreList
  }

  /** Récupère le semestre actuel*/
  public static get CurrentSemestre(): string {
    let semestreNameUL: HTMLElement = this.BodyElement.getElementsByClassName(
      this.CURRENT_SEMESTER_CLASSES,
    )[0] as HTMLElement
    return this.FormatSemesterName(semestreNameUL.textContent)
  }
  /** Récupère le numéro du semestre actuel*/
  public static get CurrentSemestreNumber(): number {
    return Number(this.CurrentSemestre.match(/\d*$/g)![0])
  }
  /** Récupère la filière du semestre actuel*/
  public static get CurrentFiliere(): string {
    return this.CurrentSemestre.match(/.*(?= S)/g)![0]
  }
  public static get CurrentYear(): number {
    let currentYear: number = this.CurrentSemestreNumber
    if (currentYear % 2 != 0) currentYear++

    return currentYear / 2
  }
  public static get CurrentYearName(): string {
    return this.CurrentFiliere + ' ' + this.CurrentYear + 'A'
  }

  /** Récupère le semestre correspondant au semestre actuel*/
  public static get CorrespondingSemester(): string {
    let semestreName: string = this.CurrentSemestre.slice(0, -1)
    let currentSemestreNumber: number = Number(this.CurrentSemestre.slice(-1))

    return semestreName + String(this.CORRESPONDING_SEMESTER_NUMBER[currentSemestreNumber])
  }
  /**
   * Formate le nom d'un semestre
   * @param semestreName Nom du semestre à formater
   * @returns Nom du semestre formaté
   */
  private static FormatSemesterName(semestreName: string | null): string {
    if (semestreName == null) throw new Error('Semestre name is null')

    semestreName = semestreName.replace(/\d*\/\d*-/g, '')
    semestreName = semestreName.replace(/-.* /g, ' S')
    return semestreName
  }
}
