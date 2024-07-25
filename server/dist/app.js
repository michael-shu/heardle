"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Update this to your frontend URL
    credentials: true
}));
/*
const cookieParser = (req: Request, res : Response, next: NextFunction) => {
  if (req.get('Cookie') !== undefined) {
    const tokens = req.get('Cookie').split(/[=;]+/);
    req.cookies = {};

    for (let i = 0; i < tokens.length; i = i + 2) {
      req.cookies[tokens[i].trim()] = tokens[i + 1];
    }
  }
  next();
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request Method : ', req.method);
  console.log('Request Path : ', req.path);
  console.log('Request Query : ', req.query);
  console.log('Request Body : ', req.body);
  console.log('Request Cookies :');
  if (req.myCookies !== undefined) {
    for (const key of Object.keys(req.myCookies)) {
      if (key === 'connect.sid') {
        console.log("\t" + key + "=[REDACTED]");
      } else {
        console.log("\t" + key + "=" + req.myCookies[key]);
      }
    }
  }
  next();
};

const headerChecker = (req: Request, res: Response, next: NextFunction) => {
  if (req.header("Host") === undefined) {
    res.status('400').send('Bad Request');
  }
  next();
};

app.use(cookieParser);
app.use(logger);
app.use(headerChecker);
*/
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
let access_token = "";
if (!spotify_client_id || !spotify_client_secret) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in environment variables");
}
const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
app.get('/auth/login', (req, res) => {
    const scope = "streaming user-read-email user-read-private";
    const state = generateRandomString(16);
    const auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:5000/auth/callback",
        state: state
    });
    res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});
app.get('/auth/callback', (req, res) => {
    const code = req.query.code;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:5000/auth/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };
    request_1.default.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            res.redirect(`http://localhost:3000`);
        }
    });
});
app.get('/auth/token', (req, res) => {
    res.json({
        access_token: access_token
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
