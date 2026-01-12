import { Note } from '../../Types/Grades/Elements/Note';
import { Ressource } from '../../Types/Grades/Elements/Ressource';
import { Section } from '../../Types/Grades/Elements/Section';
import { Semestre } from '../../Types/Grades/Elements/Semestre';
import { UE } from '../../Types/Grades/Elements/UE';
import { GradeParser } from '../Parsing/GradeParser';

/** Fabrique de semestre */
export class SemesterFactory {
    /**
     * Recupere le semestre actuel grace au GradeParser
     * @returns Le semestre actuel
     */
    public GetSemester(): Semestre {
        return new Semestre(this.UEs());
    }

    private UEs(): UE[] {
        let count: number = GradeParser.Instance.UECount;
        return [...Array(count).keys()].map(ix => {
            let coef: number = GradeParser.Instance.UECoefficient(ix);
            let saeIx: number = GradeParser.Instance.SaeIndex(ix);
            let ccCoef: number = GradeParser.Instance.CCPoleCoefficient(ix);
            let saeCoef: number = GradeParser.Instance.SAEPoleCoefficient(ix);
            let ressources: Ressource[] = this.Ressources(ix);
            let name: string = GradeParser.Instance.UEName(ix);

            return new UE(coef, ressources, saeIx, saeCoef, ccCoef, name);
        });
    }

    private Ressources(ue: number): Ressource[] {
        let count: number = GradeParser.Instance.RessourceCount(ue);
        return [...Array(count).keys()].map(ix => {
            return new Ressource(
                GradeParser.Instance.RessourceCoefficient(ue, ix),
                this.Sections(ue, ix),
            );
        });
    }

    private Sections(ue: number, res: number): Section[] {
        let count: number = GradeParser.Instance.SectionCount(ue, res);
        return [...Array(count).keys()].map(ix => {
            return new Section(
                GradeParser.Instance.SectionCoefficient(ue, res, ix),
                this.Grades(ue, res, ix),
            );
        });
    }

    private Grades(ue: number, res: number, sect: number): Note[] {
        return GradeParser.Instance.GetGrades(ue, res, sect).map(n => new Note(n));
    }
}
