DROP TABLE Smoking_Data;

CREATE TABLE Smoking_Data(
index INTEGER,
year INTEGER,
Location VARCHAR(45),
CigaretteSmokingPrevalence FLOAT,
TobaccoSmokingPrevalence FLOAT,
TobaccoUsePrevalence FLOAT,
MostSoldBrandCigaretteCurrency VARCHAR(5),
MostSoldBrandCigarettePrice FLOAT,
rates FLOAT,
MostSoldUSD FLOAT,
PRIMARY KEY(index))