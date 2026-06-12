# Google OAuth Verification – Action Guide for SyncMyDay

## Step 1: Deploy the Privacy Policy

Copy `privacy-policy.html` to your Lovable project's `public/` folder so it is served as a static file at:

```
https://www.syncmyday.co.za/privacy-policy.html
```

**Why this matters:** Lovable (React SPA) renders pages with JavaScript, which Google's
verification crawler cannot read. A file in `public/` is served as plain HTML and is
directly crawlable — fixing the "privacy policy URL is improperly formatted" error.

After deploying, verify the page is crawlable:
1. Open an incognito browser window and visit the URL.
2. Disable JavaScript in DevTools (Settings → Debugger → Disable JavaScript) and reload — content must still be visible.
3. Confirm the URL returns `Content-Type: text/html`.

Update the privacy policy URL in Google Cloud Console to:
`https://www.syncmyday.co.za/privacy-policy.html`

---

## Step 2: Scope Justification (paste into Google Console)

In Google Cloud Console → OAuth Consent Screen → Edit App → Scopes → click the justification field.

### For `https://mail.google.com/` (Full Gmail access)

```
SyncMyDay is a unified communications platform that aggregates multiple email accounts
(Gmail, Outlook) into a single inbox. To provide this service, we require full Gmail access
because the app must:

1. READ messages – to display all incoming and existing emails from the user's Gmail account
   in the unified SyncMyDay inbox, including message headers, body, attachments, and thread
   structure.

2. SEND messages – to allow users to compose and reply to emails directly from the SyncMyDay
   interface, dispatching the email through the user's own Gmail account so that the message
   appears in their Gmail Sent folder.

3. MANAGE mailbox state – to synchronise read/unread status, labels, archiving, and deletion
   actions performed in SyncMyDay back to Gmail, so both interfaces remain consistent.

A narrower scope (e.g., gmail.readonly) would prevent sending and mailbox management,
making the core unified-inbox feature non-functional. The gmail.send scope alone would
prevent reading messages. Only the full gmail scope satisfies all three requirements
simultaneously.
```

### For `https://www.googleapis.com/auth/calendar` (Full Calendar access)

```
SyncMyDay provides a unified calendar that aggregates events from multiple calendar accounts
(Google Calendar, Outlook Calendar) into a single view. Full Calendar access is required
because the app must:

1. READ calendars and events – to display all the user's calendars and their events in the
   unified SyncMyDay calendar view, including event details, attendees, recurrence rules,
   and reminders.

2. CREATE events – to allow users to add new events from within SyncMyDay and have them
   appear in their Google Calendar.

3. UPDATE events – to allow users to edit event details (time, location, description,
   attendees) from the SyncMyDay interface, with changes reflected in Google Calendar.

4. DELETE events – to allow users to remove events from the SyncMyDay interface with
   changes synchronised back to Google Calendar.

5. SEND invitations – to allow users to invite attendees to events from SyncMyDay, using
   their Google account as the organiser.

A read-only scope would prevent any calendar management. The events.readonly scope would
not allow creating or modifying events. Only the full calendar scope enables the complete
create-read-update-delete-invite workflow that the unified calendar feature requires.
```

---

## Step 3: Homepage Requirements

Ensure your homepage (https://www.syncmyday.co.za) is publicly accessible without login.
Google checks:
- [ ] Page loads without authentication
- [ ] Page clearly describes what the app does
- [ ] The registered homepage URL exactly matches what's in Google Cloud Console

---

## Step 4: Re-submit Verification

After completing the above:
1. Go to Google Cloud Console → OAuth Consent Screen
2. Update the Privacy Policy URL to `https://www.syncmyday.co.za/privacy-policy.html`
3. Update scope justifications (copy text from Step 2)
4. Click **Save and Continue**
5. Click **Submit for Verification**
