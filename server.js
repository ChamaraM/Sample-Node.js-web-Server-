var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./model/mongo");
var mongoOp2    =   require("./model/sutdents");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

router.route("/student")
    .get(function(req,res){
        var response = {};
        mongoOp2.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
               

            } else {
                response = data;
                 console.log("Password match");
              
            }
            
            res.json(response);
        });
    })
      .post(function(req,res){
        var db = new mongoOp2();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.StudentName = req.body.StudentName; 
        db.RegNumber = req.body.RegNumber;
        db.Sex = req.body.Sex;
        db.year = req.body.year;
        db.faculty = req.body.faculty;
        db.semester = req.body.semester;

        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false, "message" : "Data added"};
                res.json(response);
            }
            
        });
    });


router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
               

            } else {
                response = data;
                 console.log("Password match");
                /* if(data.userEmail .equal("cc@faf.com") ) {
                    // case where email needs to be updated.
                     Console.log("Password match");
                }*/
            }
            
            res.json(response);
        });
    })
      .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userEmail = req.body.email; 
        // Hash the password using SHA1 algorithm.
        /*db.userPassword =  require('crypto')
                          .createHash('sha1')
                          .update(req.body.password)
                          .digest('base64');*/
        db.userPassword = req.body.password;
        db.year = req.body.year;
        db.faculty = req.body.faculty;
        db.UserName = req.body.UserName;
      //  db.semester = req.body.semester;
        db.tecOrStudent = req.body.tecOrStudent;
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false, "message" : "Data added"};
                res.json(response);
            }
            
        });
    });

    router.route("/users/:id")
        .get(function(req,res){
        var response = {};
        mongoOp.findOne({UserName : req.params.id},function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false,"message" : data};
                
                if(data == null)
                {
                   console.log("data.userPassword"); 
                  // res.json(response);
                res.status(400).json(response);
                   
                }
                else{
           console.log(data.userPassword);
                    res.json(response);
                }
            }
           //console.log(data.userPassword);
            
        });
    })  
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.userEmail !== undefined) {
                    // case where email needs to be updated.
                    data.userEmail = req.body.userEmail;
                }
                if(req.body.userPassword !== undefined) {
                    // case where password needs to be updated
                    data.userPassword = req.body.userPassword;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        // find the data
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });

    router.route("/login")
        .get(function(req,res){
        var response = {};
        mongoOp.findOne({UserName : req.body.id},function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
                res.status(400).json(response);
            } else {
                response = {"error" : false,"message" : data};
                
                if(data == null)
                {
                   console.log("data.userPassword"); 
                  // res.json(response);
                res.status(400).json(response);
                   
                }
                else{
           console.log(data.userPassword);
                    res.json(response);
                    
                }
            }
           //console.log(data.userPassword);
            
        });
    })

       .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        mongoOp.findOne({UserName : req.body.id},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
             response = {"error" : false,"message" : data};
                
                if(data == null)
                {
                   console.log("data.userPassword"); 
                  // res.json(response);
                res.status(400).json(response);
                   
                }
                else{
                    data.userEmail = req.body.userEmail;
                    if(req.body.userPassword == data.userPassword){
                            res.json(response);
                            console.log("sucess!");
                    }
                    else{
                        res.status(400).json(response);
                        console.log("fail!");
                    }
           console.log("data.userPassword");
                    
                }
              
            }
        });
    });



    

app.use('/',router);

app.listen(3100);
console.log("Listening to PORT 3100");