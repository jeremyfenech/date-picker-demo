import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-8">Demo Pages</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/demo-jolly-date-range-picker"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
          >
            JollyDateRangePicker Demo
          </Link>
        </li>
      </ul>
    </div>
  );
}
