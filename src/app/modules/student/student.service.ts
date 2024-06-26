import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
    // const result = await StudentModel.create(student);//built-in static method
    // return result
    
    const student = new Student(studentData);//create an instance
    if(await student.isUserExists(studentData.id)){
        throw new Error("User already exists!")

    }
    const result = await student.save()//bulit-in instance method from mongoose
    return result
}

const getAllStudentsFromDB = async()=>{
    const result = await Student.find();
    return result
}

const getSingleStudentFromDB = async(id: string)=>{
    // const result = await Student.findOne({id});
    const  result = await Student.aggregate([
        {$match: {id: id}}
    ])
    return result
}


const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>) => {
    const result = await Student.updateOne({ id }, { $set: updateData });
    return result;
}

const deleteStudentFromDB = async(id: string)=>{
    const result = await Student.updateOne({id}, {isDeleted: true});
    return result
}

export const StudentServices ={
    createStudentIntoDB,
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB
}