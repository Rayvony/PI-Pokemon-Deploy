function validateFields(fieldsToCheck) {
  const missingFields = [];
  const nonNumericFields = [];

  // Validación para name
  if (!fieldsToCheck.name || typeof fieldsToCheck.name !== 'string' || fieldsToCheck.name.trim() === '') {
    missingFields.push('name');
  }
  // Validación para el resto
  for (const field in fieldsToCheck) {
    if (field !== 'name') {
      if (!fieldsToCheck[field]) {
        if (field !== 'type2') {
          missingFields.push(field);
        }
      } else if (field !== 'type2' && isNaN(fieldsToCheck[field])) {
        nonNumericFields.push(field);
      }
    }
  }

  const errors = [];

  if (missingFields.length > 0) {
    errors.push(`Falta llenar estos campos: ${missingFields.join(', ')}`);
  }

  if (nonNumericFields.length > 0) {
    errors.push(`Estos campos no se llenaron con un Integer: ${nonNumericFields.join(', ')}`);
  }

  return errors;
}

module.exports = {
  validateFields,
};

