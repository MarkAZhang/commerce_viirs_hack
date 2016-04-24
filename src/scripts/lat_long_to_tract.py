import csv
import numpy as np
import matplotlib.path as path
import json
import time

'''Translates building permit lat/long coords to tract_ids'''

TRACT_INPUT_FILE = 'data/chi_2010.geojson'
PERMITS_INPUT_FILE = 'data/chicago.csv'
OUTPUT_FILE = 'data/chicago_output.csv'

coords = []
tracts = []
rows = 1
start_time = time.time()


def is_number(val):
    '''Checks whether value is a number'''
    try:
        float(val)
        return True
    except ValueError:
        return False


def get_tract_id(coord):
    '''Get tract_id that the coord belongs in'''
    if is_number(coord['lat']) and is_number(coord['long']):
        for tract in tracts:
            if tract['path'].contains_point((coord['lat'], coord['long'])):
                return tract['geoid']
    return 'NA'


def main():
    # Extract building permit coords from CSV
    with open(PERMITS_INPUT_FILE) as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        for i, row in enumerate(reader):
            if i > 0:
                coords.append({
                    'lat': row[1],
                    'long': row[2],
                    'cost': row[3],
                    'date': row[4],
                })

    # Extract tract polygon paths from CSV
    tract_data = json.load(open(TRACT_INPUT_FILE))
    for feature in tract_data['features']:
        # Reverse [long, lat]
        tract_polygon = map(lambda row: row[::-1], feature['geometry']['coordinates'][0][0])

        tracts.append({
            'path': path.Path(np.array(tract_polygon)),
            'id': feature['properties']['tractce10'],
            'geoid': feature['properties']['geoid10']
        })

    print 'Processing', len(coords), 'building permits and', len(tracts), 'tracts'

    # Compute tract-ids and write to CSV
    with open(OUTPUT_FILE, 'wb') as csvfile:
        writer = csv.writer(csvfile, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(['', 'GEOID', 'cost', 'date'])
        for i, coord in enumerate(coords):
            tract_id = get_tract_id(coord)
            writer.writerow([(i + 1), tract_id, coord['cost'], coord['date']])

            # Display progress
            if i % 1000 == 0:
                print 'progress: {:.2%} in {:.2} seconds'.format(float(i) / len(coords),
                    time.time() - start_time)

    print 'Process complete'

main()
