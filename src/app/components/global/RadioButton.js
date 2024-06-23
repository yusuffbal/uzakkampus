// RadioButton.js
import React from 'react';

const RadioButton = ({ text, checked, onChange }) => (
    <div>
        <input type="radio" checked={checked} onChange={onChange} />
        <label>{text}</label>
    </div>
);

export default RadioButton;
