#########################################################
# Some basic functions for working with the shapefiles:
#      1) going from shp to json
#      2) extracting subsets of the json files
#      3) generating folium maps
#########################################################

import json
import folium
import shapefile

######################
# (1) SHP to JSON 
######################

def to_json(shpfile):
    """
    Take a shapefile and make JSON object out of it!
    """
    reader = shapefile.Reader(shpfile)
    fields = reader.fields[1:]
    field_names = [field[0] for field in fields]

    buffer = []
    for sr in reader.shapeRecords():
        atr = dict(zip(field_names, sr.record))
        geom = sr.shape.__geo_interface__
        buffer.append(dict(type = "Feature", geometry = geom, properties = atr))

    j = json.loads(json.dumps({"type" : "FeatureCollection", "features" : buffer}, indent = 2))

    return j

##################################
# (2) Subsetting JSON files
##################################

def lim_filter(geojson, filter_fun):
    """
    Given a JSON object, create a new JSON object with only a subset of the polygons
    
    geojson - GEOJSON object
    filter_fun - a function (dict) -> (boolean)
    """
    new_f = filter(filter_fun, geojson['features'])
    new_j = json.loads(json.dumps({"type" : "FeatureCollection", "features" : new_f}, indent = 2))
    return new_j

def nyc_2010_filter(tract):
    """
    A filter that extracts only polygons corresponding to tracts in the five counties
    """
    return tract['properties']['COUNTY'] in ('005', '047', '061', '081', '085')

def chi_filter(tract):
    """
    DO NOT USE - just use the geojson file in the folder...
    """
    chi_tracts = open('chi_tracts.csv').read().strip().split("\n")
    return tract['properties']['TRACTCE'] in chi_tracts

######################################
# (3) Generating folium maps
######################################

def get_tracts(in_json, key):
    """
    Given a GEOJSON object, pull out all the tract names

    in_json - GEOJSON object
    key - the property name corresponding to the tract
    """
    return map(lambda x : x['properties'][key] , in_json['features'])

def mk_map(in_json, out_map_name):
    """
    Given a GEOJSON object, generate an HTML file with a simple folium map
    """
    mapfile = folium.Map()
    mapfile.choropleth(geo_str = json.dumps(in_json))
    mapfile.save(out_map_name)

def mk_map_w_data(in_json, in_data, json_key, out_map_name):
    """
    Given a GEOJSON object, generate an HTML file with a simple folium map,
    with coloration given the data

    in_json - GEOJSON object
    in_data - dataframe with two columns (geo_key, data)
    json_key - property of GEOJSON object corresponding to geo_key, 
               e.g., feature.properties.TRACT
    out_map_name - the HTML file out name
    """
    mapfile = folium.Map()
    mapfile.choropleth(geo_str = json.dumps(in_json), data = in_data, 
            columns = in_data.columns, key_on = json_key, fill_color = 'YlGn',
            fill_opacity = 0.7, line_opacity = 0.2, legend_name = 'Randomized')
    mapfile.save(out_map_name)
