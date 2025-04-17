import getPool from "../db/getPool.js";

export async function getFilteredProducts(filters) {
  const pool = await getPool();

  let query = `SELECT * FROM product WHERE is_accepted = true`;
  const values = [];

  if (filters.category_id) {
    query += ` AND category_id = ?`;
    values.push(filters.category_id);
  }

  if (filters.locality) {
    query += ` AND locality LIKE ?`;
    values.push(`%${filters.locality}%`);
  }

  if (filters.is_available !== undefined) {
    query += ` AND is_available = ?`;
    values.push(filters.is_available === "true");
  }

  if (filters.order_by) {
    const validOrderFields = ["price", "created_at"];
    const direction = filters.order_direction === "asc" ? "ASC" : "DESC";

    if (validOrderFields.includes(filters.order_by)) {
      query += ` ORDER BY ${filters.order_by} ${direction}`;
    }
  }

  const [products] = await pool.query(query, values);
  return products;
}
