import pandas as pd
import csv
import json

INPUT_CSV = "dataweek4.csv"

def organize_data():
    data_frame = pd.read_csv("dataweek4.csv", encoding='utf-8')
    data_frame = data_frame[['LOCATION', 'Value']]
    data_frame = data_frame.set_index('LOCATION')
    return data_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)
    organized.to_json('outfile.json', orient='index')
