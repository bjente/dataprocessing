import pandas as pd
import csv
import json


INPUT_CSV = "obesitas.csv"


def organize_data():
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
    data_frame = data_frame[['LOCATION', 'INDICATOR', 'SUBJECT', 'TIME', 'Value']]
    data_frame = data_frame.dropna()
    data_frame = data_frame[(data_frame['TIME'] == 2014)]
    data_frame = data_frame[(data_frame['SUBJECT'] == 'SELFREPORTED')]
    data_frame = data_frame.set_index('LOCATION')
    return data_frame



if __name__ == '__main__':
    organized = organize_data()
    organized.to_json('obesitas.json', orient='index')
