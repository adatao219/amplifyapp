const express = require("express");
 

const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// require executablePath from puppeteer
const {
  executablePath
} = require('puppeteer');
puppeteer.use(pluginStealth());


// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// // This section will help you get a single record by id
// recordRoutes.route("/login").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { username : req.params.username};
//   db_connect
//     .collection("Logins")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//       // res.json(result);
      
//     });
//  });



// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/record/:ticker").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { ticker: req.params.ticker};
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     console.log(result);
     res.json(result);
     
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   ticker: req.body.ticker,
   curPrice: req.body.curPrice,
   industry: req.body.industry,
   metricsTitle: req.body.metricsTitle,
   metricsValue: req.body.metricsValue,
   lastUpdated: Date.now()
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
    console.log("1 document created");
    if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:ticker").post( async function (req, response) {

  let db_connect = dbo.getDb();
 let myquery = { ticker: req.params.ticker};
 console.log("myquery");
  console.log(myquery);

 async function scrapeProduct(tic){

  const url_name_price_metrics = "https://www.wsj.com/market-data/quotes/" + tic + "/financials";
  const url_industry = "https://www.wsj.com/market-data/quotes/" + tic + "/company-people";
  

  const browser = await puppeteer.launch({
      // args: ['--no-sandbox',],
      // headless: false,
      ignoreHTTPSErrors: true,
  
      // add this
      executablePath: executablePath(),
    });
  var page = await browser.newPage();
  await page.goto(url_industry,{waitUntil: 'networkidle0'});

  await page.waitForXPath('//*[@id="cr_info_mod"]/div[2]/div/div[1]/div[2]/ul/li[2]/div[2]/span[2]');
  const [industry] = await page.$x('//*[@id="cr_info_mod"]/div[2]/div/div[1]/div[2]/ul/li[2]/div[2]/span[2]');

  text = await industry.getProperty('textContent');
  const industryText = await text.jsonValue();
  console.log({industryText});


  await page.goto(url_name_price_metrics,{waitUntil: 'networkidle0'});


  await page.waitForXPath('/html/body/div[2]/section[1]/div[1]/div/h1/span[1]');
  const [name] = await page.$x('/html/body/div[2]/section[1]/div[1]/div/h1/span[1]');

  var text = await name.getProperty('textContent');
  const nameText = await text.jsonValue();
  
  // await page.waitForXPath('/html/body/div[2]/section[1]/div[1]/div/h1/span[2]');
  // const [ticker] = await page.$x('/html/body/div[2]/section[1]/div[1]/div/h1/span[2]');

  // var text = await ticker.getProperty('textContent');
  // const tickerText = await text.jsonValue();

  await page.waitForXPath('//*[@id="quote_val"]');
  const [price] = await page.$x('//*[@id="quote_val"]');

  text = await price.getProperty('textContent');
  const priceText = await text.jsonValue();

  if ({industryText}.industryText == ' Financial Services '){

    console.log("financial services metrics");

    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');
    const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');
  
    text = await metricsTitle.getProperty('textContent');
    metricsTitleText = await text.jsonValue();
  
    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');
    const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');
  
    text = await metricsValue.getProperty('textContent');
    metricsValueText = await text.jsonValue();
  
  } else if ({industryText}.industryText == ' Retail/Wholesale '){

    console.log("retail/wholesale metrics");

    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[2]/div[1]/table/tbody/tr[5]/td/span[1]');
    const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[2]/div[1]/table/tbody/tr[5]/td/span[1]');
  
    text = await metricsTitle.getProperty('textContent');
    metricsTitleText = await text.jsonValue();
  
    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[2]/div[1]/table/tbody/tr[5]/td/span[2]/span');
    const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[2]/div[1]/table/tbody/tr[5]/td/span[2]/span');
  
    text = await metricsValue.getProperty('textContent');
    metricsValueText = await text.jsonValue();

  } else if ({industryText}.industryText == ' Technology '){

    console.log("technology metrics");

    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[3]/td/span[1]');
    const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[3]/td/span[1]');
  
    text = await metricsTitle.getProperty('textContent');
    metricsTitleText = await text.jsonValue();
  
    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[3]/td/span[2]/span');
    const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[3]/td/span[2]/span');
  
    text = await metricsValue.getProperty('textContent');
    metricsValueText = await text.jsonValue();


  } else {

    console.log("other industry metrics");

    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[1]/td/span[1]');
    const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[1]/td/span[1]');
  
    text = await metricsTitle.getProperty('textContent');
    metricsTitleText = await text.jsonValue();
  
    await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[1]/td/span[2]/span');
    const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[1]/td/span[2]/span');
  
    text = await metricsValue.getProperty('textContent');
    metricsValueText = await text.jsonValue();

  }

  await browser.close();

  return_array = [priceText, metricsTitleText, metricsValueText, industryText, nameText ];
  console.log(return_array);
  return return_array;

}


get_return_array = await scrapeProduct(req.params.ticker);
console.log("get return array");
console.log(get_return_array);
 let newvalues = {
   $set: {
    name: get_return_array[4],
    ticker: req.params.ticker,
    curPrice: get_return_array[0],
    industry: get_return_array[3],
    metricsTitle: get_return_array[1],
    metricsValue: get_return_array[2],
    lastUpdated: Date.now()
   },
 };

 console.log(newvalues);

 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     console.log("res");
     console.log(res);
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;