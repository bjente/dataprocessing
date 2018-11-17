import csv
import json
import pandas as pd

INPUT_CSV = "MoMAExhibitions1929to1989.csv"

def toJSON(INPUT_CSV):
    read_data = pd.read_csv("MoMAExhibitions1929to1989.csv")
    # outfile = read_data.set_index('ExhibitionID').to_json('outfile.json', orient='index')
    outfile = read_data.to_json('outfile.json', orient='index')

if __name__ == '__main__':
    toJSON(INPUT_CSV)
