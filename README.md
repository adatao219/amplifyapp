# Investing made simple.

## Intro.
We created a tool to help budding investors with little-to-no financial background learn the fundamentals of investing. We used web scraping to extract important metrics from industry-standard web pages, stored the extracted data into a NoSQL database for a caching-like behaviour, and designed an intuitive and interactive web page to compare stocks within the same industry.

## Technologies.
- Front-end: React.js, HTML, CSS, Google fonts, Netlify (deployment)
- Back-end: Node.js, MongoDB
- Web-scraping: Node.js, Puppeteer

## Key features.
- Web scraper that scraps financial data from the reputable Wall Street Journal Markets site in real-time 
- NoSQL database (MongoDB) which stores data retrieved/updated in the past three hours for a caching-like behaviour which improves app performance 
- Algorithm within the web scraper to scrap for different key metrics depending on the industry of the stock
- Interactive and easy-to-use frontend interface that allows users to add and remove stocks of interest
- Algorithm in the frontend to sort displayed stocks by industry for easy comparison by user 
- Dynamic frontend interface that supports viewing on computer and phone screen sizes 
- Frontend implementation of user login 

## How to run the code locally.
After git cloning this repository, complete the following steps:

Front-end (locally run)
1. Access the front-end folder in a new terminal window
2. Download all dependencies with "npm install"
3. Run the application with "npm start"
4. A localhost page would appear on your default browser

Alternatively, you can access the front-end hosted on Netlify here: https://stock-win-hackathon.netlify.app/

Back-end
1. Access the back-end folder in a new, separate terminal window
2. Download all dependencies with "npm install"
3. Run the application with "node server.js"
4. If successful, the message "Connected to MongoDB" would appear

Web-scraper to add stocks 
1. Access the back-end folder, server.js file on a code editor (i.e. VS Code)
2. Comment out the "//scrapeProduct()" function and include a ticker into the input field 
3. Run the application with "node server.js" in a new, separate terminal window 

## How to use.
- Enter login details. For example: Login (User1); Password (User123)
- Pick a stock from the dropdown menu at end of the page
- Pick a second stock that is within the same industry as the first stock
- Understand the key metrics that are being used by professional investors for the industry and compare between stocks
- Pick additional stocks as desired, or remove stocks as required
