library(dplyr)
library(magrittr)

#######
# Input and output files 
#######

Building_Permits_FILE <- "/Volumes/FLASHMEM/BayesHack2016/Building_Permits.csv"
#https://data.cityofchicago.org/Buildings/Building-Permits/ydr8-5enu

#where you want the file to go
output_FILE <- "/Volumes/FLASHMEM/BayesHack2016/chicago.csv"

###########


Building_Permits <- read.csv(Building_Permits_FILE)

chicago <- Building_Permits

summary(chicago$PERMIT_TYPE)

chicago2 <- chicago %>% filter(PERMIT_TYPE == "PERMIT - NEW CONSTRUCTION" |
                                 PERMIT_TYPE == "PERMIT - WRECKING/DEMOLITION")
summary(chicago2$PERMIT_TYPE)
summary(as.numeric(chicago$ESTIMATED_COST))

chicago2$cost <- as.numeric(sub('\\$','',chicago2$ESTIMATED_COST))

#impute the cost when missing
impute <- median(chicago2$cost)
summary(chicago2$cost)
chicago2$cost[chicago2$cost < 1000] <- impute

chicago2$date <- as.character(chicago2$ISSUE_DATE)
head(chicago2$date)
chicago2$date <- as.Date(chicago2$date, format = "%m/%d/%Y")
summary(chicago2$date)

output_chicago <- chicago2 %>% select(LATITUDE, LONGITUDE, cost, date)
summary(output_chicago$cost)

write.csv(output_chicago, file = output_FILE)