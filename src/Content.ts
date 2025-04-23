import { ViewParser } from './parsing/view-parser';
import { GradeService } from './service/grade.service';
const p = new ViewParser();

const ue = p.getTeachingUnits()[0];
const cc  = p.getCcUnit(ue);
const sae = p.getSaeUnit(ue);
const module = p.getModules(sae[0]);
const sect = p.getSections(module[0]);
const grades = p.getGrades(sect[0]);

console.log(new GradeService().createLeaf(grades[0][0], grades[0][1], grades[0][2]));