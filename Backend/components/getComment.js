var express = require('express');
var router = express.Router();
const pool = require("./db");



// to get a comment
router.post("/get_comment",async function(req,res){

    try{

        // adding a comment for a particular project.
        var query ="SELECT * FROM "
        query=query.concat(req.body.project_id);
        query = query.concat("_comment_table where sr=$1 order by comment_time desc")
        const db_res = await pool.query(query,[req.body.row_no]);

        var temp_json = db_res.rows;

        for (let step = 0; step < temp_json.length; step++) {
                
            temp_json[step].comment_time=temp_json[step].comment_time.toLocaleDateString("en-US")+" "+temp_json[step].comment_time.toLocaleTimeString("en-US")
        }
        
        console.log(temp_json);

        //returning all the rows
        res.json(temp_json);
        
    }catch(error){
        console.error(error.message);
    }
}
);

module.exports = router;