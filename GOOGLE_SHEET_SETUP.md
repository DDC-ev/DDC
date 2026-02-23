# Google Sheets Integration Setup

To store your form data in Google Sheets, follow these steps:

## 1. Create a Google Sheet

- Create a new Google Sheet.
- Give it a name like "DDC Form Submissions".
- Rename the first sheet tab to `Sheet1` (this is usually the default).
- Create headers in the first row. Use headers that match your form field `name` attributes:
  - For **Contact Form**: `timestamp`, `name`, `email`, `phone`, `subject`, `message`
  - For **Booking Form**: `timestamp`, `name`, `email`, `vehicle_model`, `date`, `time`
  - For **Newsletter**: `timestamp`, `email`, `type` (e.g., "newsletter")

## 2. Set up the Google Apps Script

- In your Google Sheet, go to **Extensions** > **Apps Script**.
- Delete any existing code and paste the following script:

```javascript
/**
 * DDC Form Handler - Google Apps Script
 * Receives POST requests from HTML forms and saves them to Google Sheets.
 */

const SHEET_NAME = "Sheet1";

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // Wait for 10 seconds to get the lock

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const headers = sheet
      .getRange(1, 1, 1, sheet.getLastColumn())
      .getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function (header) {
      if (header === "timestamp") return new Date();
      return e.parameter[header] || "";
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy the Script as a Web App

- Click the **Deploy** button > **New deployment**.
- Select type: **Web app**.
- Description: "DDC Form Handler".
- Execute as: **Me**.
- Who has access: **Anyone** (This is required for public form submissions).
- Click **Deploy**.
- Copy the **Web App URL**. It will look like `https://script.google.com/macros/s/.../exec`.

## 4. Update the Code

- Open your JavaScript form handler (or the HTML file where `scriptURL` is defined).
- Replace the existing `scriptURL` with your new **Web App URL**.

---

**Note:** Always keep your Web App URL private if possible, although for client-side forms, it is visible in the network tab. The Apps Script handles the "POST" request and appends data securely.
