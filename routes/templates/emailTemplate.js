function phone(user) {
    let response = timeStamp() + ': Big Echs Kitchen ' +
        user.name + ' just placed ' +
        ' an order of ( ' + user.order + ' ) customer email is ' + user.email + ' and phone number is ' + user.phone

    return response;
};

function email(user) {
    let response = '<h2 style="color: #5D6D7E"> Big Echs Kitchen </h2>' +
        '<br />' +
        '<h3 style="color: #C0392B ">' + user.name + ' just placed ' +
        ' an order of ' + user.order + '</h3> <br /> <h3 style="color: #C0392B  "> His contact details are his email which is ' + user.email + ' and his phone number ' + '<a href="tel:' + user.phone + ' ">' + user.phone + '</a>' + '</h3>'

    return response;
};

function emailTwc(user) {
    let message = '<h2> Twc bot Just got a mail <h2/> <br />' +
        '<h2> Mail Info: </h2> <br />' +
        '<h3 style="color: red"> Name: </h3> ' + user.name + '<br/>' +
        '<h3 style="color: red"> Business: </h3>' + user.business + '<br/>' +
        '<h3 style="color: red"> Email: </h3> ' + user.email + '<br/>' +
        '<h3 style="color: red"> Phone: </h3> ' + user.phone + '<br/>' +
        '<h3 style="color: red"> Comment: </h3>' + user.comment + '<br/>';
    return message;
}


function timeStamp() {
    return new Date(new Date().getTime()).toLocaleString();
}

module.exports = {
    email: email,
    phone: phone,
    emailTwc: emailTwc,
    timeStamp: timeStamp
};
