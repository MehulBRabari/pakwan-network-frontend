import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useSelector } from 'react-redux'

function useUpdateLocation() {
  const { userData, socket } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData?._id || !navigator.geolocation) return

    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(`${serverUrl}/api/user/update-location`, { lat, lon }, { withCredentials: true })
        if (userData.role === 'deliveryBoy') {
          socket?.emit('updateLocation', { latitude: lat, longitude: lon, userId: userData._id })
        }
      } catch (error) {
        console.log('update location error', error)
      }
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => updateLocation(pos.coords.latitude, pos.coords.longitude),
      (error) => console.log('geolocation error', error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [userData?._id, userData?.role, socket])
}

export default useUpdateLocation
