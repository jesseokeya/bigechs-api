function phone(user) {
    let response = timeStamp() + ': Big Echs Kitchen ' +
        user.name + ' just placed ' +
        ' an order of ( ' + user.order + ' ) customer email is ' + user.email + ' and phone number is ' + user.phone

    return response;
};

function email(user) {
    let response = '<h1 style="color: #5D6D7E"> Big Echs Kitchen </h1>' +
        '<br />' +
'<h2 style="color: #C0392B ">' + user.name + ' just placed ' +
        ' an order of ' + user.order + '</h2> <br /> <h2 style="color: #C0392B  "> His contact details are his email which is ' + user.email + ' and his phone number ' + '<a href="tel:' + user.phone + ' ">' + user.phone + '</a>' + '</h2>'

    return response;
};

function timeStamp() {
    return new Date(new Date().getTime()).toLocaleString();
}

module.exports = {
    email: email,
    phone: phone
};
