from haversine import haversine, Unit
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import pandas as pd
import numpy as np


def distance_callback(from_index, to_index, distance_matrix):
    """Returns the distance between the two nodes."""
    return distance_matrix[from_index][to_index]


def demand_callback(from_index, demands):
    """Returns the demand of the node."""
    return demands[from_index]


def create_routing_model(distance_matrix, demands, vehicle_capacities, num_vehicles):
    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(
        len(distance_matrix), num_vehicles, 0)

    # Create Routing Model
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.
    transit_callback_index = routing.RegisterTransitCallback(
        lambda from_index, to_index: distance_callback(from_index, to_index, distance_matrix))

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Capacity constraint.
    demand_callback_index = routing.RegisterUnaryTransitCallback(
        lambda from_index: demand_callback(from_index, demands))
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index, 0, vehicle_capacities, True, 'Capacity')

    return routing, manager


def solve_routing(routing, manager, num_vehicles, distance_matrix, demands):
    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.FromSeconds(1)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    if solution:
        results = []
        for vehicle_id in range(num_vehicles):
            index = routing.Start(vehicle_id)
            route = []
            route_distance = 0
            route_load = 0
            while not routing.IsEnd(index):
                node_index = manager.IndexToNode(index)
                route.append(node_index)
                next_index = solution.Value(routing.NextVar(index))
                # Calculate distance from distance matrix
                next_node_index = manager.IndexToNode(next_index)
                route_distance += distance_matrix[node_index][next_node_index]
                route_load += demands[node_index]
                index = next_index
            results.append({
                'route': route,
                'total_distance': route_distance,
                'parcels_delivered': route_load
            })
        return results
    else:
        return None


def create_distance_matrix(coordinates):
    num_locations = len(coordinates)
    distance_matrix = np.zeros((num_locations, num_locations))

    for i in range(num_locations):
        for j in range(num_locations):
            distance_matrix[i][j] = round(haversine(
                coordinates[i], coordinates[j], unit=Unit.KILOMETERS))

    return distance_matrix


def solve_routing_problem(coordinates, demands, vehicle_capacities, num_vehicles):
    # Create Distance Matrix
    distance_matrix = create_distance_matrix(coordinates)

    routing, manager = create_routing_model(
        distance_matrix, demands, vehicle_capacities, num_vehicles)
    results = solve_routing(
        routing, manager, num_vehicles, distance_matrix, demands)
    return results


# Example usage:
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
    (39.2904, -76.6132)    # Baltimore
]

demands = [0, 1, 1, 2, 4, 2, 4, 8, 6, 1, 2, 1, 2, 75, 4, 8, 8]
vehicle_capacities = [15, 15, 105, 15]
num_vehicles = 4

results = solve_routing_problem(
    coordinates, demands, vehicle_capacities, num_vehicles)
if results is not None:
    for i, result in enumerate(results):
        print('Route for driver {}:\n{}'.format(i, result['route']))
        print('Total distance: {} (km)'.format(result['total_distance']))
        print('Parcels Delivered: {} (parcels)\n'.format(
            result['parcels_delivered']))
else:
    print('No Solution')
