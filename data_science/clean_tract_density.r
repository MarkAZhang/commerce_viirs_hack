length(unique(zipcode$ZCTA5))
length(unique(zipcode$TRACT))

####### data input
zipcode_FILE <- "/Volumes/FLASHMEM/BayesHack2016/zipcode.txt"
#zip code tabulation area relationship file
#https://www.census.gov/geo/maps-data/data/relationship.html
#########

geoids <- zipcode %>% group_by(GEOID) %>% 
  summarize(pop = mean(TRPOP), area = mean(TRAREALAND)) %>%
  select(GEOID, pop, area) %>%
  mutate(density = pop / area)

#output the population desnsity of a geo_id
geoid_to_density <- function(index, geoids_data = geoids) {
  return(geoids_data$density[geoids_data$GEOID == index])
}

head(geoids)
geoid_to_density(1001020100)

#### TONY:
# you can join the 'geoids' file to your file to get the 
# population density at each id
# e.g:  left_join(YOURFILE, geoids, by = c("colname" = "GEOID"))