# commerce_viirs_hack

BayesHack 2016 - Using Satellite Imagery to Reconstruct New Construction Data
======================
A major challenge in our ability to study the cities and towns that we live in
is the accessibility of data. Metrics of city activity and vitality useful for
furthering our understanding of effective policy and urban planning are often
unavailable. However, there are some measurements that are easy to take
universally, and, with some statistical estimation, could provide a way to
reconstruct the desired metrics.

In this project, we attempt to use the Department of Commerce's
satellite-collected images of nighttime light levels across the United States
of America to estimate the number of new construction / demolition permits in
specific cities as a proof-of-concept study. We conduct this study on the
cities of New York City (all five boroughs) and Chicago.

Data Sources
====================
The following data were used in this project:
* VIIRS Day Night Band (monthly images)
* Chicago & New York City building permit data
* Census Figures for Population Density

The data sources were matched up with one another along census tracts; this
required some pre-processing:
* the mean light-intensity was computed across each census tract from the VIIRS Day Night Band images
* building permit data was mapped to census tracts, then aggregated across month

Libraries & Languages
=====================
This project uses Python, R, and Javascript.

Python's main value was for processing the shape files so that
all the data could be visualized:
* Rasterio (processing the intensity images)
* Fiona (working with shapefiles)
* Shapely (working with shapefiles)
* Folium (generating maps embedded in HTML using OpenStreetMap and Leaflet)

R was used for modeling; no special libraries were used in this project.

The frontend was built using React & Node; of particular interest is Leaflet
which makes generating maps with data visualization overlays very simple.

Modelling
===================
We used a poisson regression model with a log-link to estimate counts of
building permits per month given the light intensity.
Population density was included as a covariate to help normalize against
demographic factors.

Results
=======================
The results of our analysis are displayed in a webapp (only locally-hosted
unfortunately) that allows side-by-side comparison of the covariates, response
variables, and predictions.

Unfortunately, a quick side-by-side examination of light intensity and building
permit counts reveals that in neither Chicago nor New York City is there a
strong correlation between the two; comparing the predictions with the actuals
bares this out as well. In fact, examining the coefficients of the model fit
shows that the coefficient for change in light intensity is zero, implying that
the model effectively ignores light intensity when it makes its estimates.

It's interesting to note also the different relationships between light
intensity, population density, and construction in New York City vs Chicago.
For example, in New York City, population density and permit counts are
inversely correlated, with much of the activity concentrated in in areas like
Staten Island instead of Manhattan; Chicago, on the other hand, displays a much
stronger relationship between the two.

What We Got Out of It
=======================
For our team, this was an amazing opportunity to learn about the different types
data available and how to link these based on geographical location; it was also
really informative to spend time working with shapefiles and visualizing spatial
data. We hope to take this knowledge going forward as we continue to explore
the intersections of data science and the understanding & management of our society.

A big thank you to BayesImpact and all the sponsors of BayesHack 2016!

Members
=========================
Chris Stock
Stephen Bates
Mark Zhang
Anthony Liu
