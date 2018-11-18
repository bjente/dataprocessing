import pandas as pd
import csv
import json

INPUT_CSV = "MoMAExhibitions1929to1989.csv"

def organize_data():
    read_data = pd.read_csv("MoMAExhibitions1929to1989.csv")
    data_frame = pd.DataFrame(read_data)
    data_frame = data_frame[['ExhibitionTitle', 'ExhibitionBeginDate', 'ExhibitionURL', 'DisplayName', 'Nationality', 'Gender']]
    data_frame = data_frame.drop_duplicates(subset=['ExhibitionTitle'])
    data_frame = data_frame.set_index('ExhibitionTitle')
    data_frame = data_frame.dropna()
    # data_frame = data_frame[data_frame.ExhibitionTitle != 'no data']
    data_frame = data_frame[data_frame.ExhibitionBeginDate != 'no data']
    data_frame = data_frame[data_frame.ExhibitionURL != 'no data']
    data_frame = data_frame[data_frame.DisplayName != 'no data']
    data_frame = data_frame[data_frame.Nationality != 'no data']
    data_frame = data_frame[data_frame.Gender != 'no data']
    # print(data_frame)
    return data_frame

def toCSV(data_frame):
    CSVoutfile = data_frame.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    data_frame = organize_data()
    toCSV(data_frame)
