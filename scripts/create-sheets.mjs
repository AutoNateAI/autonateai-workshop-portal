import {readFileSync, writeFileSync} from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {studentWorkflows, researcherWorkflows} from '../src/data/workflows.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputFile = path.resolve(rootDir, 'src/data/sheetLinks.js');
const serviceAccountPath =
  '/home/nate/.config/gcloud/legacy_credentials/firebase-adminsdk-fbsvc@autonateai-learning-hub.iam.gserviceaccount.com/adc.json';

const studentFolderId = '16_tjSZcqP4ZEUHShC2pr7NCkx-tuWEN9';
const researcherFolderId = '1-TXzXDRLeU3Msd49Fb2IUdgT_7NwnPFw';

const palette = {
  charcoal: {red: 0.10, green: 0.14, blue: 0.19},
  cream: {red: 0.98, green: 0.97, blue: 0.94},
  orange: {red: 0.94, green: 0.51, blue: 0.33},
  teal: {red: 0.49, green: 0.83, blue: 0.78},
  amber: {red: 0.97, green: 0.77, blue: 0.35},
  red: {red: 0.89, green: 0.40, blue: 0.41},
  green: {red: 0.50, green: 0.84, blue: 0.60},
  blue: {red: 0.56, green: 0.72, blue: 0.95},
  lavender: {red: 0.79, green: 0.73, blue: 0.94},
  slate: {red: 0.83, green: 0.87, blue: 0.91},
  white: {red: 1, green: 1, blue: 1},
};

