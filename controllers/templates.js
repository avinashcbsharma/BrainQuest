import { QuestionTemplate, QuestionTemplateMetadata, Template } from "../models/index.js";
import mongoose from "mongoose";

export const getAllTemplates = async (req, res, next) => {
    try {
        const templates = await Template.find();
        return res.status(200).json({
            success: true,
            data: templates.length ? templates : "No Template data found",
            message: "getAllTemplates",
        });
    } catch (er) {
        const error = new Error("Fail to fetch Templates",
            { cause: er }
        );
        return next(error);
    }
};

export const getTemplateById = async (req, res, next) => {
    const { id } = req.params
    try {
        console.log("ID, req.params.id: ",id,req.params.id);
        
        if (!id) {
            const error = new Error("Template-ID required",
                { cause: new Error("Template-ID required") }
            );
            return next(error);
        }
        const template = await Template.findById(id);
        return res.status(200).json({
            success: true,
            data: template,
            message: "getTemplateById",
        });
    } catch (er) {
        const Error = new Error("Failed to fetch the Template by ID",
            { cause: er }
        );
        return next(Error);
    }
};

export const deleteTemplateById = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            error.status = 400;
            return next(error);
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error("Invalid Template-ID format");
            error.status = 400;
            return next(error);
        }
        const template = await Template.findByIdAndDelete(id);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found"
            });
        }
        return res.status(200).json({
            Success: true,
            TemplateID: id,
            message: "Template deleted successfully"
        });

    } catch (er) {
        const error = new Error("Failed to delete Template By Id",
            { cause: er }
        );
        next(error);
    }

};

export const createTemplate = async (req, res, next) => {
    try {
        const { questionTemplates: questionTemplateJson } = req.body;
        const template = new Template(req.body);

        const questionTemplates = questionTemplateJson.map((qn_Template) => 
            new QuestionTemplate(qn_Template),);

        template.questionTemplates = questionTemplates;
        const savedTemplate = await template.save();

        return res.status(201).json({
            success: true,
            message: "Template created successfully.",
            data: savedTemplate,
        })

    } catch (er) {
        const error = new Error("Failed to create template", {
            cause: er,
        });
        return next(error);
    }
};