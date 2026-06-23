import React from 'react'
import scooter from "../assets/scooter.png"
import home from "../assets/home.png"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

const deliveryBoyIcon = new L.Icon({ iconUrl: scooter, iconSize: [40, 40], iconAnchor: [20, 40] })
const customerIcon = new L.Icon({ iconUrl: home, iconSize: [40, 40], iconAnchor: [20, 40] })

function RecenterMap({ center }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true })
  }, [center[0], center[1], map])
  return null
}

function isValidLatLon(lat, lon) {
  return Number.isFinite(Number(lat)) && Number.isFinite(Number(lon)) && Number(lat) >= -90 && Number(lat) <= 90 && Number(lon) >= -180 && Number(lon) <= 180
}

function DeliveryBoyTracking({ data }) {
  const deliveryBoyLat = Number(data?.deliveryBoyLocation?.lat)
  const deliveryBoyLon = Number(data?.deliveryBoyLocation?.lon)
  const customerLat = Number(data?.customerLocation?.lat)
  const customerLon = Number(data?.customerLocation?.lon)

  if (!isValidLatLon(deliveryBoyLat, deliveryBoyLon) || !isValidLatLon(customerLat, customerLon)) {
    return <div className='w-full h-[260px] mt-3 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-orange-50 text-orange-700 font-semibold'>Waiting for live location...</div>
  }

  const path = [[deliveryBoyLat, deliveryBoyLon], [customerLat, customerLon]]
  const center = [deliveryBoyLat, deliveryBoyLon]

  return (
    <div className='w-full h-[400px] mt-3 rounded-xl overflow-hidden shadow-md'>
      <MapContainer className="w-full h-full" center={center} zoom={16}>
        <RecenterMap center={center} />
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[deliveryBoyLat, deliveryBoyLon]} icon={deliveryBoyIcon}><Popup>Delivery Partner</Popup></Marker>
        <Marker position={[customerLat, customerLon]} icon={customerIcon}><Popup>Customer Location</Popup></Marker>
        <Polyline positions={path} color='#F47B1F' weight={4} />
      </MapContainer>
    </div>
  )
}

export default DeliveryBoyTracking
