import React from 'react';
import UserMenu from '../../../components/common/UserMenu';
import { Header } from 'semantic-ui-react';
import AnswersAcordeon from '../../../components/account/AnswersAcordeon';

const Answers = () => {
    return (
        <UserMenu>
            <Header as='h1'>Answers on your secret questions</Header>
            <AnswersAcordeon />
        </UserMenu>
    )
}

export default Answers;