function validateTask(text) {
  const errors = {};

  if (!text) {
    errors.name = 'Task can not be empty';
  }
  return errors;
}

export { validateTask };