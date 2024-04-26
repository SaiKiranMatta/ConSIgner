import numpy as np
from haversine import haversine, Unit


def create_distance_matrix(coordinates):
    num_locations = len(coordinates)
    distance_matrix = np.zeros((num_locations, num_locations))

    for i in range(num_locations):
        for j in range(num_locations):
            distance_matrix[i][j] = haversine(
                coordinates[i], coordinates[j], unit=Unit.KILOMETERS)

    print(distance_matrix)

    return distance_matrix


coordinates = [
    (40.7128, -74.0060),  # New York City
    (34.0522, -118.2437),  # Los Angeles
    (41.8781, -87.6298),   # Chicago
    (29.7604, -95.3698),   # Houston
    (33.4484, -112.0740),  # Phoenix
    (29.9511, -90.0715),   # New Orleans
    (39.9526, -75.1652),   # Philadelphia
    (32.7767, -96.7970),   # Dallas
    (37.7749, -122.4194),  # San Francisco
    (38.9072, -77.0369),   # Washington D.C.
    (35.2271, -80.8431),   # Charlotte
    (42.3601, -71.0589),   # Boston
    (33.7490, -84.3880),   # Atlanta
    (47.6062, -122.3321),  # Seattle
    (25.7617, -80.1918),   # Miami
    (39.2904, -76.6122)    # Baltimore
]

create_distance_matrix(coordinates)
