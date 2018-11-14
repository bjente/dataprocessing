# Name: Bente de Bruin
# Student number: 11017503
# Assignment: EDA, dataprocessing


import pandas as pd
import csv
import matplotlib.pyplot as plt
import numpy as np
import json

# In this function we preprocess the data: strip things we don't need, change the column names, drop the rows with NaN in it.
def organize_data():
    data = pd.read_csv("input.csv")
    data = data[['Country', 'Region', 'Pop. Density (per sq. mi.)', 'Infant mortality (per 1000 births)', 'GDP ($ per capita) dollars']]
    data.columns = ['Country', 'Region', 'Population_Density', 'Infant_Mortality', 'GDP']
    data = data.dropna()
    data = data[data.Country != 'unknown']
    data = data[data.Region != 'unknown']
    data = data[data.Population_Density != 'unknown']
    data = data[data.Infant_Mortality != 'unknown']
    data = data[data.GDP != 'unknown']
    data_frame = pd.DataFrame(data)
    data_frame.Region = data_frame.Region.apply(lambda x: x.strip(' '))
    data_frame.GDP = data_frame.GDP.apply(lambda x: x.strip('dollars'))
    data_frame.GDP = data_frame.GDP.apply(int)
    data_frame = data_frame[np.abs(data_frame.GDP-data_frame.GDP.mean()) <= (3*data_frame.GDP.std())]
    return data_frame

# In this function we calculate the mean, mode, median and std for the GDP column
def get_information(data_frame):
    mean = round(data_frame.GDP.mean())
    print(f"Mean of GDP: {mean}")
    mode = data_frame.GDP.mode()
    print(f"Mode of GDP: {mode[0]}")
    median = data_frame.GDP.median()
    print(f"Median of GDP: {median}")
    std = round(data_frame.GDP.std())
    print(f"Standard deviation of GDP: {std}")

# In this function we gather information to create a boxplot of the Infant Mortality column
def get_information_boxplot(data_frame):
    data_frame['Infant_Mortality'] = data_frame['Infant_Mortality'].str.replace(',','.')
    data_frame.Infant_Mortality = data_frame.Infant_Mortality.apply(float)
    minimum = data_frame.Infant_Mortality.min()
    print(f"Minimum of infant mortality: {minimum}")
    q1 = round(np.percentile(data_frame.Infant_Mortality, 25), 2)
    print(f"First quartile of infant mortality: {q1}")
    median = round(np.percentile(data_frame.Infant_Mortality, 50), 2)
    print(f"Median of infant mortality: {median}")
    q3 = round(np.percentile(data_frame.Infant_Mortality, 75), 2)
    print(f"Third quartile of infant mortality: {q3}")
    maximum = data_frame.Infant_Mortality.max()
    print(f"Maximum of infant mortality: {maximum}")

# In this function we plot the boxplot
def boxplot(data_frame):
    plt.figure(figsize=(10,8))
    bp1 = plt.boxplot(data_frame['Infant_Mortality'], positions=[1], notch=True, patch_artist=True)
    plt.ylabel('Number of indivduals')
    plt.title('Infant mortality per 1000 births')
    plt.show()

# In this function we plot a histogram for the GDP in $
def plot(data_frame):
    data_frame.hist(column='GDP', bins=50, grid=False, figsize=(10,8), color='#86bf91', zorder=2, rwidth=0.9)
    plt.ylabel('Frequency', color='black')
    plt.xlabel('GDP in $ (per capita)', color='black')
    plt.title('Distribution of GDP', color='black')
    plt.show()

# In this function we create a JSON file named outfile
def toJSON(data_frame):
    outfile = data_frame.set_index('Country').to_json('outfile.json', orient='index')

if __name__ == "__main__":
    data_frame = organize_data()
    get_information(data_frame)
    get_information_boxplot(data_frame)
    boxplot(data_frame)
    plot(data_frame)
    toJSON(data_frame)
