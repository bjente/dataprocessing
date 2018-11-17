import csv
import json
import pandas as pd

INPUT_CSV = "cleanedCSV.csv"

def toJSON(INPUT_CSV):
    read_data = pd.read_csv("cleanedCSV.csv")
    outfile = read_data.to_json('outfile.json', orient='index')

if __name__ == '__main__':
    toJSON(INPUT_CSV)
