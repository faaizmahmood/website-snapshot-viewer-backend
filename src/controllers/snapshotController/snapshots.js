const axios = require("axios");
const NodeCache = require("node-cache");

const CDX_URL = "http://web.archive.org/cdx/search/cdx";

// Cache with 5 minutes TTL (300 seconds)
const cache = new NodeCache({ stdTTL: 300 });

const getSnapshots = async (req, res) => {
  const { domain } = req.query;
  if (!domain) {
    return res.status(400).json({ error: "Domain is required" });
  }

  try {
    // 1️⃣ Check cache first
    const cached = cache.get(domain);
    if (cached) {
      console.log(`Cache hit for ${domain}`);
      return res.json(cached);
    }

    // 2️⃣ Fetch snapshots from CDX API
    const url = `${CDX_URL}?url=${domain}&output=json&fl=timestamp,original&filter=statuscode:200&collapse=timestamp:8`;
    const response = await axios.get(url);
    const data = response.data;

    if (!Array.isArray(data) || data.length <= 1) {
      return res.json([]); // no snapshots found
    }

    // 3️⃣ Remove header row
    data.shift();

    // 4️⃣ Pick first snapshot per year
    const snapshotsByYear = {};
    data.forEach(([timestamp, original]) => {
      const year = timestamp.slice(0, 4);
      if (!snapshotsByYear[year]) {
        snapshotsByYear[year] = {
          year,
          timestamp,
          originalUrl: original,
          archiveUrl: `https://web.archive.org/web/${timestamp}/${original}`,
          screenshotUrl: `https://web.archive.org/web/${timestamp}im_/${original}`, // ✅ static image
        };
      }
    });

    const result = Object.values(snapshotsByYear);

    // 5️⃣ Store in cache for 5 minutes
    cache.set(domain, result);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = getSnapshots;
