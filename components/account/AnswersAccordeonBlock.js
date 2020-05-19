import React from 'react'
import UserAnswerBlock from './UserAnswerBlock';
import { Feed, Accordion, Icon } from 'semantic-ui-react';
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
                (<Link href={`/ad?ad?adId=${adId}`}>{titleAd}</Link>)
            </Accordion.Title>
            <Accordion.Content active={isActive}>
            <Feed>
                {answers.map((answer, i) => (
                    <UserAnswerBlock 
                        firstname={answer.answerAutorUserData.firstname}
                        lastname={answer.answerAutorUserData.lastname}
                        phone={answer.answerAutorUserData.phone}
                        email={answer.answerAutorUserData.email}
                        createdAt={getFullDateInfo(answer.createdAt)}
                        answerText={answer.answerText}
                        isShowDivider={i + 1 !== answers.length}
                    />
                ))}
            </Feed>
            </Accordion.Content>
        </>
    )
}

export default AnswersAccordeonBlock;