const studentFileMap = new Map(
  studentWorkflows.map((workflow, index) => [workflow.slug, `${String(index + 1).padStart(2, '0')} - ${workflow.sheet.title}`]),
);
const researcherFileMap = new Map(
  researcherWorkflows.map((workflow, index) => [workflow.slug, `${String(index + 1).padStart(2, '0')} - ${workflow.sheet.title}`]),
);

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function getAccessToken() {
  const credentials = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = {alg: 'RS256', typ: 'JWT'};
  const claimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets',
    aud: credentials.token_uri,
    exp: now + 3600,
    iat: now,
  };

  const unsignedJwt = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(claimSet))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(credentials.private_key, 'base64url');
  const assertion = `${unsignedJwt}.${signature}`;

  const response = await fetch(credentials.token_uri, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function apiRequest(url, {method = 'GET', token, body} = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${method} ${url} failed: ${response.status} ${text}`);
  }

  return response.status === 204 ? null : response.json();
}

function makeKeyRows(workflow) {
  const rows = [
    ['Section', 'Instruction'],
    ['Sheet Purpose', workflow.sheet.purpose],
    ['Main Outcome', workflow.sheet.outcome],
    ['How AI Should Use This Sheet', 'Always fill or update the main sheet first. Respect the header meanings, keep values concise, and preserve row height, alignment, and the color system when adding or revising rows.'],
    ['Formatting Rules', 'Keep the main sheet centered vertically and horizontally, use wrapped text, use thicker rows, and preserve header colors.'],
    ['Color Key', 'Blue rows = planning/reference. Amber rows = in progress/review needed. Green rows = complete/high confidence. Red rows = blocked/high risk. Teal rows = supporting context or optional notes.'],
    ['Column Key', workflow.sheet.columns.join(' | ')],
    ['Prompt Pack Reminder', 'The prompts in the dashboard are written for this sheet. Paste the output into the main tab and let the AI Key guide styling choices.'],
  ];

  workflow.prompts.forEach((prompt, index) => {
    rows.push([`Prompt ${index + 1}`, `${prompt.title}: ${prompt.body}`]);
  });

  return rows;
}

function buildBatchUpdateRequests(workflow, mainSheetId, keySheetId) {
  const headerColors = [palette.orange, palette.teal, palette.amber, palette.blue, palette.lavender, palette.green, palette.red];
  const requests = [
    {
      updateSheetProperties: {
        properties: {sheetId: mainSheetId, title: workflow.sheet.title, gridProperties: {frozenRowCount: 1, rowCount: 220, columnCount: workflow.sheet.columns.length}},
        fields: 'title,gridProperties.frozenRowCount,gridProperties.rowCount,gridProperties.columnCount',
      },
    },
    {
      updateSheetProperties: {
        properties: {sheetId: keySheetId, title: 'AI Key', gridProperties: {frozenRowCount: 1, rowCount: 120, columnCount: 2}},
        fields: 'title,gridProperties.frozenRowCount,gridProperties.rowCount,gridProperties.columnCount',
      },
    },
    {
      repeatCell: {
        range: {sheetId: mainSheetId, startRowIndex: 0, endRowIndex: 220, startColumnIndex: 0, endColumnIndex: workflow.sheet.columns.length},
        cell: {
          userEnteredFormat: {
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE',
            wrapStrategy: 'WRAP',
            textFormat: {fontFamily: 'Arial', fontSize: 12},
            backgroundColor: palette.cream,
          },
        },
        fields: 'userEnteredFormat(horizontalAlignment,verticalAlignment,wrapStrategy,textFormat.fontFamily,textFormat.fontSize,backgroundColor)',
      },
    },
    {
      repeatCell: {
        range: {sheetId: keySheetId, startRowIndex: 0, endRowIndex: 120, startColumnIndex: 0, endColumnIndex: 2},
        cell: {
          userEnteredFormat: {
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE',
            wrapStrategy: 'WRAP',
            textFormat: {fontFamily: 'Arial', fontSize: 12},
          },
        },
        fields: 'userEnteredFormat(horizontalAlignment,verticalAlignment,wrapStrategy,textFormat.fontFamily,textFormat.fontSize)',
      },
    },
    {
      updateDimensionProperties: {
        range: {sheetId: mainSheetId, dimension: 'ROWS', startIndex: 0, endIndex: 220},
        properties: {pixelSize: 38},
        fields: 'pixelSize',
      },
    },
    {
      updateDimensionProperties: {
        range: {sheetId: keySheetId, dimension: 'ROWS', startIndex: 0, endIndex: 120},
        properties: {pixelSize: 34},
        fields: 'pixelSize',
      },
    },
    {
      updateDimensionProperties: {
        range: {sheetId: mainSheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1},
        properties: {pixelSize: 46},
        fields: 'pixelSize',
      },
    },
    {
      addBanding: {
        bandedRange: {
          range: {sheetId: mainSheetId, startRowIndex: 0, endRowIndex: 220, startColumnIndex: 0, endColumnIndex: workflow.sheet.columns.length},
          rowProperties: {headerColor: palette.charcoal, firstBandColor: palette.cream, secondBandColor: palette.slate},
        },
      },
    },
    {
      setBasicFilter: {
        filter: {
          range: {sheetId: mainSheetId, startRowIndex: 0, endRowIndex: 220, startColumnIndex: 0, endColumnIndex: workflow.sheet.columns.length},
        },
      },
    },
    {
      repeatCell: {
        range: {sheetId: keySheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 2},
        cell: {
          userEnteredFormat: {
            backgroundColor: palette.charcoal,
            textFormat: {foregroundColor: palette.white, bold: true, fontSize: 13, fontFamily: 'Arial'},
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE',
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat.foregroundColor,textFormat.bold,textFormat.fontSize,textFormat.fontFamily,horizontalAlignment,verticalAlignment)',
      },
    },
    {
      updateDimensionProperties: {
        range: {sheetId: keySheetId, dimension: 'COLUMNS', startIndex: 0, endIndex: 1},
        properties: {pixelSize: 220},
        fields: 'pixelSize',
      },
    },
    {
      updateDimensionProperties: {
        range: {sheetId: keySheetId, dimension: 'COLUMNS', startIndex: 1, endIndex: 2},
        properties: {pixelSize: 760},
        fields: 'pixelSize',
      },
    },
  ];

  workflow.sheet.columns.forEach((_, index) => {
    requests.push({
      repeatCell: {
        range: {sheetId: mainSheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: index, endColumnIndex: index + 1},
        cell: {
          userEnteredFormat: {
            backgroundColor: headerColors[index % headerColors.length],
            textFormat: {foregroundColor: palette.charcoal, bold: true, fontSize: 13, fontFamily: 'Arial'},
            horizontalAlignment: 'CENTER',
            verticalAlignment: 'MIDDLE',
          },
        },
        fields: 'userEnteredFormat(backgroundColor,textFormat.foregroundColor,textFormat.bold,textFormat.fontSize,textFormat.fontFamily,horizontalAlignment,verticalAlignment)',
      },
    });

    requests.push({
      updateDimensionProperties: {
        range: {sheetId: mainSheetId, dimension: 'COLUMNS', startIndex: index, endIndex: index + 1},
        properties: {pixelSize: index === workflow.sheet.columns.length - 1 ? 210 : 170},
        fields: 'pixelSize',
      },
    });
  });

  return requests;
}

async function listFolderFiles(folderId, token) {
  const response = await apiRequest(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)&supportsAllDrives=true&includeItemsFromAllDrives=true&pageSize=100`, {
    method: 'GET',
    token,
  });

  return response.files.filter((file) => file.mimeType === 'application/vnd.google-apps.spreadsheet');
}

