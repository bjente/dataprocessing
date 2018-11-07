#!/usr/bin/env python
# Name: Bente de Bruin
# Student number: 11017503
"""
This script visualizes data obtained from a .csv file
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Dictionary to store the years with their average ratings
av_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

with open ('movies.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        year = row['Year']
        data_dict[year].append(float(row['Rating']))
        average = round(sum(data_dict[year]) / len(data_dict[year]), 1)
        av_dict[year] = average

# designing the visualization
plt.style.use('dark_background')
y = data_dict.values()
x = data_dict.keys()
for xe, ye in zip(x, y):
    if (xe != "2017"):
        plt.scatter([xe] * len(ye), ye, marker='^', color='white')
    else:
        plt.scatter([xe] * len(ye), ye, marker='^', color='white', label='all ratings')
plt.plot(av_dict.keys(), av_dict.values(), linestyle='-', marker = 'o', color='r', linewidth=1.0, label= 'average ratings')
plt.ylabel('rating', color='red')
plt.xlabel('year of release', color='red')
plt.legend()

if __name__ == "__main__":
    plt.show()
