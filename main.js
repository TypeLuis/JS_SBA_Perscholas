// const SBA_Object = {
//     test : "hello",
//     testing() {console.log(this.test)}
// }

// SBA_Object.testing()





class GradingStudents {
    constructor(){
        this.CourseInfo = {
            id: 451,
            name: "Introduction to JavaScript"
        }

        this.AssignmentGroup = {
            id: 12345,
            name: "Fundamentals of JavaScript",
            course_id: 451,
            group_weight: 25,
            assignments: [
                {
                id: 1,
                name: "Declare a Variable",
                due_at: "2023-01-25",
                points_possible: 50
                },
                {
                id: 2,
                name: "Write a Function",
                due_at: "2023-02-27",
                points_possible: 150
                },
                {
                id: 3,
                name: "Code the World",
                due_at: "3156-11-15",
                points_possible: 500
                }
            ]
        }

        this.LearnerSubmissions = [
            {
                learner_id: 125,
                assignment_id: 1,
                submission: {
                submitted_at: "2023-01-25",
                score: 47
                }
            },
            {
                learner_id: 125,
                assignment_id: 2,
                submission: {
                submitted_at: "2023-02-12",
                score: 150
                }
            },
            {
                learner_id: 125,
                assignment_id: 3,
                submission: {
                submitted_at: "2023-01-25",
                score: 400
                }
            },
            {
                learner_id: 132,
                assignment_id: 1,
                submission: {
                submitted_at: "2023-01-24",
                score: 39
                }
            },
            {
                learner_id: 132,
                assignment_id: 2,
                submission: {
                submitted_at: "2023-03-07",
                score: 140
                }
            }
            ]
    }

    getLearnerData() {
        const ag = this.AssignmentGroup
        const course = this.CourseInfo
        const submissions = this.LearnerSubmissions

        try {

            if(ag.course_id !== course.id){
                throw new Error("Invalid Identification: Assignment group ID doesn't equal to course ID")
            }
        
            const idOfAssignment = {}
            for(let a of ag.assignments) idOfAssignment[a.id] = a
        
            const students = {}
            const result = []
        
            for(const record of submissions){
                const studentId = record.learner_id
                const assignmentId = record.assignment_id
        
                const assignment = idOfAssignment[assignmentId]
        
                if(!assignment) continue
        
                const pointsPossible = assignment.points_possible
                const dueDate = new Date(assignment.due_at)
                const submissionDate = new Date(record.submission.submitted_at)
                let score = record.submission.score
                const todayDate = new Date()
        
                
                // console.log(studentId, assignmentId, assignment)
                // console.log(dueDate, submissionDate, score)
                
                if (dueDate > todayDate) continue
                if (submissionDate > dueDate) score -= pointsPossible * .1
                if (score < 0) score = 0 // If subtracting score made it less than 0
        
                // console.log(studentId, score, pointsPossible)
                // console.log(assignmentId)
        
                if(!students[studentId]){
                    students[studentId] = {
                        id: studentId,
                        totalEarned: 0,
                        totalPossible: 0,
                        scores: {}
                    }
                    // obj.score = {}
                }
        
                /*
                    BLOCKER: was going to create an obj without initializing it previosly 
                    making it refresh the scores obj everytime. The best way to get 
                    around that was to initialize the object outside and inside the loop.
                    Inside the loop, if obj[id] doesn't exist is the only time it would
                    initalize. Initialized keys with their values too to make sure the
                    code can += as well. Will leave some code commented out
                */
                // const obj = {}
                // students[studentId].scores = {}
                students[studentId]["id"] = studentId
                students[studentId]["totalEarned"] += score
                students[studentId]["totalPossible"] += pointsPossible
                students[studentId]["scores"][assignmentId] = score / pointsPossible
                // console.log(obj)
                // students[studentId] = obj
        
            }
            // console.log(students)
        
            for(const key in students){
                const student = students[key]
                // console.log(student)
        
                if(student.totalPossible === 0){
                    delete students[key]
                    continue
                }
        
                const obj = {
                    id: student.id,
                    avg: student.totalEarned / student.totalPossible
                }
        
                for(const key in student.scores) obj[key] = Number(student.scores[key].toFixed(3))
        
                result.push(obj)
            }
        
            return result;
        } catch (error) {
            console.error(error.message)
            return []
        }
    }

}




const grades = new GradingStudents

console.log(grades.getLearnerData())








// // The provided course information.
// const CourseInfo = {
// id: 451,
// name: "Introduction to JavaScript"
// };

