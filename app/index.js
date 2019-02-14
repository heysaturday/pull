// app/index.js

var request = require("request");
const fs = require('fs');
const Webflow = require('webflow-api');
var ajaxRequest = require('ajax-request');

var options = {
  method: 'GET',
  siteId: '5afeeb3390908a1094e2672c',
  headers:
   { 'Postman-Token': '6e652689-43a7-41a4-9ab6-fab6bbb1acfb',
     'cache-control': 'no-cache',
     Authorization: 'Bearer 918d6786a1a370b5331e0f61194fe8a05fbe09a37dd6be7ecb75f745bfa36b7d',
     'Accept-Version': '1.0.0',
     token: '918d6786a1a370b5331e0f61194fe8a05fbe09a37dd6be7ecb75f745bfa36b7d',
      } };

const webflow = new Webflow(options.headers);
const site = webflow.sites(options);
const collections = webflow.collections(options);
const collectionIds = [];
var content;
fs.readFile('collections.json', 'utf8', function read(err,data) {
  if(err) thow(err);
  content = JSON.parse(data);
  console.log(content.length);
  for (let item of content) {
    collectionIds.push(item._id)

  }
  console.log(collectionIds);
  for(let item of collectionIds){
    var allItems = [];
    allItems.push(webflow.items({collectionId: `${item}`}));
    for (let item of allItems) {
      item.then(i => function() {
        fs.writeFile(`/json/${i.name.replace(/\s/g, '')}.json`, i, function(err) {
          if(err) {
            return console.log(err);
          }
          console.log("The Files Have Synced!");
        })
      }
    )}}})
