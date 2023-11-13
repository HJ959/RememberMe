exports.handler = async event => {
    console.log(event)
    let token = event.body

    console.log(token)
    console.log("====================================")

    const jsonData = {
        "event": {
            "token": token,
            "expectedAction": "USER_ACTION",
            "siteKey": "6Lch2Q0pAAAAAC0OI5eZW8wlZg7JNJZgYSuht27Z",
        }
    }

    // Send an HTTP POST request with the saved JSON data to the URL below. Make sure that you make the following replacements:
    const response = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/forgetmenot-album-218fb/assessments?key=${process.env.RECAPTCHA_API_KEY}`, {
        method: "POST",
        body: jsonData
    })

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, OPTION",
        },
    }
}