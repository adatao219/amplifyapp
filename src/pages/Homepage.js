

import StockBox from '../components/StockBox.js'
import AddStock from '../components/AddStock.js'
import React, { useState, useEffect } from 'react';

function Homepage() {

    // const startUserPickedStocks = [

    //     {name: 'Apple', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Microsoft', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Google', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
     
    // ]
   
     
    // const stocksDatabase = [
    //     {name: 'Apple', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Microsoft', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Google', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Amazon', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Netflix', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},
    //     {name: 'Meta', curPrice: 'USD1.00', industry: 'Technology', metrics: [['Sales growth', '50%']]},

    // ]
    
    const [userPickedStocks, updateUserPickedStocks] = useState([])
    const [stocksDatabase, updateStocksDatabase] = useState([])
    const [displayedIndustries, updateDisplayedIndustries] = useState({})
    const [industries, updateIndustries] = useState([])

 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {

     const response = await fetch(`http://localhost:5001/record/`);
     
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
    //  console.log(records);
     updateStocksDatabase(records);
    //  console.log(stocksDatabase);
   }
 
   getRecords();
  //  console.log(userPickedStocks);
   var copyIndustries = [];
   Object.entries(displayedIndustries).forEach(([industry, stocks]) => copyIndustries.push(industry));
   updateIndustries(copyIndustries);
   return;
 }, [userPickedStocks, displayedIndustries]);


 
    return (
    <div className="homepageMain">


    <AddStock userPickedStocks = {userPickedStocks} updateUserPickedStocks = {updateUserPickedStocks}
    stocksDatabase = {stocksDatabase} updateStocksDatabase = {updateStocksDatabase} 
    displayedIndustries = {displayedIndustries} 
    updateDisplayedIndustries = {updateDisplayedIndustries}/>


    <div className="stockHomepage">


    {industries.map((industry) => 
    <StockBox userPickedStocks = {userPickedStocks} updateUserPickedStocks = {updateUserPickedStocks}
    displayedIndustries = {displayedIndustries} updateDisplayedIndustries = {updateDisplayedIndustries} 
    industry = {industry}/> 
    )}

    {/* <StockBox userPickedStocks = {userPickedStocks} updateUserPickedStocks = {updateUserPickedStocks}
    displayedIndustries = {displayedIndustries} updateDisplayedIndustries = {updateDisplayedIndustries} /> */}


    </div>
       

    </div>
  );
}

export default Homepage;
