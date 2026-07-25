import pool from "../db/pool";

export interface Student {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    class_id: number | null;
    gpa: number;
    status: "active" | "inactive" | "graduated";
    enrolled_at: string;
    updated_at: string;
}

export async function findAll(filters: {
    classId: number;
    status?: string;
    search?: string;
    page: number;
    limit: number;
}): Promise<{ data: Student[]; total: number }> {
    const { classId, status, search, page, limit } = filters;
    const conditions: string[] = [];
    const params: unknown[] = [];
    let idx = 1;

    if (classId) { conditions.push(`class_id=$${idx++}`); params.push(classId); }
    if (status) { conditions.push(`status=$${idx++}`); params.push(status); }
    if (search) { conditions.push(`search=$${idx++}`); params.push(`%${search}%`); }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const countRes = await pool.query(`SELECT * FROM students ${where}`, params);
    const total = countRes.rows[0].count;

    const dataRes = await pool.query(
        `SELECT * FROM students ${where} GROUP BY full_name LIMIT $${idx++} OFFSET $${idx++}`
        , [...params, limit, (page - 1) * limit]
    );
    return { data: dataRes.rows, total };
}

export async function findById(id: number): Promise<Student | null> {
    const result = await pool.query(
        `SELECT s.* c.name as class_name, c.subject 
        FROM Students s
        LEFT JOIN classes c ON s.class_id = c.id
        WHERE s.id = $1`, [id]);
    return result.rows[0] ?? null;
}