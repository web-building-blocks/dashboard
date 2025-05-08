# Dashboard Project

A modern, full-stack dashboard web application built with Next.js, TypeScript, Tailwind CSS, MongoDB (local), and ShadCN UI. This project provides data visualization, customer insights, sales tracking, and supports theming and component modularity.



## Tech Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** Node.js, MongoDB (Local)
- **Utilities:** tsx, dotenv, ts-node
- **UI Features:** Dark mode, search, filters, charts, calendar, and dynamic routing



## Project Structure

```
.
├── app/
├── components/
│   └── ui/                 # ShadCN components
├── data/                  # Seed data
├── lib/                   # MongoDB connection, utilities
├── public/                # Static assets
├── scripts/               # Seed script
│   └── seed.ts
├── .env.local             # Environment variable for MongoDB
├── package.json
└── tsconfig.json
```



## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dashboard-project.git
cd dashboard-project
```

### 2. Install Dependencies

```bash
npm install
```

> If you encounter dependency conflicts (e.g., from `react-day-picker`), run:
>
```bash
npm install --legacy-peer-deps
```

---

### 3. Configure Local MongoDB

### 3.1. Install Dependencies

You need to install the required packages:

```bash
npm install mongodb dotenv
```

We use `npx --yes tsx` to run TypeScript directly without requiring project-local installation:

```bash
npm install --save-dev tsx
```

> If your environment has dependency issues, you can skip installing `tsx` and run using:
> `npx --yes tsx scripts/seed.ts`

---

### 3.2. Create Environment Variable File

Create a `.env.local` file in your project root:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
```

Make sure your MongoDB service is running locally and accessible at the given URI.

---

### 3.3. Run the Seed Script

Once setup is complete, run:

```bash
npm run seed
```

This will import all the data files from the `data/` folder into your local MongoDB `dashboard` database. Each target collection will be cleared before insertion.

---

### 3.4. Seeded Collections

The following collections will be created:

- `customers_acme_inc`
- `customers_monsters`
- `customers_personal`
- `sales_acme_inc`
- `sales_monsters`
- `sales_personal`

---

### 📄 Notes

- This script is intended for development and testing environments.

- All existing data in the targeted collections will be removed before new data is inserted.

  

## 4. Run the Seed Script

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Lint code
npm run seed     # Seed local MongoDB database
```

