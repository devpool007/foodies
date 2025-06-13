import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";
import { Pool } from "pg";

const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false, // Accept Render's SSL cert
  },
});

export async function getMeals() {
  // throw new Error("Database connection failed"); // Simulate an error
  // return db.prepare("SELECT * FROM meals").all();
  const res = await pool.query("SELECT * FROM meals");
  return res.rows;
}

export async function getMealBySlug(slug) {
  // throw new Error("Meal not found"); // Simulate an error
  // return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  const res = await pool.query("SELECT * FROM meals WHERE slug = $1", [slug]);
  return res.rows[0];
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions); //Sanitizes HTML against cross site script attacks

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw new Error("Saving image failed!");
  //   }
  // });
  s3.putObject({
    Bucket: "devansharma-nextjs-fapp-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  // Actually run the insert statement
  // db.prepare(
  //   `
  //   INSERT INTO meals
  //     (title, summary, instructions, creator, creator_email, image, slug)
  //     VALUES (
  //     @title, @summary, @instructions, @creator, @creator_email, @image, @slug
  //     )
  // `
  // ).run(meal);
  await pool.query(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      meal.title,
      meal.summary,
      meal.instructions,
      meal.creator,
      meal.creator_email,
      meal.image,
      meal.slug,
    ]
  );
}
