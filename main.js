const question = document.querySelector(".question")
const options = document.querySelectorAll(".option")
const solve = document.querySelector(".solve")
const attempt = document.querySelector(".attempt")
const score = document.querySelector(".score")
const btn = document.querySelector(".btn")

async function getdata() {
    const data = await fetch("https://opentdb.com/api.php?amount=50&category=22&difficulty=easy&type=multiple")
    return await data.json()
}

async function quiz() {
    const result = await getdata()
    let index = 0
    let solveans = 0
    let attemptque = 0

    function showQuestion() {
        const current = result.results[index]
        question.textContent = current.question

        const answers = [...current.incorrect_answers, current.correct_answer]
        answers.sort(() => Math.random() - 0.5)

        options.forEach((option, i) => {
            option.textContent = answers[i]
            option.onclick = () => {   // reset old event
                attemptque++
                if (option.textContent === current.correct_answer) {
                    solveans++
                }

                attempt.textContent = `Attempt Question: ${attemptque}`
                solve.textContent = `Solve Question: ${solveans}`

                const percent = Math.round((solveans / attemptque) * 100)
                score.textContent = `Total Score: ${percent}%`

                // move to next question
                index++
                if (index < result.results.length) {
                    showQuestion()
                } else {
                    question.textContent = "Quiz Completed 🎉"
                    options.forEach(opt => opt.textContent = "")
                }
            }
        })
    }

    showQuestion()
}

quiz()
