
var inquirer = require("inquirer");
var mysql = require('mysql');


var connection = mysql.createConnection({
    host:"localhost",
    PORT:3306,
    user:"root",
    password:"PASWORD",
    database:"bamazon_DB",
});
connection.connect(function(err){
    if(err){throw err;}
    console.log("Connected as id:" + connection.threadId + 
     "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
   
);
    //
    ifConnected();
    // connection.end();
    
});


        function ifConnected(){
        connection.query("SELECT * FROM products",function(error,res){
            if(error) throw error;

        //   print out the list of the available atems
            for(var i = 0; i < res.length; i++){
            console.log(
                    res[i].ID + 
            " | " + res[i].product_name + 
            " | " + res[i].price + 
            " | " + res[i].department_name +
            " | " + res[i].stock_quantity +
            "\n______________________________________________________");
             
            }
            firstPrompt();
        });
        }




        ///////////////////////////////////////////
            //first promptfunction
            function firstPrompt(){
                inquirer.prompt([
  {
    name: "ID",
    type: "input",
    message: "Chose the ID of the product you wish to buy?"
  },
  {
    name: "stock_quantity",
    type: "input",
    message: "How many units of the product would you like to buy?"
  },

])
.then(function(answer) {
        console.log("\n\nYou Choose ID :" + answer.ID + "\n"); 
        chosenID(answer.ID);
        
     
        console.log("Quantity you wanted : " + answer.stock_quantity + "\n\n"); 
        quantity(answer.ID,answer.stock_quantity);

});

            }

           // Grab the ID Choosen 
            function chosenID(parm){
                connection.query("SELECT * FROM products WHERE ID=?",[parm],function(err,res){
                    if(err) {
                        throw error;
                    }else if(res[0]){
                        
                        console.log(
                            "You select:\n"+
                                res[0].ID + 
                        " | " + res[0].product_name + 
                        " | " + res[0].price + 
                        " | " + res[0].department_name +
                        " | " + res[0].stock_quantity );  
                        
                    }else{
                        console.log("We could not find the ID you've Chosen. Try again.");
                        connection.end();
                    }  
                });
               
                }


                ///////////////////
                  //select quantity
            function quantity(parm,want){

                connection.query("SELECT * FROM products WHERE ID=?",[parm],function(err,res){
                    if(err) throw err;
                    if(res[0]){                   
                    
                  console.log(
                      "We have got " + 
                      res[0].stock_quantity +" "+
                      res[0].product_name + " in the stock");
                                      
                   var intQuantityWanted =  parseFloat(want);
                   var intPrice = parseFloat(res[0].price);
                   var intQuantityAvalable = parseFloat(res[0].stock_quantity);

                   if(isNaN(intQuantityWanted)){
                    console.log("Quantity you entered is not a number! Try Again.");
                    connection.end();

                   }else{
                   
                    //Showing the Price
                    var totalCostOfItem =  intQuantityWanted *  intPrice;
                    var finalizePrice = totalCostOfItem.toFixed(2);
                     
                    
                    
                    //Showing Whats left and Update the table
                    var remain = intQuantityAvalable - intQuantityWanted;
                   
                    if(remain >= 0){

                        console.log("Your total is gonna be: "+finalizePrice);

                        console.log("We have " + remain + " left in the stock");
                       
                        updateDatabase(parm,remain);
                        
                      
                        
                    }else{
                        console.log("Insufficient quantity!");
                        connection.end();
                    }

                   }
                    }
                });
                             

            }

            function updateDatabase(parm,remind){
                connection.query("UPDATE products SET stock_quantity=? WHERE ID=?",
                [
                    remind,parm 
                ],
                function(err,res){
                    if(err) throw err;
                });
                connection.end();
            }


        






                