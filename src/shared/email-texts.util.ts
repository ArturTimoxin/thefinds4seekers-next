export function getRegisterAdAndUserText(email, password) {
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