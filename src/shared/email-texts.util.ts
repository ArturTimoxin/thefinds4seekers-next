export function getRegisterAdAndUserText(email: string, password: string): string {
    return `
Your ad has been successfully submitted to moderation! 
It will be published after verification by our moderation. You'll get a letter when your ad will be checked by us.

Also, you already registered in our service:

Login: ${email}
Password: ${password}

We hope, that we can help you to find your loss.

Best regards,
thefinds4seekers team
    `;
}

export function getRejectAdMessageText(adminMessage: string): string {
    return `
Your ad has been rejected!

Publish it has been rejected because the content that it contains does not satisfy the rules of our service.

Our commentary: ${adminMessage}

Best regards,
thefinds4seekers team
    `;
}

export function getSuccessfulSaveAnswerText(adTitle: string): string {
    return `
Your answer on ad ${adTitle} has been sent to the author of it!

When you got approved for getting contacts of the autor, you will get a letter with this info.

Best regards,
thefinds4seekers team
`;
}

export function getSuccessfulSaveAnswerAndRegisterText(adTitle: string, email : string, password: string): string {
    return `
Your answer on ad ${adTitle} has been sent to the author of it!

Also, you already registered in our service:

Login: ${email}
Password: ${password}

When you got approved for getting contacts of the autor, you will get a letter with this info.

Best regards,
thefinds4seekers team
`;
}

export function sendAnswerToAdAutor(adTitle: string, adSecretQuestion: string, answer: string, user, isCorrect): string {
    return `
Ad of your found  "${adTitle}" got answer on the secret question from user!

Your question: ${adSecretQuestion}

Answer: ${answer}

Autor of answer data:
Name: ${user.firstname} ${user.lastname}
Email: ${user.email}
Phone: +${user.phone}

${isCorrect ? (
    "We considered this answer to be correct, therefore we did transfer your data to this person. You can check it into your user account."
) : (
    "We considered this answer to be incorrect, therefore we did not transfer your data to this person. You can check it into your user account."
)}

Best regards,
thefinds4seekers team
`;
}

export function sendUserContactDataToAutorAnswer(adTitle: string, adId: string, answerText, userData) {
    return `
Our congratulations!

Your answer: "${answerText}" to the ad about find "${adTitle}" - ${process.env.APP_URL}/ad?adId=${adId} is right!

Creator of the ad sent you his contact details:

Name: ${userData.firstname} ${userData.lastname}
Email: ${userData.email}
Phone: ${userData.phone}

We are very glad that we helped you find each other!
We hope you share information about us :)

Best regards,
thefinds4seekers team
`;
}