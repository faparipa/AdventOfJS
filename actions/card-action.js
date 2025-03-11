'use server';

export async function getCardData(prevState, formData) {
  const formValues = {
    cardNumber: formData.get('cardNumber'),
    cardHolder: formData.get('cardHolder'),
    expirationMonth: formData.get('expirationMonth'),
    expirationYear: formData.get('expirationYear'),
    cvv: formData.get('cvv'),
  };

  //TODO validation
  const validateCardNumber = (cardNumber) => {
    // Luhn algoritmus implementációja
    // ...
  };

  const validateExpirationDate = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    return year >= currentYear && month >= currentMonth;
  };

  //   if (!validateCardNumber(formValues.cardNumber)) {
  //     return { status: 'error', message: 'Invalid card number' };
  //   }

  if (
    !validateExpirationDate(
      formValues?.expirationMonth,
      formValues?.expirationYear
    )
  ) {
    return { status: 'error', message: 'Invalid expiration date' };
  }

  console.log(formValues);
  return { status: 'success', message: 'Card data submitted successfully' };
}
