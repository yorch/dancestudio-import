const got = require('got');

const { BASE_URL, USERNAME, PASSWORD } = process.env;

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.16 Safari/537.36';

const request = got.extend({
    prefixUrl: BASE_URL,
    headers: {
        'user-agent': USER_AGENT
    }
});

const loginRequest = () => request.post('login.php', {
    form: {
        email: USERNAME,
        password: PASSWORD
    },
    followRedirect: false
});

// TODO: Make it a singleton, so it can manage its own state and keep the session cookies around
// Also it could detect when the session is no longer valid and re-try

const login = async () => {
    const { headers } = await loginRequest();
    const setCookiesHeader = headers['set-cookie'];
    const cookies = setCookiesHeader.map((cookie) => cookie.split(';')[0]);
    const sessionRawCookie = cookies.find((cookie) => cookie.includes('PHPSESSID'));
    const sessionCookie = sessionRawCookie.split(';')[0];
    const sessionId = sessionCookie.split('=')[1];

    return {
        cookies,
        sessionCookie,
        sessionId,
        authenticatedRequest: request.extend({
            headers: {
                cookie: cookies.join(';')
            }
        })
    };
};

module.exports = {
    login
};
