# DocuMaker

A modern, developer-friendly document generator web app that lets users create professional invoices, resumes, certificates, and quotations with ease — and export them instantly as PDFs.

---

## ✨ Overview

**DocuMaker** is built for speed, simplicity, and clean design. Whether you're generating business invoices or polished resumes, the app provides structured templates and seamless PDF export — all within a smooth, responsive interface.

---

## 🚀 Features

- Create **4 document types**
  - Invoice
  - Quotation
  - Resume
  - Certificate
- Instant **PDF download** (server-side generation)
- Secure **user authentication** (sign up, sign in, delete account)
- Save, manage, and revisit documents anytime
- Clean and professional **ready-to-use templates**
- Modern **dark UI** with yellow/orange accents
- Fully **responsive design** (optimized for larger screens)
- Preview templates **without an account**
- Completely **free to use**

---

## 🔐 Protected Routes

The following routes require authentication:

- `/documents` — Access saved documents
- `/use/*` — Create and edit documents

---

## 🛠️ Tech Stack

| Category        | Technology                          |
|----------------|------------------------------------|
| Framework      | Next.js 16 (App Router, Turbopack) |
| Language       | JS/TS                        |
| Authentication | Clerk                              |
| Styling        | Tailwind CSS                       |
| Database       | Prisma + PostgreSQL                |
| PDF Engine     | Server-side generation             |
| Hosting        | Vercel                             |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/virat-pod/docuMaker.git
cd documaker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
```

### 4. Setup database

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the development server

```bash
npm run dev
```

---

## 📦 Project Structure (Simplified)

```
/app            → App Router pages & layouts
/components     → Reusable UI components
/lib            → Database, utilities, configs
/prisma         → Prisma schema & migrations
/styles         → Global styles
```

---

## 📄 Document Workflow

1. User selects a template  
2. Fills in required data  
3. Preview updates in real-time  
4. Server generates PDF  
5. Download instantly  

---

## 🎯 Design Philosophy

- Minimal distractions, maximum clarity  
- Fast interactions with clean UI  
- Practical features over unnecessary complexity  

---

## 📌 Future Improvements

- Template customization (colors, fonts)  
- More document types  
- Cloud storage integration  
- Shareable document links  

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, open issues, or submit pull requests.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 💡 Final Note

DocuMaker is built to simplify document creation — fast, clean, and reliable.
