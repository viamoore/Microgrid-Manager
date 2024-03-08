# EGauge

We are using eGauge's [`/local`](https://webapi.redoc.ly/v4.4/tag/local) service, which provides access to the values directly measured/derived from the sensors attached to the meter. Specifically, we are utilizing the `energy` values that are returned.

From the docs:

> Energy is a derived value that is calculated from a pair of sensors. Energy values are calculated by numerically integrating over time the product of two sensor values. This service guarantees to return an atomic snapshot of the measurements as of the time indicated by the timestamp in the response.

Various query parameters can be used to select the exact data that is to be returned:

```python
# Used to select which sections to include in the response.
# Requesting the sensor values themselves as well as derived real energy and apparent energy sections:
sections = [Local.SECTION_VALUES, Local.SECTION_ENERGY, Local.SECTION_APPARENT] # we only need Local.SECTION_ENERGY

# Used to select the metrics to return for each sensor:
# rate(e.g., power), accumulated value(e.g., energy), sensor's type (physical unit)
metrics = [Local.METRIC_RATE, Local.METRIC_CUMUL, Local.METRIC_TYPE]

# Used to select what measurements to return within rate and cumulative metrics.
# Request all available sensor measurements: normal (RMS value), mean, and frequency:
measurements = ["normal", "mean", "freq"]

# Used to select which sensors to include in the response
sensors = ["env=all", "l=all", "s=all"]
```

We can then fetch sensor values from the meter like so:

```python
dev = webapi.device.Device(meter_dev, webapi.JWTAuth(meter_user, meter_password))

# using query parameters defined above
query_string = "&".join(sensors + sections + metrics + measurements)

# fetch sensor values from meter
local = Local(dev, query_string)
```

An example can be found [here](https://bitbucket.org/egauge/python/src/master/examples/test_local.py). This program takes advantage of class `egauge.webapi.device.Local` to handle the details of encoding the HTTP requests and decoding the responses.
