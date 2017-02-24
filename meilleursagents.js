var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8001;


//var module = require("./leboncoin.js");
//ville et codes rentrés en parametres 

    //var ville = module.city;
    //var code= module.code;
    //var type = module.type;
    //var prixMoyen;
   // var url = "https://www.meilleursagents.com/prix-immobilier/cergy-95000";

function calcul(url,type,prix){
    // l'URL sera un paramètre
    console.log(url);
    //console.log(module.lbc);
    var deal = request(url, function(err,resp,body){
        var $ = cheerio.load(body);

        var prixMoyenAppartement = $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median').text().trim().replace(/[^0-9]+/ig,"");

        var prixMoyenMaison = $('#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median').text().trim().replace(/[^0-9]+/ig,"");

        var prixMoyen=prixMoyenMaison;

        if(type=="Appartement"){
            prixMoyen=prixMoyenAppartement;
        }
        
        var deal ="Il s'agit d'une bonne affaire";
        
        if(prix>prixMoyen){
            deal= "Il ne s'agit pas d'une bonne affaire";
        }
        console.log("prix:"+prix+" prixMoyen:"+prixMoyen);
        console.log(deal);
        
        //return deal;
        exports.deal = deal;
        console.log(prixMoyen);
        return deal;
        


    });
    
    //console.log(deal);
}

//calcul(url);
exports.calcul =  calcul;
app.listen(port);
console.log('server is Listening on port'+port);
 //sa = function(url,  request(url, function(err,resp,body));