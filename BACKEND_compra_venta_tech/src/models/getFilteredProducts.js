import getPool from "../db/getPool.js";

export async function getFilteredProducts(filters, isAdmin) {
  const pool = await getPool();
  let query = "";
  if (isAdmin) {
    query = `SELECT * FROM product WHERE is_accepted = false`;
  } else {
    query = `SELECT * FROM product WHERE is_accepted = true AND is_available = true`;
  }

  const values = [];

  // Filtro por texto de búsqueda (si está presente)
  if (filters.query) {
    query += ` AND (name LIKE ? OR description LIKE ?)`;
    values.push(`%${filters.query}%`, `%${filters.query}%`);
  }

  // Filtro por nombre (si está presente)
  if (filters.name) {
    query += ` AND name LIKE ?`;
    values.push(`%${filters.name}%`);
  }

  if (filters.category_id) {
    const categories = filters.category_id.split(",");
    const placeholders = categories.map(() => "?").join(", ");
    query += ` AND category_id IN (${placeholders})`;
    values.push(...categories);
  }

  if (filters.locality) {
    query += ` AND locality LIKE ?`;
    values.push(`%${filters.locality}%`);
  }

  if (filters.min_price) {
    query += ` AND price >= ?`;
    values.push(filters.min_price);
  }

  if (filters.max_price) {
    query += ` AND price <= ?`;
    values.push(filters.max_price);
  }

  if (filters.order_by) {
    const validOrderFields = ["name", "price", "visits", "created_at"];
    const direction = filters.order_direction === "asc" ? "ASC" : "DESC";

    if (validOrderFields.includes(filters.order_by)) {
      query += ` ORDER BY ${filters.order_by} ${direction}`;
    }
  }
  const [products] = await pool.query(query, values);
  return products;
}
