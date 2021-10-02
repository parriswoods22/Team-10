import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import datetime as dt


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///smoking.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
smoking_data = Base.classes.smoking_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# list of precipitations
@app.route("/api/v1.0/country")
def country():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query date and precipitation from all rows 
    results = session.query(smoking_data.index_, smoking_data.year, smoking_data.location, smoking_data.cigarettesmokingprevalence, 
    smoking_data.tobaccosmokingprevalence,smoking_data.tobaccouseprevalence,smoking_data.mostsoldbrandcigarettecurrency,
    smoking_data.mostsoldbrandcigaretteprice, smoking_data.rates, smoking_data.mostsoldusd).all()

    session.close()

    # Convert list of tuples into normal list
    all_measure = []
    years = []
    countries = []

    for index,year,Location,CigaretteSmokingPrevalence,TobaccoSmokingPrevalence,TobaccoUsePrevalence,MostSoldBrandCigaretteCurrency,MostSoldBrandCigarettePrice,rates,MostSoldUSD in results:
        if year not in years:
            years.append(year)
        if Location not in countries:
            countries.append(Location)



    for country in countries:
        measure_dict ={"Country": country, "Years":[]}
        for index,year,Location,CigaretteSmokingPrevalence,TobaccoSmokingPrevalence,TobaccoUsePrevalence,MostSoldBrandCigaretteCurrency,MostSoldBrandCigarettePrice,rates,MostSoldUSD in results:
                if country == Location:
                    measure_dict["Years"].append({
                        "Year":year,
                        'CigaretteSmokingPrevalence': CigaretteSmokingPrevalence,
                        'TobaccoSmokingPrevalence' : CigaretteSmokingPrevalence,
                        'TobaccoUsePrevalence': TobaccoUsePrevalence,
                    })
        all_measure.append(measure_dict)
    return jsonify(all_measure)

if __name__ == '__main__':
    app.run(debug=True)