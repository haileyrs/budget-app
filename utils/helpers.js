// date picker
export const datePickerOptions = (date) => {
  let data = {
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: '',
      todayBtn: '',
      clearBtn:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content',
      icons: '',
      text: '',
      disabledText: 'text-secondary dark:text-secondary',
      input:
        'bg-base-100 text-neutral border-primary dark:bg-base-100 dark:text-neutral dark:border-primary',
      inputIcon: '',
      selected:
        'bg-primary text-primary-content dark:bg-primary dark:text-primary-content'
    },
    defaultDate: new Date(),
    language: 'en'
  };
  
  if (date) {
    data.defaultDate = new Date(date)
  };
  return data
};