// // The provided assignment group.
// const AssignmentGroup = {
// id: 12345,
// name: "Fundamentals of JavaScript",
// course_id: 451,
// group_weight: 25,
// assignments: [
//     {
//     id: 1,
//     name: "Declare a Variable",
//     due_at: "2023-01-25",
//     points_possible: 50
//     },
//     {
//     id: 2,
//     name: "Write a Function",
//     due_at: "2023-02-27",
//     points_possible: 150
//     },
//     {
//     id: 3,
//     name: "Code the World",
//     due_at: "3156-11-15",
//     points_possible: 500
//     }
// ]
// };

// // The provided learner submission data.
// const LearnerSubmissions = [
// {
//     learner_id: 125,
//     assignment_id: 1,
//     submission: {
//     submitted_at: "2023-01-25",
//     score: 47
//     }
// },
// {
//     learner_id: 125,
//     assignment_id: 2,
//     submission: {
//     submitted_at: "2023-02-12",
//     score: 150
//     }
// },
// {
//     learner_id: 125,
//     assignment_id: 3,
//     submission: {
//     submitted_at: "2023-01-25",
//     score: 400
//     }
// },
// {
//     learner_id: 132,
//     assignment_id: 1,
//     submission: {
//     submitted_at: "2023-01-24",
//     score: 39
//     }
// },
// {
//     learner_id: 132,
//     assignment_id: 2,
//     submission: {
//     submitted_at: "2023-03-07",
//     score: 140
//     }
// }
// ];

// function getLearnerData(course, ag, submissions) {
// // here, we would process this data to achieve the desired result.

// try {

//     if(ag.course_id !== course.id){
//         throw new Error("Invalid Identification: Assignment group ID doesn't equal to course ID")
//     }

//     const idOfAssignment = {}
//     for(let a of ag.assignments) idOfAssignment[a.id] = a

//     const students = {}
//     const result = []

//     for(const record of submissions){
//         const studentId = record.learner_id
//         const assignmentId = record.assignment_id

//         const assignment = idOfAssignment[assignmentId]

//         if(!assignment) continue

//         const pointsPossible = assignment.points_possible
//         const dueDate = new Date(assignment.due_at)
//         const submissionDate = new Date(record.submission.submitted_at)
//         let score = record.submission.score
//         const todayDate = new Date()

        
//         // console.log(studentId, assignmentId, assignment)
//         // console.log(dueDate, submissionDate, score)
        
//         if (dueDate > todayDate) continue
//         if (submissionDate > dueDate) score -= pointsPossible * .1
//         if (score < 0) score = 0 // If subtracting score made it less than 0

//         // console.log(studentId, score, pointsPossible)
//         // console.log(assignmentId)

//         if(!students[studentId]){
//             students[studentId] = {
//                 id: studentId,
//                 totalEarned: 0,
//                 totalPossible: 0,
//                 scores: {}
//             }
//             // obj.score = {}
//         }

//         /*
//             BLOCKER: was going to create an obj without initializing it previosly 
//             making it refresh the scores obj everytime. The best way to get 
//             around that was to initialize the object outside and inside the loop.
//             Inside the loop, if obj[id] doesn't exist is the only time it would
//             initalize. Initialized keys with their values too to make sure the
//             code can += as well. Will leave some code commented out
//         */
//         // const obj = {}
//         // students[studentId].scores = {}
//         students[studentId]["id"] = studentId
//         students[studentId]["totalEarned"] += score
//         students[studentId]["totalPossible"] += pointsPossible
//         students[studentId]["scores"][assignmentId] = score / pointsPossible
//         // console.log(obj)
//         // students[studentId] = obj

//     }
//     // console.log(students)

//     for(const key in students){
//         const student = students[key]
//         // console.log(student)

//         if(student.totalPossible === 0){
//             delete students[key]
//             continue
//         }

//         const obj = {
//             id: student.id,
//             avg: student.totalEarned / student.totalPossible
//         }

//         for(const key in student.scores) obj[key] = Number(student.scores[key].toFixed(3))

//         result.push(obj)
//     }

//     return result;
// } catch (error) {
//     console.error(error.message)
//     return []
// }
// }

// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);
  
// /*

// {
//     id: 125,
//     avg: 0.985, // (47 + 150) / (50 + 150)
//     1: 0.94, // 47 / 50
//     2: 1.0 // 150 / 150
//     },
//     {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833 // late: (140 - 15) / 150
// }

// */