const express = require('express')
const mongoose = require('mongoose')
const app =express()
const Person = require ('./Models/personSchema')
require('dotenv').config()
const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl,(err)=>{
  err? console.log(err) : console.log('database is connected')
})

app.use(express.json())
//Create and Save a Record of a Model
const person = new Person({
  name: "Mortadha",
  age: 35,
  favoriteFoods: ["Pizza", "Makloub"],
});
person.save((err, data) => {
  (err) ? console.log(err) : console.log('Mortadha data saved')
});

//Create Many Records with model.create()
let arrayOfPeople =[
  {
      name: "Mohamed",
      age: 25,
      favoriteFoods: ["fastfood", "sucry"],
  },
  {
      name: "Ouafa",
      age: 39,
      favoriteFoods: ["lablebi", "verveine"],
  },
{
      name: "Najib",
      age: 28,
      favoriteFoods: ["burritos","Burger", "Tacos"],
  },
{
    name: "Rabeb",
    age: 25,
    favoriteFoods: ["burritos","kebsa", "kfc"],
}

]
Person.create(arrayOfPeople,(err, data) => {
    (err) ? console.log(err) : console.log('data created')
    
  }
);
//Use model.find() to Search Your Database
Person.findOne({ name: "Mohamed" }, (err, data) => {
    (err) ? console.log(err) : console.log('data found by name')
});
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: { $in: ["lablebi", "verveine"] } },(err, done) => {
    (err) ? console.log(err) : console.log('data found by favouriteFoods')
  }
);
//Use model.findById() to Search Your Database By _id
Person.findById("637a85017251ba331db044c8",(err, data)=> {
    (err) ? console.log(err) : console.log('data found by id')
});
//Perform Classic Updates by Running Find, Edit, then Save
Person.findByIdAndUpdate("637a918c9d7b1b67a1260f53", (err, data) => {
  if (err) console.log(err)
  else{
      data.favoriteFoods.push('makloub')
      data.save()
      console.log('data found by id and updated')
  }
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
const functionFindAndUpdate = (personName) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate({name:personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) {
        return (err);
      } 
        return updatedDoc
    })
  };

functionFindAndUpdate ("Mortadha")
//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove("6372eeae245d6081aa207128",(err, data) =>{
    (err) ? console.log('err') : console.log('data found by id and removed')
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.deleteMany({age: {$gt:25}}, (err, data)=>{
  err? console.log(err) : console.log('data with age>25 removed')

 });

 //Chain Search Query Helpers to Narrow Search Results
 Person.find({favoriteFoods: {$all: ['burritos']}})
.sort({name: 'asc'})
.limit(2)
.select('name')
.exec((err,data)=>{
    err? console.log(err) : console.log('search done')
});

const port =  process.env.PORT
app.listen(port, (err)=>{
    err? console.log(err) : console.log('server is running')
})