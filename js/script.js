$("document").ready(function () {
    var qrCode = new QRCode("qrCode", {
        text: "               " + app.qrCode + "               ",
        width: 150,
        height: 150,
        colorDark: "#f97afb",
        correctLevel: QRCode.CorrectLevel.H
    });
    $("#menuToggler").click(function () {
        $(".floatMenu").toggle("fast");
    });
});