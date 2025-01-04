import StudentService from "./StudentService";
import Student from "../model/Student";
import StudentRepository from "../dao/StudentRepository";


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

}