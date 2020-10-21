# Currencies converter test app
## 0. List of contents
<a href="#1-description">1. Description</a><br />
<a href="#2-installation">2. Installation</a><br />
<a href="#3-usage">3. Usage</a><br />
## <span id="1-description">1. Description</span>

We need to build a small web based currency converter that can answer the questions:
###
What is 200 GBP converted into multiple other currencies like USD, EUR and SGD? How much has currency changed in valuation between March 26th, 2015 and June 13th, 2016?
###
To answer this questions you can use exchangeratesapi.io ( or other free currency API e.g. fixer.io ) to get your currencies data.
###
We would also like to see the web app persist state on page reload.

## <span id="2-installation">2. Installation</span>
1. Clone repository
2. Install dependencies `npm i`
3. Start the app `npm start`
## <span id="3-usage">3. Usage</span>
1. Choose currency and money amount to convert in top left block
2. Choose currencies to show converted in top right block
3. To see history of currencies for period, choose dates in the bottom block
