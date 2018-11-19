import csv
import json
import pandas as pd


def toJSON(INPUT_CSV):
    read_data = pd.read_csv(INPUT_CSV)
    outfile = read_data.to_json('outfile.json', orient='index')
