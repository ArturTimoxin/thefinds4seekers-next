import React from 'react'
import UserIcon from '../../assets/profile2.png';
import { Feed, Icon, Divider, Button } from 'semantic-ui-react'

const UserAnswerBlock = ({
    id,
    firstname,
    lastname,
    createdAt,
    answerText,
    phone,
    email,
    isShowDivider = true,
    setIdAnswerForDelete,
    onSendContactData,
}) => {
    return (
        <>
            <Feed.Event
                className='answer-wrap'
            >
                <Feed.Label image={UserIcon} />
                <Feed.Content
                    className='answer-content-wrap'
                >
                    <Feed.Summary>
                        <Feed.User>{`${firstname} ${lastname}`}</Feed.User>
                        <Feed.Date>{createdAt}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {answerText}
                    </Feed.Extra>
                    <div>
                        <Feed.Meta>
                            Phone: {phone}
                        </Feed.Meta>
                    </div>
                    <div>
                        <Feed.Meta>
                            Email: {email}
                        </Feed.Meta>
                    </div>
                </Feed.Content>
                <div
                    className='answer-actions-wrap'
                >
                    <Icon 
                        className='delete-answer-icon'
                        name='delete'
                        onClick={() => setIdAnswerForDelete(id)} 
                    />
                    <Button
                        onClick={() => onSendContactData(id)}
                    >
                        Send your contact details on autor email
                    </Button>
                </div>
            </Feed.Event>
            {isShowDivider && (
                <Divider />
            )}
        </>
    )
}

export default UserAnswerBlock;
