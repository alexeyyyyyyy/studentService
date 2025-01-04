import {Router} from "express";
import StudentController from "../students/controller/StudentController";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentDto from "../students/dto/StudentDto";
import expressAsyncHandler from "express-async-handler";


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);

router.post("/student", expressAsyncHandler(async(req,res) => {
    const studentDto = req.body as StudentDto;
    const isSuccess = studentController.addStudent(studentDto);
    if(isSuccess){
        res.status(200).send({status:"Success !"});
    }
}))

export default router;