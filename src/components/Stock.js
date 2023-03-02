

function Stock({stock, userPickedStocks, idx, updateUserPickedStocks, 
  displayedIndustries, updateDisplayedIndustries}) {

  function deleteStock(e){
    userPickedStocks.splice(idx, 1);
    updateUserPickedStocks(userPickedStocks =>[...userPickedStocks]);
    var copyOfDisplayedIndustries = displayedIndustries;
    var curIndustry = stock.industry;
    var industryArray = copyOfDisplayedIndustries[curIndustry];
    for (let i = 0; i < industryArray.length; i++){
      if (industryArray[i].name === stock.name){
        industryArray.splice(i, 1);

        break;
      }
    }

    updateDisplayedIndustries(copyOfDisplayedIndustries);
    console.log(userPickedStocks);
    console.log(displayedIndustries);
  }

    return (
      <div className="stockMain">
{/*   
        <div className = "stockTitle">Stock Name</div> */}
        <div className = "stockName">{stock.name}</div>

        <div className = "stockTitle">Current stock price</div>
        <div className = "stockContent">USD{stock.curPrice}</div>

        <div className = "stockTitle">Industry</div>
        <div className = "stockContent">{stock.industry}</div>

        <div className = "stockTitle">Key metrics</div>
        <div className = "stockMetrics">{stock.metricsTitle}: {stock.metricsValue}</div>
        
        <button className="deleteStock" onClick={deleteStock}>Remove</button>

      </div>
    );
  }
  
  export default Stock;