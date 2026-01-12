import { UEDetails } from '../UEDetails';
import { Element } from '../Element';
import { Ressource } from './Ressource';

/** Represente une UE */
export class UE extends Element {
    //#region private
    private readonly saeIndex: number;
    private readonly name: string;
    private readonly ccCoef: number;
    private readonly saeCoef: number;

    /**
     * Constructeur par defaut d'une UE
     * @param coefficient Coefficient de l'UE
     * @param ressources Ressources de l'UE
     * @param saeIndex Index a partir du quel on rentre dans les Ressources de SAE, -1 s'il y en a pas
     * @param saeCoef Coefficient de la partie SAE de l'UE
     * @param ccCoef Coefficient de la partie Ressources de l'UE
     * @param name Nom de l'UE
     */
    public constructor(
        coefficient: number,
        ressources: Ressource[],
        saeIndex: number,
        saeCoef: number,
        ccCoef: number,
        name: string = '',
    ) {
        super(coefficient, ressources);
        this.saeIndex = saeIndex;
        this.name = name;
        this.saeCoef = saeCoef;
        this.ccCoef = ccCoef;
    }

    /**Nom de l'UE */
    public get Name(): string {
        return this.name;
    }

    /**Index de la premiere ressource du SAE */
    public get SAEIndex(): number {
        return this.saeIndex != -1 ? this.saeIndex : this.Ressources.length;
    }

    public override get Average(): number {
        const ccAvg = this.GlobalCCAverage;
        const saeAvg = this.GlobalSAEAverage;

        let numerator = 0;
        let denominator = 0;

        if (!isNaN(ccAvg)) {
            numerator += ccAvg * this.ccCoef;
            denominator += this.ccCoef;
        }

        if (!isNaN(saeAvg)) {
            numerator += saeAvg * this.saeCoef;
            denominator += this.saeCoef;
        }

        if (denominator === 0) return NaN;

        return numerator / denominator;
    }

    /**
     * Coefficient de la partie ressources de l'UE
     */
    public get CcCoefficient(): number {
        return this.ccCoef;
    }

    /**
     * Coefficient de la partie SAE de l'UE
     */
    public get SaeCoef():number {
        return this.saeCoef;
    }

    /** Resultats detaillés de l'UE */
    public get Details(): UEDetails {
        return {
            Name: this.Name,
            UEResult: this.Average,
            CCResult: this.GlobalCCAverage,
            SAEResult: this.GlobalSAEAverage,
            AllCCResults: this.CCAverages,
            AllSAEResults: this.SAEAverages,
        } as UEDetails;
    }

    private get Ressources(): Ressource[] {
        return this.SubElements as Ressource[];
    }

    private get CCRessources(): Ressource[] {
        let ccRessources: Ressource[] = [];

        //n est la limite des ressources CC
        let n: number = Math.min(this.SAEIndex, this.Ressources.length);
        for (let i = 0; i < n; i++) {
            ccRessources.push(this.Ressources[i]);
        }

        return ccRessources;
    }

    private get SAERessources(): Ressource[] {
        let saeRessources: Ressource[] = [];
        //SAEIndex est l'index de la premiere ressource SAE
        let begining: number = this.SAEIndex;

        if (begining > -1) {
            for (let i = begining; i < this.Ressources.length; i++) {
                saeRessources.push(this.Ressources[i]);
            }
        }

        return saeRessources;
    }

    private get GlobalCCAverage(): number {
        return this.GetAverage(this.CCRessources);
    }

    //#endregion private

    private get GlobalSAEAverage(): number {
        return this.GetAverage(this.SAERessources);
    }

    private get CCAverages(): number[] {
        return this.GetAverageList(this.CCRessources);
    }

    private get SAEAverages(): number[] {
        return this.GetAverageList(this.SAERessources);
    }

    private GetAverageList(ressources: Ressource[]): number[] {
        return ressources.map(res => {
            return res.Average;
        }) as number[];
    }
}
