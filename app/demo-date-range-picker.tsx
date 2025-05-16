"use client";

import { useState, useEffect } from "react";
import { DateValue } from "react-aria-components";
import { now, getLocalTimeZone } from "@internationalized/date";
import { DateRangePicker } from "@/components/ui/date-picker";

// Define RangeValue type locally since it's not exported by react-aria-components
export type RangeValue<T> = { start: T; end: T } | null;

export default function DemoDateRangePicker() {
  const [value, setValue] = useState<RangeValue<DateValue> | null>(null);
  // State to track if normal value was just updated
  const [isNormalFlashing, setIsNormalFlashing] = useState(false);

  // A valid value store for demonstration purposes
  // In my real application this is to be used in an API query to filter results
  // hence why the value is important to be valid
  // We would rather not query the API then to do it with an invalid value
  const [validvalue, setValidValue] = useState<RangeValue<DateValue> | null>(
    null
  );

  // State to track if valid value was just updated
  const [isFlashing, setIsFlashing] = useState(false);

  // Effect to handle the flash animation for normal value
  useEffect(() => {
    if (value) {
      setIsNormalFlashing(true);
      const timer = setTimeout(() => {
        setIsNormalFlashing(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [value]);

  // Effect to handle the flash animation for valid value
  useEffect(() => {
    if (validvalue) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [validvalue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-8">
      <h1 className="text-2xl font-bold mb-6">DateRangePicker Demo</h1>
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        <DateRangePicker
          label="Select a date range"
          description="Pick a start and end date."
          value={value}
          onChange={setValue}
          maxValue={now(getLocalTimeZone()).add({ weeks: 1 })}
          validationBehavior="aria"
          onValidatedChange={(value) => setValidValue(value)}
        />
        <div
          className={`mt-6 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300 ${
            isNormalFlashing
              ? "bg-yellow-200 dark:bg-yellow-900"
              : "bg-white dark:bg-zinc-900"
          }`}
        >
          <strong>Selected Range:</strong>
          <pre
            className={`rounded p-2 mt-2 overflow-x-auto transition-colors duration-300 ${
              isNormalFlashing
                ? "bg-yellow-300 dark:bg-yellow-800"
                : "bg-gray-100 dark:bg-zinc-800"
            }`}
          >
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300 ${
            isFlashing
              ? "bg-green-200 dark:bg-green-900"
              : "bg-white dark:bg-zinc-900"
          }`}
        >
          <strong>Valid Range (Used for API):</strong>
          <pre
            className={`rounded p-2 mt-2 overflow-x-auto transition-colors duration-300 ${
              isFlashing
                ? "bg-green-300 dark:bg-green-800"
                : "bg-gray-100 dark:bg-zinc-800"
            }`}
          >
            {JSON.stringify(validvalue, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
