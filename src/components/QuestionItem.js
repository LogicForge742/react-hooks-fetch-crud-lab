import React from "react";

function QuestionItem({ question,onDelete,handleUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = Array.isArray(answers) 
  ?  answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  )) :null
  

function updateQuiz(event){

  const newCorrectIndex = Number(event.target.value)
  fetch(`http://localhost:4000/questions/${question.id}` ,{
     method: "PATCH",
     headers :{
      "Content-Type" :"application/json",
     },
     body:JSON.stringify({
      correctIndex :newCorrectIndex
     }),


  })
  .then((res) => res.json())
  .then( updatedQuiz => handleUpdate(updatedQuiz))

}

  function handleDelete(){
    
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method :'DELETE',
    })

    .then((res) =>res.json())
     .then((deQuiz) => {
        if (deQuiz && deQuiz.id) {
          onDelete(deQuiz);
        } else {
          // If backend returns nothing, fallback to current question
          onDelete(question);
        }
  })
}

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateQuiz}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
