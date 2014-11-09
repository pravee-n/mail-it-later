var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');


router.get('/migrate', function(req, res) {
	
	/*Data base settings*/
	var sequelize = new Sequelize('mail-it-later', 'root', 'root', {
	    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
	    port: 3306, // or 5432 (for postgres)
	});


	/*Connect to database*/
	sequelize
	    .authenticate()
	    .complete(function(err) {
	        if (!!err) {
	            console.log('Unable to connect to the database:', err);
	        } else {
	            console.log('Connection has been established successfully.');
	        }
	    });

	/* Define all the models */
	/* User model */
	var User = sequelize.define('User', {
	    username: Sequelize.STRING,
	    email: Sequelize.STRING,
	    password: Sequelize.STRING,
	    access_token: Sequelize.STRING,
	    request_token: Sequelize.STRING,
	}, {
	    createdAt: 'created_at',
	    updatedAt: 'updated_at'
	});


	/* Synchronize models and database */
	sequelize
    .sync()
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err);
        } else {
            console.log('It worked!');
        }
    });

    res.send('Completed. Check logs.');
});


module.exports = router;
