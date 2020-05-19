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

You can check it in your user account.

When you got approved for getting contacts of the autor, you will get a letter with this info and can check it into your user account.

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

When you got approved for getting contacts of the autor, you will get a letter with this info and can check it into your user account.

You can check it in your user account.

Best regards,
thefinds4seekers team
`;
}

export function sendAnswerToAdAutor(adTitle: string, adSecretQuestion: string, answer: string, user, isCorrect): string {
    return `
Your ad "${adTitle}" got answer from user!

Your ad of your found got answer on the secret question.

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