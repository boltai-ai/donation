import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: (latitude: number, longitude: number) => Promise<void>;
  setLocationFromMap: (latitude: number, longitude: number) => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAddressFromCoords = async (latitude: number, longitude: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data.display_name || 'Address not found';
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Address not found';
    }
  };

  const updateLocation = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const address = await getAddressFromCoords(latitude, longitude);
      const newLocation = { latitude, longitude, address };

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          location: { latitude, longitude, address }
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (updateError) throw updateError;

      setLocation(newLocation);
    } catch (error) {
      setError('Failed to update location. Please try again.');
      console.error('Location update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLocationFromMap = async (latitude: number, longitude: number) => {
    try {
      const address = await getAddressFromCoords(latitude, longitude);
      setLocation({ latitude, longitude, address });
      await updateLocation(latitude, longitude);
    } catch (error) {
      console.error('Error setting location from map:', error);
      setError('Failed to set location from map');
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('location')
          .eq('id', user.id)
          .single();

        if (profile?.location) {
          setLocation(profile.location as Location);
        } else {
          // Get browser location as fallback
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              await updateLocation(latitude, longitude);
            },
            (error) => {
              console.error('Error getting location:', error);
              setError('Failed to get location. Please enable location services.');
            }
          );
        }
      }
    };

    initializeLocation();
  }, []);

  return (
    <LocationContext.Provider value={{
      location,
      isLoading,
      error,
      updateLocation,
      setLocationFromMap
    }}>
      {children}
    </LocationContext.Provider>
  );
};