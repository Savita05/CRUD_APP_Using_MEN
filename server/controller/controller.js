const UserDb = require('../model/model');
//var userdb = require('../model/model');

//create and save new user
exports.create = (req,res)=>{
//validate request
if(!req.body){
    res.status(400).send({message:"Content cannot be empty"});
    return;
}

//new user
const user = new UserDb({
    name:req.body.name,
    email:req.body.email,
    gender:req.body.gender,
    status:req.body.status
})
// save user in database
user
.save(user)
.then(data=>{
    res.send(data)
})
.catch(err=>{
    res.status(500).send({
        message:err.message || "some error ocured while creating a operartion"
    });
});
}

//retrieve and return all users/ or a single user

exports.find =(req,res)=>{

    if(req.query.id){
const id = req.query.id;
UserDb.findById(id)
.then(data=>{
    if(!data){
        res.status(404).send({
            message: "Not found with user id " +id })
        }
        else{
          res.send(data);
        }
    
})
.catch(err =>{
    res.status(500).send({message:"Error reteiving user with id " +id})
})
    }else{
        UserDb.find()
        .then(user=>{
            res.send(user)
        })
    
        .catch(err=>{
            res.status(500).send({message:"err.message" || "erroe while retreivng user information"})
        })
    
    }
    }
    
 

//update a new identified user by id

exports.update =(req,res)=>{
if(!req.body){
    return res.status(400).send({
        message:"Data to update cannot be empty"
    })

    const id = req.params.id;
    UserDb.findByIdAndUpdate(id , req.body,{useFindAndModify:false})
    .then (data=>{
        if(data){
            res.status(404).send({message:"Cannot update with user ${id}.Maybe user not found"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"error update user information"})
    })
}
}

//Delete user with id

exports.delete = (req,res)=>{

    const id = req.params.id;
    UserDb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){

            res.status(404).send({message:"Cannot Delete with user ${id}.Maybe userid Wrong"})
        
    }else{
        res.send({
            message:"User was deleted successfully"
        })
    }
    })
    .catch(err=>{
        res.status(500).send({message:" could not delete User with id=" +id});
    });

}
