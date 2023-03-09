'use-client';

import { Map } from 'react-map-gl';

export default function MaxBox() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <Map
      initialViewState={{
        latitude: 28.1248,
        longitude: -15.43,
        zoom: 12,
      }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={['data']}
      // onMouseMove={onHover}
    >
      {/* <Source type="geojson" data={data}>
        <Layer {...dataLayer} />
      </Source>
      {hoverInfo && (
      <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
        <div>
          State:
          {hoverInfo.feature.properties.name}
        </div>
        <div>
          Median Household Income:
          {hoverInfo.feature.properties.value}
        </div>
        <div>
          Percentile:
          {(hoverInfo.feature.properties.percentile / 8) * 100}
        </div>
      </div>
      )} */}
    </Map>
  );
}
