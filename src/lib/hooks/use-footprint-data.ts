'use client';

import { useState, useEffect, useCallback } from 'react';
import type { FootprintRecord } from '@/lib/types';

const STORAGE_KEY = 'ecoTrackData';

export function useFootprintData() {
  const [records, setRecords] = useState<FootprintRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setRecords(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Failed to load data from local storage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addRecord = useCallback((newRecord: FootprintRecord) => {
    setRecords(prevRecords => {
      // Keep only the 51 most recent records to prevent local storage from growing indefinitely.
      const updatedRecords = [newRecord, ...prevRecords].slice(0, 52);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
      } catch (error) {
        console.error('Failed to save data to local storage:', error);
      }
      return updatedRecords;
    });
  }, []);

  const clearRecords = useCallback(() => {
    setRecords([]);
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear data from local storage:', error);
    }
  }, []);

  return { records, addRecord, clearRecords, isLoaded, latestRecord: records[0] };
}
