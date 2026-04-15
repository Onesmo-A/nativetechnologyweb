import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type Summary = {
  configured: boolean;
  online: number | null;
  today: number | null;
  week: number | null;
  month: number | null;
  updatedAt: string;
};

function base64UrlEncode(input: string | Buffer) {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getPrivateKey() {
  const raw = process.env.GA_PRIVATE_KEY?.trim();
  if (!raw) return "";
  return raw.replace(/\\n/g, "\n");
}

async function getAccessToken() {
  const clientEmail = process.env.GA_CLIENT_EMAIL?.trim();
  const privateKey = getPrivateKey();
  if (!clientEmail || !privateKey) return null;

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 55 * 60;

  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat,
      exp,
    }),
  );

  const unsigned = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = base64UrlEncode(signer.sign(privateKey));
  const assertion = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }).toString(),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function parseMetricValue(json: any): number | null {
  const value = json?.rows?.[0]?.metricValues?.[0]?.value;
  if (typeof value !== "string") return null;
  const asNumber = Number(value);
  return Number.isFinite(asNumber) ? asNumber : null;
}

function firstDayOfMonthISO() {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const first = new Date(Date.UTC(y, m, 1));
  return first.toISOString().slice(0, 10);
}

async function runReport(opts: {
  propertyId: string;
  accessToken: string;
  startDate: string;
  endDate: string;
}) {
  const { propertyId, accessToken, startDate, endDate } = opts;
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        metrics: [{ name: "activeUsers" }],
        dateRanges: [{ startDate, endDate }],
      }),
    },
  );
  if (!res.ok) return null;
  return parseMetricValue(await res.json());
}

async function runRealtimeReport(opts: {
  propertyId: string;
  accessToken: string;
}) {
  const { propertyId, accessToken } = opts;
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        metrics: [{ name: "activeUsers" }],
      }),
    },
  );
  if (!res.ok) return null;
  return parseMetricValue(await res.json());
}

export async function GET() {
  const propertyId = process.env.GA_PROPERTY_ID?.trim() || "";
  const configured =
    Boolean(propertyId) &&
    Boolean(process.env.GA_CLIENT_EMAIL?.trim()) &&
    Boolean(getPrivateKey());

  const base: Summary = {
    configured,
    online: null,
    today: null,
    week: null,
    month: null,
    updatedAt: new Date().toISOString(),
  };

  if (!configured) {
    return NextResponse.json(base, {
      headers: { "cache-control": "public, max-age=0, s-maxage=60" },
    });
  }

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(base, {
        headers: { "cache-control": "public, max-age=0, s-maxage=60" },
      });
    }

    const [online, today, week, month] = await Promise.all([
      runRealtimeReport({ propertyId, accessToken }),
      runReport({ propertyId, accessToken, startDate: "today", endDate: "today" }),
      runReport({ propertyId, accessToken, startDate: "7daysAgo", endDate: "today" }),
      runReport({
        propertyId,
        accessToken,
        startDate: firstDayOfMonthISO(),
        endDate: "today",
      }),
    ]);

    return NextResponse.json(
      {
        ...base,
        online,
        today,
        week,
        month,
      },
      {
        headers: { "cache-control": "public, max-age=0, s-maxage=60" },
      },
    );
  } catch {
    return NextResponse.json(base, {
      headers: { "cache-control": "public, max-age=0, s-maxage=60" },
    });
  }
}

