# AP Service Finder

This simple Node.js application allows you to search for AP service providers within approximately one hour of driving time from a given address. Providers are listed in `data/providers.json` and can be edited manually.

The server relies on the Mapbox API for geocoding and driving time calculations.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Obtain a Mapbox access token and set it as an environment variable:
   ```bash
   export MAPBOX_TOKEN=your_token_here
   ```
   Optionally set a monthly request limit:
   ```bash
   export MAPBOX_MONTHLY_LIMIT=100000
   ```
3. Add providers to `data/providers.json` in the following format:
   ```json
   [
     {"name": "Provider Name", "address": "123 Main St, City, State"}
   ]
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser and enter an address to search.

## Notes

The Mapbox API is used for geocoding and routing. Requests to these APIs count against your quota and require internet access. Set `MAPBOX_MONTHLY_LIMIT` to cap usage. When the limit is reached, searches are disabled until the next month.
