const connectToDatabase = require('../config/db.config');
const { getJwt } = require('../utils/jwt');

const db = connectToDatabase();
const RegisterCandidate = (req,res) => {
    console.log(req.body);
    const { candidate_id, name ,email , address , password, phone_number , resume} = req.body;

    db.query('SELECT email FROM Candidate where email = ?',[email],(error,result)=>{
        if(error){
            console.log(error);
        }

        if(result.length>0){
            console.log("Email Already exist");
            return res.status(400).json({message : "User already exist"});
        }else{
            db.query('INSERT INTO Candidate SET ?', { candidate_id:candidate_id ,name:name,email:email,address:address,password:password,phone_number:phone_number,resume:resume} , (error,result)=>{
                if(error){
                    console.log(error);
                    return res.status(400).json({message : error});
                }else{
                    console.log("user registered");
                    return res.status(203).json({message : "User created"});
                }
            })
        }
    })
}

const SignIn = (req,res) => {
    console.log(req.body);
    const {email,password} = req.body;
    db.query('SELECT email FROM Candidate where email = ?',[email],(error,result)=>{
        if(error){
            console.log(error);
        }if(result.length==0){
            console.log("Invalid Credential");
            return res.status(404).json({message : "Invalid Credential"});
        }else{
            db.query('SELECT * FROM Candidate where email = ?',[email],(error,result)=>{
                if(error){
                    console.log(error);
                }

                if(password!=result[0].password){
                    return res.status(400).json({message : "Invalid Credential"});
                }else{
                    const jwtToken = getJwt({ email: email, candidate_id:result[0].candidate_id });
                    return res.status(200).json({message : "Login Successfully",data:{email: email,
                        secret: jwtToken,}});
                }
            });
        }
    })
}

module.exports = {SignIn , RegisterCandidate};