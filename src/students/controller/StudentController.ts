import StudentService from "../service/StudentService";
import StudentDto from "../dto/StudentDto";
import Student from "../model/Student";

export default class StudentController {
    private studentService: StudentService;

    constructor(studentService: StudentService) {
    this.studentService = studentService;
    }

    addStudent(studentDto:StudentDto):boolean {
        const student:Student = new Student(studentDto.id,studentDto.name,studentDto.scores as Map<string,number>);

        return this.studentService.addStudent(student);
    }
}