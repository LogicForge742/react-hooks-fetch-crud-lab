import React,{useState,useEffect} from "react";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[quiz ,setQuiz] = useState([])


  useEffect(() =>{

  fetch("http://localhost:4000/questions")
      .then((res) =>{
        if(!res.ok){
          throw new Error(" Network response was not successful")
        } 
        return res.json()
      })
    
      .then(questions =>setQuiz(questions))
      .catch((error) => console.error('Fetch error:' ,error))
  } , [])

      function handleNewQuiz(newQuiz){
        setQuiz( (prevQuiz)=>[...prevQuiz ,newQuiz])
      }
      function onDelete(deQuiz){
         setQuiz((prevQuiz) => prevQuiz.filter((qu) => qu.id !== deQuiz.id));
      }

      function handleUpdate(updatedQuiz){
       const itemsUpdate = quiz.map((question) =>{
       if(question.id ===updatedQuiz.id){
        return updatedQuiz
       } else{
        return question
       }
       })
       setQuiz(itemsUpdate)

      }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{ quiz.map((question) =>
       <QuestionItem key  ={question.id} 
       question={question} onDelete ={onDelete}  handleUpdate ={handleUpdate}
       />
    )
        }</ul>
      <QuestionForm handleNewQuiz ={handleNewQuiz}/>
    </section>
  );
}

export default QuestionList;
