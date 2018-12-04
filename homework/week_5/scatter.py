import pandas as pd
import csv
import json


# INPUT_CSV = "obesitas.csv"
# INPUT_CSV = "tabakdata.csv"
INPUT_CSV = "alcdata.csv"

countries = ["AUT", "CAN", "CZE", "FIN", "FRA", "GRC", "HUN", "ITA", "KOR", "LUX", "NLD", "POL", "PRT", "SVK", "ESP", "SWE", "TUR", "USA", "EST", "ISR", "SVN", "LVA"]

# def organize_data(filename):
#     data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
#     data_frame = data_frame[['LOCATION', 'INDICATOR', 'SUBJECT', 'TIME', 'Value']]
#     data_frame = data_frame.loc[data_frame['LOCATION'].isin(countries)]
#     data_frame = data_frame.dropna()
#     data_frame = data_frame[(data_frame['TIME'] == 2014)]
#     data_frame = data_frame[(data_frame['SUBJECT'] == 'SELFREPORTED')]
#     data_frame = data_frame.reset_index(drop=True)
#     return data_frame

def organize_data_2(filename):
    data_frame = pd.read_csv(INPUT_CSV, encoding='utf-8')
    data_frame = data_frame[['LOCATION', 'INDICATOR', 'SUBJECT', 'TIME', 'Value']]
    data_frame = data_frame.loc[data_frame['LOCATION'].isin(countries)]
    data_frame = data_frame.dropna()
    data_frame = data_frame[(data_frame['TIME'] == 2014)]
    data_frame = data_frame.reset_index(drop=True)
    return data_frame


if __name__ == '__main__':
    # df_obesitas = organize_data(INPUT_CSV)
    # df_obesitas.to_json("obesitas.json", orient='index')
    df_tabak = organize_data_2(INPUT_CSV)
    df_tabak.to_json("alcohol.json", orient='index')
    # df_alcohol = organize_data(INPUT_CSV_3)
    # df_alcohol.to_json("alcohol.json", orient='index')
