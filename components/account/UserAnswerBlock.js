import React from 'react'
import UserIcon from '../../assets/profile2.png';
import { Feed, Icon, Divider } from 'semantic-ui-react'

const UserAnswerBlock = ({
    firstname,
    lastname,
    createdAt,
    answerText,
    phone,
    email,
    isShowDivider = true,
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
                <Icon 
                    className='delete-answer-icon'
                    name='delete' 
                />
            </Feed.Event>
            {isShowDivider && (
                <Divider />
            )}
        </>
    )
}

export default UserAnswerBlock;
