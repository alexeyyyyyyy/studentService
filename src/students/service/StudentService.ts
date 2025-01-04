import Student from "../model/Student";
import StudentDto from "../dto/StudentDto";


export default interface StudentService {
    addStudent(student: Student): boolean;

    removeStudent(id: number):Student | null;

    findStudentById(id:number):Student | null ;

    updateStudent(studentDto:StudentDto): Student | null;

    findStudentsByName(name: string): Student[] | null;

    findQuantityStudents(): Student[] | number ,

    getAverageScoreByExam(subject: string): number;
}