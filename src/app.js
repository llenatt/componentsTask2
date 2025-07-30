import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
    // Можно задать 2 состояния — steps и activeIndex
    const [steps] = useState(data);
    const [activeIndex, setActiveIndex] = useState(0);
    // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
    const next = () => {
        setActiveIndex(activeIndex + 1);
    };
    const back = () => {
        setActiveIndex(activeIndex - 1);
    };

    const reset = () => {
        setActiveIndex(0);
    };

    // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
    const isFirstStep = activeIndex === 0;
    const isLastStep = activeIndex === steps.length - 1;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps.map(
                            (data, index) => index === activeIndex && data.content,
                        )}
                    </div>
                    <ul className={styles['steps-list']}>
                        {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
                        {steps.map((step, index) => (
                            <li
                                className={
                                    (activeIndex === index &&
                                        styles['steps-item'] + ' ' + styles.active) ||
                                    (activeIndex > index &&
                                        styles['steps-item'] + ' ' + styles.done) ||
                                    (activeIndex < index && styles['steps-item'])
                                }
                            >
                                <button className={styles['steps-item-button']}>
                                    {index + 1}
                                </button>
                                {step.title}
                            </li>
                        ))}
                    </ul>
                    <div className={styles['buttons-container']}>
                        <button
                            onClick={back}
                            disabled={isFirstStep}
                            className={styles.button}
                        >
                            Назад
                        </button>
                        <button
                            onClick={(!isLastStep && next) || (isLastStep && reset)}
                            className={styles.button}
                        >
                            {!isLastStep ? 'Далее' : 'Начать сначала'}
                            {}
                            {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
                            {/* Или заменять всю кнопку в зависимости от условия */}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
