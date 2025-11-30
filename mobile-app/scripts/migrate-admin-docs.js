/*
Migration helper (run locally with Firebase Admin SDK)

Purpose:
- For each Firebase Auth user, ensure there's a Firestore document at `users/{uid}`.
- If missing but a document exists in `users` collection with the same email (created earlier with auto-id), copy that document to `users/{uid}` and set/normalize role to 'Admin' if the source role was 'admin'.

Usage:
1) Install dependencies: npm i firebase-admin
2) Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON
3) Run: node scripts/migrate-admin-docs.js

CAVEATS:
- This script requires a service account with Firestore + Auth admin permissions.
- It does a best-effort mapping by email. Review results in the console and in Firestore before deleting any docs.
*/

const admin = require('firebase-admin');

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS to path of your service account JSON');
  process.exit(1);
}

admin.initializeApp();

const auth = admin.auth();
const db = admin.firestore();

async function migrate() {
  console.log('Starting migration: ensure users/{uid} exists for auth users');

  // Get all auth users (paginated)
  let nextPageToken;
  let processed = 0;
  do {
    const listUsersResult = await auth.listUsers(1000, nextPageToken);
    nextPageToken = listUsersResult.pageToken;

    for (const userRecord of listUsersResult.users) {
      const uid = userRecord.uid;
      const email = (userRecord.email || '').toLowerCase();

      const userDocRef = db.collection('users').doc(uid);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        // Document already present at users/{uid}
        processed++;
        continue;
      }

      // Try to find an auto-id doc with same email
      const snapshot = await db.collection('users').where('email', '==', email).get();
      if (snapshot.empty) {
        console.log(`No user doc found for auth user ${uid} (${email})`);
        continue;
      }

      // If multiple matches, pick first (log the rest)
      const srcDoc = snapshot.docs[0];
      const srcData = srcDoc.data();

      // Normalize role if needed
      let role = (srcData.role || '').toString();
      const lower = role.toLowerCase();
      const normalizedRole = lower === 'admin' ? 'Admin' : lower === 'faculty' ? 'Faculty' : 'Student';

      // Compose new doc
      const newDoc = {
        ...srcData,
        uid,
        email,
        role: normalizedRole,
        migratedFrom: srcDoc.id,
        migratedAt: new Date().toISOString(),
      };

      await userDocRef.set(newDoc);
      console.log(`Copied user doc ${srcDoc.id} -> users/${uid}`);
      processed++;
    }
  } while (nextPageToken);

  console.log(`Migration finished. Processed ${processed} auth users.`);
}

migrate().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
