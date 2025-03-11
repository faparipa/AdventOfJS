'use server';
export async function signup(prevState, formData) {
  const formValues = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let errors = {};

  if (formValues.name.trim().length < 2) {
    errors.name = 'Please enter a valid name';
  }
  if (!validateEmail(formValues.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (formValues.password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Confirm Password does not match';
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return {
      errors,
    };
  }

  console.log(formValues.name, formValues.email, formValues.password);

  // Store database logic here

  return {
    status: 'success',
  };
}
