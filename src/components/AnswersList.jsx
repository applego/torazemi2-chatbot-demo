import React from 'react';
import { Answer } from './index';

const AnswersList = (props) => {
  return (
    <div className="c-grid__answer">
      {props.answers.map((answer, index) => {
        return <Answer content={answer.content} nextId={answer.nextId} key={index.toString()} select={ props.select }/>
      })}
    </div>
  )
}

export default AnswersList
