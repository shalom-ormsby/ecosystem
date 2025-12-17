'use client';

import { useState } from 'react';

interface MayanResult {
  tone: number;
  sign: string;
  display: string;
}

export default function MayanCalendarConverter() {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [result, setResult] = useState<MayanResult | null>(null);
  const [error, setError] = useState<string>('');

  // The Standard Order of Day Signs (Indices 0-19)
  // This specific order aligns with the K'iche' tradition
  const daySignsMap = [
    "Imox", "Iq'", "Ak'ab'al", "K'at", "Kan",
    "Kame", "Kej", "Q'anil", "Toj", "Tz'i",
    "B'atz", "E", "Aj", "Ix", "Tz'ikin",
    "Ajmaq", "Noj", "Tijax", "Kawok", "Ajpu"
  ];

  const getMayanNahual = (dateString: string): MayanResult | null => {
    // Define the Anchor Date (Epoch)
    // Data Source: 'Mayan to Gregorian Calendar Conversion - 2024.csv'
    // Date: January 1, 2024
    // Value: 2 Q'anil
    const anchorTone = 2;
    const anchorSignName = "Q'anil";

    // Find the index of the anchor sign in our list (Q'anil is index 7)
    const anchorSignIndex = daySignsMap.indexOf(anchorSignName);

    // Parse the Input Date
    const parts = dateString.split('/');
    if (parts.length !== 3) {
      throw new Error('Invalid date format');
    }

    const yearNum = parseInt(parts[0]);
    const monthNum = parseInt(parts[1]);
    const dayNum = parseInt(parts[2]);

    if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
      throw new Error('Invalid date values');
    }

    // Validate date ranges
    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
      throw new Error('Invalid date');
    }

    // Calculate the Delta (Difference in days) using UTC to avoid timezone issues
    // This ensures consistent calculation regardless of daylight saving time
    const anchorDateUTC = Date.UTC(2024, 0, 1); // Jan 1, 2024
    const targetDateUTC = Date.UTC(yearNum, monthNum - 1, dayNum); // Month is 0-indexed in Date.UTC

    // Calculate day difference
    const delta = Math.round((targetDateUTC - anchorDateUTC) / (1000 * 60 * 60 * 24));

    // Helper function for proper modulo with negative numbers
    const mod = (n: number, m: number): number => ((n % m) + m) % m;

    // Calculate the New Tone (Number 1-13)
    // Formula: (Start_Tone + Days_Diff - 1) % 13 + 1
    const currentTone = mod(anchorTone + delta - 1, 13) + 1;

    // Calculate the New Sign (Index 0-19)
    // Formula: (Start_Index + Days_Diff) % 20
    const currentSignIndex = mod(anchorSignIndex + delta, 20);

    const currentSign = daySignsMap[currentSignIndex];

    return {
      tone: currentTone,
      sign: currentSign,
      display: `${currentTone} ${currentSign}`
    };
  };

  const handleConvert = () => {
    setError('');
    setResult(null);

    if (!year || !month || !day) {
      setError('Please fill in all fields');
      return;
    }

    // Pad month and day with leading zeros if needed
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    const dateString = `${year}/${paddedMonth}/${paddedDay}`;

    try {
      const nahuatResult = getMayanNahual(dateString);
      setResult(nahuatResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error converting date');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 p-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-md w-full border border-white/20">
        <h1 className="text-4xl font-bold text-amber-100 mb-2 text-center">
          Mayan Calendar Converter
        </h1>
        <p className="text-amber-200/80 text-sm mb-6 text-center">
          K'iche' Count (GMT correlation 584,283)
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-amber-100 text-sm font-semibold mb-2">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="YYYY"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-amber-100 text-sm font-semibold mb-2">
                Month
              </label>
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="MM"
                min="1"
                max="12"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-amber-100 text-sm font-semibold mb-2">
                Day
              </label>
              <input
                type="number"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="DD"
                min="1"
                max="31"
                className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          Convert to Mayan Nahual
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-200 text-center">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-br from-amber-500/30 to-orange-600/30 border border-amber-400/50 rounded-lg">
            <p className="text-amber-100 text-sm font-semibold mb-2 text-center">
              Mayan Nahual:
            </p>
            <p className="text-white text-3xl font-bold text-center">
              {result.display}
            </p>
            <div className="mt-4 pt-4 border-t border-amber-400/30">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-amber-200 text-xs mb-1">Tone</p>
                  <p className="text-amber-100 text-xl font-bold">{result.tone}</p>
                </div>
                <div>
                  <p className="text-amber-200 text-xs mb-1">Sign</p>
                  <p className="text-amber-100 text-xl font-bold">{result.sign}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-amber-200/60 text-xs">
            Anchored to Jan 1, 2024 = 2 Q'anil
          </p>
        </div>
      </div>
    </div>
  );
}
