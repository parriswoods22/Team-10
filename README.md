### Worldwide Cigarette and Tobacco Smoking Prevalence Across 2008-2018

Smoking and tobacco use has been known to lead to many serious health concerns for years. With this information, one would think the prevalence of smoking and tobacco use would decrease around the world. But does it? Is smoking and tobacco viewed the same way in each country?
<br> <br>
This is what we seek to answer in this project. Using datasets from 2008, 2010, 2012, 2014, 2016, and 2018, we sought to see how the prevalence of cigarettes and the price of cigarettes compared across the globe (using the latest data) and how each country compared to themselves across year.
<br> <br>
Using Python Pandas for cleaning, exchange rate API for exchange rate retrieval, Google Maps API for coordinates retrieval, we were able to create a file that could be loaded into a SQL table using pgAdmin and Postgres. Using Flask, we were able to create a json API to call in a javascript file using d3. 
<br> <br>
Our final site first creates a map, made with Leaflet, with our datapoints. The markers for each country is sized by the price of cigarettes (in USD) and colored by the selected prevalence. The data has three prevalences: Cigarette Smoking Prevalence, Tobacco Use Prevalence, and Tobacco Smoking Prevalence. The user can select which prevalence they would like to see displayed. Upon clicking any country, a pop-up will populate informing the user of the country they have selected, the price of cigarettes in that country’s currency, the price of cigarettes in USD, and the prevalence they selected. 
<br> <br>
After the map, the user will be presented with a dropdown and upon choosing a country, an information box will populate for the country’s latest data: the three prevalences, the price in that country’s currency, and the price in USD. A Plotly made line graph will appear under the info box that shows cigarette smoking prevalence and tobacco use prevalence across time for that country. Next, a Plotly made bar graph will populate showing the price of cigarettes over time for that country. 
<br> <br>
Source to data: https://www.kaggle.com/ozgurdogan646/who-tobacco-and-smoking-data-20082018
Exchange rate API: https://exchangerate.host/#/
Google Map API: https://developers.google.com/maps
