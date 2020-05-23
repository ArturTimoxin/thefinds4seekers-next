import React, { useState } from 'react'
import { Accordion, Confirm, Message } from 'semantic-ui-react'
import AnswersAccordeonBlock from './AnswersAccordeonBlock';
import InfoModal from '../common/InfoModal';
import API from '../../utils/API';
import LoadingPlaceholder from '../../components/common/LoadingPlaceholader';

const AnswersAcordeon = ({ answers, isLoad, getAnswers }) => {

    const [activeIndexes, setActiveIndexes] = useState([0, 1, 2, 3]);
    const [idAnswerForDelete, setIdAnswerForDelete] = useState(null);
    const [textInfoModal, setTextInfoModal] = useState('');

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

    const onDeleteAnswer = () => {
        API.delete(`/answers/${idAnswerForDelete}`)
            .then(resp => {
                getAnswers();
                setIdAnswerForDelete(null);
            })
    }

    const onSendContactData = (answerId) => {
        API.get(`/answers/${answerId}/send-contact-data`)
           .then(resp => {
                setTextInfoModal('We are very glad that we helped you, and you helped someone! We hope that you will be able to contact this person!');
           })
    }

    if(isLoad) {
        return (
            <>
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
                <LoadingPlaceholder />
            </>
        )
    }

    if(!answers.length) {
        return (
            <Message size='huge'>
                Secret questions not found.
            </Message>
        )
    }

    return (
        <>
            <Accordion 
                styled
                fluid
                className='answers-acordion'
            >
                {answers.map((questionAnswerData, i) => (
                    <AnswersAccordeonBlock
                        key={questionAnswerData.titleAd + questionAnswerData.adId} 
                        adId={questionAnswerData.adId}
                        titleAd={questionAnswerData.titleAd}
                        secretQuestion={questionAnswerData.secretQuestion}
                        isActive={activeIndexes.includes(i)}
                        index={i}
                        answers={questionAnswerData.answers}
                        onClick={handleClick}
                        setIdAnswerForDelete={setIdAnswerForDelete}
                        onSendContactData={onSendContactData}
                    />
                ))}
            </Accordion>
            <Confirm 
                open={!!idAnswerForDelete}
                onCancel={() => setIdAnswerForDelete(null)}
                onConfirm={onDeleteAnswer}
                size='mini'
                header='Are you sure that you want to delete this answer?'
                content='In the future you will not be able to restore it.'
            />
            <InfoModal 
                onClose={() => setTextInfoModal('')}
                headerText='Your contact information was sent to the mail to the author of the answer'
                infoText={textInfoModal}
            />
        </>
    )
}

export default AnswersAcordeon;