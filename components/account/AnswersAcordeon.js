import React, { useState } from 'react'
import { Accordion } from 'semantic-ui-react'
import AnswersAccordeonBlock from './AnswersAccordeonBlock';

const mock = [
    {
        adId: 'skdkasdn',
        titleAd: 'sjdfjkdsf',
        secretQuestion: 'What?',
        answers: [
            {
                createdAt: new Date().toISOString(),
                answerText: 'Test answer 1',
                answerAutorUserData: {
                    _id: 'asdasd',
                    firstname: 'Lolos',
                    lastname: 'figos',
                    phone: '+380963227922',
                    email: 'lolos@mail.com'
                }
            },
            {
                createdAt: new Date().toISOString(),
                answerText: 'Test answer 2',
                answerAutorUserData: {
                    _id: 'asdasd',
                    firstname: 'Losasaas',
                    lastname: 'figosassadasd',
                    phone: '+2109388123',
                    email: 'lolos2@mail.com'
                }
            },
            {
                createdAt: new Date().toISOString(),
                answerText: 'Test answer 3',
                answerAutorUserData: {
                    _id: 'asdasd',
                    firstname: 'cdsdfsdf',
                    lastname: 'sdfdsf',
                    phone: '+324234234234',
                    email: 'molos@slf.com'
                }
            }
        ]
    },
    {
        adId: 'ssss',
        titleAd: 'asdasd',
        secretQuestion: 'Why?',
        answers: [
            {
                createdAt: new Date().toISOString(),
                answerText: 'Test answer 4',
                answerAutorUserData: {
                    _id: 'asdasd',
                    firstname: 'Lolos',
                    lastname: 'figos',
                    phone: '+380963227922',
                    email: 'lolos@mail.com'
                }
            },
            {
                createdAt: new Date().toISOString(),
                answerText: 'Test answer 5',
                answerAutorUserData: {
                    _id: 'asdasd',
                    firstname: 'Losasaas',
                    lastname: 'figosassadasd',
                    phone: '+2109388123',
                    email: 'lolos2@mail.com'
                }
            },
        ]
    },
]

const AnswersAcordeon = () => {

    const [activeIndexes, setActiveIndexes] = useState([]);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        let newActiveIndexes = JSON.parse(JSON.stringify(activeIndexes));
        if(activeIndexes.includes(index)) {
            newActiveIndexes = activeIndexes.filter(activeIndex => activeIndex !== index);
            setActiveIndexes(newActiveIndexes);
            return;
        }

        newActiveIndexes.push(index);
        setActiveIndexes(newActiveIndexes);
    }

    return (
        <Accordion 
            styled
            fluid
        >
            {mock.map((questionAnswerData, i) => (
                <AnswersAccordeonBlock 
                    adId={questionAnswerData.adId}
                    titleAd={questionAnswerData.titleAd}
                    secretQuestion={questionAnswerData.secretQuestion}
                    isActive={activeIndexes.includes(i)}
                    index={i}
                    answers={questionAnswerData.answers}
                    onClick={handleClick}
                />
            ))}
      </Accordion>
    )
}

export default AnswersAcordeon;