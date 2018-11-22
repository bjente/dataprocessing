import pandas as pd
import csv
import json
from convertCSV2JSON import toJSON

INPUT_CSV = "MoMAExhibitions1929to1989.csv"

def organize_data():
    data_frame = pd.read_csv("MoMAExhibitions1929to1989.csv", encoding='utf-8')
    data_frame = data_frame[['ExhibitionTitle', 'ExhibitionBeginDate', 'ExhibitionURL', 'DisplayName', 'Nationality', 'Gender']]
    # data_frame = data_frame.drop_duplicates(subset=['ExhibitionTitle'])
    # data_frame = data_frame.set_index('ExhibitionTitle')
    data_frame = data_frame.dropna()
    data_frame.ExhibitionBeginDate = data_frame.ExhibitionBeginDate.str.split('\/')
    for date in data_frame.ExhibitionBeginDate:
        date.remove(date[0])
        date.remove(date[0])

    dict = {str(key): [] for key in range(1929, 1990)}
    for i, r in data_frame.iterrows():
        dict[r["ExhibitionBeginDate"][0]].append(r["Gender"])
    gen_dict = {}
    for i, x in enumerate(dict):
        counter_total = 0
        males = 0
        females = 0
        for count in dict[x]:
            if count == "Male":
                males += 1
            else:
                females += 1
            counter_total += 1
        gen_dict[x] = {}
        gen_dict[x]["Male"] = round((males/counter_total), 1)
        gen_dict[x]["Female"] = round((females/counter_total), 1)
    dict_frame = pd.DataFrame.from_dict(gen_dict)
    return dict_frame

organized = organize_data()

def toCSV(organized):
    CSVoutfile = organized.to_csv('cleanedCSV.csv')

if __name__ == '__main__':
    organize_data()
    toCSV(organized)
    # toJSON("cleanedCSV.csv")
    organized.to_json('outfile.json', orient='index')
