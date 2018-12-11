import pandas as pd
import csv
import json

INPUT_CSV = "doctordata.csv"


def organize_data():
    countries = []
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
    data_frame = data_frame[['LOCATION', 'INDICATOR', 'TIME', 'Value']]
    data_frame = data_frame[(data_frame['TIME']==2015)]
    for country in data_frame['LOCATION']:
            countries.append(country)
    data_frame = data_frame.loc[data_frame['LOCATION'].isin(countries)]
    data_frame = data_frame.reset_index(drop=True)
    # data_frame = data_frame.round(2)
    # data_frame = data_frame.set_index('LOCATION')
    return data_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)
    organized.to_json('doctor.json', orient='index')
