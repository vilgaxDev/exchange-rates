import * as functions from 'firebase-functions';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/app';
import getFacts from './src/facts';
import express from 'express';
import fs from 'fs';
import path from 'path';

let pageUrl = "";

if (__dirname.indexOf("/srv") != -1){
   pageUrl =  path.join(__dirname, 'index.html');
} else {
   pageUrl = path.join(__dirname.replace("functions", ""), 'public', 'index.html');
}

// console.log("pageUrl... " + pageUrl);
// console.log("dirname...");
// console.log(JSON.stringify(fs.readdirSync("/../" ))); 
// console.log("<< dirname.");

const index = fs.readFileSync(pageUrl, 'utf8');

const app = express();

app.get('**', (req, res) => {
  getFacts().then(facts=>{
    const html = renderToString(<App facts={facts}/>);
    const finalHtml = index.replace('<!-- ::APP:: -->',html);
    //console.log("=== BEGIN: final HTML === ")
    //console.log(finalHtml);
    //console.log("=== END: final HTML === ")
    res.set('Cache-Control', 'public, max-age=60, s-maxage=300');    
    res.send(finalHtml);
  });
});

export let ssrapp = functions.https.onRequest(app);
