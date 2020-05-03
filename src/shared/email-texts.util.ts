export function getRegisterAdAndUserText(email: string, password: string) {
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

export function getRejectAdMessageText(adminMessage: string) {
    return `
Your ad has been rejected!

Publish it has been rejected because the content that it contains does not satisfy the rules of our service.

Our commentary: ${adminMessage}
    `;
}