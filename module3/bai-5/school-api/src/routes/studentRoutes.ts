import { Request, Response, NextFunction, Router } from "express";
import pool from "../db/pool";
import { Ok } from "../help/helper";

const router = Router();

router.get("/",async (request: Request, respone: Response, next: NextFunction) => {
    try {
        let data = await pool.query("Select * FROM students");
        console.log(data.rows);
        Ok(respone, data.rows);
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", (request: Request, respone: Response, next: NextFunction) => {

})

router.get("/:id/grades", (request: Request, respone: Response, next: NextFunction) => {

})

router.post("/", (request: Request, respone: Response, next: NextFunction) => {

})

router.post("/:id/grades", (request: Request, respone: Response, next: NextFunction) => {

})

router.patch("/:id", (request: Request, respone: Response, next: NextFunction) => {

})

export default router;
