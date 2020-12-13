import React from 'react';
import { Answer } from './index';

const AnswersList = (props) => {
  return (
    <div className="c-grid__answer">
      <Answer content={ "hoge" }/>
      <Answer content={ "fuga"}/>
      <Answer content={ "foo" }/>
      <Answer content={ "bar" }/>
    </div>
  )
}

export default AnswersList
