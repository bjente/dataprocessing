import json
import csv

FILENAME = "KNMI_20181101.txt"
JSONFILE = "KNMI.json"

def read_it(filename):
    with open(filename) as f:
        read = csv.read(f)
