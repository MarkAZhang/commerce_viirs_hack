# PATHS NEED TO BE FIXED BEFORE RUNNING

import shapefile_mapmaking as test
import pandas as pd

c_loc = [41.83, -87.74]
c_z   = 10
n_loc = [40.71, -74.01]
n_z   = 10

cl = pd.read_csv('../../data_science/output/chi_light.csv'); cl.GEOID = map(str, cl.GEOID)
cb = pd.read_csv('../../data_science/output/chi_build.csv'); cb.GEOID = map(str, cb.GEOID)
cm = pd.read_csv('../../data_science/output/chi_light_apr.csv'); cm.GEOID = map(str, cm.GEOID)
cn = pd.read_csv('../../data_science/output/chi_build_apr.csv'); cn.GEOID = map(str, cn.GEOID)
co = pd.read_csv('../../data_science/output/chi_density.csv'); co.GEOID = map(str, co.GEOID)
cp = pd.read_csv('../../data_science/output/chi_pred.csv'); cp.GEOID = map(str, cp.GEOID)
cq = pd.read_csv('../../data_science/output/chi_pred_cross.csv'); cq.GEOID = map(str, cq.GEOID)

test.mk_map_w_data('../../data/chi_2010.geojson', cl, 'feature.properties.geoid10', 'chi_light.html', 'YlOrRd', c_loc, c_z)
test.mk_map_w_data('../../data/chi_2010.geojson', cb, 'feature.properties.geoid10', 'chi_build.html', 'RdPu', c_loc, c_z)
test.mk_map_w_data('../../data/chi_2010.geojson', co, 'feature.properties.geoid10', 'chi_density.html', 'YlGn', c_loc, c_z)
test.mk_map_w_data('../../data/chi_2010.geojson', cp, 'feature.properties.geoid10', 'chi_pred.html', 'RdPu', c_loc, c_z)
test.mk_map_w_data('../../data/chi_2010.geojson', cq, 'feature.properties.geoid10', 'chi_pred_cross.html', 'RdPu', c_loc, c_z)

test.mk_map_w_data('../../data/nyc_2010.geojson', pd.read_csv('../../data_science/output/nyc_light.csv'), 'feature.properties.GEO_ID', 'nyc_light.html', 'YlOrRd', n_loc, n_z)
test.mk_map_w_data('../../data/nyc_2010.geojson', pd.read_csv('../../data_science/output/nyc_build.csv'), 'feature.properties.GEO_ID', 'nyc_build.html', 'RdPu', n_loc, n_z)
test.mk_map_w_data('../../data/nyc_2010.geojson', pd.read_csv('../../data_science/output/nyc_density.csv'), 'feature.properties.GEO_ID', 'nyc_density.html', 'YlGn', n_loc, n_z)
test.mk_map_w_data('../../data/nyc_2010.geojson', pd.read_csv('../../data_science/output/nyc_pred.csv'), 'feature.properties.GEO_ID', 'nyc_pred.html', 'RdPu', n_loc, n_z)
test.mk_map_w_data('../../data/nyc_2010.geojson', pd.read_csv('../../data_science/output/nyc_pred_cross.csv'), 'feature.properties.GEO_ID', 'nyc_pred_cross.html', 'RdPu', n_loc, n_z)
