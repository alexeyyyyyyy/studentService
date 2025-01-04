import StudentService from "./StudentService";
import Student from "../model/Student";
import StudentRepository from "../dao/StudentRepository";
import StudentDto from "../dto/StudentDto";


export default class StudentServiceImpl implements StudentService {
    private studentRepository= new StudentRepository();

    addStudent(student: Student): boolean {
        const students:Student[] = this.studentRepository.readAll();
        if(students.findIndex(s => s.id === student.id) >= 0) {
            throw new Error("Student already exists");
        }
        students.push(student);
        return this.studentRepository.writeAll(students);
    }

    findQuantityStudents(): Student[] | number {
       const students:Student[] = this.studentRepository.readAll();
        return students.length;
    }

    findStudentById(id:number): Student | null {
        const students: Student[] = this.studentRepository.readAll();
        return  students.find(c => c.id === id) || null;

    }

    findStudentsByName(name: string): Student[] | null {
        const students: Student[] = this.studentRepository.readAll();
        return students.filter(c => c.name === name) || null;
    }

    getAverageScoreByExam(subject: string): number {
        const students: Student[] = this.studentRepository.readAll();
        const scores = students
            .map(student => student.scores[subject])
            .filter(score => score !== undefined);

        if(scores.length === 0 ) {
            return 0;
        }
        const total = scores.reduce((sum , score) => sum + score, 0);
        return total / scores.length;
    }

    removeStudent(id: number): Student | null {

        const students:Student[] = this.studentRepository.readAll();
        const index = students.findIndex(s => s.id === id);
        if(index === -1) {
            return null;
        }
        const [removedStudent] = students.splice(index, 1);
        try {
            this.studentRepository.writeAll(students);
        }catch (error) {
            throw new Error("Error while trying to removeStudent");
        }
        return removedStudent;
    }

    updateStudent(studentDto:StudentDto): Student | null {
        const students = this.studentRepository.readAll();
        const updateStudent = students.find(c => c.id === studentDto.id);

        if(!updateStudent) {
            return null;
        }

        updateStudent.name = studentDto.name;
        updateStudent.scores = studentDto.scores

        this.studentRepository.writeAll(students);
        return updateStudent;
    }

}