'use client';

import { useState } from 'react';
import Toggle from '@/components/pricinChart/toggle/Toggle';
import styles from './cssboxshadow.module.css';
import RangeInput from '@/components/cssBoxShadow/RangeInput';
import ColorInput from '@/components/cssBoxShadow/ColorInput';
import CodeContiner from '@/components/cssBoxShadow/CodeContiner';

function CSSBoxShadowGenerator() {
  const [selectedPlan, setSelectedPlan] = useState('Outline');
  const [isCode, setIscode] = useState(false); // Az isCode értéke kezdetben false
  const [code, setCode] = useState(''); // Az aktuális CSS kódot tárolja

  // formData alapértelmezett értékek
  const defaultFormData = {
    hlength: 5,
    vlength: 10,
    bradius: 20,
    sradius: 15,
    opacity: 0.3,
    scolor: '#000000',
    bgcolor: '#ffffff', // alapértelmezett háttérszín
    boxcolor: '#F3A712',
  };

  const [formData, setFormData] = useState(defaultFormData);

  const togglePlan = () => {
    setSelectedPlan((prevPlan) =>
      prevPlan === 'Outline' ? 'Inset' : 'Outline'
    );
  };

  // Állapot frissítése
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Box shadow generálás dinamikusan
  const boxShadowStyle = `${formData.hlength}px ${formData.vlength}px ${formData.bradius}px ${formData.sradius}px rgba(0, 0, 0, ${formData.opacity})`;

  // CSS kód generálása
  const generateCSS = () => {
    const cssCode = `
      .box {
        background-color: ${formData.boxcolor};
        box-shadow: ${
          selectedPlan === 'Outline'
            ? boxShadowStyle
            : `${boxShadowStyle} inset`
        };
      }
      .boxContainer {
        background-color: ${formData.bgcolor};
      }
    `;
    setCode(cssCode); // A kódot tároljuk a setCode állapotban
    setIscode(true); // Mutassuk a kódot
  };

  // CodeContainer bezárásakor visszaállítjuk az alapértelmezett értékeket
  const handleCloseCodeContainer = () => {
    setFormData(defaultFormData);
    setSelectedPlan('Outline');
    setIscode(false); // Bezárjuk a kód konténert
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h2>CSS Box Shadow Generator</h2>
        <div className={styles.wrapper}>
          <div>
            <RangeInput
              label='Horizontal Length'
              name='hlength'
              value={formData.hlength}
              setValue={handleInputChange}
            />
            <RangeInput
              label='Vertical Length'
              name='vlength'
              value={formData.vlength}
              setValue={handleInputChange}
            />
            <RangeInput
              label='Blur Radius'
              name='bradius'
              value={formData.bradius}
              setValue={handleInputChange}
            />
            <RangeInput
              label='Spread Radius'
              name='sradius'
              value={formData.sradius}
              setValue={handleInputChange}
            />
          </div>
          <div>
            <ColorInput
              label='Shadow Color'
              name='scolor'
              value={formData.scolor}
              setValue={handleInputChange}
            />
            <ColorInput
              label='Background'
              name='bgcolor'
              value={formData.bgcolor}
              setValue={handleInputChange}
            />
            <ColorInput
              label='Box Color'
              name='boxcolor'
              value={formData.boxcolor}
              setValue={handleInputChange}
            />
            <div className={styles.rangeContainer}>
              <label htmlFor='opacity'>
                Opacity
                <span className={styles.rangeBox}>
                  <input
                    type='number'
                    name='opacityInp'
                    id='opacityInp'
                    value={formData.opacity}
                    min={0}
                    max={1}
                    step='0.01'
                    onChange={(e) =>
                      handleInputChange('opacity', e.target.value)
                    }
                  />
                </span>
              </label>
              <input
                type='range'
                name='opacity'
                id='opacity'
                min={0}
                max={1}
                step='0.01'
                value={formData.opacity}
                onChange={(e) => handleInputChange('opacity', e.target.value)}
              />
            </div>
            <div className={styles.toggleContainer}>
              <Toggle
                before='Outline'
                after='Inset'
                togglePlan={togglePlan}
                selectedPlan={selectedPlan}
                checked={selectedPlan === 'Inset'}
              />
            </div>
          </div>
        </div>
        <button className={styles.btn} onClick={generateCSS}>
          Get Code
        </button>
      </div>

      {isCode ? (
        <CodeContiner
          cssCode={code} // Az aktuális CSS kód átadása a CodeContainer komponensnek
          setIsCode={handleCloseCodeContainer} // Bezáráskor visszaállítja az alapértelmezett értékeket
        />
      ) : (
        <div
          className={styles.boxContainer}
          style={{ backgroundColor: formData.bgcolor }} // background szín dinamikus
        >
          <div
            className={styles.box}
            style={{
              backgroundColor: formData.boxcolor, // Box szín dinamikus
              boxShadow:
                selectedPlan === 'Outline'
                  ? boxShadowStyle
                  : `${boxShadowStyle} inset`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default CSSBoxShadowGenerator;
