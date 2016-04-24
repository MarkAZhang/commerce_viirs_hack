library(dplyr)
library(magrittr)

#######
# Input and output files 
#######
zipcode_FILE <- "/Volumes/FLASHMEM/BayesHack2016/zipcode.txt"
#zip code tabulation area relationship file
#https://www.census.gov/geo/maps-data/data/relationship.html

DOB_Permit_Issuance_FILE <- "/Volumes/FLASHMEM/BayesHack2016/DOB_Permit_Issuance.csv"
#https://data.cityofnewyork.us/Housing-Development/DOB-Permit-Issuance/ipu4-2q9a

#whereever you want the file to go
output_FILE <- "/Volumes/FLASHMEM/BayesHack2016/nyc.csv"


################


DOB_Permit_Issuance <- read.csv(DOB_Permit_Issuance_FILE, stringsAsFactors=FALSE)
nyc <- DOB_Permit_Issuance
nyc$Job.Type <- factor(nyc$Job.Type)

#convert dates
nyc$date <- as.Date(nyc$Job.Start.Date, format = "%m/%d/%Y")
summary(nyc$date)

#sanity check
nyc$DOBRunDate[1]
as.Date(nyc$DOBRunDate[1], format = "%m/%d/%Y")

summary(nyc$Job.Type)

#filter new buildings and demolishions
nyc2 <- nyc %>% filter(Job.Type == "NB" | Job.Type == "DM")
nrow(nyc2)
summary(nyc2$Job.Type)

nyc2$Permit.Status <- factor(nyc2$Permit.Status)
summary(nyc2$Permit.Status)

nyc2$Permit.Type <- factor(nyc2$Permit.Type)
summary(nyc2$Permit.Type)

nyc2$Permit.Subtype <- factor(nyc2$Permit.Subtype)
summary(nyc2$Permit.Subtype)

# import zip code to census tract
zipcode <- read.csv(zipcode_FILE)
summary(zipcode$TRACT)

output <- nyc2 %>% select(Zip.Code, date) %>%
  left_join(zipcode, by = c("Zip.Code" = "ZCTA5")) %>% 
  select(GEOID, date) 
head(output)

write.csv(output, output_FILE)
