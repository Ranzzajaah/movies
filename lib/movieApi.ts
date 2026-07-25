import MD5 from "crypto-js/md5";

const BASE_URL = "https://h5-api.aoneroom.com";
const BASE_URL_HOST = "moviebox.ph";

let sessionToken: string | null = null;

function buildClientToken(): string {
  const ts = Math.floor(Date.now() / 1000).toString();
  const rev = ts.split("").reverse().join("");
  return `${ts},${MD5(rev).toString()}`;
}

function buildHeaders(token: string | null = null): HeadersInit {
  const headers: Record<string, string> = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Client-Info": JSON.stringify({
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
    "X-Request-Lang": "en",
    "X-Client-Token": buildClientToken(),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function request<T>(method: string, path: string, body: unknown = null): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers: buildHeaders(sessionToken),
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText}`);
  }

  const userHeader = res.headers.get("x-user");
  if (userHeader) {
    try {
      sessionToken = JSON.parse(userHeader).token;
    } catch {
      // Pass through if parsing fails
    }
  }

  return res.json() as Promise<T>;
}

// Exported API Methods

export async function getHome() {
  return request("GET", `/wefeed-h5api-bff/home?host=${BASE_URL_HOST}`);
}

export async function getTrending({ tabId = "", page = 1, perPage = 18 } = {}) {
  const q = tabId ? `tabId=${tabId}&` : "";
  return request("GET", `/wefeed-h5api-bff/subject/trending?${q}page=${page}&perPage=${perPage}`);
}

export async function getDetail(subjectId: string) {
  return request("GET", `/wefeed-h5api-bff/detail?subjectId=${subjectId}`);
}

export async function getDetailRec({ subjectId, page = 1, perPage = 12 }: { subjectId: string; page?: number; perPage?: number }) {
  return request("GET", `/wefeed-h5api-bff/subject/detail-rec?subjectId=${subjectId}&page=${page}&perPage=${perPage}`);
}

export async function search({ keyword, page = 1, perPage = 20, subjectType = 0 }: { keyword: string; page?: number; perPage?: number; subjectType?: number }) {
  return request("POST", "/wefeed-h5api-bff/subject/search", { keyword, page, perPage, subjectType });
}

export async function searchSuggest(keyword: string) {
  return request("POST", "/wefeed-h5api-bff/subject/search-suggest", { keyword, perPage: 10 });
}
