library(lubridate)

setwd("~/Documents/Projects/BayesHack/project/commerce_viirs_hack/data science/")

# Read in building data & zip data
chi_d <- read.csv('./input/chicago_output_geoid.csv')
nyc_d <- read.csv('./input/nyc.csv')
zip_d <- read.csv('./input/zipcode.txt')

# Read in light data
chi_l <- read.csv('./input/chi2010-activityByTract.csv')
nyc_l <- read.csv('./input/nyc2010-activityByTract.csv')

# Create "yyyy mm" keys
chi_d$month <- lubridate::month(chi_d$date)
nyc_d$month <- lubridate::month(nyc_d$date)
chi_l$month <- lubridate::month(chi_l$timestamp)
nyc_l$month <- lubridate::month(nyc_l$timestamp)

chi_d$year <- lubridate::year(chi_d$date)
nyc_d$year <- lubridate::year(nyc_d$date)
chi_l$year <- lubridate::year(chi_l$timestamp)
nyc_l$year <- lubridate::year(nyc_l$timestamp)

chi_d$my <- paste(chi_d$year, sprintf("%02d", chi_d$month))
nyc_d$my <- paste(nyc_d$year, sprintf("%02d", nyc_d$month))
chi_l$my <- paste(chi_l$year, sprintf("%02d", chi_l$month))
nyc_l$my <- paste(nyc_l$year, sprintf("%02d", nyc_l$month))

# Aggregate across (geo_id, yyyy_mm), counting building licenses per month
chi_a <- aggregate(cost ~ GEOID + my, data = chi_d, FUN = length)
nyc_a <- aggregate(month ~ GEOID + my, data = nyc_d, FUN = length)

# Reorganize the light and permit aggregate data
# i.e, extract the req'd columns, renaming them, and adjusting id's
nyc_l_spec <- data.frame(GEOID = nyc_l$X, MONTH = nyc_l$my, LIGHT = nyc_l$mean)
nyc_a_spec <- data.frame(GEOID = paste("1400000US", nyc_a$GEOID, sep = ""), MONTH = nyc_a$my, BUILD_COUNT = nyc_a$month)

chi_l_spec <- data.frame(GEOID = chi_l$X, MONTH = chi_l$my, LIGHT = chi_l$mean)
chi_a_spec <- data.frame(GEOID = chi_a$GEOID, MONTH = chi_a$my, BUILD_COUNT = chi_a$cost)

# Merge the light and building data
nyc_m <- merge(nyc_l_spec, nyc_a_spec, by = c("GEOID", "MONTH"), all.x = T); nyc_m$BUILD_COUNT[is.na(nyc_m$BUILD_COUNT)] <- 0
chi_m <- merge(chi_l_spec, chi_a_spec, by = c("GEOID", "MONTH"), all.x = T); chi_m$BUILD_COUNT[is.na(chi_m$BUILD_COUNT)] <- 0

# Merge the zip data with the light / building data
nyc_z <- unique(data.frame(GEOID = paste("1400000US", zip_d[zip_d$STATE == 36, "GEOID"], sep = ""), DENSITY = zip_d[zip_d$STATE == 36, "TRPOP"] / zip_d[zip_d$STATE == 36, "TRAREALAND"]))
nyc_m2 <- merge(nyc_m, nyc_z, by = c("GEOID"), all.x = T)

chi_z <- unique(data.frame(GEOID = zip_d[zip_d$STATE == 17, "GEOID"], DENSITY = zip_d[zip_d$STATE == 17, "TRPOP"] / zip_d[zip_d$STATE == 17, "TRAREALAND"]))
chi_m2 <- merge(chi_m, chi_z, by = c("GEOID"), all.x = T)

# Identify the months for which we have good light data
good_months <- c(
    '2014 02', '2014 03', '2014 04', '2014 08', '2014 09', '2014 10', '2014 11',
    '2014 12', '2015 01', '2015 02', '2015 03', '2015 04', '2015 08'
)

# Extract the good months & do some adjustments to remove nulls / correct column dtypes
chi_m3 <- chi_m2[chi_m2$MONTH %in% good_months,]; chi_m3$GEOID <- factor(chi_m3$GEOID)
nyc_m3 <- nyc_m2[nyc_m2$MONTH %in% good_months,]; nyc_m3$DENSITY[is.na(nyc_m3$DENSITY)] <- 0;

# Aggregate across GEOID to get mean light / building counts in each region
chi_m3_al <- aggregate(LIGHT ~ GEOID, data = chi_m3, FUN = mean)
chi_m3_ab <- aggregate(BUILD_COUNT ~ GEOID, data = chi_m3, FUN = mean)

nyc_m3_al <- aggregate(LIGHT ~ GEOID, data = nyc_m3, FUN = mean)
nyc_m3_ab <- aggregate(BUILD_COUNT ~ GEOID, data = nyc_m3, FUN = mean)

write.csv(chi_m3_al, "chi_light.csv", row.names = FALSE)
write.csv(chi_m3_ab, "chi_build.csv", row.names = FALSE)
write.csv(nyc_m3_al, "nyc_light.csv", row.names = FALSE)
write.csv(nyc_m3_ab, "nyc_build.csv", row.names = FALSE)

