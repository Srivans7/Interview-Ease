const connectToDatabase = require('../config/db.config');
const db = connectToDatabase();

const CreateVacancy = (req,res) =>{
    const {id,position,availability,description,status,duration} = req.body;

    const currentDate = new Date();
    const year = currentDate.getFullYear(); // e.g., 2024
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate(); // e.g., 17
    const hours = currentDate.getHours(); // e.g., 18
    const minutes = currentDate.getMinutes(); // e.g., 8
    const seconds = currentDate.getSeconds(); // e.g., 12
        
    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    //status 1 = open , 0 = false

    db.query('INSERT INTO vacancy SET ?', {position:position,availability:availability,description:description,status:status,date_created:customFormattedDate,duration:duration} , (error,result)=>{
        if(error){
            console.log(error);
            return res.status(400).json({message : error});
        }else{
            console.log("vacancy added");
            return res.status(203).json({message : "vacancy added"});
        }
    })
}

const GetVacancy = (req,res) =>{
    const sql = 'SELECT * FROM vacancy;';

    db.query(sql,(error,result) =>{
        if(error){
            console.log("huisahd");
            return res.status(404).json({message:"table not found"});
        }
        const data = Array.from(result);
        return res.status(203).json(data);
    })
}

const GetInterviewID = (req,res) =>{
    console.log(req.params['email'])
    const sql = `SELECT id from interview where candidate_id=(SELECT candidate_id from Candidate where email="${req.params['email']}") and vacancy_id="${req.params['vacancy']}";`;

    db.query(sql,(error,result) =>{
        if(error){
            console.log("huisahd");
            return res.status(404).json({message:"table not found"});
        }
        const data = Array.from(result);

        console.log(data)
        return res.status(203).json(data);
    })
}

module.exports = {CreateVacancy,GetVacancy,GetInterviewID};