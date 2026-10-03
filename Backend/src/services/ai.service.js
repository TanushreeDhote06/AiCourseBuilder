const { GoogleGenAI } = require("@google/genai")
const z = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// const interviewReportSchema = z.object({
//     matchScore: z.number().min(0).max(100).describe("The match score between the job description and the candidate's resume, ranging from 0 to 100, 0 is the lowest possible match and 100 is the best possible match"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to ans this question, what points to cover, what approach to take,etc."),
//     }).
//         describe("List of Techincal questions that can be asked in the interview along with their intentions ans how to ans them")),

//     behaviouralQuestions: z.array(z.object({
//         question: z.string().describe("The behavioural question can be asked in the interview"),
//         intention: z.string().describe("The intention of the interviewer behind asking this question"),
//         answer: z.string().describe("How to ans this question, what points to cover, what approach to take,etc.")
//     }).
//         describe("List of behavioural questions that can be asked in the interview along with their intentions ans how to ans them")),

//     skillGap: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap:low,medium,high")
//     }).
//         describe("List of skill gaps and its severity to be filled")),
//     preparationPlan: z.array(z.object({
//         day: z.number().
//             describe("The day number in the preparation plan starting from 1"),
//         focus: z.string().describe("The focus area of the preparation for this day"),
//         tasks: z.array(z.string().describe("The list of tasks to be done for the preparation for this day"))
//     }).
//         describe("The daywise preparation plan for the candidate to follow in order to prepare for the interview"))
// })

 interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("The match score between the job description and the candidate's resume, ranging from 0 to 100, 0 is the lowest possible match and 100 is the best possible match"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to ans this question, what points to cover, what approach to take,etc."),
    }).
        describe("List of Techincal questions that can be asked in the interview along with their intentions ans how to ans them")),

    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The behavioural question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to ans this question, what points to cover, what approach to take,etc.")
    }).
        describe("List of behavioural questions that can be asked in the interview along with their intentions ans how to ans them")),

    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap:low,medium,high")
    }).
        describe("List of skill gaps and its severity to be filled")),
    preparationPlan: z.array(z.object({
        day: z.number().
            describe("The day number in the preparation plan starting from 1"),
        focus: z.string().describe("The focus area of the preparation for this day"),
        tasks: z.array(z.string().describe("The list of tasks to be done for the preparation for this day"))
    }).
        describe("The daywise preparation plan for the candidate to follow in order to prepare for the interview"))
})


async function generateInterviewReport({ jobDescription, resume, selfDescription }) {

    const prompt = `Generate an interview report for a candidate with the following details:
    jobDescription: ${jobDescription}
    resume: ${resume}
    selfDescription: ${selfDescription}
    Analyze the candidate against the job description.

For technicalQuestions:
- Generate realistic technical interview questions based on the JD and resume.
- Explain what the interviewer is trying to evaluate.
- Explain what the candidate should cover in their answer.

For behaviouralQuestions:
- Generate realistic behavioural questions.
- Explain the interviewer's intention.
- Give guidance on how the candidate should structure the answer.

For skillGap:
- Identify skills required by the job that are missing or weak in the candidate's profile.
- Assign low, medium, or high severity.

For preparationPlan:
- Create a practical day-wise preparation plan.
- Start day numbering from 1.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
        }
    });
    const report = interviewReportSchema.parse(
        JSON.parse(response.text)
    );

    return report;
}


// async function invokeGeminiAI() {
//     const response = await ai.models.generateContent({
//         model: "gemini-3.8-flash",
//         contents: "hello gemini, write something good about the name tanushree",
//     })
//     console.log(response.text)
// }

module.exports = generateInterviewReport
