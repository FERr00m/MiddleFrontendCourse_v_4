const errorsText = {
  noInput: 'No input provided.',
  invalidInput: 'Invalid input. It must be a string.',
  invalidDate: 'Invalid date. It must be a valid date string.',
  invalidDateFormat:
    'Invalid date. It must be a valid date string in the format YYYY-MM-DD.',
  invalidDateObject: 'Invalid date. Cannot be converted to a date object.',
};

const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;

export { errorsText, HOUR_IN_MILLISECONDS };
