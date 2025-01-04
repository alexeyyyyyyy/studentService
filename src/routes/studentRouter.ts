import {Router} from "express";
import StudentController from "../students/controller/StudentController";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentDto from "../students/dto/StudentDto";
import expressAsyncHandler from "express-async-handler";
import {body} from "express-validator";
import validationMiddleware from "../students/middleware/validationMiddleware";




const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);

router.post("/student",
    body("id").isInt(),
    body("name").isString().notEmpty(),
    body('scores')
        .custom((scores) => {

            if (!scores || typeof scores !== 'object') {
                throw new Error('Scores must be an object with subjects and scores.');
            }


            for (const subject in scores) {
                if (typeof scores[subject] !== 'number' || scores[subject] < 0 || scores[subject] > 100) {
                    throw new Error(`Score for ${subject} must be a number between 0 and 100.`);
                }
            }
            return true;
        }),
    validationMiddleware,
    ((req,res) => {
    const studentDto = req.body as StudentDto;
    const isSuccess =  studentController.addStudent(studentDto);
    if(isSuccess){
        res.status(200).json({
            message: "Student Added successfully",
            student: studentDto
        });
    }
}))
router.delete("/deleteStudent/:id", expressAsyncHandler(async(req,res) => {
    const studentRemove = parseInt(req.params.id);
    if(isNaN(studentRemove) || studentRemove <= 0) {
        res.status(400).json({message:"invalid id"});
    }
    const student =  studentController.removeStudent(studentRemove);
    if(student) {
        res.status(200).json({
            message: "Student deleted successfully",
            student: student
        });
    }else {
        res.status(404).send({status:"Not Found"});
    }
}))

router.get("/findStudentById/:id", expressAsyncHandler(async(req,res) => {
    const findStudent =  req.params.id;
    const student = studentController.findStudentById(Number(findStudent));
    if(student) {
        res.status(200).json({
            message: "Student Found successfully",
            student: student
        });
    } else {
        res.status(404).send({status:"Not Found"});
    }
}))
router.put("/updateStudent/:id", expressAsyncHandler(async(req,res) => {
    const studentId  =  parseInt(req.params.id);
    if (isNaN(studentId) || studentId <= 0) {
         res.status(400).json({ message: "Invalid student ID" });
    }
    const studentUpdate = req.body as StudentDto;
    const updatedStudent =  studentController.updateStudent(studentUpdate);

    if(updatedStudent) {
        res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    }else {
        res.status(404).json({ message: "Student not found" });
    }
}))
router.get("/findStudentsByName/:name", expressAsyncHandler(async(req,res) => {
    const findStudentsByName =  req.params.name;
    const studentsName = studentController.findStudentByName(findStudentsByName);
    if(studentsName) {
        res.status(200).json({
            message: "Students Found successfully",
            students: studentsName
        })
    }else {
        res.status(404).send({status:"Not Found"});
    }
}))
router.get("/findQuantityOfStudents", expressAsyncHandler(async(req,res) => {
    const students = studentController.findQuantityOfStudents();
    if(students) {
        res.status(200).json({
            message: `Students number is : ${students}`
        })
    }else {
        res.status(404).send({status:"Not Found"});
    }
}))

router.get("/getAverageScoreByExam", expressAsyncHandler(async(req,res) => {
    const {getScoreBySubject} = req.query;
    if (!getScoreBySubject) {
         res.status(400).send({ message: "Subject parameter is required" });
    }
    const averageScore = studentController.getAverageScoreByExam(getScoreBySubject + "");
    if(averageScore) {
        res.status(200).json({
            message: "Average score is : " + averageScore
        })
    }else {
        res.status(404).send({status:"Not Found"});
    }
}))
export default router;