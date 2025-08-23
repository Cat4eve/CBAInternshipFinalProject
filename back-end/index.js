// server.js
// Minimal Node.js + SQLite backend that accepts XML like the user's <mods> sample
// and exposes CRUD over the 24 inner values. Uses fast-xml-parser and sqlite3.

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { XMLParser } = require('fast-xml-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
const { validateXML } = require('xsd-schema-validator');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data.sqlite');
const PORT = process.env.PORT || 3000;

const app = express();

// Accept JSON as well (for convenience when updating or testing)
app.use(express.json());
app.use(cors());

// Accept raw XML in the body for Content-Type: application/xml or text/xml
app.use(bodyParser.text({ type: ['application/xml', 'text/xml'], limit: '2mb' }));

// --- SQLite setup -----------------------------------------------------------
const db = new sqlite3.Database(DB_PATH);

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, function (err, row) {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transferType TEXT,
  legalStatus TEXT,
  transactionType TEXT,
  methodOfTransfer TEXT,
  transferSystem TEXT,
  communicationType TEXT,
  senderRegion TEXT,
  receiverRegion TEXT,
  ISO3166_1Alpha3Countries TEXT,
  money REAL,
  ISO4217Currencies TEXT,
  moneyToUSD REAL,
  sizeClassifier TEXT,
  legalEntityName TEXT,
  taxPayerRegistrationNumber TEXT,
  segmentMembership TEXT,
  residency TEXT,
  sideLegalEntityName TEXT,
  sideResidency TEXT,
  sideLegalStatus TEXT,
  intentClassifier TEXT,
  intentCode TEXT,
  transferAmount INTEGER,
  sidePayment INTEGER,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);
`;

const UPDATE_TRIGGER_SQL = `
CREATE TRIGGER IF NOT EXISTS trg_transactions_updatedAt
AFTER UPDATE ON transactions
FOR EACH ROW BEGIN
  UPDATE transactions SET updatedAt = datetime('now') WHERE id = NEW.id;
END;
`;

// initialize database
(async () => {
  await run(db, CREATE_SQL);
  await run(db, UPDATE_TRIGGER_SQL);
})();

// --- XML parsing helpers ----------------------------------------------------
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: true,
  parseAttributeValue: true,
  trimValues: true,
});

// map wrappers to their inner tag names (24 total)
const WRAPPER_MAP = {
  transferTypeInfo: 'transferType',
  legalStatusInfo: 'legalStatus',
  transactionTypeInfo: 'transactionType',
  methodOfTransferInfo: 'methodOfTransfer',
  transferSystemInfo: 'transferSystem',
  communicationTypeInfo: 'communicationType',
  senderRegionInfo: 'senderRegion',
  receiverRegionInfo: 'receiverRegion',
  ISO3166_1Alpha3CountriesInfo: 'ISO3166_1Alpha3Countries',
  moneyInfo: 'money',
  ISO4217CurrenciesInfo: 'ISO4217Currencies',
  moneyToUSDInfo: 'moneyToUSD',
  sizeClassifierInfo: 'sizeClassifier',
  legalEntityNameInfo: 'legalEntityName',
  taxPayerRegistrationNumberInfo: 'taxPayerRegistrationNumber',
  segmentMembershipInfo: 'segmentMembership',
  residencyInfo: 'residency',
  sideLegalEntityNameInfo: 'sideLegalEntityName',
  sideResidencyInfo: 'sideResidency',
  sideLegalStatusInfo: 'sideLegalStatus',
  intentClassifierInfo: 'intentClassifier',
  intentCodeInfo: 'intentCode',
  transferAmountInfo: 'transferAmount',
  sidePaymentInfo: 'sidePayment',
};

const NUMERIC_FIELDS = new Set(['money', 'moneyToUSD']);
const INTEGER_FIELDS = new Set(['transferAmount', 'sidePayment']);

function normalizeValue(key, val) {
  if (val === undefined || val === null || val === '') return null;
  if (NUMERIC_FIELDS.has(key)) {
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  }
  if (INTEGER_FIELDS.has(key)) {
    const n = parseInt(val, 10);
    return Number.isFinite(n) ? n : null;
  }
  return String(val);
}

function parseModsXML(xmlText) {
  const obj = parser.parse(xmlText);
  if (!obj || !obj.mods || typeof obj.mods !== 'object') {
    throw new Error('Invalid XML: root <mods> not found');
  }
  const mods = obj.mods;
  const record = {};
  for (const [wrapper, inner] of Object.entries(WRAPPER_MAP)) {
    const v = mods?.[wrapper]?.[inner];
    record[inner] = normalizeValue(inner, v);
  }
  return record;
}

function coerceBodyToRecord(req) {
  // If Content-Type is XML, body is a string; parse it.
  if (typeof req.body === 'string') {
    return parseModsXML(req.body);
  }
  // Otherwise expect either a flat object with inner keys, or the wrapper style.
  const body = req.body || {};
  const record = {};
  for (const [wrapper, inner] of Object.entries(WRAPPER_MAP)) {
    if (inner in body) {
      record[inner] = normalizeValue(inner, body[inner]);
    } else if (wrapper in body && body[wrapper] && typeof body[wrapper] === 'object') {
      record[inner] = normalizeValue(inner, body[wrapper][inner]);
    } else {
      record[inner] = null;
    }
  }
  return record;
}

function columnsList() {
  return Object.values(WRAPPER_MAP).join(', ');
}

function placeholdersList(n) {
  return new Array(n).fill('?').join(', ');
}

// --- CRUD routes ------------------------------------------------------------
app.get('/transactions/next-id', async (req, res) => {
  try {
    const row = await get(db, 'SELECT MAX(id) as maxId FROM transactions');
    // Ensure maxId is a valid number
    const currentMax = Number(row?.maxId) || 0;
    // nextId is always at least 1
    const nextId = Math.max(currentMax + 1, 1);
    res.json({ nextId });
  } catch (err) {
    console.error('Error getting next transaction ID:', err);
    res.status(500).json({ error: 'Failed to get next transaction ID' });
  }
});

app.post('/transactions', async (req, res) => {
  try {
    const record = coerceBodyToRecord(req);
    console.log(validateXML(record));
    const cols = Object.values(WRAPPER_MAP);
    const sql = `INSERT INTO transactions (${columnsList()}) VALUES (${placeholdersList(cols.length)})`;
    const params = cols.map((c) => record[c] ?? null);
    const { lastID } = await run(db, sql, params);
    const created = await get(db, 'SELECT * FROM transactions WHERE id = ?', [lastID]);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const rows = await all(db, 'SELECT * FROM transactions ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/transactions/:id', async (req, res) => {
  try {
    const row = await get(db, 'SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/transactions/:id', async (req, res) => {
  try {
    const record = coerceBodyToRecord(req);
    const cols = Object.values(WRAPPER_MAP);
    const setters = cols.map((c) => `${c} = ?`).join(', ');
    const params = cols.map((c) => record[c] ?? null);
    params.push(req.params.id);

    const { changes } = await run(db, `UPDATE transactions SET ${setters} WHERE id = ?`, params);
    if (!changes) return res.status(404).json({ error: 'Not found' });
    const updated = await get(db, 'SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/transactions/:id', async (req, res) => {
  try {
    // Partial update: only update fields provided in body (XML or JSON)
    let updates;
    if (typeof req.body === 'string') {
      updates = parseModsXML(req.body);
    } else {
      updates = coerceBodyToRecord(req);
    }
    const entries = Object.entries(updates).filter(([_, v]) => v !== null && v !== undefined);
    if (entries.length === 0) return res.status(400).json({ error: 'No fields to update' });

    const setters = entries.map(([k]) => `${k} = ?`).join(', ');
    const params = entries.map(([_, v]) => v);
    params.push(req.params.id);

    const { changes } = await run(db, `UPDATE transactions SET ${setters} WHERE id = ?`, params);
    if (!changes) return res.status(404).json({ error: 'Not found' });
    const updated = await get(db, 'SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/transactions/:id', async (req, res) => {
  try {
    const { changes } = await run(db, 'DELETE FROM transactions WHERE id = ?', [req.params.id]);
    if (!changes) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', endpoints: ['/transactions', '/transactions/next-id'] });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
