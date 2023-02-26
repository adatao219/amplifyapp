const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
// require executablePath from puppeteer
const {
  executablePath
} = require('puppeteer');
puppeteer.use(pluginStealth());

// async function scrapeProduct(url, url_metrics) {
//   const browser = await puppeteer.launch({
//     // args: ['--no-sandbox',],
//     // headless: false,
//     ignoreHTTPSErrors: true,

//     // add this
//     executablePath: executablePath(),
//   });
//   var page = await browser.newPage();
//   await page.goto(url, {
//     waitUntil: 'networkidle0'
//   });

//   let allCategories = [];

//   const urls = await page.evaluate(function(){
//     const categories = document.querySelectorAll('body > div.pageFrame.navType-black.subType-unsubscribed > section.sector.cl_section > div > section > div.index-sector.border-box > ul > li > ul > li > a');
//     let res = [];
//     let catName = [];
//     categories.forEach(element => {
//       res.push(element.href);
//       catName.push(element.textContent);
//     });
//     return [res, catName];
//   });

//   /* TODO */
//   // searching for the right category 

//   console.log(allCategories);
//   //click to open the category
//   let res = urls[0];
//   let allName = urls[1];
//   console.log(allName);
//   let catIndex = 0;
//   await page.goto(res[catIndex]);

//   //going through each page of given category
//   let hasNext = true;
//   while(hasNext){
//     const nextPage = await page.evaluate(function(){
//       const nextBnt = document.querySelector('body > div.pageFrame.navType-black.subType-unsubscribed > section.sector.cl_section > div > section > div:nth-child(3) > ul > li.next');

//       if(nextBnt.classList.contains('disabled')){
//         hasNext = false;
//         return false;
//       }else{
//         let next = nextBnt.querySelector('a');
//         return next.href;
//       }

//     });

//     console.log(nextPage);
//     if(!nextPage) break;
//     /* TODO */
//     // searching for the company


//     await page.goto(nextPage);
//   }


//   const companies = await page.evaluate(function(){
//     const companyURL = document.querySelectorAll('body > div.pageFrame.navType-black.subType-unsubscribed > section.sector.cl_section > div > section > table > tbody > tr:nth-child(1) > td:nth-child(1) > a');
//     let res = [];
//     companyURL.forEach(element => {
//       res.push(element.href);
//     });
//     return res;
//   });
//   console.log(companies[0]);
//   //click on the first company link
//   await page.goto(companies[0]);


//   await page.waitForXPath('//*[@id="quote_val"]');
//   const [el] = await page.$x('//*[@id="quote_val"]');

//   const text = await el.getProperty('textContent');
//   const srcText = await text.jsonValue();

//   console.log({srcText});

//   const [header] = await page.$x('//*[@id="root"]/div/div/div/div[3]/div/div/div[1]/div[1]/div[2]/h1');

//   const name = await header.getProperty('textContent');
//   const nameText = await name.jsonValue();


//   page = await browser.newPage();
//   await page.goto(url_metrics,{waitUntil: 'networkidle0'});

//   await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');
//   const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');

//   var metrics = await metricsTitle.getProperty('textContent');
//   metricsTitleText = await metrics.jsonValue();

//   await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');
//   const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');

//   metrics = await metricsValue.getProperty('textContent');
//   metricsValueText = await metrics.jsonValue();

//   console.log({metricsTitleText});
//   console.log({metricsValueText});

//   // sendToDatabase({nameText}.nameText,{srcText}.srcText,allName[catIndex],"not sure");

//   await browser.close();
// }




// This function will handle the submission.
async function sendToDatabase(name, price, industry, metricsTitle, metricsValue) {
  const newStock = {
    name: name,
    curPrice: price,
    industry: industry,
    metricsTitle: metricsTitle,
    metricsValue: metricsValue

  };
  // When a post request is sent to the create url, we'll add a new record to the database.

  console.log(newStock);
  await fetch("http://localhost:5001/record/add", {
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



// //for Price/Book ratio companies (Banking)
// async function scrapeProduct(url_name_price_metrics, url_industry){
//   const browser = await puppeteer.launch({
//       // args: ['--no-sandbox',],
//       // headless: false,
//       ignoreHTTPSErrors: true,
  
//       // add this
//       executablePath: executablePath(),
//     });
//   var page = await browser.newPage();
//   await page.goto(url_name_price_metrics,{waitUntil: 'networkidle0'});

//   await page.waitForXPath('/html/body/div[2]/section[1]/div[1]/div/h1/span[1]');
//   const [name] = await page.$x('/html/body/div[2]/section[1]/div[1]/div/h1/span[1]');

//   var text = await name.getProperty('textContent');
//   const nameText = await text.jsonValue();
  
//   await page.waitForXPath('//*[@id="quote_val"]');
//   const [price] = await page.$x('//*[@id="quote_val"]');

//   text = await price.getProperty('textContent');
//   const priceText = await text.jsonValue();

//   await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');
//   const [metricsTitle] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[1]');

//   text = await metricsTitle.getProperty('textContent');
//   metricsTitleText = await text.jsonValue();

//   await page.waitForXPath('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');
//   const [metricsValue] = await page.$x('/html/body/div[2]/section[2]/div[2]/div[1]/div[3]/div/div[2]/div[1]/div[1]/table/tbody/tr[4]/td/span[2]/span');

//   text = await metricsValue.getProperty('textContent');
//   metricsValueText = await text.jsonValue();

//   console.log({nameText});
//   console.log({priceText});
//   console.log({metricsTitleText});
//   console.log({metricsValueText});
  
  
//   await page.goto(url_industry,{waitUntil: 'networkidle0'});

//   await page.waitForXPath('//*[@id="cr_info_mod"]/div[2]/div/div[1]/div[2]/ul/li[2]/div[2]/span[2]');
//   const [industry] = await page.$x('//*[@id="cr_info_mod"]/div[2]/div/div[1]/div[2]/ul/li[2]/div[2]/span[2]');

//   text = await industry.getProperty('textContent');
//   const industryText = await text.jsonValue();
//   console.log({industryText});

// sendToDatabase(nameText, priceText, industryText, metricsTitleText, metricsValueText);

// await browser.close();
// }




// scrapeProduct("https://www.wsj.com/market-data/quotes/BMO/financials", "https://www.wsj.com/market-data/quotes/BMO/company-people");




//for Price/Book ratio companies (Banking)
async function scrapeProduct(url_name_price_metrics, url_industry){
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
  console.log({priceText});
  console.log({metricsTitleText});
  console.log({metricsValueText});
  
  
sendToDatabase(nameText, priceText, industryText, metricsTitleText, metricsValueText);

await browser.close();
}




scrapeProduct("https://www.wsj.com/market-data/quotes/CHDRY/financials", "https://www.wsj.com/market-data/quotes/CHDRY/company-people");