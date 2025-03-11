'use client';

import { useState, useCallback } from 'react';
import Toggle from '@/components/pricinChart/toggle/Toggle';
import styles from './cssboxshadow.module.css';
import RangeInput from '@/components/cssBoxShadow/RangeInput';
import ColorInput from '@/components/cssBoxShadow/ColorInput';
import CodeContiner from '@/components/cssBoxShadow/CodeContiner';

const defaultFormData = {
  hlength: 5,
  vlength: 10,
  bradius: 20,
  sradius: 15,
  opacity: 0.3,
  scolor: '#000000',
  bgcolor: '#ffffff',
  boxcolor: '#F3A712',
};

function CSSBoxShadowGenerator() {
  const [formData, setFormData] = useState(defaultFormData);
  const [selectedPlan, setSelectedPlan] = useState('Outline');
  const [isCode, setIsCode] = useState(false);
  const [code, setCode] = useState('');

  const hexToRgb = (hex, opacity) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const createBoxShadow = useCallback(
    ({ hlength, vlength, bradius, sradius, scolor, opacity }) => {
      const color = scolor.startsWith('#')
        ? hexToRgb(scolor, opacity)
        : `${scolor}, ${opacity}`;
      return `${hlength}px ${vlength}px ${bradius}px ${sradius}px ${color}`;
    },
    []
  );

  const boxShadowStyle = createBoxShadow(formData);

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
    setCode(cssCode);
    setIsCode(true);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePlan = () => {
    setSelectedPlan((prevPlan) =>
      prevPlan === 'Outline' ? 'Inset' : 'Outline'
    );
  };

  const handleCloseCodeContainer = () => {
    setFormData(defaultFormData);
    setSelectedPlan('Outline');
    setIsCode(false);
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
        <CodeContiner cssCode={code} setIsCode={handleCloseCodeContainer} />
      ) : (
        <div
          className={styles.boxContainer}
          style={{ backgroundColor: formData.bgcolor }}
        >
          <div
            className={styles.box}
            style={{
              backgroundColor: formData.boxcolor,
              boxShadow:
                selectedPlan === 'Outline'
                  ? boxShadowStyle
                  : `${boxShadowStyle} inset`,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CSSBoxShadowGenerator;
