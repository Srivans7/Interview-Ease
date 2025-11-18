const connectToDatabase = require('../config/db.config');
const db = connectToDatabase();

const Application = (req,res) =>{
    // console.log(req.body);
    const { id, firstname ,middlename, lastname , gender , email, contact , address , cover_letter , vacancy_id , resume_path } = req.body;

    db.query('SELECT id FROM vacancy where id = ?' , [vacancy_id] , (error,result) =>{
        if(error){
            console.log(error);
        }else if(result.length == 0){
            //console.log("ldksjhf");
            res.status(403).json({message:"No such vacancy"});
        }else{
            db.query('SELECT email FROM application where vacancy_id = ? ',[vacancy_id],(error,resu)=>{
                console.log(resu)
                var app = false;
                for(var i=0;i<resu.length;i++){
                    if(resu[i].email == email){
                        app = true;
                    }
                }
                if(error){
                    console.log(error);
                }else if(app){
                    console.log("Application already exist");
                    res.status(402).json({message:"Application already exists"});
                }else{
                    const currentDate = new Date();
                    const year = currentDate.getFullYear(); // e.g., 2024
                    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
                    const day = currentDate.getDate(); // e.g., 17
                    const hours = currentDate.getHours(); // e.g., 18
                    const minutes = currentDate.getMinutes(); // e.g., 8
                    const seconds = currentDate.getSeconds(); // e.g., 12
        
                    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
                    console.log(customFormattedDate);
                    db.query('INSERT INTO application SET ?', { id:id ,firstname:firstname,middlename:middlename,email:email,address:address,lastname:lastname,gender:gender,contact:contact,cover_letter:cover_letter,vacancy_id:vacancy_id,resume_path:resume_path,date_created:customFormattedDate} , (error,reult)=>{
                        if(error){
                            console.log(error);
                            return res.status(400).json({message : error});
                        }else{
                            console.log("application form filled successfully");
                            // const interview_id = 
                            return res.status(203).json({message : "application form filled successfully",ok:true});
                        }
                    })
                }
            })
        }
    })
}

const Feedback = (req,res) =>{
    const {interview_id,feedback} = req.body;

    db.query('INSERT INTO interview_feedback SET ?', {interview_id:interview_id,feedback:feedback} , (error,result)=>{
        if(error){
            console.log(error);
            return res.status(400).json({message : error});
        }else{
            console.log("interview feedback done");
            return res.status(203).json({message : "vacancy added"});
        }
    })
}

const setStatus = (req, res) => {
    const { status_name, candidate_id } = req.body;

    // Validate that status_name and candidate_id are provided
    if (!status_name || !candidate_id) {
        return res.status(400).json({ message: "Both status_name and candidate_id are required" });
    }

    // Update the status_name in the interview table
    const query = 'UPDATE interview SET status_name = ? WHERE candidate_id = ?';
    db.query(query, [status_name, candidate_id], (error, result) => {
        if (error) {
            console.error("Error updating status:", error);
            return res.status(500).json({ message: "Database error", error });
        } else {
            console.log("Interview status updated");
            return res.status(200).json({ message: "Status updated successfully" });
        }
    });
};


const getStatus = (req, res) => {
    const { candidate_id } = req.body; // Assuming candidate_id is passed in the body of the request

    // Modify the query to select all relevant columns
    db.query('SELECT * FROM interview WHERE candidate_id = ?', [candidate_id], (error, result) => {
        if (error) {
            console.log("Error fetching interview details:", error);
            return res.status(500).json({ message: "Database error", error });
        } else {
            if (result.length === 0) {
                console.log("No interview details found");
                return res.status(404).json({ message: "No interview details found" });
            } else {
                console.log("Interview details retrieved");
                return res.status(200).json(result); // Send the entire result array
            }
        }
    });
};


module.exports = {Application,Feedback,getStatus,setStatus};