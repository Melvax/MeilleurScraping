var express = require('express');
var request = require( 'request' );

var path = require('path');
var lbc = require("./leboncoin.js");
var ma = require("./meilleursagents.js");
var app = express();
var bodyParser=require("body-parser");

var fs = require('fs');
var port = 8003;

app.set('view engine', 'ejs');
app.use( '/assets', express.static( 'assets' ) );

app.get( '/', function ( req, res ) {

    var url = req.query.urlLBC
 
    lbc.scrap(url);
    
    setTimeout(function(){
        res.render( 'home', {
            result: ma.deal,
            price: price,
            city: city,
            code_postal: code_postal,
            type: type,
            surface: surface,
            prixMoyLBC: prixMoyLBC,
            prixMoyMA: prixMoyMA,
            prixMoy_MA_Appartement: prixMoy_MA_Appartement,
            prixMoy_MA_Maison: prixMoy_MA_Maison,
            prixMens_MA_Loyer: prixMens_MA_Loyer,
            msg: msg,
        });
    },3000);
});



lbc.scrap(urllbc, function(){
    
    console.log("Le resultat est "+ma.deal);});  
setTimeout(function(){console.log("Resultat"+ma.deal);},2000);


//console.log(deal);


    
app.listen(port);
console.log('server is Listening on port'+port);
