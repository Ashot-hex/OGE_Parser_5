import { GradeCoefficientPair } from '../../Types/Grades/Elements/GradeCoefficientPair';
import { Parser } from './Parser';
import { StringParser } from './StringParser';
import { ViewParser } from './ViewParser';

/** Classe permettant de parser la page */
export class GradeParser extends Parser {
    protected Reset(): void {
        GradeParser.instance = new GradeParser();
    }
    //#region Singleton
    private constructor() {
        super();
        Parser.Child = this;
    }

    private static instance: GradeParser;

    /** Retourne l'instance du Parser de la page */
    public static get Instance(): GradeParser {
        return this.instance || (this.instance = new this());
    }

    /** Remet a zero les données connu sur la page, utile quand on change de semestre */
    public static Reset() {
        this.instance = new this();
    }

    //#endregion Singleton

    /**
     * Parse et renvoie une Note et son Coefficient
     * @param ue Numero d'UE de la Note
     * @param res Numero de ressource de la Note
     * @param sect Numero de section de la Note
     * @returns La note et son coefficient
     */
    public GetGrades(ue: number, res: number, sect: number): GradeCoefficientPair[] {
        return StringParser.GetNotesFromSectionInnerText(
            this.GetSections(ue, res)[sect]?.textContent ?? '',
        );
    }

    //#region Coefficient Methods
    /**
     * Compte le nombre de ressources dans une UE
     * @param ue Numero de l'UE
     * @returns Nombre de ressources dans l'UE
     */
    public RessourceCount(ue: number): number {
        return this.GetResources(ue).length;
    }

    /**
     * Compte le nombre de Sections dans une Ressource
     * @param ue Numero de l'UE
     * @param res Numero de la ressource dans l'UE
     * @returns Le nombre de sections
     */
    public SectionCount(ue: number, res: number): number {
        return this.GetSections(ue, res).length;
    }

    /**
     * Trouev l'index a partir du quel on passe en SAE dans une UE
     * @param ue Numero de l'UE
     * @returns l'index tel que l'element a l'index renvoyé est la premiere SAE
     */
    public SaeIndex(ue: number): number {
        const rawRessources = this.GetRawRessources(ue, this.RESSOURCE_AND_POLES_SELECTOR);
        const poleSaeElDiv = ViewParser.Instance.GetPoleSaeElement(ue);
        const poleSaeEl: HTMLElement = poleSaeElDiv.querySelector('td') as HTMLElement;
        const saeIx = rawRessources.indexOf(poleSaeEl) - 1;

        return saeIx;
    }

    /**
     * Trouve le coefficient d'une UE
     * @param ue Numero de l'UE
     * @returns le coefficient de l'UE demandée
     */
    public UECoefficient(ue: number): number {
        let rawCoeff: string =
            this.Tables[ue]?.querySelector(this.UE_COEFFICENT_SELECTOR)?.textContent ?? '';

        return StringParser.ClearCoefficient(rawCoeff);
    }

    /**
     * Trouve le coefficient d'une Ressource
     * @param ue Numero de l'UE
     * @param res Numero de la Ressource
     * @returns le coefficient de la Ressource demandée
     */
    public RessourceCoefficient(ue: number, res: number): number {
        let rawCoeff: string =
            this.GetResources(ue)[res]?.querySelector(this.RESSOURCE_COEFFICENT_SELECTOR)
                ?.textContent ?? '';

        return StringParser.ClearCoefficient(rawCoeff);
    }

    /**
     * Trouve le coefficient d'une Section
     * @param ue Numero de l'UE
     * @param res Numero de la Ressource
     * @param sect Numero de la Section
     * @returns Le coefficient de la Section demandée
     */
    public SectionCoefficient(ue: number, res: number, sect: number): number {
        let rawCoeff: string =
            this.GetSections(ue, res)[sect]?.querySelector(this.SECTION_COEFFICENT_SELECTOR)
                ?.textContent ?? '';

        return StringParser.ClearCoefficient(rawCoeff);
    }

    /**
     * Trouve le coefficient du pôle CC (Ressource) d'une UE
     * @param ue Numero de l'UE
     * @returns Coefficient du pôle CC
     */
    public CCPoleCoefficient(ue: number): number {
        return this.GetPoleCoefficient(ue, '.cell_BUT_RESSOURCE span span');
    }

    /**
     * Trouve le coefficient du pôle SAÉ d'une UE
     * @param ue Numero de l'UE
     * @returns Coefficient du pôle SAÉ
     */
    public SAEPoleCoefficient(ue: number): number {
        return this.GetPoleCoefficient(ue, '.cell_BUT_SAE span span');
    }

    private GetPoleCoefficient(ue: number, selector: string): number {
        let rawCoeff: string =
            this.Tables[ue]?.querySelector(selector)?.textContent ?? '';

        return StringParser.ClearCoefficient(rawCoeff);
    }

    /**
     * Parse le nom d'une UE
     * @param ue Numero de l'UE
     * @returns Nom de l'UE demandée
     */
    public UEName(ue: number): string {
        return (
            this.Tables[ue]
                ?.querySelector(this.UE_NAME_SELECTOR)
                ?.childNodes[0].textContent?.replace(/\n */g, '') ?? ''
        );
    }

    private GetResources(ue: number): HTMLElement[] {
        return this.GetRawRessources(ue);
    }

    private GetSections(ue: number, res: number): HTMLElement[] {
        return Array.from(
            this.GetResources(ue)[res]?.querySelectorAll(this.SECTION_SELECTOR) ?? [],
        ).filter(p => p.querySelector('sub')) as HTMLElement[];
    }

    //#endregion Coefficient Methods
}
