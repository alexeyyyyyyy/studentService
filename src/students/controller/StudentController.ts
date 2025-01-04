import StudentService from "../service/StudentService";
import StudentDto from "../dto/StudentDto";
import Student from "../model/Student";

export default class StudentController {
    private studentService: StudentService;

    constructor(studentService: StudentService) {
    this.studentService = studentService;
    }

    addStudent(studentDto:StudentDto):boolean {
        const student:Student = new Student(studentDto.id,studentDto.name,studentDto.scores as Record<string,number>);

        return this.studentService.addStudent(student);
    }

    removeStudent(id:number):Student | null{
         return   this.studentService.removeStudent(id);
    }

    findStudentById(id:number):Student | null{
         return    this.studentService.findStudentById(id);
    }

    updateStudent(studentDto:StudentDto):Student | null {
       return  this.studentService.updateStudent(studentDto);
    }

    findStudentByName(name: string): Student[] | null {
        return  this.studentService.findStudentsByName(name);
    }
    findQuantityOfStudents(): Student[] | number {
        return this.studentService.findQuantityStudents();
    }
    getAverageScoreByExam(subject:string):number {
       return  this.studentService.getAverageScoreByExam(subject);
    }

}