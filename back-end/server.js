const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
require("dotenv").config({ path: "./config.env" });

const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// require executablePath from puppeteer
const {
  executablePath
} = require('puppeteer');
puppeteer.use(pluginStealth());


const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.use('/login', (req, res) => {
  // const dbo = require("../db/conn");
  // let db_connect = dbo.getDb("employees");
  // let myquery = { username : req.params.username};
  // db_connect
  //  .collection("Logins").findOne(myquery, function (err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     // res.json(result);
      
  //   });
  res.send({
    token: 'test123'
  });
});

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});



async function sendToDatabase(name, ticker, price, industry, metricsTitle, metricsValue) {
  const newStock = {
    name: name,
    ticker: ticker,
    curPrice: price,
    industry: industry,
    metricsTitle: metricsTitle,
    metricsValue: metricsValue,
    lastUpdated: Date.now()

  };
  // When a post request is sent to the create url, we'll add a new record to the database.

  console.log(newStock);
  await fetch("https://backend-hackthon.herokuapp.com/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStock),
    })
    .catch(error => {
      console.log(error);
      return;
    });
}


async function scrapeProduct(tic){
  
  var url_name_price_metrics = "https://www.wsj.com/market-data/quotes/" + tic + "/financials";
  
  var url_industry = "https://www.wsj.com/market-data/quotes/" + tic + "/company-people";
  
  
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

  await page.waitForXPath('/html/body/div[2]/section[1]/div[1]/div/h1/span[2]');
  const [ticker] = await page.$x('/html/body/div[2]/section[1]/div[1]/div/h1/span[2]');

  var text = await ticker.getProperty('textContent');
  const tickerText = await text.jsonValue();
  
  
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

  console.log({nameText});
  console.log({tickerText});
  console.log({priceText});
  console.log({metricsTitleText});
  console.log({metricsValueText});

  sendToDatabase(nameText, tickerText, priceText, industryText, metricsTitleText, metricsValueText);

await browser.close();

}



// scrapeProduct("CHDRY");
// scrapeProduct("BAC");
// scrapeProduct("BMO");
// scrapeProduct("CVS");
// scrapeProduct("WBA");



// scrapeProduct("TGT");
// scrapeProduct("TPR");
// scrapeProduct("C");