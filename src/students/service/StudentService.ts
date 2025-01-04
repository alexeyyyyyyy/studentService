import Student from "../model/Student";

export default interface StudentService {
    addStudent(student: Student): boolean
}