$("document").ready(function () {
    var qrCode = new QRCode("qrCode", {
        text: "               " + app.qrCode + "               ",
        width: 150,
        height: 150,
        colorDark: app.colorOfCode,
        correctLevel: QRCode.CorrectLevel.H
    });
    $("#menuToggler").click(function () {
        $(".floatMenu").toggle("fast");
        qrCode.clear();
        document.getElementById("qrCode").innerHTML = "";
        if (app.qrCode === "") {
            app.qrCode = app.generateCode();
        }
        qrCode = new QRCode("qrCode", {
            text: "               " + app.qrCode + "               ",
            width: 150,
            height: 150,
            colorDark: app.colorOfCode,
            correctLevel: QRCode.CorrectLevel.H
        });
    });
    $("#submitButton").click(function () {
        $(".floatMenu").toggle("fast");
        qrCode.clear();
        document.getElementById("qrCode").innerHTML = "";
        if (app.qrCode === "") {
            app.qrCode = app.generateCode();
        }
        qrCode = new QRCode("qrCode", {
            text: "               " + app.qrCode + "               ",
            width: 150,
            height: 150,
            colorDark: app.colorOfCode,
            correctLevel: QRCode.CorrectLevel.H
        });
    });
    $("#saveUrlButton").click(function () {
        $(".floatMenu").toggle("fast");
        qrCode.clear();
        document.getElementById("qrCode").innerHTML = "";
        if (app.qrCode === "") {
            app.qrCode = app.generateCode();
        }
        qrCode = new QRCode("qrCode", {
            text: "               " + app.qrCode + "               ",
            width: 150,
            height: 150,
            colorDark: app.colorOfCode,
            correctLevel: QRCode.CorrectLevel.H
        });
    });
});