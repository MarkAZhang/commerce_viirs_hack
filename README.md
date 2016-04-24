BayesHack 2016 #commerce-viirs
======================

## Using Satellite Imagery to Estimate Construction Activity
The [in]accesibility of data can be a major obstacle to urban study, and
metrics that are useful for understanding the effects of policy and urban
planning can often be unavailable in specific cities. However, there are some
measurements, such as satellite images, that can be centrally collected; if
they could be used to effectively predict the metrics of interest, they could
help solve this missing data problem.

In this project, we attempt to use the Department of Commerce's
satellite-collected images of nighttime light levels across the United States
of America to estimate the number of new construction permits as a
proof-of-concept study of how missing data points like these can be filled in
using alternative data sources. We conduct this study on the cities of New York
City and Chicago.

### Data Sources
The following datasets were used in this project:
* VIIRS Day Night Band (monthly images)
* Chicago & New York City building permit data
* Census 2010 population density figures

The data sources were matched up with one another along census tracts; this
required some pre-processing:
* the mean light-intensity was computed across each census tract from the VIIRS Day Night Band images
* building permit data was filtered to include only demolition and new construction, was mapped to census tracts, then aggregated across month

### Libraries & Languages
This project uses Python, R, and Javascript.

Python was used to process shapefiles and compute the intensities across each census tract
* Rasterio (processing the intensity images)
* Fiona (working with shapefiles)
* Shapely (working with shapefiles)
* Folium (generating maps embedded in HTML using OpenStreetMap and Leaflet)

R was used for modeling; no special libraries were used in this project.

The frontend was built using React & NodeJS, and used a library called Leaflet
to help with data visualization.

### Modelling
We used a Poisson linear regression model with a log-link to estimate counts of
building permits per month in a census tract given the light intensity and 
population density of that tract.

### Results
The results of our analysis are displayed in a webapp (only locally-hosted
for now) that allows side-by-side comparison of the covariates, response
variables, and predictions.

![alt text](https://github.com/tliu30/commerce_viirs_hack/)

A quick side-by-side examination of light intensity and building permit counts
reveals that in neither Chicago nor New York City is there a strong correlation
between the two; comparing the predictions of our model with the actual counts
also bears this out. In fact, examining the coefficients of the model fit shows
that the coefficient for change in light intensity is almost zero in both
cities, implying that the model effectively ignores light intensity when it
makes its estimates.

Something interesting that our analysis reveals is the differing relationships
between light intensity, population density, and construction in New York City
and Chicago.  For example, in New York City, population density and permit
counts are inversely correlated, with much of the activity concentrated in in
areas like Staten Island instead of Manhattan; Chicago, on the other hand,
displays a much stronger relationship between the two.

### What We Got Out of It
For our team, this was an amazing opportunity to learn about the different
types of data available and how to link these to geographical locations;
it was also really informative to spend time working with shapefiles and
visualizing spatial data. We hope to take this knowledge going forward as we
continue to explore the intersections of data science and the social good.

A big thank you to BayesImpact and all the sponsors of BayesHack 2016!

### Members
Chris Stock

Stephen Bates

Mark Zhang

Anthony Liu
