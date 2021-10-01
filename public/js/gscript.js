var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyAGucbNmfsCkznADFjO-arBRLGKQ6dT7cs',
        'clientId': '419240446354-idt4fn3rvoaqdg604eigj8t1b3b45ra4.apps.googleusercontent.com',
        'discoveryDocs': [discoveryUrl],
        'scope': SCOPE
    }).then(function() {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.
        $('#sign-in-or-out-button').click(function() {
            handleAuthClick();
        });
        $('#revoke-access-button').click(function() {
            revokeAccess();
        });
    });
}

function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked "Sign out" button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

function revokeAccess() {
    GoogleAuth.disconnect();
}

const setSigninStatus = async(event) => {
    //event.preventDefault();
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        var profile = user.getBasicProfile();
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').css('display', 'inline-block');
        $('#auth-status').html('You are currently signed in and have granted ' +
            'access to this app.');
        console.log(' EMAIL IS ' + profile.getEmail());
        console.log('ID: ' + profile.getId());
        const name = profile.getName();
        const password = "DF6psfd2";
        const email = profile.getEmail();
        //Put email in database
        if (name && email && password) {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/myprojects');
            } else {
                alert(response.statusText);
            }
        }

    } else {
        $('#sign-in-or-out-button').html('Sign in with <span style="color:blue">G</span><span style="color:red">o</span><span style="color:orange">o</span><span style="color:blue">g</span><span style="color:green">l</span><span style="color:red">e</span>');
        $('#revoke-access-button').css('display', 'none');
        $('#auth-status').html('You have not authorized this app or you are ' +
            'signed out.');
    }
}

function updateSigninStatus() {
    setSigninStatus();
}

