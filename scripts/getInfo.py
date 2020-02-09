import json

data = ''
with open('payload.json') as payload:
    data = json.load(payload)['data']

def get_routers_names(data):
    router_names = []
    for sample in data:
        for router in sample['wifiAccessPoints']:
            if router['ssid'] not in router_names:
                router_names.append(router['ssid'])
    return router_names

def get_router_samples(router_name, data):
    samples = []
    for sample in data:
        for router in sample['wifiAccessPoints']:
            if router_name == router['ssid']:
                samples.append({
                    'lat' : sample['lat'],
                    'lng' : sample['lng'],
                    'signalStrength' : 100+router['signalStrength']
                }) 
    return samples

def get_router_location(router_samples):
    sum_lat = 0
    sum_lng = 0
    sum_weights = 0
    for sample in router_samples:
        sum_lat += sample['lat'] * sample['signalStrength']
        sum_lng += sample['lng'] * sample['signalStrength']
        sum_weights += sample['signalStrength']
    return sum_lat/sum_weights , sum_lng/sum_weights

def get_router_list(data):
    names = get_routers_names(data)
    router_list = []
    for name in names:
        samples = get_router_samples(name, data)
        lat, lng = get_router_location(samples)
        router_list.append({
            'name': name,
            'lat' : lat,
            'lng' : lng,
        })
    return router_list

print(get_router_list(data))