async function ensureAiKeySheet(spreadsheetId, token) {
  const spreadsheet = await apiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
    method: 'GET',
    token,
  });

  let mainSheet = spreadsheet.sheets[0];
  let keySheet = spreadsheet.sheets.find((sheet) => sheet.properties.title === 'AI Key');

  if (!keySheet) {
    await apiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      token,
      body: {
        requests: [{addSheet: {properties: {title: 'AI Key'}}}],
      },
    });

    const updated = await apiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`, {
      method: 'GET',
      token,
    });

    mainSheet = updated.sheets[0];
    keySheet = updated.sheets.find((sheet) => sheet.properties.title === 'AI Key');
  }

  return {
    mainSheetId: mainSheet.properties.sheetId,
    keySheetId: keySheet.properties.sheetId,
  };
}

async function formatSpreadsheet(file, workflow, token) {
  const {mainSheetId, keySheetId} = await ensureAiKeySheet(file.id, token);

  await apiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${file.id}:batchUpdate`, {
    method: 'POST',
    token,
    body: {
      requests: buildBatchUpdateRequests(workflow, mainSheetId, keySheetId),
    },
  });

  const keyRows = makeKeyRows(workflow);
  const endColumn = String.fromCharCode(64 + workflow.sheet.columns.length);
  await apiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${file.id}/values:batchUpdate`, {
    method: 'POST',
    token,
    body: {
      valueInputOption: 'RAW',
      data: [
        {range: `${workflow.sheet.title}!A1:${endColumn}1`, values: [workflow.sheet.columns]},
        {range: `AI Key!A1:B${keyRows.length}`, values: keyRows},
      ],
    },
  });

  return {
    sheetId: file.id,
    templateUrl: `https://docs.google.com/spreadsheets/d/${file.id}/edit`,
    copyUrl: `https://docs.google.com/spreadsheets/d/${file.id}/copy`,
  };
}

async function main() {
  const token = await getAccessToken();
  const studentFiles = await listFolderFiles(studentFolderId, token);
  const researcherFiles = await listFolderFiles(researcherFolderId, token);

  const fileLookup = new Map();
  studentFiles.forEach((file) => fileLookup.set(file.name, file));
  researcherFiles.forEach((file) => fileLookup.set(file.name, file));

  const sheetLinks = {};

  for (const workflow of studentWorkflows) {
    const fileName = studentFileMap.get(workflow.slug);
    const file = fileLookup.get(fileName);
    if (!file) {
      throw new Error(`Missing student spreadsheet: ${fileName}`);
    }
    console.log(`Formatting ${file.name}...`);
    sheetLinks[workflow.slug] = await formatSpreadsheet(file, workflow, token);
  }

  for (const workflow of researcherWorkflows) {
    const fileName = researcherFileMap.get(workflow.slug);
    const file = fileLookup.get(fileName);
    if (!file) {
      throw new Error(`Missing researcher spreadsheet: ${fileName}`);
    }
    console.log(`Formatting ${file.name}...`);
    sheetLinks[workflow.slug] = await formatSpreadsheet(file, workflow, token);
  }

  writeFileSync(outputFile, `export const sheetLinks = ${JSON.stringify(sheetLinks, null, 2)};\n`, 'utf8');
  console.log(`Wrote ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
