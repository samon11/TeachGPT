import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_KEY
});

const openai = new OpenAIApi(config);

export async function ask_gpt(messages) {
    console.log(JSON.stringify(messages));
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
    });
}

export function codeExercisePrompt(username, language, topic) {
    return {
        role: "system",
        content: `
        You are a code instructor. Your role is to create ${language} code exercises
        for a student named ${username} where the student must either fill in the blank or
        implement the missing function, class, etc. Exercises should include hints as code comments. 
        Hints should be helpful and reference documentation sites but SHOULD NOT INCLUDE CODE FOR THE SOLUTION
        The code exercise must intend to teach ${username} this topic: ${topic}. 
        DO NOT INCLUDE THE SOLUTION.
        ONLY OUTPUT SYNTACTICALLY CORRECT CODE. NO MARKDOWN.
        ONLY CREATE ONE EXERCISE.

        For example if the langauge is python and the comment character is a '#' then output:
        # Exercise: Print hello world
        # Goal: Make the console print "Hello world"
        # Hint: Use the print function below
        import os
        def main():
            # Implement function here
        
        main()
        `
    };
}

export async function askCodeQuestion(question, context) {
    var messages = [
        {
            role: "system",
            content: `
                You are a code instructor. You must answer only coding related questions. 
                If you don't know the answer then try your best to refer them to another resource.
                IF A USER QUESTION OR COMMENT IS NOT CODE/COMPUTER RELATED THEN TELL THE STUDENT TO FOCUS BACK ON THE LESSON MATERIAL.
                REFUSE TO ANSWER OFF TOPIC REQUESTS AT ALL TIMES.
                `
        },
        {
            role: "user",
            content: question
        }
    ]

    if (context) {
        messages = context.concat([
            {
                role: "system",
                content: `
                    You are a code instructor. You must answer only coding related questions. 
                    If you don't know the answer then try your best to refer them to another resource.
                    IF A USER QUESTION OR COMMENT IS NOT CODE/COMPUTER RELATED THEN TELL THE STUDENT TO FOCUS BACK ON THE LESSON MATERIAL.
                    REFUSE TO ANSWER OFF TOPIC REQUESTS AT ALL TIMES.
                    `
            },
            {
                role: "user",
                content: question
            }]);
    }

    const response = await ask_gpt(messages);
    if (response.status === 200) {
        return response.data.choices[0].message.content;
    }
    else
        throw Error("Failed to query OpenAI");
}

export async function getCodeLesson(topic, language) {
    if (topic) {
        const messages = [
            {
                role: 'system',
                content: `
                    You are a code instructor. Generate a short and concise coding
                    lesson in markdown format on this topic: ${topic.trim()}.
                    The lesson must be for the programming language: ${language}.
                    If the topic is not coding/computer related then DO NOT CREATE A LESSON.
                    Students do not have access to a filesytem so the lesson should not instruct them
                    to create or save files. They have access to only an online code editor next to this lesson material.
                    `
            }
        ]
    
        const response = await ask_gpt(messages);
        if (response.status === 200) {
            return response.data.choices[0].message.content;
        }
        else
            throw Error("Failed to query OpenAI");
    }

    return 'Invalid topic, please try another one';
}