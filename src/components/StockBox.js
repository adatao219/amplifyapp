import Stock from './Stock.js'

function StockBox({userPickedStocks, updateUserPickedStocks, 
  displayedIndustries, updateDisplayedIndustries, industry}) {

    // console.log(industry);
    // stocks.map((stock, idx) => console.log(stock));

    var stocks = displayedIndustries[industry];

    return (
      
        <div className = "stockBoxMain"> 
        <div className = "stockBoxTitle">{industry}</div>

        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {/* {userPickedStocks ? Object.entries(displayedIndustries).forEach(([stock, idx]) => 
        <Stock stock = {stock} userPickedStocks = {userPickedStocks} 
        updateUserPickedStocks = {updateUserPickedStocks} displayedIndustries = {displayedIndustries}
        updateDisplayedIndustries = {updateDisplayedIndustries}
        idx = {idx}/>)  : ""} */}
       

        {userPickedStocks ? stocks.map((stock, idx) => 
        <Stock stock = {stock} userPickedStocks = {userPickedStocks} 
        updateUserPickedStocks = {updateUserPickedStocks} displayedIndustries = {displayedIndustries}
        updateDisplayedIndustries = {updateDisplayedIndustries}
        idx = {idx}/>)  : ""}
       </div>
       
       
       </div>

    );
  }
  
  export default StockBox;