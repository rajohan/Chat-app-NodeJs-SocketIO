let socket = io();

function scrollToBottom() {
    // Selectors
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");

    // Heights
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", () => {
    let params = $.deparam(window.location.search);

    socket.emit("join", params, (error) => {
        if(error) {
            alert(error);
            window.location.href = "/";
        }
    });
});

socket.on("disconnect", () => {
    console.log("Disconnected from server")
});

socket.on("updateUserList", (users) => {
    let ol = $("<ol></ol>");
    users.forEach((user) => {
        ol.append($("<li></li>").text(user));
    });

    $("#users").html(ol);
});

socket.on("newMessage", (message) => {
    let formattedTime = moment(message.createdAt).format("HH:mm");
    let template = $("#message-template").html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });

    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", (message) => {
    let formattedTime = moment(message.createdAt).format("HH:mm");
    let template = $("#location-message-template").html();
    let html = Mustache.render(template, {
       from: message.from,
       createdAt: formattedTime,
       url: message.url
    });

    $("#messages").append(html);
    scrollToBottom();
});

$("#message-form").on("submit", (event) => {
    event.preventDefault();
    let messageTextBox = $("#message");

    socket.emit("createMessage", {
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val("");
    });
});

let locationButton = $("#send-location");
locationButton.on("click", () => {
    if(!navigator.geolocation) {
        return alert("Geo location not supported by your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending location...");

    navigator.geolocation.getCurrentPosition((position) => {
        locationButton.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        locationButton.removeAttr("disabled").text("Send location");
        alert("Unable to fetch location");
    });
});