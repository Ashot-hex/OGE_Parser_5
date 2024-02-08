import { ChromeStorage } from './Data/Storage/ChromeStorage'
import { GradeParser } from './Model/LogicLayer/Parsing/GradeParser'
import { Semestre } from './Model/Types/Grades/Elements/Semestre'
import { ConsoleGradeDisplay } from './View/GradeDisplay/ConsoleGradeDisplay'
import { IGradeDisplay } from './Model/Interfaces/IGradeDisplay'
import { MainPageGradeDisplay } from './View/GradeDisplay/MainPageGradeDisplay'
import { SemesterFactory } from './Model/LogicLayer/Factories/SemesterFactory'

/** Gestion du contenu de la page principale */
export class Content {
  //#region constants
  //Constantes de classes CSS
  private readonly LOADING_ICON_CLASS: string =
    'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow ui-hidden-container statusDialog'
  private readonly SEMESTER_LINKS_CLASS: string = 'ui-menuitem-link ui-corner-all'
  private readonly GRADE_WARNING_BASE_ID: string = 'mainBilanForm:bilanAvantJuryMobilePanel1'
  //Constantes creant un delai pour etre sur que la page soit bien rechargee
  private readonly DELAY_BETWEEN_CHECKS = 200
  private readonly DELAY_AFTER_PAGE_RELOAD = 100
  //Constantes de chemins vers un objet dans la page
  private readonly GRADE_WARNING_PATH: number[] = [0, 0, 1]
  //#endregion constants

  //#region Attributs
  private semester: Semestre | undefined
  //#endregion Attributs

  //#region Properties
  private get SemesterLinks(): HTMLElement[] {
    return <HTMLElement[]>Array.from(document.getElementsByClassName(this.SEMESTER_LINKS_CLASS))
  }
  private get LoadingIcon(): HTMLElement {
    return <HTMLElement>document.getElementsByClassName(this.LOADING_ICON_CLASS)[0]
  }
  //#endregion Properties

  /** Met en place le traitement de la page */
  public Setup(): void {
    //Parsing de la page
    this.ProcessSemester()
    //Changement de la phrase Remarque
    this.GradeWarning()
    //Affichage des moyennes
    this.DisplayGrades()
    //this.SetSemesterLinksListeners();
  }

  // Parse la page actuelle, sauvegarde les resultats, et les affiche
  private ProcessSemester(): void {
    //Remise a zero des donnees
    GradeParser.Reset()
    //Parsing de la page
    this.semester = new SemesterFactory().GetSemester() ?? new Error('Semestre non trouvé')
    //Sauvegarde du semestre retrouvé
    let storage = new ChromeStorage(this.semester.ToStoredSemester())
    storage.Save()
  }

  // Affiche les moyennes du semestre sur la page principale si elles ne sont pas deja affichees
  private DisplayGrades(): void {
    //Lance l'affichage des resultats
    new MainPageGradeDisplay().DisplayGrades(this.semester!)
  }

  // Ajoute les listeners sur les liens des semestres
  private SetSemesterLinksListeners(): void {
    //Recuperation des liens des semestres
    let elements: HTMLElement[] = this.SemesterLinks
    //Ajout des listeners sur les liens des semestres
    elements.forEach((element) => {
      element.addEventListener('click', async () => {
        //Icon de chargement affichee pendant le changement de semestre
        let loadingIcon: HTMLElement = this.LoadingIcon

        //Attend que la page soit rechargee, en reverifiant avec un intervalle de DELAY_BETWEEN_CHECKS
        //Elle est bien rechargee quand l'icone de chargement n'est plus visible (display: none)
        while (loadingIcon.style.display != 'none') {
          await new Promise((r) => setTimeout(r, this.DELAY_BETWEEN_CHECKS))
        }

        //Met un decalage de DELAY_AFTER_PAGE_RELOAD pour etre sur que la page soit bien rechargee
        setTimeout(() => {
          this.Setup()
        }, this.DELAY_AFTER_PAGE_RELOAD)
      })
    })
  }

  //#region Remarque
  private GradeWarning(): void {
    let warning: string | undefined = this.GetBaseGradeWarning()
    if (warning) this.SetGradeWarning(warning)
  }

  private GetBaseGradeWarning(): string | undefined {
    let base: string | undefined =
      document.getElementById(this.GRADE_WARNING_BASE_ID)?.textContent ?? undefined
    if (base) {
      base = base.replace(/\n/g, '')
      base = base.trim()

      let regex: RegExp = new RegExp(/\d\d .+ 20\d\d/)
      let semesterEndDate: string = base.match(regex)?.[0] ?? ''
      base =
        "Important : Les vraies moyennes et classement ne seront visibles qu'à partir du " +
        semesterEndDate +
        ".</br>&emsp;&emsp;<b>Tout ce qui est produit par l'extension est une estimation et n'a aucune réélle valeur.</b>"
    }
    return base
  }

  private SetGradeWarning(text: string): void {
    let warningDiv: HTMLElement | null = document.getElementById(this.GRADE_WARNING_BASE_ID)
    if (warningDiv) {
      GradeParser.GetChild(warningDiv, this.GRADE_WARNING_PATH).innerHTML = text
    }
  }

  //#endregion Remarque
}