############# Naive model time! ##############
prev_month <- function(d) {
    cp <- data.frame(d)
    yr <- vapply(cp$MONTH, function(x) strsplit(as.character(x), " ")[[1]][1], '')
    m_min1 <- as.numeric(vapply(cp$MONTH, function(x) strsplit(as.character(x), " ")[[1]][2], '')) + 1
    cp$MONTH_MIN1 <- paste(yr, sprintf("%02d", m_min1))

    cp1 <- cp[,c("GEOID", "MONTH","LIGHT","BUILD_COUNT","DENSITY")]
    cp2 <- cp[,c("GEOID", "MONTH_MIN1","LIGHT","BUILD_COUNT","DENSITY")]

    names(cp2) = c("GEOID", "MONTH", "LIGHT_MIN1", "BUILD_COUNT_MIN1", "DENSITY")

    returnVal <- merge(cp1, cp2, by = c("GEOID", "MONTH", "DENSITY"), all.x = TRUE)
    returnVal$LIGHT_DELTA <- returnVal$LIGHT - returnVal$LIGHT_MIN1

    return(returnVal)
}

# Matchup up each row with the preceding month's data, compute delta's, etc
chi_m4 <- na.omit(prev_month(chi_m3)); chi_m4$LIGHT_PERC <- (chi_m4$LIGHT_DELTA / chi_m4$LIGHT_MIN1); chi_m4$DENSITY <- scale(chi_m4$DENSITY); chi_m4$LIGHT_SC <- scale(chi_m4$LIGHT)
nyc_m4 <- na.omit(prev_month(nyc_m3)); nyc_m4$LIGHT_PERC <- (nyc_m4$LIGHT_DELTA / nyc_m4$LIGHT_MIN1); nyc_m4$DENSITY <- scale(nyc_m4$DENSITY); nyc_m4$LIGHT_SC <- scale(nyc_m4$LIGHT)

# Train some simple models (delta as a percent & density) as well as (delta & density)
nyc_test  <- nyc_m4[nyc_m4$MONTH == '2015 04',]
nyc_train <- nyc_m4[nyc_m4$MONTH != '2015 04',]

chi_test  <- chi_m4[chi_m4$MONTH == '2015 04',]
chi_train <- chi_m4[chi_m4$MONTH != '2015 04',]

nyc_mdl <- glm(BUILD_COUNT ~ LIGHT_PERC + DENSITY, family = poisson,  data = nyc_train)
chi_mdl <- glm(BUILD_COUNT ~ LIGHT_PERC + DENSITY, family = poisson, data = chi_train)

nyc_test$PREDICT <- predict(nyc_mdl, nyc_test, type = 'response')
nyc_test$PREDICT_CROSS <- predict(chi_mdl, nyc_test, type = 'response')
chi_test$PREDICT <- predict(chi_mdl, chi_test, type = 'response')
chi_test$PREDICT_CROSS <- predict(nyc_mdl, chi_test, type = 'response')

nyc_mdl_2 <- glm(BUILD_COUNT ~ LIGHT_SC + DENSITY, family = poisson,  data = nyc_train)
chi_mdl_2 <- glm(BUILD_COUNT ~ LIGHT_SC + DENSITY, family = poisson, data = chi_train)

nyc_test$PREDICT_2 <- predict(nyc_mdl_2, nyc_test, type = 'response')
nyc_test$PREDICT_CROSS_2 <- predict(chi_mdl_2, nyc_test, type = 'response')
chi_test$PREDICT_2 <- predict(chi_mdl_2, chi_test, type = 'response')
chi_test$PREDICT_CROSS_2 <- predict(nyc_mdl_2, chi_test, type = 'response')

# Output in two-column format for the functions in 'test.py'
write.csv(nyc_test[,c('GEOID', 'DENSITY')], 'nyc_density.csv', row.names = FALSE)
write.csv(nyc_test[,c('GEOID', 'LIGHT')], 'nyc_light_apr.csv', row.names = FALSE)
write.csv(nyc_test[,c('GEOID', 'BUILD_COUNT')], 'nyc_build_apr.csv', row.names = FALSE)
write.csv(nyc_test[,c('GEOID', 'PREDICT')], 'nyc_pred.csv', row.names = FALSE)
write.csv(nyc_test[,c('GEOID', 'PREDICT_CROSS')], 'nyc_pred_cross.csv', row.names = FALSE)

write.csv(chi_test[,c('GEOID', 'DENSITY')], 'chi_density.csv', row.names = FALSE)
write.csv(chi_test[,c('GEOID', 'LIGHT')], 'chi_light_apr.csv', row.names = FALSE)
write.csv(chi_test[,c('GEOID', 'BUILD_COUNT')], 'chi_build_apr.csv', row.names = FALSE)
write.csv(chi_test[,c('GEOID', 'PREDICT')], 'chi_pred.csv', row.names = FALSE)
write.csv(chi_test[,c('GEOID', 'PREDICT_CROSS')], 'chi_pred_cross.csv', row.names = FALSE)