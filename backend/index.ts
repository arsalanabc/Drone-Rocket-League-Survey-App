import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";

// this is a top-level await

let db: any = null;
const table = "response";

(async () => {
  // open the database
  db = await open({
    filename: "database.db",
    driver: sqlite3.Database,
  });
  const name = "asd";
  const dob = "asd";

  db.run(`
      CREATE TABLE IF NOT EXISTS ${table} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar(255),
        happy int,
        energetic int,
        hopefull int,
        sleep int,
        dob text)`);

  // const result = await db.all(`SELECT * FROM ${table}`);
})();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.get("/add", async (req, res) => {
  const { name, dob, happy, energetic, hopefull, sleep } = req.query;
  const formattedDOB = new Date(dob as string).toISOString();
  const q = `INSERT INTO ${table} (id, name, dob, happy, energetic, hopefull, sleep)
  VALUES (null, "${name}", "${formattedDOB}", ${happy}, ${energetic}, ${hopefull}, ${sleep})`;
  console.log(await db.exec(q));

  const result = await db.all(
    `SELECT * FROM ${table} WHERE name = ? AND dob = ?`,
    name,
    formattedDOB
  );

  result.pop(); //remove latest response
  const n = Math.max(result.length, 1); // Avoid divide by zero
  const happyScore = result.reduce((a: any, b: any) => {
    return a + b.happy;
  }, 0);
  const energeticScore = result.reduce((a: any, b: any) => {
    return a + b.energetic;
  }, 0);
  const hopefullScore = result.reduce((a: any, b: any) => {
    return a + b.hopefull;
  }, 0);
  const sleepScore = result.reduce((a: any, b: any) => {
    return a + b.sleep;
  }, 0);

  const ageStats = await db.all(
    `SELECT * FROM ${table} WHERE NOT name = ?`,
    name
  );

  const numOfSameAge = Math.max(ageStats.length, 1);
  const sameAge: any[] = [];
  ageStats.forEach((e: any) => {
    if (calculateAge(d) == calculateAge(new Date(e.dob))) {
      sameAge.push(e);
    }
  });
  console.log(sameAge);

  const data = [
    {
      name: "happy",
      Today: happy,
      Average: happyScore / n,
      "Same Age":
        sameAge.reduce((a, b) => {
          return a + b.happy;
        }, 0) / numOfSameAge,
    },
    {
      name: "energetic",
      Today: energetic,
      Average: energeticScore / n,
      "Same Age":
        sameAge.reduce((a, b) => {
          return a + b.energetic;
        }, 0) / numOfSameAge,
    },
    {
      name: "sleep",
      Today: sleep,
      Average: sleepScore / n,
      "Same Age":
        sameAge.reduce((a, b) => {
          return a + b.sleep;
        }, 0) / numOfSameAge,
    },
    {
      name: "hopefull",
      Today: hopefull,
      Average: hopefullScore / n,
      "Same Age":
        sameAge.reduce((a, b) => {
          return a + b.hopefull;
        }, 0) / numOfSameAge,
    },
  ];
  console.log(data);

  res.send(data);
});

app.get("/results", async (req, res) => {
  console.log(req.query);
  const result = await db.all(`SELECT * FROM ${table}`);

  console.log(result);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  res.json(result);
});

function calculateAge(dob: Date) {
  var ageDifMs = Date.now() - dob.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
