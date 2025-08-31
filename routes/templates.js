import { Router } from "express";
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    deleteTemplateById
}
    from "../controllers/index.js";
export const templateRouter = Router();

templateRouter.post("/create", createTemplate);
templateRouter.get("/", getAllTemplates);
templateRouter.get("/:id", getTemplateById);
templateRouter.delete("/:id", deleteTemplateById);