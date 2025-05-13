"use client";

import { useState } from "react";
import { JollyDateRangePicker } from "../../components/ui/date-picker";
import { DateValue } from "react-aria-components";
import { CalendarDate } from "@internationalized/date";

// Define RangeValue type locally since it's not exported by react-aria-components
export type RangeValue<T> = { start: T; end: T } | null;

export default function DemoJollyDateRangePicker() {
  const [value, setValue] = useState<RangeValue<DateValue> | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-8">
      <h1 className="text-2xl font-bold mb-6">JollyDateRangePicker Demo</h1>
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
        <JollyDateRangePicker
          label="Select a date range"
          description="Pick a start and end date."
          value={value}
          onChange={setValue}
          maxValue={
            new CalendarDate(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate() + 7
            )
          }
          validationBehavior="aria"
        />
        <div className="mt-6 text-sm text-gray-700 dark:text-gray-200">
          <strong>Selected Range:</strong>
          <pre className="bg-gray-100 dark:bg-zinc-800 rounded p-2 mt-2 overflow-x-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
