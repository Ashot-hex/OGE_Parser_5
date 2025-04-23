
const TEACHING_UNIT_SELECTOR = 'table';
const CC_WORK_UNIT_SELECTOR = '.cell_BUT_RESSOURCE~tr:not(.cell_BUT_SAE~tr, .cell_BUT_SAE)';
const SAE_WORK_UNIT_SELECTOR = '.cell_BUT_SAE~tr';
const MODULES_SELECTOR = 'td';
const SECTIONS_SELECTOR = 'div';
const GRADES_SELECTOR = '';

export class ViewParser {
    constructor() {}

    public getTeachingUnits(): HTMLElement[] {
        const teachingUnits = document.querySelectorAll(TEACHING_UNIT_SELECTOR);
        return Array.from(teachingUnits).map(x => x.cloneNode(true)) as HTMLElement[];
    }
    public getSaeUnit(parent: HTMLElement): HTMLElement[] {
        const workUnit = parent.querySelectorAll(SAE_WORK_UNIT_SELECTOR);
        return Array.from(workUnit).map(x => x.cloneNode(true)) as HTMLElement[];
    }
    public getCcUnit(parent: HTMLElement): HTMLElement[] {
        const workUnit = parent.querySelectorAll(CC_WORK_UNIT_SELECTOR);
        return Array.from(workUnit).map(x => x.cloneNode(true)) as HTMLElement[];
    }
    public getModules(parent: HTMLElement): HTMLElement[] {
        const modules = parent.querySelectorAll(MODULES_SELECTOR);
        return Array.from(modules).map(x => x.cloneNode(true)) as HTMLElement[];
    }
    public getSections(parent: HTMLElement): HTMLElement[] {
        const sections = parent.querySelectorAll(SECTIONS_SELECTOR);
        return Array.from(sections).slice(1).map(x => x.cloneNode(true)) as HTMLElement[];
    }
    public getGrades(parent: HTMLElement): string[][] {
        const children = [...parent.childNodes].slice(1, -3);
        const chunks = [...this.chunk(children, 3)];
        const grades = chunks.map(c => c.map(e => e.textContent?.trim()));
        if (grades.some(c => c.some(e => !e))) {
            throw new Error('wtf');
        }

        return grades as string[][];
    }

    private *chunk<T>(arr: T[], n: number): Generator<T[], void> {
        for (let i = 0; i < arr.length; i += n) {
            yield arr.slice(i, i + n);
        }
    }
}
