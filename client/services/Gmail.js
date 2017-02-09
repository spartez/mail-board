import parseMessage from 'gmail-api-parse-message';
import addressparser from "addressparser";
import gravatar from 'gravatar';
import {Base64} from 'js-base64'

function parseAddresses(addresses) {
  return addressparser(addresses).map(contact => ({...contact, avatar: gravatar.url(contact.address)}));
}

const signInStatusChangedHandlers = [];
function notifySignInStatusChanged() {
  signInStatusChangedHandlers.forEach(handler => handler(gapi.auth2.getAuthInstance().isSignedIn.get()));
}

export function initialize(clientId, discoveryDocs, scopes) {
  return new Promise(resolve => gapi.load('client', resolve))
    .then(() => gapi.client.init({
      clientId: clientId,
      discoveryDocs: discoveryDocs,
      scope: scopes
    }))
    .then(() => {
      getEmail();
      notifySignInStatusChanged();
      gapi.auth2.getAuthInstance().isSignedIn.listen(notifySignInStatusChanged)
    })
}

export function addSignInStatusChangedHandler(handler) {
  signInStatusChangedHandlers.push(handler);

  if (gapi.auth2) {
    handler(gapi.auth2.getAuthInstance().isSignedIn.get())
  }
}

export function signIn() {
  return gapi.auth2.getAuthInstance().signIn();
}

export function signOut() {
  return gapi.auth2.getAuthInstance().signOut();
}

export function getLabels() {
  return gapi.client.gmail.users.labels.list({'userId': 'me'}).then(response => response.result.labels)
}

export function listThreads(query) {
  function getRequest(pageToken) {
    return gapi.client.gmail.users.threads.list({
      'userId': 'me',
      'q': query,
      'pageToken': pageToken
    })
  }

  return new Promise((resolve) => {
    function getPageOfThreads(request, result) {
      request.execute(function (resp) {
        result = result.concat(resp.threads);
        const nextPageToken = resp.nextPageToken;
        if (nextPageToken) {
          getPageOfThreads(getRequest(nextPageToken), result);
        } else {
          resolve(result);
        }
      });
    }

    getPageOfThreads(getRequest(), []);
  })
}

export function getThread(threadId, withDetails) {
  const params = {'userId': 'me', 'id': threadId, 'format': withDetails ? 'full' : 'metadata'};

  return new Promise(resolve => gapi.client.gmail.users.threads.get(params).execute(resolve)).then(thread => {
    const subject = _.findWhere(thread.messages[0].payload.headers, {name: 'Subject'}).value
    const from = _.findWhere(thread.messages[0].payload.headers, {name: 'From'}).value
    const participants = {}
    const labels = []
    const createdTimestamp = parseInt(thread.messages[0].internalDate)
    const updatedTimestamp = parseInt(thread.messages[thread.messages.length - 1].internalDate)

    thread.messages.forEach(message => {
      const from = _.findWhere(message.payload.headers, {name: 'From'}).value;
      const to = _.findWhere(message.payload.headers, {name: 'To'}).value;

      parseAddresses(from).forEach(contact => participants[contact.address] = contact)
      parseAddresses(to).forEach(contact => participants[contact.address] = contact)

      labels.push(...message.labelIds)
    })

    const parsedMessages = thread.messages.map(message => {
      const fromString = _.findWhere(message.payload.headers, {name: 'From'}).value
      const toString = _.findWhere(message.payload.headers, {name: 'To'}).value
      const from = parseAddresses(fromString)[0]
      const to = parseAddresses(toString)
      const parsed = withDetails ? parseMessage(message) : {}

      return {
        internalDate: message.internalDate,
        content: parsed.textHtml || parsed.textPlain || "",
        subject: message.subject,
        to,
        from
      }
    });

    return {
      id: thread.id,
      subject: subject,
      author: parseAddresses(from)[0],
      participants: _.values(participants),
      labels: _.unique(labels),
      createdTimestamp,
      updatedTimestamp,
      messages: parsedMessages
    }
  })
}

export function getEmail() {
  return new Promise(resolve => gapi.client.gmail.users.getProfile({userId: 'me'}).execute(resolve)).then(response => response.result.emailAddress)
}

export function sendMessage(threadId, subject, to, content) {
  return getEmail().then(from => {
    return new Promise(resolve => {
      const encodedResponse = Base64.encodeURI(
        `Content-Type: text/html; charset=UTF-8"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Subject: ${subject}
From: ${from}
Reply-To: ${from}
To: ${to}

${content}`);

      gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: encodedResponse,
          threadId
        },
      }).execute(resolve)
    });
  })
}
