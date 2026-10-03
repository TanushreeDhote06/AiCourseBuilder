const mongoose = require("mongoose");

/**
 * -job description:string
 * -resume text:string
 * -self description:string
 * 
 * -matchscore:number
 * -technical questions :[{
 *                         question:"",
 *                          intention:"",
 *                          ans:"" 
 *                          }]
 * -Behavioural questions:[{
 *                         question:"",
 *                          intention:"",
 *                          ans:"" 
 *                          }]
 * -skill gaps:[{
 *                 skill:string,
 *                  severity:string,{
 *                      enum:["low","medium","high"]
 *                      }
 *              }]
 * -prep plan:[{
 *          day:number
 *          focus:string,
 *          tasks:[
 *              string
 *          ]
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    ans: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const BehaviouralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    ans: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, { _id: false })

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks is required"]
    }
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestionSchema: [technicalQuestionSchema],
    behaviouralQuestionSchema: [BehaviouralQuestionSchema],
    skillGapSchema: [skillGapSchema],
    preparationPlanSchema: [preparationPlanSchema]
}, { timestamps: true })

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema)

module.exports = interviewReportModel