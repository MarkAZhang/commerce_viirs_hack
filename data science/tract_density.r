length(unique(zipcode$ZCTA5))
length(unique(zipcode$TRACT))

####### data input
zipcode_FILE <- "/Volumes/FLASHMEM/BayesHack2016/zipcode.txt"
#zip code tabulation area relationship file
#https://www.census.gov/geo/maps-data/data/relationship.html
#########

tracts <- zipcode %>% group_by(TRACT) %>% 
  select(TRACT, TRPOP, TRAREALAND) %>%
  summarize(pop = mean(TRPOP), land = mean(TRAREALAND))

tracts <- zipcode %>% group_by(TRACT) %>% 
  summarize(pop = sum(ZPOP), area = sum(ZAREALAND)) %>%
  select(TRACT, pop, area) %>%
  mutate(density = pop / area)

#output the population desnsity of a tract
tract_to_density <- function(index, tract_data = tracts) {
  return(tract_data$density[tract_data$TRACT == index])
}

tract_to_density(100) == tracts[1, 4]

