const db = require("../db/DBConnection");
const GenericResponse = require("../dto/GenericResponse");







module.exports = {





    saveExpenses: async (expense) => {


        const date = new Date();



        db.query("insert into expense ( expense , month , year ) values( ? , ? , ? ) ",


            [expense, date.getMonth(), date.getFullYear()],


            (error, result) => {



                if (error) {

                    console.log(error);
                }



                else {

                    return new GenericResponse("Saved Successfully", result);
                }

            })


    },







    getExpenseOfCurrentYear: () => {




        return new Promise((resolve, reject) => {




            db.query("SELECT MAX(id) as id , exp.expense as expenseOfCurrentYear , month , year FROM expense exp where exp.year = 2023 group by exp.month order by exp.id desc ",



                (error, result) => {




                    if (error) {

                        console.log(error);
                    }




                    else {

                        resolve( result[0] == undefined ? null : result );
                    }


                }
            )
        })

    }



}