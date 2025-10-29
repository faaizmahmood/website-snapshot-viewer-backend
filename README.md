# Website Snapshot Viewer (Backend)

Backend API for fetching website snapshots over time.  
Receives a domain name from the frontend, requests available snapshots, and returns them to the client.

---

## ✅ Why I Built This
Part of a real client project where they needed to generate the website evolution history.  
The backend:
- Handles domain requests
- Fetches snapshot history
- Returns structured results

---

## 🛠 Tech Stack
- **Node.js & Express**
- **Archive.org Snapshot API (Wayback Machine)**
- **CORS & Axios**
- **Deployed on AWS App Runner** 

---

## ✨ Features
- ✅ Public endpoint to request snapshots
- ✅ Validates domains
- ✅ Returns snapshot list
- ✅ Fast response for frontend
