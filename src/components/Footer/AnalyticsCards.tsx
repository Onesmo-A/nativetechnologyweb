"use client";

import { useEffect, useMemo, useState } from "react";

type Summary = {
  configured: boolean;
  online: number | null;
  today: number | null;
  week: number | null;
  month: number | null;
  updatedAt: string;
};

const formatNumber = (value: number | null) => {
  if (value === null) return "—";
  return new Intl.NumberFormat(undefined).format(value);
};

export default function AnalyticsCards() {
  const [data, setData] = useState<Summary | null>(null);

  const cards = useMemo(() => {
    return [
      { label: "Online", value: data?.online ?? null, hint: "Active users right now" },
      { label: "Today", value: data?.today ?? null, hint: "Active users today" },
      { label: "Last 7 Days", value: data?.week ?? null, hint: "Active users (7 days)" },
      { label: "This Month", value: data?.month ?? null, hint: "Active users (month-to-date)" },
    ];
  }, [data]);

  useEffect(() => {
    let canceled = false;
    const load = async () => {
      const res = await fetch("/api/ga/summary", { cache: "no-store" });
      if (!res.ok) return;
      const json = (await res.json()) as Summary;
      if (!canceled) setData(json);
    };
    void load();

    const interval = window.setInterval(load, 60_000);
    return () => {
      canceled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-10 rounded-xs bg-gray-light p-6 dark:bg-gray-dark sm:p-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-md bg-white p-4 shadow-one dark:bg-dark dark:shadow-three"
            title={card.hint}
          >
            <div className="text-sm font-semibold text-body-color dark:text-body-color-dark">
              {card.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-black dark:text-white">
              {formatNumber(card.value)}
            </div>
          </div>
        ))}
      </div>

      {data && !data.configured ? (
        <p className="mt-4 text-sm text-body-color dark:text-body-color-dark">
          Analytics cards are not configured yet. Add `GA_PROPERTY_ID`,
          `GA_CLIENT_EMAIL`, and `GA_PRIVATE_KEY` in your hosting environment
          variables.
        </p>
      ) : null}
    </div>
  );
}

