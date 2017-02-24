var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();
var port = 8000;

var ma = require("./meilleursagents.js");

var lbc; // valeur a recuperer

// l'URL sera un paramètre
//var url = "https://www.leboncoin.fr/ventes_immobilieres/1085676416.htm?ca=12_s";

function scrap(url,callback){
    request(url, function (err, resp, body) {
        //Cheerio facilite le scraping
        var $ = cheerio.load(body);

        var ville = $('*[itemprop = "address"]');
        var villeText = ville.text().trim();

        //pour importer le nom de la ville dans l'ul de meilleursagents il ne faut pas de " "
        villeTextsplit = villeText.split(" ").join('-').toLowerCase().trim();

        var codePostal = villeTextsplit[villeTextsplit.length-1].trim();

        delete villeTextsplit[villeTextsplit.length-1];


        var prix = $('.item_price').attr("content");
        //var prixText = prix.text();

        var surface = $('#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value');
        var surfaceText = surface.text().split(" ")[0];

        var typeText=$('#adview > section > section > section.properties.lineNegative > div:nth-child(7) > h2 > span.value').text();

        //console.log(villeText);
        //console.log(prix);
        var prixm = prix/surfaceText
        info={
            price: prix,
            city: villeTextsplit,
            code: codePostal,

            surface: surfaceText,
            type: typeText,
            pm2 : prixm,
            urlma:  "https://www.meilleursagents.com/prix-immobilier/"+villeTextsplit
        }
        
        //console.log(info);
        var urlma = "https://www.meilleursagents.com/prix-immobilier/"+villeTextsplit;
        //setTimeout(function(){callback(urlma,typeText); }, 3000);
        console.log(info);
        var deal= ma.calcul(urlma,typeText,prixm);
        callback && callback(urlma,typeText,prixm);
        //exports.info = info;
        
        
    return deal;

    });

}
//scrap(url);
exports.scrap = scrap;
//exports.info = info;

app.listen(port);
console.log('server is Listening on port'+port);
