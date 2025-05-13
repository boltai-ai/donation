import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from './LocationContext';
import { v4 as uuidv4 } from 'uuid';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface DonationMatch {
  id: string;
  donationId: string;
  recipientId: string;
  matchScore: number;
  distance: number;
  categoryMatch: number;
  urgencyMatch: number;
  timestamp: string;
}

interface MatchingContextType {
  findMatches: (donationId: string) => DonationMatch[];
  calculateMatchScore: (donation: any, recipientLocation: Coordinates) => number;
}

const MatchingContext = createContext<MatchingContextType | undefined>(undefined);

export const useMatching = () => {
  const context = useContext(MatchingContext);
  if (!context) {
    throw new Error('useMatching must be used within a MatchingProvider');
  }
  return context;
};

interface MatchingProviderProps {
  children: ReactNode;
}

export const MatchingProvider: React.FC<MatchingProviderProps> = ({ children }) => {
  const { location } = useLocation();

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate category match score
  const calculateCategoryMatch = (donationCategory: string, recipientNeeds: string[]): number => {
    if (recipientNeeds.includes(donationCategory)) {
      return 100;
    }
    return 0;
  };

  // Calculate urgency match score
  const calculateUrgencyMatch = (donationUrgency: string, recipientUrgency: string): number => {
    const urgencyLevels = { low: 1, medium: 2, high: 3 };
    const diff = Math.abs(
      urgencyLevels[donationUrgency.toLowerCase()] - 
      urgencyLevels[recipientUrgency.toLowerCase()]
    );
    return 100 - (diff * 33.33);
  };

  const calculateMatchScore = (donation: any, recipientLocation: Coordinates): number => {
    if (!location) return 0;

    const distance = calculateDistance(
      { latitude: location.latitude, longitude: location.longitude },
      recipientLocation
    );

    // Distance score (inversely proportional to distance)
    const distanceScore = Math.max(0, 100 - (distance * 2));

    // Category match score
    const categoryScore = calculateCategoryMatch(
      donation.category,
      donation.recipientNeeds || []
    );

    // Urgency match score
    const urgencyScore = calculateUrgencyMatch(
      donation.urgency,
      donation.recipientUrgency || 'medium'
    );

    // Weighted average of all scores
    const weightedScore = (
      (distanceScore * 0.4) +
      (categoryScore * 0.4) +
      (urgencyScore * 0.2)
    );

    return Math.round(weightedScore);
  };

  const findMatches = (donationId: string): DonationMatch[] => {
    if (!location) return [];

    const availableDonations = JSON.parse(localStorage.getItem('availableDonations') || '[]');
    const donation = availableDonations.find(d => d.id === donationId);

    if (!donation) return [];

    // Get all potential recipients (in a real app, this would come from a database)
    const recipients = JSON.parse(localStorage.getItem('recipients') || '[]');

    return recipients
      .map(recipient => {
        const matchScore = calculateMatchScore(donation, {
          latitude: recipient.latitude,
          longitude: recipient.longitude
        });

        const distance = calculateDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: recipient.latitude, longitude: recipient.longitude }
        );

        return {
          id: uuidv4(),
          donationId: donation.id,
          recipientId: recipient.id,
          matchScore,
          distance,
          categoryMatch: calculateCategoryMatch(donation.category, recipient.needs),
          urgencyMatch: calculateUrgencyMatch(donation.urgency, recipient.urgency),
          timestamp: new Date().toISOString()
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  return (
    <MatchingContext.Provider value={{
      findMatches,
      calculateMatchScore,
    }}>
      {children}
    </MatchingContext.Provider>
  );
};