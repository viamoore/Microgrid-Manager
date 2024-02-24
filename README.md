# Microgrid

CSE 115D Project

## Why Mircogrid Manager

Microgrid Manager serves as an intuitive UI interface for non-technical people to efficiently operate their home's power system.

## Setup

This project requires Docker Desktop or some form of Docker on that system. Install that first.

## Running the app

In the root, run: (ensure Docker client is running)

```
docker compose up -d
```

To start the web app:

```
cd frontend
npm install
npm run dev
```

Frontend runs on port 5173
Backend runs on port 8080

## Technical Specs

We can abstract these into their respective modules (`/micro-services`, `/frontend`, `/backend`) later, but I'm adding everything here for convenience.

### Frontend

Our frontend is structured like so:

- `/routes/routes.tsx`: defines all of the routes, using pages defined in `/pages`. We can abstract this by removing the folder or move everything under `/pages` here in the future.
- `/pages`: where all the main logic lives. Contains code for each page and its respective components, nested under their respective folder.
- `/layouts`: again, can be abstracted since theres just one file here. defines the app-wide layout.
- `/components`: **reusable components**. Components that are used by a specific page can be defined under their respective folder in `/pages` for better organization/structure.
- `/context`: used by the previous group, but planning on removing this entirely (not needed)
- `/interfaces`: used by the previous group, containing type definitions. Also planning on removing this entirely.

#### Data fetching

Data is fetched in their respective components, primarily utilizing `useEffect` hooks. At the moment, the following components are using static data:

- `/pages/dashboard/widgets/waterTankWidget.tsx`
- `/pages/dashboard/widgets/hvacWidget.tsx`
- `/pages/dashboard/energyGeneration`

The following components are also static, not working, or not yet implemented:

- `/pages/backupToCloud` (not implemented)
- `/pages/configure` & `/pages/generalSetting` (UI done, but no associated logic / we don't know if these are the values we want to modify)
- `/pages/manageDevice` (UI done)
- `/pages/dataView` (not implemented)
- `/pages/readLog` (UI done, currently using mock data)

##### Battery Chart

The Battery Chart creates an [`EventSource`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource), which opens a connection to `http://localhost:8080/powerview`. From the docs:

> An EventSource instance opens a persistent connection to an HTTP server, which sends events in text/event-stream format. The connection remains open until closed by calling EventSource.close(). Once the connection is opened, incoming messages from the server are delivered to your code in the form of events. If there is an event field in the incoming message, the triggered event is the same as the event field value. If no event field is present, then a generic message event is fired.

Data is received in the following form:

```ts
interface DataStream {
  pac: number;
  toGrid: boolean;
  gridTo: boolean;
  soc: number;
  battPower: number;
  gridOrMeterPower: number;
}
```

We are also currently using mock data here, in the form of `mockData.capacity` (set to `15000`).

##### EGauge

EGauge is currently using the following mock data (found in `/pages/dashboard/eGauge/store.ts`):

```ts
const mockEGaugeConfig = [
  {
    name: "Kitchen",
    source: "S1_L1",
    period: "30 seconds",
  } as EGaugeConfig,
  {
    name: "HVAC",
    source: "S7_L1",
    period: "30 seconds",
  } as EGaugeConfig,
  {
    name: "WATER",
    source: "S9_L1",
    period: "1 minute",
  } as EGaugeConfig,
];
```

On first load, we call `http://localhost:8080/egaugetime?time=${period}&dataname=${source}` on each item contained within `mockEGaugeConfig` defined above.

From then on, we open an EventSource that reads data from `http://localhost:8080/egauge`. This returns updated values for each config value which we replace.

_Note: i'm not really sure that this is the best way of going about this (particularly using EventSource) or if this even works properly, which I'll look into in the future. Additionally, each config should also have an associated graph, but this is temporarily removed because it was broken._

### Backend

The backend queries data in our database (which microservices manages and saves).

Our backend is structured like so:

- `index.ts`: starts the MicroGrid server
- `server.ts`: function definition to create server with config, which `index.ts` calls
- `/routes`:
  - `/routes/index.ts`: defines Express router, using routes nested under `routes` folder
  - `/routes/<route>/controller.ts`: contains routes for specific function (eGauge is one, weather is another)
  - `/routes/<route>/server.ts`: contains logic used by `controller`
  - `/routes/<route>/model.d.ts`: type defs

### Microservices

At a high level: microservices run work and saves data in DB, which the API subsequently queries.

#### Weather

Weather microservice `/micro-services/weather/fetchWeather.py` runs a job that fetches weather using a public API and saves the data. The API returns data denoted by a `startTime` and its corresponding `temperature` and `shortForecast`.

Our weather API `/weather` fetches the most recently inserted row.

#### EGauge

EGauge microservices utilizes the [`egauge-python`](https://kb.egauge.net/books/egauge-meter-communication/page/introduction) package.

We access an eGauge meter through the following:

```python
meter_dev = os.getenv("EGDEV", "http://egauge18646.egaug.es") // meter name
meter_user = os.getenv("EGUSR", "ppridge1") // user name
meter_password = os.getenv("EGPWD", "ppridge") // password

dev = webapi.device.Device(meter_dev, webapi.JWTAuth(meter_user, meter_password))
```

Honestly not completely sure what EGauge does, so if anyone else wants to update please do so.

#### PowerView

From the preexisting API:

This program takes data from PowerView and puts it into the MySQL Database once every 5 minutes and 2 seconds. It also tracks grid outages. The API updates once every 5 minutes and ~0.8 seconds. You can [login](https://pv.inteless.com/login) using the credentials found in `/micro-services/PowerView/Dockerfile`.

It currently takes data from Plant List, Plant Realtime, and Plant Flow. The numbers refer to the section in the API manual:

- Plant List (3.2.1) tracks general information about the plant.
- Plant Realtime (3.2.3) tracks general energy statistics about the plant.
- Plant Flow (3.2.4) tracks the flow of energy throughout the Microgrid.

Running:

```
// python3 powerview_generation.py (string) (string) (bool)
python3 powerview_generation.py <email> <password> <is_docker>
```

Config:

- To change how frequently the program calls the API, change the time.sleep() value (remember that the API updates once every 5 minutes)
- To change the outage detection parameters, change the outage_threshold variable
- To change what database change the following variable values in the file

## Tests

## Creidts
