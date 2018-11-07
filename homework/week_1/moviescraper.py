#!/usr/bin/env python
# Name: Bente de Bruin
# Student number: 11017503
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'

package = []
def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    # finds the necessary information of the top 50 films and stores it in different lists
    # eventually we'll have a package which consists of 50 lists: one list for every film
    searches = dom.find_all("div", {"class": "lister-item-content"})
    for search in searches:
        title = search.h3.a.text
        rating = search.div.div.strong.text
        year_of_release = search.find("span", {"class": "lister-item-year"}).text
        if (len(year_of_release) > 6):
                year_of_release = year_of_release.strip('()')
                y2 = year_of_release.split(' ')
                year_of_release = y2[1].strip("()")
        year_of_release = year_of_release.strip('()')
        actors = search.select('a[href*=adv_li_st]')
        runtime = search.find("span", {"class": "runtime"}).text
        runtime = runtime.strip('min')
        actors_list = []
        movie_list = []
        for actor in actors:
            actor = actor.text
            actors_list.append(actor)

        actors_list = ', '.join(actors_list)
        movie_list.append(title)
        movie_list.append(rating)
        movie_list.append(year_of_release)
        movie_list.append(actors_list)
        movie_list.append(runtime)
        package.append(movie_list)

    return package

# write every single film to a different row in a csv file
def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])
    for film in package:
        writer.writerow(film)

def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)
