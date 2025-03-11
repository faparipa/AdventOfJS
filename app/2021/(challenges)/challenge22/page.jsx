'use client';

import { getCardData } from '@/actions/card-action';
import CreditCardDisplay from '@/components/CreditCard/CreditCardDisplay';
import CreditCardForm from '@/components/CreditCard/CreditCardForm';
import { useActionState, useEffect, useState } from 'react';
import styles from './CreditCard.module.css';

export default function CreditCardFormPage() {
  const [cardType, setCardType] = useState('visa');
  const [isFlipped, setIsFlipped] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formState, formAction] = useActionState(getCardData, {});
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: '',
  });

  const cardTypePatterns = {
    visa: /^4/,
    mastercard: /^5/,
    discover: /^6/,
    american: /^3/,
  };

  const detectCardType = (cardNumber) => {
    for (const [type, pattern] of Object.entries(cardTypePatterns)) {
      if (pattern.test(cardNumber)) return type;
    }
    return 'visa';
  };

  const formatCardNumber = (cardNumber) => {
    const cleanedNumber = cardNumber.replace(/\D/g, '');
    return cleanedNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e) => {
    let cardNumber = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardDetails((prev) => ({
      ...prev,
      cardNumber: formatCardNumber(cardNumber),
    }));
    setCardType(detectCardType(cardNumber));
  };

  const handleCvvFocus = () => setIsFlipped(true);
  const handleCvvBlur = () => setIsFlipped(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cvv' && value.length > 3) return;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (formState?.status === 'success') {
      setSuccessMessage(formState.message);
      setCardDetails(
        formState.initialFormState || {
          cardNumber: '',
          cardHolder: '',
          expirationMonth: '',
          expirationYear: '',
          cvv: '',
        }
      );
    } else if (formState?.status === 'error') {
      setSuccessMessage(formState.message);
    }
    const timeout = setTimeout(() => setSuccessMessage(''), 3000);
    return () => clearTimeout(timeout);
  }, [formState]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <CreditCardDisplay
          cardDetails={cardDetails}
          cardType={cardType}
          isFlipped={isFlipped}
        />
        <div className={styles.form}>
          <CreditCardForm
            formAction={formAction}
            cardDetails={cardDetails}
            handleInputChange={handleInputChange}
            handleCardNumberChange={handleCardNumberChange}
            handleCvvFocus={handleCvvFocus}
            handleCvvBlur={handleCvvBlur}
          />
          {successMessage && (
            <h4 className={styles.success}>{successMessage}</h4>
          )}
        </div>
      </div>
    </div>
  );
}
