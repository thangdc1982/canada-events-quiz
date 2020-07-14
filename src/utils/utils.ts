import {DataSet} from './DataSet';

export const fetchQuizQuestions = (total_question: number): any[] => {  
  // Get the total length of the data set
  let len = DataSet.length;
  if (total_question > len) {
    total_question = len - 1;
  }
  let data = [...DataSet].sort(() => Math.random() * 0.5);    
  return data.slice(0, total_question);  
}