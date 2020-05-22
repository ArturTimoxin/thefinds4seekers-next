import React from 'react'
import UserAnswerBlock from './UserAnswerBlock';
import { Feed, Accordion, Icon, Message } from 'semantic-ui-react';
import Link from 'next/link';
import { getFullDateInfo } from '../../utils/getFormatedDate';

const AnswersAccordeonBlock = ({ 
    adId,
    titleAd,
    secretQuestion,
    isActive,
    index,
    answers,
    onClick,
    setIdAnswerForDelete,
    onSendContactData,
}) => {
    return (
        <>
            <Accordion.Title
                active={isActive}
                index={index}
                onClick={onClick}
            >
                <Icon name='dropdown' />
                {`${secretQuestion} `}
                (<Link href={`/ad?adId=${adId}`}>{titleAd}</Link>)
            </Accordion.Title>
            <Accordion.Content active={isActive}>
            <Feed>
                {!answers.length && (
                    <Message size='medium'>Answers not found.</Message>
                )}
                {answers.map((answer, i) => (
                    <UserAnswerBlock 
                        key={answer.createdAt + answer._id}
                        id={answer._id}
                        firstname={answer.answerAutorUserData.firstname}
                        lastname={answer.answerAutorUserData.lastname}
                        phone={answer.answerAutorUserData.phone}
                        email={answer.answerAutorUserData.email}
                        createdAt={getFullDateInfo(answer.createdAt)}
                        answerText={answer.answerText}
                        isShowDivider={i + 1 !== answers.length}
                        setIdAnswerForDelete={setIdAnswerForDelete}
                        onSendContactData={onSendContactData}
                    />
                ))}
            </Feed>
            </Accordion.Content>
        </>
    )
}

export default AnswersAccordeonBlock;