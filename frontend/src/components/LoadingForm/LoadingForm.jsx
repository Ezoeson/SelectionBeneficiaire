import React from 'react';

function LoadingForm() {
  return (
    <div className='card'>
      <div className='loader'>
        <p>loading</p>
        <div class='words'>
          <span class='word'>Formulaire</span>
          <span class='word'>Categories questions</span>
          <span class='word'>Questions</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingForm;
