import './Intro.css';


function Intro() {
    return (
      <div className = "introMain">

<div> 
    <div>
    <h2>Welcome budding investor!</h2>
    </div>
                
          <div id="problem">
            <div id ="problem-text">
            <h1>
            Investing can be complex. 
            </h1>
            <h4>
            Financial sites are filled 
            with buckets of data and jargons. People with limited financial knowledge may find these sites overwhelming and difficult to use.
            </h4>
            </div>
            <img id = "first-dec" src ="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/07/31220039/Functions-of-Stock-Exchange.png" alt=""></img>
          </div>
          <a href="#highlight"><img id="down" src="https://cdn.iconscout.com/icon/free/png-256/keyboard-down-arrow-1780093-1518654.png" alt=""></img></a>
          <div id= "highlight">How We Can Help</div>
            <div id="benefit">
              <div>
                <img src ="https://media.istockphoto.com/id/1233956220/vector/a-young-male-manager-presenting-a-project-statistics-infographics-big-data-millennials-at.jpg?s=612x612&w=0&k=20&c=vMY67k9PeGcoSQfTRO5kSDHAbCsXc0RujYi8TSrfU0g=" alt=""></img>
                <h3>Teach you the basics of investing.</h3>
              </div>
              <div>
              <img src= "https://media.istockphoto.com/id/1041244364/vector/seo-reporting-data-monitoring-web-traffic-analytics-big-data-flat-vector-illustration-on.jpg?s=612x612&w=0&k=20&c=pznpyB1jMx1hD8N3KSZx0833lhk5aSdrPPlFqOIArhA="alt=""></img>
            <h3>Distill the key metrics of each industry for you. </h3>
            </div>
            <div>
            <img src = "https://media.istockphoto.com/id/1152082027/vector/financial-consultant-leaning-on-a-stack-of-coins-smiles-friendly-and-waves-with-hand.jpg?s=612x612&w=0&k=20&c=PECBvgHEdqg61ZaCu6aXaRZIgCmou0hGRG5HdKTuLvU="alt=""></img>
            <h3>Help you focus only on data that is important.</h3>
            </div>
            </div>

            <br></br>



            <div>
            <br></br>
            <div>
            <h3 id= "opinion">All else equal, the following stocks have higher upside potential</h3>
            <div className = "introThirdMain">
                <div>
                <h3 className='middleText'>
                lower price to book ratios
                </h3>
                </div>
                <div>
                <h3 className='middleText'>
                lower price to earnings ratios
               
                </h3>
                     </div>
                <div>
                <h3 className='middleText'>
                higher return to assets percentages
                
            </h3>
            </div>

            </div>

            <div>
            <h2 id="start">
                To start, pick a stock from the dropdown menu below. <br></br>See what some 
                of the key investing metrics are for a particular industry. 
            </h2>
            </div>
            </div>
            </div>
  
  
      </div>
      </div>
    );
  }
  
  export default Intro;