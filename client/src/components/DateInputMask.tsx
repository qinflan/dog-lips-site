import React from 'react'

interface DateInputMaskProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInputMask: React.FC<DateInputMaskProps> = ({ value, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove all non-digits
    const digitsOnly = inputValue.replace(/\D/g, '');
    
    // Format as MM-DD-YYYY
    let formatted = '';
    if (digitsOnly.length > 0) {
      formatted = digitsOnly.substring(0, 2);
      if (digitsOnly.length >= 3) {
        formatted += '-' + digitsOnly.substring(2, 4);
      }
      if (digitsOnly.length >= 5) {
        formatted += '-' + digitsOnly.substring(4, 8);
      }
    }
    
    // Update the input value
    e.target.value = formatted;
    onChange(e);
  };

  return (
    <input
      {...props}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="MM-DD-YYYY"
      maxLength={10}
    />
  );
};

export default DateInputMask;