import pandas as pd
import csv
import json

INPUT_CSV = "happiness.csv"

def organize_data():
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
    data_frame = data_frame.drop(columns=["Whisker.high", "Whisker.low", "Dystopia.Residual"])
    data_frame = data_frame.dropna()
    data_frame = data_frame.reset_index(drop=True)
    return data_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)
    organized.to_json('happiness.json', orient='index')
