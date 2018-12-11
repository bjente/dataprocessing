import pandas as pd
import csv
import json

INPUT_CSV = "happiness.csv"

def organize_data():
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
    data_frame = data_frame.drop(columns=["Happiness.Rank", "Whisker.high", "Whisker.low", "Dystopia.Residual"])
    data_frame = data_frame.rename(index=str, columns={"Happiness.Score": "Score", "Economy..GDP.per.Capita": "Economy", "Health..Life.Expectancy.": "Health", "Trust..Government.Corruption.": "Trust"})
    data_frame = data_frame.dropna()
    data_frame = data_frame.set_index(['Country'])
    return data_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)
    organized.to_json('happiness.json', orient='index')
