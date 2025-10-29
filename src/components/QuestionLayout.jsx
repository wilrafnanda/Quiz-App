import React from 'react'
import QuestionBoard from './QuestionBoard'





function QuestionLayout({amount, category, difficulty, mode, onExit}) {
  return (
    <div className='flex items-center justify-center min-h-full'>
      <QuestionBoard  amount={amount}
                      category={category}
                      difficulty={difficulty}
                      mode={mode}
                      onExit={onExit}/>
    </div>
  )
}

export default QuestionLayout
